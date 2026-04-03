import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './src/pages/LandingPage';
import ArticlesPage from './src/pages/ArticlesPage';
import AboutPage from './src/pages/AboutPage';
import { Navbar } from './src/components/Navbar';
import { BeeperApp } from './src/components/BeeperApp';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lang, setLang] = useState<'zh' | 'en'>('zh');

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-900 font-sans selection:bg-nobel-gold/30 relative overflow-x-hidden">
      {/* Subtle background animated gradient */}
      <div className="fixed inset-0 bg-gradient-to-tr from-nobel-gold/5 via-transparent to-stone-200/20 opacity-50 pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '15s' }}></div>
      
      <ScrollToTop />
      {location.pathname !== '/beeper' && <Navbar lang={lang} setLang={setLang} />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><LandingPage lang={lang} /></PageWrapper>} />
          <Route path="/articles" element={<PageWrapper><ArticlesPage lang={lang} setLang={setLang} /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><AboutPage lang={lang} /></PageWrapper>} />
          <Route path="/beeper" element={<PageWrapper><BeeperApp onClose={() => navigate('/')} /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
