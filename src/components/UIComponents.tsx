
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { AtSign, Github, MessageCircle, QrCode, X, Trophy, Award, Star, Maximize2, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut, RotateCcw, MapPin, Camera, Calendar } from 'lucide-react';

export const AuthorCard = ({ name, role, icon: Icon, delayIdx, color, href, onClick, lang }: { name: string, role: string, icon: any, delayIdx: number, color: string, href?: string, onClick?: () => void, lang: 'zh' | 'en' }) => {
  const Component = onClick ? motion.div : motion.a;
  
  return (
    <Component 
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delayIdx * 0.1, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5, scale: 1.02, boxShadow: "0 15px 30px -10px rgba(0,0,0,0.1)" }}
      className="flex flex-col group p-4 bg-white rounded-xl border border-stone-100 shadow-sm transition-all duration-500 w-full cursor-pointer overflow-hidden relative"
    >
      {/* Border Beam Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-[-2px] rounded-xl bg-gradient-to-r from-transparent via-nobel-gold/40 to-transparent animate-border-beam"></div>
      </div>

      {/* Background Tint */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${color} opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
      
      <div className="flex items-center gap-4 relative z-10">
        <div className={`p-2.5 rounded-xl ${color} text-white shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          <Icon size={20} className="relative z-10" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-stone-900 group-hover:text-nobel-gold transition-colors duration-300 truncate">{name}</h3>
          <p className="text-xs text-stone-500 font-medium tracking-tight truncate mt-0.5">{role}</p>
        </div>
      </div>
    </Component>
  );
};

export const HonorsModal = ({ isOpen, onClose, lang }: { isOpen: boolean, onClose: () => void, lang: 'zh' | 'en' }) => {
  if (typeof document === 'undefined') return null;

  const honors = lang === 'zh' ? [
    { title: '校级一等奖学金', icon: '•' },
    { title: '校级二等奖学金', icon: '•' },
    { title: '校级学业进步奖学金', icon: '•' },
    { title: '校级学科竞赛奖学金', icon: '•' },
    { title: '校级社会实践先进个人（仅10人）', icon: '•' },
    { title: '校级三好学生', icon: '•' },
    { title: '校级社团风采节义务家教优秀教员', icon: '•' },
  ] : [
    { title: 'University 1st Prize Scholarship', icon: '•' },
    { title: 'University 2nd Prize Scholarship', icon: '•' },
    { title: 'University Academic Progress Scholarship', icon: '•' },
    { title: 'University Subject Competition Scholarship', icon: '•' },
    { title: 'University Advanced Individual in Social Practice (Top 10)', icon: '•' },
    { title: 'University Merit Student', icon: '•' },
    { title: 'University Outstanding Volunteer Tutor', icon: '•' },
  ];

  const competitions = lang === 'zh' ? [
    { tag: '全国一等奖', title: '“云泽杯”创新创业模拟大赛' },
    { tag: '全国二等奖', title: '商挑文旅与会展调研大赛' },
    { tag: '全国三等奖', title: '“正大杯”市场调研与分析大赛' },
    { tag: '湖南赛区二等奖', title: '商挑文旅与会展调研大赛' },
    { tag: '湖南赛区二等奖', title: '东方财富杯模拟炒股大赛' },
    { tag: '校级一等奖', title: '长沙理工大学思政研究性学习大赛' },
  ] : [
    { tag: 'National 1st Prize', title: '"Yunze Cup" Innovation & Entrepreneurship Simulation' },
    { tag: 'National 2nd Prize', title: 'Business Challenge Cultural Tourism & Exhibition Research' },
    { tag: 'National 3rd Prize', title: '"Zhengda Cup" Market Research & Analysis Competition' },
    { tag: 'Hunan Provincial 2nd Prize', title: 'Business Challenge Cultural Tourism & Exhibition Research' },
    { tag: 'Hunan Provincial 2nd Prize', title: 'Eastmoney Cup Mock Stock Trading Competition' },
    { tag: 'University 1st Prize', title: 'CSUST Ideological & Political Research Learning' },
  ];

  return createPortal(
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md" onClick={onClose}></div>
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={isOpen ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        className="bg-white rounded-3xl w-full max-w-5xl h-[90vh] sm:h-[85vh] relative z-10 shadow-2xl border border-stone-100 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-5 sm:p-8 border-b border-stone-100 flex justify-between items-center bg-white sticky top-0 z-20">
          <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            {lang === 'zh' ? '在校荣誉' : 'School Honors'}
          </h2>
          <button onClick={onClose} className="p-2 sm:p-3 bg-stone-100 rounded-full text-stone-400 hover:text-stone-900 transition-colors">
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 md:p-12 custom-scrollbar">
          {/* School Honors List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-12 gap-y-4 mb-12 sm:mb-16">
            {honors.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-lg text-stone-600 font-medium group">
                <div className="mt-0.5 p-1.5 bg-stone-100 rounded-lg text-stone-400 group-hover:text-nobel-gold group-hover:bg-nobel-gold/10 transition-colors">
                  <Award size={16} />
                </div>
                <span className="group-hover:text-stone-900 transition-colors">{item.title}</span>
              </div>
            ))}
          </div>

          {/* Competition Awards Section */}
          <div className="mb-12">
            <h3 className="text-2xl sm:text-4xl font-bold text-stone-900 mb-6 sm:mb-10 tracking-tight">
              {lang === 'zh' ? '竞赛奖项' : 'Competition Awards'}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitions.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-stone-50/50 p-6 rounded-2xl border border-stone-100 hover:border-nobel-gold/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="inline-block px-3 py-1 bg-stone-900 text-white text-[10px] font-bold tracking-widest uppercase rounded-md group-hover:bg-nobel-gold transition-colors duration-300 shadow-sm hover:shadow-md cursor-pointer"
                    >
                      {item.tag}
                    </motion.div>
                    <Star size={18} className="text-stone-300 group-hover:text-nobel-gold transition-colors duration-300" />
                  </div>
                  <h4 className="text-xl font-bold text-stone-800 leading-tight group-hover:text-stone-900 transition-colors">
                    {item.title}
                  </h4>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export const QRModal = ({ isOpen, onClose, title, qrUrl, lang }: { isOpen: boolean, onClose: () => void, title: string, qrUrl: string, lang: 'zh' | 'en' }) => {
  if (typeof document === 'undefined') return null;
  
  return createPortal(
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-2xl border border-stone-100"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900 transition-colors">
          <X size={20} />
        </button>
        <h3 className="text-xl font-serif font-bold text-stone-900 mb-6 text-center">{title}</h3>
        <div className="aspect-square bg-stone-50 rounded-2xl mb-6 p-4 border border-stone-100 flex items-center justify-center">
          {qrUrl ? (
            <img 
              src={qrUrl} 
              alt="QR Code" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          ) : (
            <div className="text-stone-300">
              <QrCode size={48} className="opacity-20" />
            </div>
          )}
        </div>
        <p className="text-sm text-stone-500 text-center">{lang === 'zh' ? '请使用微信扫一扫' : 'Please scan with WeChat'}</p>
      </motion.div>
    </div>,
    document.body
  );
};

export const ImageModal = ({ isOpen, onClose, images, currentIndex, setCurrentIndex, lang, metadata }: { 
  isOpen: boolean, 
  onClose: () => void, 
  images: string[], 
  currentIndex: number, 
  setCurrentIndex: (idx: number) => void,
  lang: 'zh' | 'en',
  metadata?: any[]
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPinchDistance = useRef<number | null>(null);

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    resetZoom();
  }, [currentIndex, resetZoom, isOpen]);

  if (!isOpen) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale > 1) return;
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale > 1) return;
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = -e.deltaY;
      const factor = 0.01;
      const newScale = Math.min(Math.max(scale + delta * factor, 1), 5);
      setScale(newScale);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      lastPinchDistance.current = distance;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastPinchDistance.current !== null) {
      const distance = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      const delta = distance - lastPinchDistance.current;
      const factor = 0.01;
      const newScale = Math.min(Math.max(scale + delta * factor, 1), 5);
      setScale(newScale);
      lastPinchDistance.current = distance;
      if (newScale === 1) setPosition({ x: 0, y: 0 });
    }
  };

  const handleTouchEnd = () => {
    lastPinchDistance.current = null;
  };

  const currentMetadata = metadata && metadata[currentIndex];

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#F9F8F4]/95 backdrop-blur-md transition-all duration-300 overflow-hidden"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0" 
        onClick={onClose}
      >
        {/* Atmospheric background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-nobel-gold/10 blur-[180px] rounded-full pointer-events-none"></div>
      </motion.div>
      
      {/* Top Bar Controls */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isDragging ? 0 : 1, 
          y: isDragging ? -20 : 0,
          pointerEvents: isDragging ? 'none' : 'auto'
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-0 left-0 right-0 p-8 md:p-12 flex justify-between items-center z-[210]"
      >
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-nobel-gold text-[10px] font-bold tracking-[0.5em] uppercase mb-1">Portfolio Archive</span>
            <div className="flex items-center gap-4">
              <span className="text-stone-900 text-3xl font-serif leading-none">{currentIndex + 1}</span>
              <div className="w-12 h-px bg-stone-200"></div>
              <span className="text-stone-400 text-3xl font-serif leading-none">{images.length}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className={`p-4 rounded-2xl transition-all backdrop-blur-xl border group flex items-center gap-3 ${showDetails ? 'bg-nobel-gold text-white border-nobel-gold shadow-lg shadow-nobel-gold/20' : 'bg-stone-100 text-stone-400 hover:text-stone-900 border-stone-200'}`}
          >
            <Maximize2 size={20} className={showDetails ? 'rotate-45' : ''} />
            <span className="text-[10px] font-bold tracking-widest uppercase hidden md:block">{showDetails ? 'Hide Info' : 'Show Info'}</span>
          </button>
          <button 
            onClick={onClose} 
            className="p-4 bg-stone-100 hover:bg-stone-200 text-stone-400 hover:text-stone-900 rounded-2xl transition-all backdrop-blur-xl border border-stone-200 group flex items-center gap-3"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
            <span className="text-[10px] font-bold tracking-widest uppercase hidden md:block">Close</span>
          </button>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      {images.length > 1 && scale === 1 && !isDragging && (
        <>
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handlePrev} 
            className="absolute left-8 top-1/2 -translate-y-1/2 z-[210] p-6 bg-stone-100 hover:bg-stone-200 text-stone-400 hover:text-stone-900 rounded-full transition-all backdrop-blur-xl border border-stone-200 group hidden md:flex shadow-sm"
          >
            <ChevronLeft size={40} strokeWidth={1} className="group-hover:-translate-x-1 transition-transform duration-500" />
          </motion.button>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleNext} 
            className="absolute right-8 top-1/2 -translate-y-1/2 z-[210] p-6 bg-stone-100 hover:bg-stone-200 text-stone-400 hover:text-stone-900 rounded-full transition-all backdrop-blur-xl border border-stone-200 group hidden md:flex shadow-sm"
          >
            <ChevronRight size={40} strokeWidth={1} className="group-hover:translate-x-1 transition-transform duration-500" />
          </motion.button>
        </>
      )}

      {/* Main Content Area */}
      <div className="relative w-full h-full flex flex-col md:flex-row-reverse items-center justify-center p-4 md:p-16 lg:p-24 gap-8 md:gap-16 lg:gap-24 overflow-hidden">
        {/* Image Display */}
        <div 
          ref={containerRef}
          className={`relative flex-1 h-full flex items-center justify-center transition-all duration-700 ${showDetails && currentMetadata ? 'md:translate-x-[12%]' : ''}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ 
                opacity: 1, 
                scale: scale, 
                x: position.x, 
                y: position.y,
                transition: { 
                  scale: { type: "spring", damping: 25, stiffness: 200 },
                  opacity: { duration: 0.4 },
                  y: { type: "spring", damping: 20, stiffness: 100 }
                }
              }}
              exit={{ opacity: 0, scale: 1.1, y: -30 }}
              drag={scale > 1}
              dragConstraints={containerRef}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(_, info) => {
                setIsDragging(false);
                setPosition({ x: info.offset.x + position.x, y: info.offset.y + position.y });
              }}
              className="relative max-w-full max-h-full flex flex-col items-center cursor-grab active:cursor-grabbing"
            >
              <div className="relative group/img">
                <img 
                  src={images[currentIndex]} 
                  alt={currentMetadata?.title || `Image ${currentIndex + 1}`} 
                  className="max-w-full max-h-[55vh] md:max-h-[80vh] object-contain rounded-[2rem] md:rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-stone-200/50 select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${images[currentIndex].split('/').pop()}/1600/1200`;
                  }}
                />
                <div className="absolute inset-0 rounded-[2rem] md:rounded-3xl ring-1 ring-inset ring-stone-200/30 pointer-events-none"></div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Rich Metadata Panel */}
        <AnimatePresence>
          {showDetails && currentMetadata && scale === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: -80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -80, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 150 }}
              className="w-full md:w-[380px] lg:w-[450px] bg-white/95 backdrop-blur-3xl border border-stone-100 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 lg:p-12 flex flex-col gap-6 md:gap-10 z-[210] shadow-[0_30px_100px_-10px_rgba(0,0,0,0.1)] max-h-[35vh] md:max-h-none overflow-y-auto md:overflow-visible scrollbar-hide"
            >
              <div>
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <span className="px-3 md:px-4 py-1 md:py-1.5 bg-nobel-gold/10 text-nobel-gold text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase rounded-full border border-nobel-gold/20">
                    {currentMetadata.tag || 'ARCHIVE'}
                  </span>
                  <div className="flex items-center gap-2 text-stone-400 text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase">
                    <Calendar size={12} />
                    <span>{currentMetadata.date}</span>
                  </div>
                </div>
                <h3 className="text-stone-900 text-2xl md:text-4xl font-serif mb-3 md:mb-6 leading-tight tracking-tight">{currentMetadata.title}</h3>
                <p className="text-stone-600 text-sm md:text-base leading-relaxed font-medium">
                  {currentMetadata.desc}
                </p>
              </div>

              <div className="hidden md:block h-px bg-gradient-to-r from-stone-200 via-stone-100 to-transparent w-full"></div>

              <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-8">
                {currentMetadata.location && (
                  <div className="flex items-center gap-3 md:gap-5 group">
                    <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-stone-50 flex items-center justify-center text-nobel-gold border border-stone-100 group-hover:bg-nobel-gold/10 group-hover:border-nobel-gold/20 transition-all duration-500">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="text-stone-400 text-[7px] md:text-[9px] font-mono font-bold tracking-[0.3em] uppercase block mb-0.5 md:mb-1">Location</span>
                      <span className="text-stone-900 text-xs md:text-base font-medium tracking-tight truncate max-w-[120px] md:max-w-none">{currentMetadata.location}</span>
                    </div>
                  </div>
                )}
                {currentMetadata.camera && (
                  <div className="flex items-center gap-3 md:gap-5 group">
                    <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-stone-50 flex items-center justify-center text-nobel-gold border border-stone-100 group-hover:bg-nobel-gold/10 group-hover:border-nobel-gold/20 transition-all duration-500">
                      <Camera size={18} />
                    </div>
                    <div>
                      <span className="text-stone-400 text-[7px] md:text-[9px] font-mono font-bold tracking-[0.3em] uppercase block mb-0.5 md:mb-1">Equipment</span>
                      <span className="text-stone-900 text-xs md:text-base font-medium tracking-tight truncate max-w-[120px] md:max-w-none">{currentMetadata.camera}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-4 md:pt-10 flex gap-3 md:gap-4">
                <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = images[currentIndex];
                    link.download = `image-${currentIndex + 1}.jpg`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="flex-1 py-3.5 md:py-5 bg-stone-900 text-white rounded-xl md:rounded-[1.5rem] text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-nobel-gold transition-all duration-700 flex items-center justify-center gap-2 md:gap-3 shadow-xl hover:shadow-nobel-gold/20"
                >
                  <Download size={18} />
                  {lang === 'zh' ? '下载' : 'Download'}
                </button>
                <button 
                  onClick={resetZoom}
                  className="w-11 h-11 md:w-16 md:h-16 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-xl md:rounded-[1.5rem] border border-stone-200 flex items-center justify-center transition-all duration-500 group"
                >
                  <RotateCcw size={20} className="group-hover:rotate-[-180deg] transition-transform duration-700" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Zoom Controls (Floating) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isDragging ? 0 : 1, 
          y: isDragging ? 20 : 0,
          pointerEvents: isDragging ? 'none' : 'auto'
        }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-10 right-10 z-[210] flex flex-col gap-3"
      >
        <button 
          onClick={() => setScale(Math.min(scale + 0.5, 5))}
          className="p-4 bg-stone-100 hover:bg-stone-200 text-stone-400 hover:text-stone-900 rounded-2xl backdrop-blur-xl border border-stone-200 transition-all shadow-sm"
        >
          <ZoomIn size={20} />
        </button>
        <button 
          onClick={() => {
            const newScale = Math.max(scale - 0.5, 1);
            setScale(newScale);
            if (newScale === 1) setPosition({ x: 0, y: 0 });
          }}
          className="p-4 bg-stone-100 hover:bg-stone-200 text-stone-400 hover:text-stone-900 rounded-2xl backdrop-blur-xl border border-stone-200 transition-all shadow-sm"
        >
          <ZoomOut size={20} />
        </button>
        {scale > 1 && (
          <button 
            onClick={resetZoom}
            className="p-4 bg-nobel-gold text-white rounded-2xl shadow-lg shadow-nobel-gold/20 transition-all"
          >
            <RotateCcw size={20} />
          </button>
        )}
      </motion.div>

      {/* Mobile Swipe Indicators */}
      {scale === 1 && !showDetails && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
          {images.map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'bg-stone-900 w-4' : 'bg-stone-200'}`}
            />
          ))}
        </div>
      )}
    </div>,
    document.body
  );
};
