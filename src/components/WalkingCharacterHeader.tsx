import React, { useState, useEffect } from 'react';
import { BookOpen, Home, Sparkles } from 'lucide-react';

interface WalkingCharacterHeaderProps {
  onHomeClick?: () => void;
}

export const WalkingCharacterHeader: React.FC<WalkingCharacterHeaderProps> = ({ onHomeClick }) => {
  const [position, setPosition] = useState<number>(20); 
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [isEnteringHouse, setIsEnteringHouse] = useState(false);
  const [message, setMessage] = useState('អានសៀវភៅ 📚');

  useEffect(() => {
    if (isEnteringHouse) return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        if (direction === 'right') {
          if (prev >= 72) {
            setDirection('left');
            setMessage('ដើរត្រឡប់វិញ 🚶‍♂️');
            return 72;
          }
          return prev + 0.5;
        } else {
          if (prev <= 10) {
            setDirection('right');
            setMessage('អានសៀវភៅ 📚');
            return 10;
          }
          return prev - 0.5;
        }
      });
    }, 120);

    return () => clearInterval(interval);
  }, [direction, isEnteringHouse]);

  const handleCharacterClick = () => {
    if (isEnteringHouse) return;
    setIsEnteringHouse(true);
    setMessage('រត់ចូលផ្ទះ! 🏡🏃‍♂️');

    // Run towards the house on the right (78%)
    setDirection('right');
    setPosition(78);

    setTimeout(() => {
      if (onHomeClick) {
        onHomeClick();
      }
      setTimeout(() => {
        setIsEnteringHouse(false);
        setPosition(20);
        setMessage('អានសៀវភៅ 📚');
      }, 1200);
    }, 900);
  };

  return (
    <div className="flex-1 relative h-11 flex items-center overflow-visible px-2 mx-1 sm:mx-3 bg-indigo-50/60 dark:bg-slate-800/50 rounded-2xl border border-indigo-100 dark:border-slate-700/60 shadow-inner">
      {/* Walking Path Line */}
      <div className="absolute inset-x-3 h-1.5 bg-indigo-200/80 dark:bg-indigo-900/60 bottom-1 rounded-full overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-emerald-400 via-indigo-500 to-amber-500 opacity-80 animate-pulse" />
      </div>

      {/* House Icon at the right end */}
      <div 
        onClick={handleCharacterClick}
        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500 text-white border-2 border-white dark:border-slate-900 shadow-md cursor-pointer hover:scale-110 active:scale-95 transition-transform z-10"
        title="ប៉ះដើម្បីចូលផ្ទះ!"
      >
        <Home className="w-4 h-4 animate-bounce" />
        <span className="text-[10px] font-bold font-moul tracking-tight whitespace-nowrap">ផ្ទះ</span>
      </div>

      {/* Walking Character Container */}
      <div
        onClick={handleCharacterClick}
        style={{ left: `${position}%` }}
        className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-1 cursor-pointer transition-all duration-100 z-20 group ${
          isEnteringHouse ? 'scale-125 animate-bounce' : 'hover:scale-110'
        }`}
        title="ប៉ះដើម្បីឱ្យតួអង្គរត់ចូលផ្ទះ!"
      >
        {/* Character Avatar */}
        <div className={`w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-600 to-indigo-600 text-white flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900 ${
          direction === 'left' ? 'scale-x-[-1]' : ''
        }`}>
          <span className="text-sm">🧑‍🎓</span>
        </div>

        {/* Mini Book */}
        <div className="w-4 h-4 rounded-md bg-amber-400 text-slate-900 flex items-center justify-center shadow-md text-[9px] font-extrabold border border-amber-200">
          📖
        </div>
      </div>
    </div>
  );
};
