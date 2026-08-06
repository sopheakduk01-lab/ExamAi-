import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  X,
  Palette,
  RotateCcw,
  RotateCw,
  Trash2,
  Download,
  Eraser,
  Square,
  Circle,
  Minus,
  Sparkles,
  Paintbrush,
  Pencil,
  Grid,
  Type,
  Smile,
  Star,
  Heart,
  Image as ImageIcon,
  Check,
  Zap,
  Maximize2
} from 'lucide-react';

interface FreeDrawingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ToolType = 'pencil' | 'pen' | 'brush' | 'highlighter' | 'rainbow' | 'neon' | 'eraser' | 'rect' | 'circle' | 'line' | 'sticker';
type BackgroundType = 'white' | 'grid' | 'lined' | 'chalkboard' | 'cream';

interface HistoryState {
  imageData: ImageData;
}

const PRESET_COLORS = [
  '#000000', '#1e293b', '#dc2626', '#ea580c', '#d97706',
  '#16a34a', '#0d9488', '#2563eb', '#4f46e5', '#9333ea',
  '#c026d3', '#db2777', '#ca8a04', '#059669', '#ffffff'
];

const STICKERS = ['⭐', '❤️', '🌸', '🎓', '🏆', '🦁', '🦄', '🎈', '☀️', '🍀', '🚀', '🎨', '🇰🇭', '📚', '🦉'];

export const FreeDrawingModal: React.FC<FreeDrawingModalProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Drawing tools state
  const [activeTool, setActiveTool] = useState<ToolType>('pen');
  const [selectedColor, setSelectedColor] = useState<string>('#2563eb');
  const [strokeWidth, setStrokeWidth] = useState<number>(5);
  const [bgType, setBgType] = useState<BackgroundType>('white');
  const [selectedSticker, setSelectedSticker] = useState<string>('⭐');

  // Drawing state tracking
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [tempImageData, setTempImageData] = useState<ImageData | null>(null);

  // Undo/Redo stacks
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Color rainbow hue counter
  const rainbowHueRef = useRef<number>(0);

  // Canvas Dimensions
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({
    width: 800,
    height: 550
  });

  // Resize Canvas responsively
  const resizeCanvas = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = Math.max(320, rect.width - 24);
    const height = Math.min(620, Math.max(400, window.innerHeight * 0.6));

    setCanvasSize({ width, height });
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        resizeCanvas();
      }, 100);
      window.addEventListener('resize', resizeCanvas);
    }
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [isOpen, resizeCanvas]);

  // Redraw Background
  const drawBackground = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, type: BackgroundType) => {
    ctx.save();
    if (type === 'white') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
    } else if (type === 'cream') {
      ctx.fillStyle = '#FAF6EE';
      ctx.fillRect(0, 0, width, height);
    } else if (type === 'chalkboard') {
      ctx.fillStyle = '#1B2E26';
      ctx.fillRect(0, 0, width, height);

      // Subtle chalk texture
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 0; i < height; i += 8) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }
    } else if (type === 'grid') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1;
      const step = 25;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    } else if (type === 'lined') {
      ctx.fillStyle = '#FFFDF9';
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 1;
      const step = 30;
      for (let y = 40; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      // Red margin line on left
      ctx.strokeStyle = '#FCA5A5';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(50, 0);
      ctx.lineTo(50, height);
      ctx.stroke();
    }
    ctx.restore();
  }, []);

  // Save current canvas state to history
  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => {
      const updated = prev.slice(0, historyIndex + 1);
      return [...updated, imgData];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  // Init canvas when size or bgType changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // Initial background
    drawBackground(ctx, canvas.width, canvas.height, bgType);

    // Save initial state if history is empty
    if (history.length === 0) {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([imgData]);
      setHistoryIndex(0);
    } else if (historyIndex >= 0 && history[historyIndex]) {
      // Restore state
      ctx.putImageData(history[historyIndex], 0, 0);
    }
  }, [canvasSize, bgType]);

  // Handle Background Change
  const handleBgChange = (newBg: BackgroundType) => {
    setBgType(newBg);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawBackground(ctx, canvas.width, canvas.height, newBg);
    saveToHistory();
  };

  // Canvas Undo & Redo
  const handleUndo = () => {
    if (historyIndex <= 0) return;
    const newIdx = historyIndex - 1;
    setHistoryIndex(newIdx);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx || !history[newIdx]) return;

    ctx.putImageData(history[newIdx], 0, 0);
  };

  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return;
    const newIdx = historyIndex + 1;
    setHistoryIndex(newIdx);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx || !history[newIdx]) return;

    ctx.putImageData(history[newIdx], 0, 0);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawBackground(ctx, canvas.width, canvas.height, bgType);
    saveToHistory();
  };

  // Download image as PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `grade6-art-drawing-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Pointer position relative to canvas
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  // Configure CTX based on selected tool
  const configureCtxTool = (ctx: CanvasRenderingContext2D, currentPos: { x: number; y: number }) => {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (activeTool === 'eraser') {
      ctx.lineWidth = strokeWidth * 3;
      if (bgType === 'chalkboard') {
        ctx.strokeStyle = '#1B2E26';
      } else if (bgType === 'cream') {
        ctx.strokeStyle = '#FAF6EE';
      } else {
        ctx.strokeStyle = '#FFFFFF';
      }
      ctx.shadowBlur = 0;
    } else if (activeTool === 'pencil') {
      ctx.lineWidth = Math.max(1.5, strokeWidth * 0.5);
      ctx.strokeStyle = selectedColor;
      ctx.globalAlpha = 0.85;
      ctx.shadowBlur = 0;
    } else if (activeTool === 'pen') {
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = selectedColor;
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
    } else if (activeTool === 'brush') {
      ctx.lineWidth = strokeWidth * 2.5;
      ctx.strokeStyle = selectedColor;
      ctx.globalAlpha = 0.6;
      ctx.shadowBlur = strokeWidth * 0.5;
      ctx.shadowColor = selectedColor;
    } else if (activeTool === 'highlighter') {
      ctx.lineWidth = strokeWidth * 4;
      ctx.strokeStyle = selectedColor;
      ctx.globalAlpha = 0.35;
      ctx.shadowBlur = 0;
    } else if (activeTool === 'rainbow') {
      rainbowHueRef.current = (rainbowHueRef.current + 8) % 360;
      ctx.lineWidth = strokeWidth * 1.8;
      ctx.strokeStyle = `hsl(${rainbowHueRef.current}, 100%, 50%)`;
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 4;
      ctx.shadowColor = ctx.strokeStyle;
    } else if (activeTool === 'neon') {
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = '#FFFFFF';
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = strokeWidth * 2;
      ctx.shadowColor = selectedColor;
    } else {
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = selectedColor;
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
    }
  };

  // POINTER DOWN
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getCanvasCoords(e);
    setIsDrawing(true);
    setStartPos(pos);

    // Stamp Sticker tool directly on click
    if (activeTool === 'sticker') {
      ctx.save();
      ctx.font = `${strokeWidth * 8 + 24}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedSticker, pos.x, pos.y);
      ctx.restore();
      saveToHistory();
      setIsDrawing(false);
      return;
    }

    // Save temporary state for shape preview
    if (activeTool === 'rect' || activeTool === 'circle' || activeTool === 'line') {
      setTempImageData(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    configureCtxTool(ctx, pos);

    if (['pencil', 'pen', 'brush', 'highlighter', 'rainbow', 'neon', 'eraser'].includes(activeTool)) {
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
  };

  // POINTER MOVE
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPos = getCanvasCoords(e);

    // Freehand drawing tools
    if (['pencil', 'pen', 'brush', 'highlighter', 'rainbow', 'neon', 'eraser'].includes(activeTool)) {
      configureCtxTool(ctx, currentPos);
      ctx.lineTo(currentPos.x, currentPos.y);
      ctx.stroke();
    } else if (['rect', 'circle', 'line'].includes(activeTool) && startPos && tempImageData) {
      // Shape live preview
      ctx.putImageData(tempImageData, 0, 0);
      ctx.beginPath();
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = selectedColor;
      ctx.globalAlpha = 1.0;

      if (activeTool === 'line') {
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(currentPos.x, currentPos.y);
      } else if (activeTool === 'rect') {
        const width = currentPos.x - startPos.x;
        const height = currentPos.y - startPos.y;
        ctx.strokeRect(startPos.x, startPos.y, width, height);
      } else if (activeTool === 'circle') {
        const radius = Math.hypot(currentPos.x - startPos.x, currentPos.y - startPos.y);
        ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
      }
      ctx.stroke();
    }
  };

  // POINTER UP
  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.closePath();
    ctx.globalAlpha = 1.0;
    ctx.shadowBlur = 0;

    setIsDrawing(false);
    setStartPos(null);
    setTempImageData(null);

    // Push new state to history
    saveToHistory();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl border border-amber-300 shadow-2xl w-full max-w-5xl my-2 overflow-hidden flex flex-col max-h-[96vh]">
        
        {/* Top Header Bar */}
        <div className="p-3.5 sm:p-5 bg-gradient-to-r from-[#2B170B] via-[#452413] to-[#2B170B] text-amber-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold border border-amber-400/30 text-xl shadow-inner">
              🎨
            </div>
            <div>
              <h2 className="font-moul text-sm sm:text-base text-amber-100 font-bold tracking-wide flex items-center gap-2">
                គំនូសសេរី (Art Canvas)
                <span className="text-[10px] bg-amber-500/30 text-amber-200 px-2 py-0.5 rounded-full border border-amber-400/40 font-mono">
                  v2.0
                </span>
              </h2>
              <p className="text-[11px] text-amber-300/80">
                ស្ទូឌីយោគូររូបច្នៃប្រឌិតសម្រាប់សិស្សានុសិស្ស ដោយមានឧបករណ៍សម្បូរបែប
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95"
              title="ទាញយករូបភាព (Download PNG)"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">រក្សាទុកជា PNG</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-amber-950/80 text-amber-300 hover:text-white hover:bg-amber-800 transition-all cursor-pointer border border-amber-600/30 active:scale-95"
              aria-label="Close Modal"
              id="btn-close-art-modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tools Toolbar & Controls */}
        <div className="bg-slate-50 border-b border-slate-200 p-2.5 sm:p-3.5 space-y-2.5 shrink-0">
          
          {/* Row 1: Main Tools Selection */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-1">
            <div className="flex items-center gap-1.5 shrink-0 text-xs font-bold">
              {/* Pen / Pencil / Brush Tools */}
              <button
                onClick={() => setActiveTool('pen')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeTool === 'pen'
                    ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>ប៊ិច</span>
              </button>

              <button
                onClick={() => setActiveTool('brush')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeTool === 'brush'
                    ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Paintbrush className="w-3.5 h-3.5" />
                <span>ច្រាសថ្នាំ</span>
              </button>

              <button
                onClick={() => setActiveTool('highlighter')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeTool === 'highlighter'
                    ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-sm">🖍️</span>
                <span>ប៊ិចហាយឡាយ</span>
              </button>

              <button
                onClick={() => setActiveTool('rainbow')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeTool === 'rainbow'
                    ? 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-white font-bold border-amber-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>ប៊ិចឥន្ទធនូ</span>
              </button>

              <button
                onClick={() => setActiveTool('neon')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeTool === 'neon'
                    ? 'bg-purple-900 text-pink-300 border-purple-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-pink-400" />
                <span>ប៊ិចភ្លើង Neon</span>
              </button>

              <button
                onClick={() => setActiveTool('eraser')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer border ${
                  activeTool === 'eraser'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Eraser className="w-3.5 h-3.5 text-rose-400" />
                <span>ជ័រលុប</span>
              </button>
            </div>

            {/* Shape Tools */}
            <div className="flex items-center gap-1 shrink-0 border-l border-slate-300 pl-2">
              <button
                onClick={() => setActiveTool('rect')}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeTool === 'rect' ? 'bg-amber-800 text-white border-amber-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                title="ចតុកោណកែង"
              >
                <Square className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTool('circle')}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeTool === 'circle' ? 'bg-amber-800 text-white border-amber-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                title="រង្វង់"
              >
                <Circle className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTool('line')}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeTool === 'line' ? 'bg-amber-800 text-white border-amber-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                title="បន្ទាត់ត្រង់"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTool('sticker')}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeTool === 'sticker' ? 'bg-amber-800 text-white border-amber-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
                title="រូបបិទ (Sticker)"
              >
                <Smile className="w-4 h-4 text-amber-500" />
              </button>
            </div>

            {/* Action Buttons: Undo / Redo / Clear */}
            <div className="flex items-center gap-1 shrink-0 border-l border-slate-300 pl-2">
              <button
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="ថយក្រោយ (Undo)"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="ទៅមុខ (Redo)"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              <button
                onClick={handleClear}
                className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 cursor-pointer transition-colors"
                title="លុបទំាងអស់ (Clear)"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Row 2: Color Palette, Stroke Size & Background Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 border-t border-slate-200/80">
            {/* Color Swatches */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-slate-500 mr-1">ជម្រើសពណ៌៖</span>
              {PRESET_COLORS.map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedColor(col)}
                  className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer hover:scale-110 ${
                    selectedColor === col ? 'border-amber-900 scale-110 shadow-md ring-2 ring-amber-400' : 'border-white shadow-xs'
                  }`}
                  style={{ backgroundColor: col }}
                  aria-label={`Color ${col}`}
                />
              ))}

              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-7 h-7 rounded-lg border border-slate-300 cursor-pointer p-0 bg-transparent"
                title="ជ្រើសរើសពណ៌បន្ថែម"
              />
            </div>

            {/* Stroke Width Slider */}
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-600">ទំហំប៊ិច ({strokeWidth}px)៖</span>
              <input
                type="range"
                min="2"
                max="40"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                className="w-24 sm:w-32 accent-amber-800 cursor-pointer"
              />
            </div>

            {/* Background Style Switcher */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] font-bold text-slate-500 px-1">ផ្ទៃ៖</span>
              <button
                onClick={() => handleBgChange('white')}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  bgType === 'white' ? 'bg-amber-800 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                សសុទ្ធ
              </button>
              <button
                onClick={() => handleBgChange('grid')}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  bgType === 'grid' ? 'bg-amber-800 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                ក្រឡា
              </button>
              <button
                onClick={() => handleBgChange('lined')}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  bgType === 'lined' ? 'bg-amber-800 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                បន្ទាត់
              </button>
              <button
                onClick={() => handleBgChange('chalkboard')}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  bgType === 'chalkboard' ? 'bg-emerald-950 text-emerald-200 font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                ក្ដារខៀន
              </button>
            </div>
          </div>

          {/* Row 3: Sticker Row if Sticker Tool Active */}
          {activeTool === 'sticker' && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1 bg-amber-50/80 p-2 rounded-2xl border border-amber-200">
              <span className="text-xs font-bold text-amber-900 shrink-0">ជ្រើសរើស Sticker៖</span>
              {STICKERS.map((stk) => (
                <button
                  key={stk}
                  onClick={() => setSelectedSticker(stk)}
                  className={`text-xl p-1.5 rounded-xl transition-all cursor-pointer hover:scale-125 ${
                    selectedSticker === stk ? 'bg-amber-300 ring-2 ring-amber-500 scale-110 shadow-xs' : 'hover:bg-amber-100'
                  }`}
                >
                  {stk}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Interactive Drawing Canvas Stage */}
        <div ref={containerRef} className="p-3 bg-[#EFECE6] flex items-center justify-center flex-1 overflow-hidden relative min-h-[400px]">
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="touch-none bg-white rounded-2xl shadow-lg border border-amber-200/90 cursor-crosshair max-w-full"
            style={{ width: canvasSize.width, height: canvasSize.height }}
          />

          {/* Bottom Floating Hint */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-slate-900/80 text-amber-100 text-[11px] px-3.5 py-1.5 rounded-full backdrop-blur-md pointer-events-none shadow-md flex items-center gap-2">
            <span>💡 ចុច និងអូសលើក្ដារដើម្បីគូររូប ឬបន្ថែមរូបបិទ</span>
            <span className="text-amber-400 font-mono text-[10px]">({canvasSize.width}x{canvasSize.height}px)</span>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-white border-t border-slate-200 text-center text-xs text-slate-500 font-medium flex items-center justify-between shrink-0">
          <span className="text-slate-600">🎨 ក្ដារគំនូរឌីជីថលសម្រាប់សិស្សថ្នាក់ទី៦ ធ្វើលំហាត់ ឬគូររូបកម្សាន្ត</span>
          <button
            onClick={onClose}
            className="text-amber-800 font-bold hover:underline cursor-pointer"
          >
            បិទផ្ទាំង
          </button>
        </div>
      </div>
    </div>
  );
};
