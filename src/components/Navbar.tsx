import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  lang: 'zh' | 'en';
  setLang: (lang: 'zh' | 'en') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/articles', label: lang === 'zh' ? '文章' : 'Articles' },
    { path: '/about', label: lang === 'zh' ? '关于' : 'About' },
  ];

  return (
    <motion.nav 
      initial={false}
      animate={{
        padding: scrolled ? "0.75rem 1rem" : "1rem 1.5rem",
        backgroundColor: scrolled ? "rgba(249, 248, 244, 0.85)" : "rgba(249, 248, 244, 0)",
        boxShadow: scrolled ? "0 10px 30px -10px rgba(0,0,0,0.05)" : "none",
        borderBottom: scrolled ? "1px solid rgba(197, 160, 89, 0.15)" : "1px solid rgba(197, 160, 89, 0)",
      }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl flex justify-between items-center transition-all duration-700 md:px-12"
    >
      <Link to="/" className="flex items-center gap-4 group relative">
        <Logo scrolled={scrolled} />
        <div className="flex flex-col">
          <span className="text-xl md:text-2xl font-serif font-bold tracking-[0.4em] uppercase group-hover:text-nobel-gold transition-all duration-500 leading-none">
            ZHANGZHI
          </span>
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: scrolled ? 0 : 0.4, x: scrolled ? -10 : 0 }}
            className="text-[8px] font-bold tracking-[0.6em] uppercase text-stone-400 mt-1"
          >
            Creative Portfolio
          </motion.span>
        </div>
      </Link>

      <div className="flex items-center gap-4 sm:gap-10">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-[11px] sm:text-[13px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-all duration-500 relative group ${
                isActive ? 'text-nobel-gold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {link.label}
              
              {/* Active Indicator Dot */}
              {isActive && (
                <motion.div 
                  layoutId="navActiveDot"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-nobel-gold rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              {/* Hover Underline */}
              <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-nobel-gold/30 transition-all duration-500 ${
                isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
              }`}></span>
            </Link>
          );
        })}

        <div className="h-4 w-[1px] bg-stone-200 mx-2 hidden sm:block"></div>

        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: '#1c1917', color: '#ffffff' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] px-3 sm:px-5 py-1.5 sm:py-2 border border-stone-200 rounded-full transition-all duration-500 flex items-center gap-1.5 sm:gap-2 group"
        >
          <span className={lang === 'zh' ? 'text-nobel-gold' : 'text-stone-400 group-hover:text-white'}>ZH</span>
          <span className="w-px h-2 bg-stone-200 group-hover:bg-stone-700"></span>
          <span className={lang === 'en' ? 'text-nobel-gold' : 'text-stone-400 group-hover:text-white'}>EN</span>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
