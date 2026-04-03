import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { Camera, Sparkles, Trash2, Printer, X, Zap } from 'lucide-react';

interface CanvasItem {
  id: string;
  type: 'text' | 'photo';
  content: string;
  x: number;
  y: number;
  rotation: number;
  date: string;
  time: string;
}

export const BeeperApp = React.forwardRef<HTMLDivElement, { onClose: () => void }>(({ onClose }, ref) => {
  const [text, setText] = useState('');
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [isPrinting, setIsPrinting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Merge refs
  const setRefs = (node: HTMLDivElement) => {
    containerRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const handlePrint = () => {
    if (!text.trim() || isPrinting) return;
    setIsPrinting(true);
    
    const now = new Date();
    const newItem: CanvasItem = {
      id: Math.random().toString(36).substring(7).toUpperCase(),
      type: 'text',
      content: text,
      x: Math.random() * Math.max(0, window.innerWidth - 400) + 50,
      y: Math.random() * Math.max(0, window.innerHeight / 2) + 50,
      rotation: Math.random() * 6 - 3,
      date: `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}`,
      time: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    };

    setItems([...items, newItem]);
    setText('');
    setTimeout(() => setIsPrinting(false), 1000);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const now = new Date();
        const newItem: CanvasItem = {
          id: Math.random().toString(36).substring(7).toUpperCase(),
          type: 'photo',
          content: event.target?.result as string,
          x: Math.random() * Math.max(0, window.innerWidth - 300) + 100,
          y: Math.random() * Math.max(0, window.innerHeight / 2) + 50,
          rotation: Math.random() * 20 - 10,
          date: `${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}`,
          time: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
        };
        setItems([...items, newItem]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed inset-0 z-[999] bg-[#f0f0f0] overflow-hidden flex flex-col font-mono"
      style={{
        backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}
      ref={setRefs}
    >
      {/* Top Bar */}
      <div className="absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 sm:px-10 py-3 sm:py-4 rounded-2xl shadow-sm border border-stone-200 flex flex-col items-center z-10 w-[90vw] sm:w-auto max-w-md">
        <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
          <Zap className="text-orange-500 fill-orange-500 w-5 h-5 sm:w-7 sm:h-7" />
          <h1 className="text-2xl sm:text-4xl font-bold tracking-widest text-stone-800 font-serif">ZHANGZHI</h1>
        </div>
        <p className="text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.4em] text-stone-400 uppercase text-center">Digital Pagination System</p>
      </div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-sm border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:shadow-md transition-all z-10"
      >
        <X size={20} />
      </button>

      {/* Canvas Area */}
      <div className="flex-1 relative w-full h-full">
        <AnimatePresence>
          {items.map((item) => (
            <DraggableItem key={item.id} item={item} containerRef={containerRef} />
          ))}
        </AnimatePresence>
      </div>

      {/* The Beeper Device */}
      <motion.div 
        drag
        dragControls={dragControls}
        dragConstraints={containerRef}
        dragMomentum={false}
        dragListener={false}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
        className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 w-[calc(100vw-2rem)] max-w-[480px]"
      >
        <div className="bg-[#8cc63f] p-4 sm:p-6 rounded-3xl sm:rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.2),inset_0_4px_10px_rgba(255,255,255,0.5),inset_0_-4px_10px_rgba(0,0,0,0.2)] w-full border border-[#7ab32e]">
          
          {/* Drag Handle */}
          <div className="w-full flex justify-center mb-2 cursor-grab active:cursor-grabbing" style={{ touchAction: "none" }} onPointerDown={(e) => dragControls.start(e)}>
            <div className="w-16 h-1.5 bg-[#5a8222]/50 rounded-full"></div>
          </div>

          {/* Device Header */}
          <div className="flex justify-between items-center mb-4 px-2 text-[#5a8222] text-[10px] font-bold tracking-wider">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)] animate-pulse"></div>
              AUTO-FEED
            </div>
            <div className="flex items-center gap-4">
              <span>SERIES 9000</span>
              <div className="flex items-center gap-1">
                <div className="w-1 h-2 bg-[#5a8222]"></div>
                <div className="w-1 h-3 bg-[#5a8222]"></div>
                <div className="w-1 h-4 bg-[#5a8222]"></div>
                <div className="w-1 h-5 bg-[#5a8222]"></div>
                <span className="ml-1">5G</span>
              </div>
            </div>
          </div>

          {/* Screen */}
          <div className="bg-[#1a2e1a] rounded-xl p-4 mb-6 shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] border-2 border-[#0d170d] relative h-32">
            <div className="text-[#39ff14] text-xs opacity-50 mb-2">compose_mode</div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="TYPE MESSAGE..."
              className="w-full h-16 bg-transparent text-[#39ff14] placeholder-[#39ff14]/30 focus:outline-none resize-none font-mono text-base sm:text-lg leading-relaxed uppercase"
              spellCheck={false}
            />
            <div className="absolute right-4 top-4 w-2 h-4 bg-[#39ff14] animate-pulse"></div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-1 sm:px-2">
            <div className="flex gap-2 sm:gap-3">
              <button onClick={() => fileInputRef.current?.click()} className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_2px_5px_rgba(255,255,255,0.2)] hover:scale-95 transition-transform">
                <Camera size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button onClick={() => setText(text + '✨ ')} className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_2px_5px_rgba(255,255,255,0.2)] hover:scale-95 transition-transform">
                <Sparkles size={18} className="sm:w-5 sm:h-5" />
              </button>
              <button onClick={() => setText('')} className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_2px_5px_rgba(255,255,255,0.2)] hover:scale-95 transition-transform">
                <Trash2 size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:flex flex-col gap-1.5">
                <div className="w-8 h-1 bg-[#7ab32e] rounded-full"></div>
                <div className="w-8 h-1 bg-[#7ab32e] rounded-full"></div>
                <div className="w-8 h-1 bg-[#7ab32e] rounded-full"></div>
              </div>
              <button 
                onClick={handlePrint}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-[#ff5500] rounded-xl flex items-center gap-2 text-white font-bold tracking-wider text-sm sm:text-base shadow-[0_4px_10px_rgba(255,85,0,0.4),inset_0_2px_5px_rgba(255,255,255,0.3)] hover:scale-95 transition-transform active:shadow-inner"
              >
                PRINT <Printer size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <span className="bg-[#1a1a1a] text-[#8cc63f] text-[8px] font-bold px-3 py-1 rounded-sm tracking-widest">MOTOROLA</span>
          </div>
        </div>
      </motion.div>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handlePhotoUpload} 
        accept="image/*" 
        className="hidden" 
      />
    </motion.div>
  );
});

const DraggableItem = React.forwardRef<HTMLDivElement, { item: CanvasItem, containerRef: React.RefObject<HTMLDivElement> }>(({ item, containerRef }, ref) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    if (item.type === 'text') {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(item.content.substring(0, i));
        i++;
        if (i > item.content.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [item]);

  return (
    <motion.div
      ref={ref}
      drag
      dragConstraints={containerRef}
      dragMomentum={false}
      initial={{ scale: 0.5, opacity: 0, y: window.innerHeight - item.y, x: window.innerWidth / 2 - item.x }}
      animate={{ scale: 1, opacity: 1, y: 0, x: 0, rotate: item.rotation }}
      whileDrag={{ scale: 1.05, zIndex: 50, cursor: 'grabbing', rotate: 0 }}
      className="absolute cursor-grab shadow-xl"
      style={{ left: item.x, top: item.y }}
    >
      {item.type === 'text' ? (
        <div className="bg-[#f8f9fa] w-80 min-h-[160px] relative shadow-[0_10px_30px_rgba(0,0,0,0.1)]">
          {/* Jagged top edge */}
          <div className="absolute -top-2 left-0 w-full h-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDEwIDUsMCAxMCwxMCIgZmlsbD0iI2Y4ZjlmYSIvPjwvc3ZnPg==')] bg-repeat-x"></div>
          
          <div className="p-6">
            <div className="text-[10px] text-stone-400 font-bold tracking-widest mb-6">PAGER</div>
            <div className="flex justify-between text-xs text-stone-500 mb-4 border-b border-stone-200 pb-2">
              <span>NO. {item.id}</span>
              <span>{item.date} {item.time}</span>
            </div>
            <div className="text-stone-800 text-lg leading-relaxed whitespace-pre-wrap min-h-[60px] font-sans">
              {displayedText}
              {displayedText.length < item.content.length && <span className="inline-block w-2 h-4 bg-stone-400 animate-pulse ml-1"></span>}
            </div>
            <div className="mt-8 pt-2 border-t border-stone-200 flex justify-between items-center">
              <div className="flex gap-1">
                <div className="w-8 h-0.5 bg-stone-300"></div>
                <div className="w-4 h-0.5 bg-stone-300"></div>
              </div>
              <span className="text-[8px] text-stone-400 tracking-widest">END OF TRANSMISSION</span>
            </div>
          </div>
          
          {/* Jagged bottom edge */}
          <div className="absolute -bottom-2 left-0 w-full h-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDAgNSwxMCAxMCwwIiBmaWxsPSIjZjhmOWZhIi8+PC9zdmc+')] bg-repeat-x"></div>
        </div>
      ) : (
        <div className="bg-white p-3 pb-12 shadow-[0_10px_30px_rgba(0,0,0,0.15)] relative w-64">
          {/* Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#f4f4e0]/90 rotate-[-2deg] shadow-sm backdrop-blur-sm"></div>
          <div className="absolute -top-2 right-4 w-12 h-5 bg-[#f4f4e0]/90 rotate-[15deg] shadow-sm backdrop-blur-sm"></div>
          
          <div className="w-full aspect-square bg-stone-100 overflow-hidden border border-stone-100">
            <img src={item.content} alt="Uploaded" className="w-full h-full object-cover pointer-events-none" />
          </div>
        </div>
      )}
    </motion.div>
  );
});
