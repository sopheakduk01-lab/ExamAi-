import React, { useState } from 'react';
import { Subject } from '../types';
import { Sparkles, Send, Bot, User, RefreshCw, Lightbulb, CheckCircle2 } from 'lucide-react';

interface AITutorViewProps {
  subject: Subject;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export const AITutorView: React.FC<AITutorViewProps> = ({ subject }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: `សួស្តីប្អូនៗសិស្សថ្នាក់ទី៦! ខ្ញុំជាគ្រូជំនួយ AI សម្រាប់មុខវិជ្ជា «${subject.nameKhmer}»។ តើប្អូនចង់ឲ្យខ្ញុំពន្យល់មេរៀន ឬផ្តល់លំហាត់ប្រឡងអនុវត្តន៍បន្ថែមទេ?`,
      time: new Date().toLocaleTimeString('km-KH', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const prompts = [
    `ពន្យល់រូបមន្ត និងវិធីដោះស្រាយលំហាត់ «${subject.nameKhmer}»`,
    `សូមផ្តល់លំហាត់ប្រឡងគំរូ ៣ សម្រាប់ថ្នាក់ទី៦`,
    `តើគន្លឹះអ្វីខ្លះដើម្បីទទួលបានពិន្ទុខ្ពស់ក្នុងមុខវិជ្ជា ${subject.nameKhmer}?`
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString('km-KH', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // Simulated intelligent responses tailored for Grade 6 Cambodian Ministry Exam
    setTimeout(() => {
      let aiResponseText = '';
      if (text.includes('លំហាត់') || text.includes('ប្រឡងគំរូ')) {
        aiResponseText = ` voici គំរូលំហាត់ត្រៀមប្រឡង ${subject.nameKhmer} ថ្នាក់ទី៦៖\n\n១. លំហាត់៖ តើដំណាក់កាលណាខ្លះជាចំណុចសំខាន់ក្នុងមេរៀននេះ?\n👉 វិធីដោះស្រាយ៖ ត្រូវពិនិត្យមើលទ្រឹស្តីបទ និងច្បាប់កត់សម្គាល់ដែលមានក្នុងមេរៀនសង្ខេប រួចអនុវត្តតាមរូបមន្តផ្ទាល់។\n\nប្អូនអាចព្យាយាមដោះស្រាយ រួចផ្ញើចម្លើយមកខ្ញុំដើម្បីពិនិត្យបាន!`;
      } else if (text.includes('ពន្យល់') || text.includes('រូបមន្ត')) {
        aiResponseText = `ដើម្បីយល់ច្បាស់ពីមេរៀន ${subject.nameKhmer} ថ្នាក់ទី៦ ប្អូនត្រូវចាំចំណុចគន្លឹះចំនួន ៣ ៖\n\n១. អានមេរៀនសង្ខេបឲ្យបាន ២-៣ ដង\n២. ចងចាំរូបមន្ត ឬពាក្យគន្លឹះ\n៣. ធ្វើវិញ្ញាសាអនុវត្តន៍ឲ្យបានញឹកញាប់`;
      } else {
        aiResponseText = `សំណួរល្អណាស់! ចំពោះមុខវិជ្ជា ${subject.nameKhmer} ថ្នាក់ទី៦ ការប្រឡងតែងតែផ្តោតលើចំណេះដឹងមូលដ្ឋាន និងការអនុវត្តជាក់ស្តែង។ តើប្អូនចង់រៀនបន្ថែមលើជំពូកណាដែរ?`;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        time: new Date().toLocaleTimeString('km-KH', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col h-[520px]">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-4">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
          <Bot className="w-6 h-6 text-amber-700" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-1.5">
            គ្រូសាកល្បង AI ថ្នាក់ទី៦ - {subject.nameKhmer}
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
          </h3>
          <p className="text-xs text-slate-500">ឆ្លើយសំណួរ និងពន្យល់លំហាត់ថ្នាក់ទី៦ ពេញ ២៤/៧</p>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-2 no-scrollbar">
        {prompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-medium whitespace-nowrap cursor-pointer shrink-0 transition-colors"
          >
            💡 {p}
          </button>
        ))}
      </div>

      {/* Message Chat Container */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${m.sender === 'user' ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-700'}`}>
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-700" />}
            </div>

            <div className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${m.sender === 'user' ? 'bg-amber-800 text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/60'}`}>
              <p>{m.text}</p>
              <span className={`block text-[10px] mt-1.5 opacity-70 ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>
                {m.time}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 p-3 rounded-2xl w-fit">
            <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
            <span>គ្រូកំពុងរៀបចំការបកស្រាយ...</span>
          </div>
        )}
      </div>

      {/* Input box */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="សួរ ឬបញ្ចូលលំហាត់ដែលមិនយល់ត្រង់នេះ..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        />
        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim() || isLoading}
          className="p-2.5 rounded-xl bg-amber-700 text-white hover:bg-amber-800 disabled:opacity-40 transition-colors cursor-pointer"
          id="btn-send-ai-chat"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
