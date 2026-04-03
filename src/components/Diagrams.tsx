
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Code, FolderGit2, Star, ExternalLink, TrendingUp, Target, Zap, Award, Compass, X } from 'lucide-react';
import { createPortal } from 'react-dom';

// --- EXPERIENCE TIMELINE ---
export const ExperienceTimeline: React.FC<{ lang: 'zh' | 'en' }> = ({ lang }) => {
  const experiences = lang === 'zh' ? [
    { id: 1, year: '2026 - 至今', title: '探索中...', company: '图书馆A馆', desc: '自学AI studio、vibe coding、及自动化工作流中,顺便看看猫猫狗狗', icon: TrendingUp },
    { id: 2, year: '2025.10 — 2025.12', title: 'AI产品运营', company: '湖南省博研启耀智能科技有限公司', desc: '负责 AI 产品的全生命周期运营，优化用户交互链路，提升产品市场竞争力。', icon: Target },
    { id: 3, year: '2025.7 — 2025.9', title: '税务数据分析师', company: '广东省碧信税务集团有限公司', desc: '深度挖掘税务大数据，构建自动化分析模型，为企业提供精准的税务合规建议。', icon: Zap },
  ] : [
    { id: 1, year: '2026 - Pres.', title: 'Exploring...', company: 'Library A', desc: 'Self-learning AI studio, vibe coding, and automated workflows, while occasionally watching cats and dogs.', icon: TrendingUp },
    { id: 2, year: '2025.10 — 2025.12', title: 'AI Product Operations', company: 'Hunan Boyan Qiyao Intelligent Tech', desc: 'Managed full AI product lifecycle, optimized UX flows, and enhanced market competitiveness.', icon: Target },
    { id: 3, year: '2025.7 — 2025.9', title: 'Tax Data Analyst', company: 'Guangdong Bixin Tax Group', desc: 'Mined tax big data and built automated models to provide precise compliance recommendations.', icon: Zap },
  ];

  const [activeId, setActiveId] = useState(1);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col p-6 sm:p-10 bg-white/40 backdrop-blur-xl rounded-[32px] border border-stone-200/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] my-8 relative overflow-hidden group"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-nobel-gold/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-stone-100/50 rounded-full blur-2xl -ml-24 -mb-24 pointer-events-none"></div>

      <div className="flex items-center justify-between mb-12 relative z-10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-nobel-gold/10 rounded-xl border border-nobel-gold/20 shadow-sm">
              <Compass size={22} className="text-nobel-gold animate-pulse" />
            </div>
            <h3 className="font-serif text-2xl text-stone-900 tracking-tight">
              {lang === 'zh' ? '实习经历' : 'Internship Experience'}
            </h3>
          </div>
          <p className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase ml-12">
            {lang === 'zh' ? '持续进化的商业思维' : 'Evolving Business Mindset'}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-nobel-gold/30"></div>
          <div className="w-12 h-[1px] bg-stone-100"></div>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative ml-4 space-y-10"
      >
        {/* Animated Timeline Line */}
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: 'calc(100% - 20px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          className="absolute left-0 top-3 w-[2px] bg-gradient-to-b from-nobel-gold via-nobel-gold/40 to-stone-100 origin-top"
        />

        {experiences.map((exp, idx) => {
          const Icon = exp.icon;
          const isActive = activeId === exp.id;
          const isHovered = hoveredId === exp.id;

          return (
            <motion.div 
              key={exp.id} 
              variants={itemVariants}
              className="relative pl-12 cursor-pointer group/item"
              onMouseEnter={() => {
                setHoveredId(exp.id);
                setActiveId(exp.id);
              }}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Timeline Node */}
              <div className="absolute -left-[11px] top-1.5 z-20">
                <motion.div 
                  animate={{ 
                    scale: isActive ? 1.2 : 1,
                    backgroundColor: isActive ? '#C5A059' : '#FFFFFF',
                    borderColor: isActive ? '#C5A059' : '#E5E7EB'
                  }}
                  className="flex items-center justify-center w-5 h-5 rounded-full border-2 shadow-sm transition-colors duration-300"
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeNodeCore"
                      className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                  )}
                </motion.div>
                
                {/* Pulsing Ring for Active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full border border-nobel-gold pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </div>
              
              <div className={`relative p-5 sm:p-6 rounded-2xl transition-all duration-500 border overflow-hidden ${
                isActive 
                  ? 'bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border-stone-100 translate-x-1 sm:translate-x-3' 
                  : 'bg-transparent border-transparent opacity-60 hover:opacity-90'
              }`}>
                {/* Item Icon with background glow and dynamic animation when active */}
                <div className={`absolute right-4 sm:right-6 top-4 sm:top-6 transition-all duration-500 z-10 ${isActive ? 'text-nobel-gold scale-110 sm:scale-125 opacity-100' : 'text-stone-300 scale-100 opacity-40'}`}>
                  <motion.div
                    animate={isActive ? {
                      rotate: [0, 5, -5, 0],
                      y: [0, -2, 2, 0]
                    } : {}}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon size={28} strokeWidth={1.5} />
                  </motion.div>
                </div>

                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.08, scale: 1.2 }}
                    className="absolute -right-4 -top-4 w-32 h-32 bg-nobel-gold rounded-full blur-3xl pointer-events-none"
                  />
                )}

                <div className="flex flex-col gap-1.5 relative z-10">
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.25em] transition-colors duration-300 px-2 py-0.5 rounded bg-stone-100 ${isActive ? 'text-nobel-gold bg-nobel-gold/10' : 'text-stone-400'}`}>
                      {exp.year}
                    </span>
                  </div>
                  <h4 className={`text-lg sm:text-xl font-bold tracking-tight transition-colors duration-300 mt-1 ${isActive ? 'text-stone-900' : 'text-stone-600'}`}>
                    {exp.title}
                  </h4>
                  <p className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-stone-500' : 'text-stone-400'}`}>
                    {exp.company}
                  </p>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, y: 10 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: 10 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-stone-100">
                          <p className="text-stone-600 text-sm leading-relaxed border-l-3 border-nobel-gold/30 pl-5 py-1 italic">
                            {exp.desc}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Decorative Corner Detail */}
                {isActive && (
                  <motion.div 
                    layoutId="cornerDetail"
                    className="absolute top-0 right-0 w-12 h-12 pointer-events-none overflow-hidden rounded-tr-2xl"
                  >
                    <div className="absolute top-0 right-0 w-full h-full bg-nobel-gold/5 rotate-45 translate-x-6 -translate-y-6"></div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom Status Indicator */}
      <div className="mt-12 pt-8 border-t border-stone-100/60 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300"></div>
              </div>
            ))}
          </div>
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
            {lang === 'zh' ? '多领域实战经验' : 'Multi-Domain Experience'}
          </span>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-stone-900 text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg shadow-stone-900/20 cursor-pointer"
        >
          {lang === 'zh' ? '查看简历' : 'View Resume'}
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- TECH STACK GRID ---
export const TechStackGrid: React.FC<{ isDark?: boolean, lang: 'zh' | 'en' }> = ({ isDark = false, lang }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const techStack = [
    { name: 'Python', level: 92 },
    { name: 'SQL', level: 88 },
    { name: 'Power BI', level: 85 },
    { name: 'Antigravity', level: 90 },
    { name: 'WPS Office', level: 95 },
    { name: 'Notebooklm (AI)', level: 90 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col p-5 sm:p-8 rounded-2xl border transition-all duration-500 my-8 ${
        isDark 
          ? 'bg-white/5 border-white/10 backdrop-blur-md shadow-2xl' 
          : 'bg-[#F5F4F0] border-stone-200 shadow-sm'
      }`}
    >
      <h3 className={`font-serif text-xl mb-8 flex items-center gap-3 ${isDark ? 'text-white' : 'text-stone-900'}`}>
        <div className={`p-2 rounded-lg border shadow-sm ${isDark ? 'bg-nobel-gold/10 border-nobel-gold/20' : 'bg-stone-100 border-stone-200'}`}>
          <Code size={20} className={isDark ? 'text-nobel-gold' : 'text-stone-600'} />
        </div>
        <span className={isDark ? "bg-clip-text text-transparent bg-gradient-to-r from-white to-stone-400" : "bg-clip-text text-transparent bg-gradient-to-r from-stone-800 to-stone-500"}>{lang === 'zh' ? '技能熟练度' : 'Proficiency'}</span>
      </h3>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-6"
      >
        {techStack.map((tech, index) => (
          <motion.div 
            key={tech.name}
            variants={itemVariants}
            className="relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className={`flex justify-between text-sm font-medium mb-2 transition-colors duration-300 ${
              isDark ? 'text-stone-300/90' : 'text-stone-700'
            }`}>
              <span className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${hoveredIndex === index ? 'bg-nobel-gold scale-150 shadow-[0_0_5px_rgba(212,175,55,0.5)]' : (isDark ? 'bg-stone-600' : 'bg-stone-300')}`} />
                {tech.name}
              </span>
              <span className={`font-mono text-xs transition-all duration-300 ${
                hoveredIndex === index 
                  ? 'opacity-100 text-nobel-gold scale-110' 
                  : 'opacity-0 translate-x-2'
              }`}>
                {tech.level}%
              </span>
            </div>
            <div className={`w-full h-1.5 rounded-full overflow-hidden ${
              isDark ? 'bg-white/10' : 'bg-stone-200'
            }`}>
              <motion.div 
                className={`h-full rounded-full transition-all duration-500 ${
                  hoveredIndex === index ? 'bg-nobel-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]' : (isDark ? 'bg-stone-400/50' : 'bg-stone-400')
                }`}
                initial={{ width: 0 }}
                whileInView={{ width: `${tech.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: index * 0.1, ease: "circOut" }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Tools Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-10 pt-8 border-t border-stone-200/60"
      >
        <h4 className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-5 ${isDark ? 'text-stone-400' : 'text-stone-400'}`}>
          {lang === 'zh' ? '核心工具与生态' : 'Tools & Ecosystem'}
        </h4>
        <div className="flex flex-wrap gap-2.5">
          {['Python', 'SQL', 'Power BI', 'Antigravity', 'WPS Office', 'Notebooklm'].map((tool, i) => (
            <motion.span
              key={tool}
              whileHover={{ y: -3, scale: 1.05, backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(197, 160, 89, 0.1)', borderColor: '#C5A059' }}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider border transition-all duration-300 ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-stone-300' 
                  : 'bg-white border-stone-200 text-stone-600 shadow-sm'
              }`}
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- PROJECT FAN MODAL ---
const ProjectFanModal: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void; 
    project: any;
    lang: 'zh' | 'en';
}> = ({ isOpen, onClose, project, lang }) => {
    if (typeof document === 'undefined') return null;

    const fanImages = project.fanImages || [
        { id: 1, src: "https://picsum.photos/seed/pose1/800/1000", name: "project_ip_fan_1.jpg", rotate: -15, x: -120 },
        { id: 2, src: "https://picsum.photos/seed/pose2/800/1000", name: "project_ip_fan_2.jpg", rotate: 0, x: 0 },
        { id: 3, src: "https://picsum.photos/seed/pose3/800/1000", name: "project_ip_fan_3.jpg", rotate: 15, x: 120 },
    ];

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-stone-900/80 backdrop-blur-xl"
                        onClick={onClose}
                    />
                    
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 50 }}
                        className="relative z-10 w-full max-w-6xl bg-white/5 rounded-[3rem] border border-white/10 p-8 md:p-16 flex flex-col items-center justify-center overflow-hidden min-h-[70vh]"
                    >
                        {/* Decorative Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nobel-gold/10 blur-[150px] rounded-full pointer-events-none"></div>

                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 group z-50"
                        >
                            <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                        </button>

                        {/* Title Section */}
                        <div className="text-center mb-16 md:mb-24 relative z-20">
                            <motion.span 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-nobel-gold text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block"
                            >
                                Project Details
                            </motion.span>
                            <motion.h2 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl md:text-5xl font-serif font-bold text-white mb-6"
                            >
                                {project.title}
                            </motion.h2>
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
                            >
                                {project.desc}
                            </motion.p>
                        </div>

                        {/* Fan Images Container */}
                        <div className="relative w-full h-[350px] md:h-[500px] flex items-center justify-center perspective-[1000px]">
                            {fanImages.map((img, idx) => (
                                <motion.div
                                    key={img.id}
                                    initial={{ rotate: 0, x: 0, opacity: 0, z: -100 }}
                                    animate={{ 
                                        rotate: img.rotate, 
                                        x: img.x, 
                                        opacity: 1,
                                        z: 0,
                                        transition: { delay: 0.5 + idx * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }
                                    }}
                                    whileHover={{ 
                                        scale: 1.1, 
                                        zIndex: 50,
                                        rotate: 0,
                                        y: -40,
                                        transition: { duration: 0.4, ease: "easeOut" }
                                    }}
                                    className="absolute w-[180px] md:w-[300px] aspect-[3/4] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-4 border-white/10 cursor-pointer group"
                                >
                                    <img 
                                        src={img.src} 
                                        alt={img.name} 
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        referrerPolicy="no-referrer"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                        <span className="text-white/60 text-[8px] font-bold tracking-widest uppercase mb-1">Asset Name</span>
                                        <span className="text-nobel-gold text-[10px] font-mono font-bold">{img.name}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Footer Info */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="mt-16 md:mt-24 text-center relative z-20"
                        >
                            <p className="text-white/30 text-[9px] font-bold tracking-[0.4em] uppercase flex items-center gap-4 justify-center">
                                <span className="w-8 h-px bg-white/10"></span>
                                {lang === 'zh' ? '交互式 3D 角色建模展示' : 'INTERACTIVE 3D CHARACTER SHOWCASE'}
                                <span className="w-8 h-px bg-white/10"></span>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};

// --- PROJECT SHOWCASE ---
export const ProjectShowcase: React.FC<{ lang: 'zh' | 'en' }> = ({ lang }) => {
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const projects = lang === 'zh' ? [
        {
            id: 1,
            title: "IP设计：喜羊羊3D形象多姿态动作",
            category: "IP设计 / 3D建模",
            desc: "对经典动画角色进行二创的形象，更生动和可爱，不同于二维形象的角色丰富。",
            tags: ["3D建模", "角色设计", "IP设计"],
            image: "/images/project_ip_main.jpg",
            imageName: "project_ip_main.jpg",
            fanImages: [
                { id: 1, src: "/images/project_ip_fan_1.jpg", name: "project_ip_fan_1.jpg", rotate: -15, x: -120 },
                { id: 2, src: "/images/project_ip_fan_2.jpg", name: "project_ip_fan_2.jpg", rotate: 0, x: 0 },
                { id: 3, src: "/images/project_ip_fan_3.jpg", name: "project_ip_fan_3.jpg", rotate: 15, x: 120 },
            ],
            stats: { label: "动作姿态", value: "24+" },
            color: "#C5A059"
        },
        {
            id: 2,
            title: "数字赋能红色文旅高质量发展",
            category: "大创项目 / 红色文旅",
            desc: "基于湖南省30多个爱国主义教育基地的研究，探究数字技术在红色文化旅游的普及度和实际效果，提出可行性建议。",
            tags: ["大创项目", "省级", "红色文旅"],
            image: "/images/project_tax_main.jpg",
            imageName: "project_tax_main.jpg",
            fanImages: [
                { id: 1, src: "/images/project_tax_1.jpg", name: "project_tax_1.jpg", rotate: -15, x: -120 },
                { id: 2, src: "/images/project_tax_2.jpg", name: "project_tax_2.jpg", rotate: 0, x: 0 },
                { id: 3, src: "/images/project_tax_3.jpg", name: "project_tax_3.jpg", rotate: 15, x: 120 },
            ],
            stats: { label: "调研基地", value: "30+" },
            color: "#1c1917"
        }
    ] : [
        {
            id: 1,
            title: "IP Design: Pleasant Goat 3D Multi-pose Character",
            category: "IP Design / 3D Modeling",
            desc: "A 3D reimagining of the classic animation character, more vivid and adorable, offering richer detail than the original 2D version.",
            tags: ["3D Modeling", "Character Design", "IP Design"],
            image: "/images/project_ip_main.jpg",
            imageName: "project_ip_main.jpg",
            fanImages: [
                { id: 1, src: "/images/project_ip_fan_1.jpg", name: "project_ip_fan_1.jpg", rotate: -15, x: -120 },
                { id: 2, src: "/images/project_ip_fan_2.jpg", name: "project_ip_fan_2.jpg", rotate: 0, x: 0 },
                { id: 3, src: "/images/project_ip_fan_3.jpg", name: "project_ip_fan_3.jpg", rotate: 15, x: 120 },
            ],
            stats: { label: "Poses", value: "24+" },
            color: "#C5A059"
        },
        {
            id: 2,
            title: "Digital Empowerment for High-Quality Development of Red Tourism",
            category: "Innovation Project / Red Tourism",
            desc: "Research based on over 30 patriotic education bases in Hunan Province, exploring the popularity and practical effects of digital technology in red cultural tourism, and proposing feasible suggestions.",
            tags: ["Innovation Project", "Provincial Level", "Red Tourism"],
            image: "/images/project_tax_main.jpg",
            imageName: "project_tax_main.jpg",
            fanImages: [
                { id: 1, src: "/images/project_tax_1.jpg", name: "project_tax_1.jpg", rotate: -15, x: -120 },
                { id: 2, src: "/images/project_tax_2.jpg", name: "project_tax_2.jpg", rotate: 0, x: 0 },
                { id: 3, src: "/images/project_tax_3.jpg", name: "project_tax_3.jpg", rotate: 15, x: 120 },
            ],
            stats: { label: "Research Bases", value: "30+" },
            color: "#1c1917"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 my-16">
            {projects.map((project, idx) => (
                <motion.div 
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className={`group relative flex flex-col rounded-[2.5rem] overflow-hidden bg-white border border-stone-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(197,160,89,0.15)] transition-all duration-700 ${idx % 2 === 1 ? 'md:mt-12' : ''}`}
                >
                    {/* Image Container with Parallax-like Hover */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <motion.img 
                            src={project.image} 
                            alt={project.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
                        
                        {/* Image Name Label for User */}
                        <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded text-[8px] font-mono text-white/80 border border-white/10">
                                {project.imageName}
                            </span>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-6 left-6 z-20">
                            <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold tracking-[0.2em] text-white uppercase">
                                {project.category}
                            </span>
                        </div>

                        {/* Stats Overlay */}
                        <div className="absolute bottom-6 right-6 z-20">
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex flex-col items-end"
                            >
                                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest leading-none mb-1">{project.stats.label}</span>
                                <span className="text-2xl font-serif font-bold text-nobel-gold leading-none">{project.stats.value}</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 sm:p-10 flex flex-col flex-grow relative">
                        {/* Decorative Quote Mark */}
                        <div className="absolute top-6 right-8 text-6xl font-serif text-stone-50 pointer-events-none group-hover:text-nobel-gold/5 transition-colors duration-700">“</div>
                        
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-4 group-hover:text-nobel-gold transition-colors duration-500 leading-tight">
                            {project.title}
                        </h3>
                        
                        <p className="text-stone-500 text-base leading-relaxed mb-8 line-clamp-3 group-hover:text-stone-600 transition-colors duration-500">
                            {project.desc}
                        </p>

                        <div className="mt-auto space-y-8">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-stone-50 text-stone-400 text-[9px] font-bold uppercase tracking-widest rounded-md border border-stone-100 group-hover:border-nobel-gold/20 group-hover:text-stone-500 transition-all duration-500">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Action Button */}
                            <motion.button 
                                whileHover={{ x: 10 }}
                                onClick={() => setSelectedProject(project)}
                                className="flex items-center gap-4 text-stone-900 font-bold text-xs tracking-[0.3em] uppercase group/btn"
                            >
                                <span className="relative">
                                    {lang === 'zh' ? '查看详情' : 'View Details'}
                                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-nobel-gold transition-all duration-500 group-hover/btn:w-full"></span>
                                </span>
                                <div className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center group-hover/btn:bg-stone-900 group-hover/btn:text-white group-hover/btn:border-stone-900 transition-all duration-500">
                                    <ExternalLink size={14} />
                                </div>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* Project Fan Modal */}
            <ProjectFanModal 
                isOpen={!!selectedProject} 
                onClose={() => setSelectedProject(null)} 
                project={selectedProject || {}}
                lang={lang}
            />
        </div>
    );
}
