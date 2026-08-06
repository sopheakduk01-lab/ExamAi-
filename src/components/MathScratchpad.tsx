import React, { useRef, useState, useEffect } from 'react';
import { X, Eraser, Pen, Trash2, RotateCcw, Download } from 'lucide-react';

interface MathScratchpadProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MathScratchpad: React.FC<MathScratchpadProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#1e293b'); // slate-800
  const [lineWidth, setLineWidth] = useState(3);
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions based on client rect
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = 400;
      
      // Draw light grid pattern for math notebook feel
      drawGrid(ctx, canvas.width, canvas.height);
    }
  }, [isOpen]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#f8fafc'; // slate-50
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#e2e8f0'; // slate-200
    ctx.lineWidth = 1;

    // Grid size 25px
    const gridSize = 25;
    ctx.beginPath();
    for (let x = 0; x <= width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.strokeStyle = isEraser ? '#f8fafc' : color;
    ctx.lineWidth = isEraser ? lineWidth * 4 : lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawGrid(ctx, canvas.width, canvas.height);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-emerald-50/70">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Pen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800 font-moul">
                ក្ដារខៀវ/ក្រដាសព្រៀងគណនា (Scratchpad)
              </h2>
              <p className="text-xs text-slate-500">គូសរូប គណនាប្រមាណវិធី ឬព្រៀងលេខដោយសេរី</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-3 bg-slate-100/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Color & Tool selector */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEraser(false)}
              className={`p-2 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${!isEraser ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'}`}
            >
              <Pen className="w-3.5 h-3.5" />
              <span>ប៊ិក</span>
            </button>

            <button
              onClick={() => setIsEraser(true)}
              className={`p-2 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${isEraser ? 'bg-amber-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'}`}
            >
              <Eraser className="w-3.5 h-3.5" />
              <span>ជ័រលុប</span>
            </button>

            {/* Colors */}
            {!isEraser && (
              <div className="flex items-center gap-1.5 ml-2 border-l border-slate-300 pl-2">
                {['#1e293b', '#2563eb', '#dc2626', '#16a34a'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-6 h-6 rounded-full transition-transform cursor-pointer border ${color === c ? 'scale-115 ring-2 ring-emerald-500 border-white' : 'border-slate-300'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Size & Clear */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
              <span>ទំហំ៖</span>
              <input
                type="range"
                min="1"
                max="8"
                value={lineWidth}
                onChange={(e) => setLineWidth(Number(e.target.value))}
                className="w-20 accent-emerald-600 cursor-pointer"
              />
            </div>

            <button
              onClick={clearCanvas}
              className="p-2 rounded-lg bg-rose-50 text-rose-700 font-bold hover:bg-rose-100 transition-colors flex items-center gap-1 cursor-pointer border border-rose-200"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>លុបទាំងអស់</span>
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="relative w-full h-[380px] bg-slate-50 touch-none flex items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full cursor-crosshair"
          />
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 font-medium">
          💡 ប្រើម្រាមដៃ ឬកណ្ដុរដើម្បីសរសេរព្រៀងលេខនៅលើក្ដារខៀវនេះបានភ្លាមៗ
        </div>
      </div>
    </div>
  );
};
