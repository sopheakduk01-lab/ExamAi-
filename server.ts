import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Helper to wrap raw 16-bit PCM audio in a standard 44-byte WAV header
function getWavHeader(dataLength: number, sampleRate: number = 24000, numChannels: number = 1, bitsPerSample: number = 16): Buffer {
  const header = Buffer.alloc(44);
  
  // RIFF identifier
  header.write("RIFF", 0, 4, "ascii");
  // File length minus 8 bytes of RIFF identifier and file length
  header.writeUInt32LE(36 + dataLength, 4);
  // RIFF type
  header.write("WAVE", 8, 4, "ascii");
  // Format chunk identifier
  header.write("fmt ", 12, 4, "ascii");
  // Format chunk length (16)
  header.writeUInt32LE(16, 16);
  // Sample format (raw PCM is 1)
  header.writeUInt16LE(1, 20);
  // Channel count
  header.writeUInt16LE(numChannels, 22);
  // Sample rate
  header.writeUInt32LE(sampleRate, 24);
  // Byte rate = (sampleRate * numChannels * bitsPerSample) / 8
  header.writeUInt32LE((sampleRate * numChannels * bitsPerSample) / 8, 28);
  // Block align = (numChannels * bitsPerSample) / 8
  header.writeUInt16LE((numChannels * bitsPerSample) / 8, 32);
  // Bits per sample
  header.writeUInt16LE(bitsPerSample, 34);
  // Data chunk identifier
  header.write("data", 36, 4, "ascii");
  // Data chunk length
  header.writeUInt32LE(dataLength, 40);

  return header;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support JSON & Urlencoded payloads
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Initialize Gemini Client
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Route for Text-To-Speech
  app.post("/api/tts", async (req: express.Request, res: express.Response) => {
    try {
      const { text, voice } = req.body;
      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured in environment" });
      }

      const selectedVoice = voice || 'Kore'; // 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'

      console.log(`Generating TTS for: "${text.substring(0, 50)}..." using voice ${selectedVoice}`);

      // Call Gemini 3.1 Flash TTS Preview
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [
          {
            parts: [
              {
                text: `Read this text aloud in Khmer with elegant, clear, polite and natural phrasing. Do not translate. Only speak the following text: ${text}`
              }
            ]
          }
        ],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice },
            },
          },
        },
      });

      const inlineData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
      const base64Audio = inlineData?.data;
      let mimeType = inlineData?.mimeType || "audio/mp3";

      console.log(`[Gemini TTS response] mimeType: "${mimeType}", data length: ${base64Audio?.length || 0}`);

      if (!base64Audio) {
        console.error("Gemini TTS response did not contain audio data.", response);
        return res.status(500).json({ error: "Gemini did not return audio data" });
      }

      let finalBase64Audio = base64Audio;
      
      // If the model output format is raw PCM or linear format (often returned as audio/pcm, audio/x-linear16, audio/L16, etc.),
      // we must wrap it in a WAV header for browser HTML5 Audio playback compatibility.
      const isRawPcm = 
        mimeType.toLowerCase().includes("pcm") || 
        mimeType.toLowerCase().includes("l16") || 
        mimeType.toLowerCase().includes("linear");

      if (isRawPcm) {
        const rawPcmBuffer = Buffer.from(base64Audio, "base64");
        
        // Convert big-endian L16 PCM (network byte order) to standard little-endian PCM for standard WAV compatibility
        if (mimeType.toLowerCase().includes("l16") || mimeType.toLowerCase().includes("linear")) {
          if (rawPcmBuffer.length % 2 === 0) {
            rawPcmBuffer.swap16();
          } else {
            const evenBuffer = rawPcmBuffer.subarray(0, rawPcmBuffer.length - 1);
            evenBuffer.swap16();
          }
        }

        // Parse sample rate if specified in the mimeType, e.g. "audio/pcm;rate=24000" or "audio/L16;rate=24000"
        let sampleRate = 24000;
        const rateMatch = mimeType.match(/rate=(\d+)/i);
        if (rateMatch) {
          sampleRate = parseInt(rateMatch[1], 10);
        }
        
        console.log(`Wrapping raw PCM/L16 data of length ${rawPcmBuffer.length} with WAV header at sample rate ${sampleRate} Hz`);
        
        const wavHeader = getWavHeader(rawPcmBuffer.length, sampleRate, 1, 16);
        const wavBuffer = Buffer.concat([wavHeader, rawPcmBuffer]);
        finalBase64Audio = wavBuffer.toString("base64");
        mimeType = "audio/wav";
      }

      res.json({ audio: finalBase64Audio, mimeType: mimeType });
    } catch (err: any) {
      console.error("Error generating TTS via Gemini:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
