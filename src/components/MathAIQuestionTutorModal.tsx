import React, { useState } from 'react';
import { Question } from '../types';
import { X, Sparkles, Send, Bot, User, CheckCircle2, Lightbulb } from 'lucide-react';
import { MathFormattedText } from './MathFormattedText';

interface MathAIQuestionTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: Question;
  questionIndex: number;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
}

export const MathAIQuestionTutorModal: React.FC<MathAIQuestionTutorModalProps> = ({
  isOpen,
  onClose,
  question,
  questionIndex
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      sender: 'ai',
      text: `ជំរាបសួរ! ខ្ញុំជាគ្រូ AI គណិតវិទ្យា។ ប្អូនចង់ឲ្យខ្ញុំពន្យល់ពីរបៀបដោះស្រាយ ឬបកស្រាយគំនិតនៃសំណួរទី ${questionIndex + 1} នេះ?`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (userPromptText?: string) => {
    const textToSend = userPromptText || inputText;
    if (!textToSend.trim()) return;

    const newMessages: ChatMessage[] = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    if (!userPromptText) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectName: 'គណិតវិទ្យា ថ្នាក់ទី៦',
          prompt: `សំណួរគណិតវិទ្យា៖ "${question.text}".
ជម្រើសចម្លើយ៖ ${question.options.map((opt, i) => `${['ក', 'ខ', 'គ', 'ឃ'][i] || i + 1}. ${opt}`).join(', ')}.
ការបកស្រាយដែលមានស្រាប់៖ "${question.explanation}".
សំណួរសិស្ស៖ "${textToSend}".
សូមឆ្លើយជាភាសាខ្មែរ ដោយពន្យល់ពីរបៀបដោះស្រាយជាជំហានៗ (Step-by-step) ឲ្យងាយយល់បំផុតសម្រាប់សិស្សថ្នាក់ទី៦។`
        })
      });

      if (!response.ok) throw new Error('Failed to get AI response');
      const data = await response.json();

      setMessages((prev) => [...prev, { sender: 'ai', text: data.reply || 'សូមអភ័យទោស មានបញ្ហាបច្ចេកទេសបន្តិច។' }]);
    } catch (err) {
      // Fallback guided hint if offline or API delay
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `💡 **របៀបដោះស្រាយគណិតវិទ្យា៖**\n\n${question.explanation}\n\nប្អូនៗអាចផ្ទៀងផ្ទាត់រូបមន្ត និងប្រមាណវិធីតាមជំហានខាងលើបាន!`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full h-[85vh] max-h-[650px] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-amber-600 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/20 text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-moul">
                គ្រូ AI ពន្យល់សំណួរទី {questionIndex + 1}
              </h2>
              <p className="text-xs text-amber-100">ជំនួយដោះស្រាយ និងពន្យល់លំហាត់គណិតវិទ្យា</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-amber-100 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Question Summary Box */}
        <div className="p-3 bg-amber-50/80 border-b border-amber-200 text-xs text-slate-800 space-y-1">
          <span className="font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md">
            សំណួរ៖
          </span>
          <p className="font-semibold pt-1">
            <MathFormattedText text={question.text} />
          </p>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-amber-700 text-white rounded-tr-none'
                    : 'bg-white border border-slate-200/90 text-slate-800 shadow-xs rounded-tl-none'
                }`}
              >
                <MathFormattedText text={msg.text} />
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-700 text-white flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-amber-900 bg-amber-100/60 p-2.5 rounded-xl max-w-xs animate-pulse">
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
              <span>គ្រូ AI កំពុងគណនា និងរៀបចំការពន្យល់...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="p-2.5 bg-white border-t border-slate-100 flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => handleSendMessage('សូមពន្យល់របៀបដោះស្រាយជាជំហានៗ')}
            className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-semibold hover:bg-amber-200 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            ពន្យល់ជាជំហានៗ
          </button>
          <button
            onClick={() => handleSendMessage('តើត្រូវប្រើរូបមន្តអ្វីសម្រាប់លំហាត់នេះ?')}
            className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-semibold hover:bg-emerald-200 transition-colors cursor-pointer"
          >
            តើប្រើរូបមន្តអ្វី?
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="សួរសំណួរ ឬចម្ងល់បន្ថែមត្រង់នេះ..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-xl bg-amber-700 text-white font-bold disabled:opacity-50 hover:bg-amber-800 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
