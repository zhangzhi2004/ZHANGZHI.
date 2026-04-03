
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { WaveBackground } from '../components/WaveBackground';
import { ExperienceTimeline, TechStackGrid, ProjectShowcase } from '../components/Diagrams';
import { ArrowUp, ArrowDown, Library, AtSign, Github, MessageCircle, QrCode, Award } from 'lucide-react';
import { AuthorCard, QRModal, HonorsModal, ImageModal } from '../components/UIComponents';
import { ImageGrid } from '../components/ImageGrid';
import { BeeperApp } from '../components/BeeperApp';
import { AnimatedGrids } from '../components/AnimatedGrids';
import { Logo } from '../components/Logo';
import { KineticJourney } from '../components/KineticJourney';
import { StrategicGyroscope } from '../components/StrategicGyroscope';
import { Link, useNavigate } from 'react-router-dom';

const translations = {
  zh: {
    nav: {
      home: '主页',
      projects: '项目',
      articles: '文章',
      education: '教育',
      contact: '联系'
    },
    hero: {
      title: '从这里开始 认识更多的我',
      subtitle: '',
      explore: ''
    },
    about: {
      tag: '关于我',
      title: '我的历程',
      content1: '你好，很高兴在这里遇见你。我一直认为，数字经济不只是冷冰冰的代码和报表，它更像是一场关于“人”与“价值”的深刻对话。在我的世界里，Python 和 SQL 是我探寻真相的显微镜，而 Power BI 则是将复杂规律转化为直觉的画笔。我喜欢在宏观经济的脉络中寻找微观的切入点，用数据去讲故事，用产品去解决问题。',
      content2: '我并不想被单一的标签定义。在设计艺术中，我寻找感性的共鸣；在项目管理里，我坚守理性的秩序。从跨领域的碰撞到 Antigravity 的高效协同，我始终在追求一种“新商科”的平衡——既有商业的敏锐，又有技术的温度。我是一个持续进化的学习者，在这个充满变数的时代，我期待与你一起，去拼凑出未来的更多可能。'
    },
    education: {
      tag: '教育背景',
      title: '学术与成长',
      expTag: '查看在校荣誉',
      expTitle: '长沙理工大学',
      expSubtitle: '数字经济'
    },
    skills: {
      tag: '技术栈',
      title: '精湛技艺',
      subtitle: '与现代工具',
      desc: '我坚信工欲善其事，必先利其器。我的技术栈是以经济思维为中心而展开的全面性层次生态系统，成为数字经济时代复合型新商科人才'
    },
    projects: {
      title: '精选项目',
      desc: '我近期作品的精选，通过数据可视化与交互设计，将复杂的经济逻辑转化为直观的商业洞察。'
    },
    articles: {
      tag: '深度思考',
      title: '文章',
      desc: '以经济视角剖析时事，在文字间寻找商业逻辑与社会变迁的交汇点。'
    },
    life: {
      tag: '生活点滴',
      title: '生活',
      desc: '捕捉日常中的美好瞬间，记录那些温暖而真实的时刻。'
    },
    archive: {
      tag: '岁月留声',
      title: '记录',
      desc: '整理过往的点滴，沉淀思考与感悟，让记忆有迹可循。'
    },
    contact: {
      title: '你好 ;-)',
      subtitle: '欢迎探讨与合作。',
      footer: '期待您的来信。'
    }
  },
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      articles: 'Articles',
      education: 'Education',
      contact: 'Contact'
    },
    hero: {
      title: 'Start Here, Get to Know Me More',
      subtitle: '',
      explore: ''
    },
    about: {
      tag: 'ABOUT ME',
      title: 'My Journey',
      content1: 'Hi there, I\'m glad you\'re here. I\'ve always believed that the digital economy is more than just cold code and spreadsheets; it\'s a profound dialogue about people and value. In my world, Python and SQL are the microscopes I use to uncover truths, while Power BI is the brush that transforms complex patterns into intuition. I love finding micro-entry points within macroeconomic trends, using data to tell stories and products to solve real problems.',
      content2: 'I don\'t want to be defined by a single label. In design, I seek emotional resonance; in project management, I uphold rational order. From cross-disciplinary collisions to the efficient synergy of Antigravity, I\'m always pursuing a balance for the "New Business" era—one that combines commercial sharpness with technical warmth. I\'m a constantly evolving learner, and in this volatile age, I look forward to piecing together the possibilities of the future with you.'
    },
    education: {
      tag: 'EDUCATION',
      title: 'Academic & Growth',
      expTag: 'VIEW SCHOOL HONORS',
      expTitle: 'Changsha University of Science and Technology',
      expSubtitle: 'Digital Economy'
    },
    skills: {
      tag: 'TECH STACK',
      title: 'Mastered Skills',
      subtitle: '& Modern Tools',
      desc: 'I believe that to do a good job, one must first sharpen their tools. My technical stack is a comprehensive hierarchical ecosystem centered on economic thinking, aiming to become a multi-disciplinary new business talent in the digital economy era.'
    },
    projects: {
      title: 'Featured Projects',
      desc: 'A curated selection of my recent work, transforming complex economic logic into intuitive business insights through data visualization and interactive design.'
    },
    articles: {
      tag: 'DEEP THOUGHTS',
      title: 'Articles',
      desc: 'Analyzing current affairs from an economic perspective, finding the intersection of business logic and social change within the text.'
    },
    life: {
      tag: 'LIFE MOMENTS',
      title: 'Life',
      desc: 'Capturing beautiful moments in daily life, recording those warm and authentic instances.'
    },
    archive: {
      tag: 'TIME ARCHIVE',
      title: 'Archive',
      desc: 'Organizing bits and pieces of the past, precipitating thoughts and insights, making memories traceable.'
    },
    contact: {
      title: 'Hello ;-)',
      subtitle: 'Let\'s discuss and collaborate.',
      footer: 'Looking forward to hearing from you.'
    }
  }
};

interface LandingPageProps {
  lang: 'zh' | 'en';
}

const LandingPage: React.FC<LandingPageProps> = ({ lang }) => {
  const t = translations[lang];
  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [qrModal, setQrModal] = useState<{ open: boolean, title: string, url: string }>({ open: false, title: '', url: '' });
  const [honorsModalOpen, setHonorsModalOpen] = useState(false);
  const [imageModal, setImageModal] = useState<{ open: boolean, images: string[], index: number }>({ open: false, images: [], index: 0 });
  const [secretClicks, setSecretClicks] = useState(0);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    if (secretClicks >= 5) {
      setSecretClicks(0);
      navigate('/beeper');
    }
  }, [secretClicks, navigate]);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation removed - now in App.tsx */}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FDFCF9] via-[#F9F8F4] to-[#F5F4F0]">
        <WaveBackground onTransitionComplete={() => setIsReady(true)} />

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 container mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={isReady ? { 
              opacity: 1, 
              scale: 1, 
              y: [0, -10, 0],
            } : {}}
            transition={isReady ? { 
              opacity: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            } : { duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <Logo className="mb-12 scale-150" />
            
            <motion.h1 
              initial={{ opacity: 0, letterSpacing: "0.1em", y: 20 }}
              animate={isReady ? { 
                opacity: 1, 
                letterSpacing: "0.3em", 
                y: 0,
                color: ["#1c1917", "#c5a059", "#1c1917"]
              } : {}}
              transition={isReady ? {
                opacity: { duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
                letterSpacing: { duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
                color: { duration: 10, repeat: Infinity, ease: "easeInOut" }
              } : { duration: 1.2 }}
              className={`font-serif max-w-4xl mx-auto font-light ${lang === 'en' ? 'text-3xl sm:text-4xl md:text-6xl' : 'text-2xl sm:text-3xl md:text-5xl'}`}
            >
              {t.hero.title}
            </motion.h1>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={isReady ? { width: "80px", opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
              className="h-px bg-nobel-gold mt-12"
            />
          </motion.div>
        </motion.div>
      </header>

      <main>
        {/* About */}
        <section id="about" className="py-20 md:py-32 bg-white overflow-hidden">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="md:col-span-4"
            >
              <Link to="/about">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-stone-100 text-stone-500 text-xs font-bold tracking-widest uppercase rounded-full mb-8 border border-stone-200 shadow-sm hover:shadow-md hover:bg-nobel-gold hover:text-white hover:border-nobel-gold/50 transition-all duration-300 cursor-pointer group"
                >
                  <span className="w-2 h-2 rounded-full bg-stone-400 group-hover:bg-white transition-colors"></span>
                  {t.about.tag}
                </motion.div>
              </Link>
              <h2 className={`font-serif mb-8 text-stone-900 ${lang === 'en' ? 'text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight' : 'text-3xl sm:text-4xl md:text-5xl leading-tight'}`}>{t.about.title}</h2>
              <div className="w-20 h-1 bg-nobel-gold mb-12"></div>
              
              {/* Kinetic Journey Animation - Home Page Feature */}
              <div className="relative w-full max-w-[240px] mx-auto md:mx-0">
                <KineticJourney className="w-full h-auto" />
                <div className="absolute -bottom-4 left-0 w-full text-center md:text-left">
                  <span className="text-[10px] font-bold tracking-[0.4em] text-stone-300 uppercase">Continuous Exploration</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
              className={`md:col-span-8 text-stone-600 space-y-8 ${lang === 'en' ? 'text-xl leading-loose tracking-wide' : 'text-lg md:text-xl leading-relaxed'}`}
            >
              <motion.p variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
                <span className="text-6xl float-left mr-4 mt-[-10px] font-serif text-nobel-gold">{lang === 'zh' ? '你' : 'H'}</span>{t.about.content1.slice(1)}
              </motion.p>
              <motion.p variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }}>
                {t.about.content2}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="py-24 bg-white border-t border-stone-100 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-100px" }}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.2 }
                        }
                      }}
                    >
                        {t.education.expTag && (
                          <motion.button 
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }} 
                            whileHover={{ scale: 1.05, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white/80 backdrop-blur-md text-stone-900 text-xs font-bold tracking-[0.2em] uppercase rounded-2xl mb-12 border border-stone-200 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(197,160,89,0.2)] hover:border-nobel-gold/40 transition-all duration-500 overflow-hidden"
                            onClick={() => setHonorsModalOpen(true)}
                          >
                              {/* Shimmer Effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                              
                              <div className="relative z-10 p-2 bg-nobel-gold/10 rounded-xl text-nobel-gold group-hover:bg-nobel-gold group-hover:text-white group-hover:rotate-[15deg] transition-all duration-500 shadow-sm">
                                <Award size={20} strokeWidth={2.5} />
                              </div>
                              
                              <span className="relative z-10 text-stone-700 group-hover:text-stone-900 transition-colors duration-300">{t.education.expTag}</span>
                              
                              <div className="relative z-10 flex gap-1">
                                {[1, 2].map(i => (
                                  <motion.div 
                                    key={i}
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                    className="w-1.5 h-1.5 rounded-full bg-nobel-gold/40"
                                  />
                                ))}
                              </div>
                          </motion.button>
                        )}
                        <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }} className={`font-serif mb-2 text-stone-900 ${lang === 'en' ? 'text-3xl sm:text-5xl md:text-6xl tracking-tight' : 'text-3xl sm:text-4xl md:text-5xl'}`}>{t.education.expTitle}</motion.h2>
                        <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } } }} className="font-serif text-stone-500 text-xl sm:text-2xl mb-8">{t.education.expSubtitle}</motion.p>
                        
                        <motion.div 
                          variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } } }}
                          className="relative w-full aspect-square max-w-[480px] mx-auto lg:mx-0 bg-stone-50/30 rounded-[48px] overflow-hidden border border-stone-200/40 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] group"
                        >
                            {/* Glassmorphism Frame Elements */}
                            <div className="absolute inset-0 z-10 pointer-events-none border-[1px] border-white/80 rounded-[48px]"></div>
                            <div className="absolute inset-6 z-10 pointer-events-none border-[0.5px] border-stone-200/30 rounded-[36px]"></div>
                            
                            {/* Dynamic Background Texture */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_var(--tw-gradient-stops))] from-white/90 via-stone-50/50 to-stone-100/30"></div>
                            
                            {/* Animated Grid Background */}
                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#C5A059 0.5px, transparent 0.5px), linear-gradient(90deg, #C5A059 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }}></div>
                            
                            <div className="absolute inset-0 flex items-center justify-center p-16">
                                <StrategicGyroscope className="w-full h-full" />
                            </div>

                            {/* Refined Technical Overlay */}
                            <div className="absolute top-10 left-10 right-10 z-20 flex justify-between items-start">
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2.5">
                                        <motion.div 
                                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                          transition={{ duration: 2, repeat: Infinity }}
                                          className="w-2 h-2 rounded-full bg-nobel-gold shadow-[0_0_8px_rgba(197,160,89,0.5)]"
                                        />
                                        <span className="text-[11px] font-bold tracking-[0.25em] text-stone-500 uppercase">Strategic Core</span>
                                    </div>
                                    <div className="h-[1px] w-16 bg-gradient-to-r from-stone-200 to-transparent"></div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    {/* Removed technical strings */}
                                </div>
                            </div>

                            <div className="absolute bottom-10 left-10 right-10 z-20">
                                <div className="flex items-center justify-between px-6 py-4 bg-white/40 backdrop-blur-2xl rounded-[24px] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-nobel-gold uppercase tracking-widest mb-0.5">Core Insight</span>
                                        <span className="text-[12px] font-bold text-stone-700 uppercase tracking-wide">Strategic Pulse</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        {[1, 2, 3, 4].map(i => (
                                            <motion.div 
                                                key={i}
                                                animate={{ height: [6, 16, 6], opacity: [0.3, 0.7, 0.3] }}
                                                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                                                className="w-1.5 bg-nobel-gold rounded-full"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                    <div>
                        <ExperienceTimeline lang={lang} />
                    </div>
                </div>
            </div>
        </section>

        {/* Skills */}
        <section className="py-16 md:py-24 bg-[#F2EEE3] text-stone-800 overflow-hidden relative border-t border-stone-200/60">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 20, 0],
                        y: [0, -20, 0]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[600px] h-[600px] rounded-full bg-nobel-gold/5 blur-[120px] absolute top-[-200px] left-[-200px]"
                ></motion.div>
                <motion.div 
                    animate={{ 
                        scale: [1.1, 1, 1.1],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, -20, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[500px] h-[500px] rounded-full bg-white/60 blur-[100px] absolute bottom-[-150px] right-[-150px]"
                ></motion.div>
                <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <TechStackGrid isDark={false} lang={lang} />
                     </div>
                     <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 }
                          }
                        }}
                        className="order-1 lg:order-2"
                     >
                        <motion.div 
                          variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }} 
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-white/90 to-white/50 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-nobel-gold/30 shadow-md backdrop-blur-md hover:bg-nobel-gold hover:text-white transition-all duration-300 cursor-pointer group"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nobel-gold opacity-75 group-hover:bg-white transition-colors"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-nobel-gold group-hover:bg-white transition-colors"></span>
                            </span>
                            {t.skills.tag}
                        </motion.div>
                        <motion.h2 variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }} className={`font-serif mb-8 text-stone-900 ${lang === 'en' ? 'text-5xl md:text-7xl tracking-tight leading-[1.1]' : 'text-4xl md:text-6xl leading-tight'}`}>
                            {t.skills.title} <br/> <span className="text-stone-400 italic font-normal">{t.skills.subtitle}</span>
                        </motion.h2>
                        <motion.p variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }} className={`mb-10 max-w-xl text-stone-600 ${lang === 'en' ? 'text-xl leading-loose tracking-wide' : 'text-lg leading-relaxed'}`}>
                            {t.skills.desc}
                        </motion.p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
                            {[
                                { 
                                  title: lang === 'zh' ? "数字经济" : "Digital Economy", 
                                  desc: lang === 'zh' ? "宏观经济洞察、数字化转型、商业模式创新" : "Macroeconomic insights, digital transformation, business model innovation", 
                                  icon: "✦" 
                                },
                                { 
                                  title: lang === 'zh' ? "数据分析" : "Data Analysis", 
                                  desc: lang === 'zh' ? "数据挖掘、可视化呈现、业务指标建模" : "Data mining, visual presentation, business metric modeling", 
                                  icon: "✧" 
                                },
                                { 
                                  title: lang === 'zh' ? "产品思维" : "Product Thinking", 
                                  desc: lang === 'zh' ? "用户体验设计、需求分析、产品路线图规划" : "UX design, requirement analysis, product roadmap planning", 
                                  icon: "◈" 
                                },
                                { 
                                  title: lang === 'zh' ? "设计艺术" : "Design Art", 
                                  desc: lang === 'zh' ? "视觉传达、交互美学、品牌创意设计" : "Visual communication, interactive aesthetics, brand creative design", 
                                  icon: "◇" 
                                },
                                { 
                                  title: lang === 'zh' ? "项目管理" : "Project Management", 
                                  desc: lang === 'zh' ? "敏捷开发、团队协作、全生命周期管理" : "Agile development, team collaboration, full lifecycle management", 
                                  icon: "◎" 
                                },
                                { 
                                  title: lang === 'zh' ? "可塑性" : "Adaptability", 
                                  desc: lang === 'zh' ? "快速学习、跨领域融合、持续自我进化" : "Rapid learning, cross-domain integration, continuous self-evolution", 
                                  icon: "❃" 
                                }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
                                    whileHover={{ y: -8, backgroundColor: "#FFFFFF", borderColor: "rgba(212, 175, 55, 0.4)", boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05)" }}
                                    className="p-6 bg-white/60 rounded-2xl border border-stone-200 transition-all duration-300 cursor-default group backdrop-blur-sm"
                                >
                                    <div className="text-nobel-gold mb-3 text-xl group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                                    <h4 className="font-bold text-stone-900 mb-2 text-lg">{item.title}</h4>
                                    <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                     </motion.div>
                </div>
            </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-24 md:py-32 bg-[#F9F8F4] relative overflow-hidden">
            {/* Artistic Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-nobel-gold/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-stone-200/40 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none"></div>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C5A059 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-white/80 backdrop-blur-md border border-stone-200 rounded-full text-nobel-gold text-[10px] font-bold tracking-[0.3em] uppercase mb-8 shadow-sm"
                    >
                        <span className="w-2 h-2 rounded-full bg-nobel-gold animate-pulse"></span>
                        {lang === 'zh' ? '精选作品' : 'SELECTED WORKS'}
                    </motion.div>
                    <h2 className={`font-serif mb-8 text-stone-900 ${lang === 'en' ? 'text-5xl md:text-7xl tracking-tight leading-tight' : 'text-4xl md:text-6xl leading-tight'}`}>{t.projects.title}</h2>
                    <p className={`text-stone-600 max-w-2xl mx-auto ${lang === 'en' ? 'text-xl leading-loose tracking-wide' : 'text-lg md:text-xl leading-relaxed'}`}>
                        {t.projects.desc}
                    </p>
                </div>
                <div className="max-w-7xl mx-auto">
                    <ProjectShowcase lang={lang} />
                </div>
            </div>
        </section>

        {/* Articles */}
        <section id="articles" className="py-16 md:py-24 bg-white border-t border-stone-100 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100 text-stone-500 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200 shadow-sm hover:shadow-md hover:bg-nobel-gold hover:text-white hover:border-nobel-gold/50 transition-all duration-300 cursor-pointer group"
                        >
                            <Library size={14} className="text-stone-400 group-hover:text-white transition-colors" />
                            {t.articles.tag}
                        </motion.div>
                        <h2 className={`font-serif mb-6 text-stone-900 ${lang === 'en' ? 'text-5xl md:text-6xl tracking-tight' : 'text-4xl md:text-5xl'}`}>{t.articles.title}</h2>
                        <p className={`text-stone-600 ${lang === 'en' ? 'text-xl leading-loose tracking-wide' : 'text-lg leading-relaxed'}`}>
                            {t.articles.desc}
                        </p>
                    </div>
                    <Link 
                        to="/articles" 
                        className="flex items-center gap-2 text-nobel-gold font-bold uppercase tracking-widest text-sm group"
                    >
                        <motion.span whileHover={{ x: 5 }}>
                            {lang === 'zh' ? '查看全部' : 'View All'}
                        </motion.span>
                        <ArrowDown size={16} className="-rotate-90 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {[
                        { date: "2026.03.23", title: lang === 'zh' ? "希音不再“避嫌”：中国出海企业的系统性转向？" : "SHEIN No Longer 'Avoids Suspicions': Systematic Shift of Chinese Enterprises Going Abroad?", category: lang === 'zh' ? "商业" : "BUSINESS", link: "https://mp.weixin.qq.com/s/DLK3VCrVSmh6YEuCLsOwmg", image: "/images/article_shein.png" },
                        { date: "2026.03.19", title: lang === 'zh' ? "远在中东的炮火，是怎么烧到日本超市货架上的？" : "How Did the Fire in the Middle East Burn to Japanese Supermarket Shelves?", category: lang === 'zh' ? "社会" : "SOCIETY", link: "https://mp.weixin.qq.com/s/jvUfroV5CdnivClSofZbcg", image: "/images/article_supply_chain.png" },
                        { date: "2026.03.15", title: lang === 'zh' ? "F1：为什么我们，总会偏爱那份独树一帜的勇敢" : "F1: Why We Always Favor That Unique Bravery", category: lang === 'zh' ? "热点" : "TRENDS", link: "https://mp.weixin.qq.com/s/Vjj136ye9qAO1P1sRzt1fQ", image: "/images/article_f1.png" }
                    ].map((article, i) => (
                        <a href={article.link} target="_blank" rel="noopener noreferrer" key={i} className="group cursor-pointer block">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="aspect-[16/10] bg-stone-100 rounded-2xl mb-6 overflow-hidden relative">
                                    <img 
                                        src={article.image} 
                                        alt={article.title} 
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.opacity = '0';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-nobel-gold/0 group-hover:bg-nobel-gold/10 transition-colors duration-500" />
                                    <motion.div 
                                        whileHover={{ scale: 1.05 }}
                                        className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold tracking-widest uppercase text-stone-500 z-10 hover:bg-nobel-gold hover:text-white transition-colors cursor-pointer shadow-sm hover:shadow-md"
                                    >
                                        {article.category}
                                    </motion.div>
                                </div>
                                <div className="text-xs text-stone-400 mb-2 font-mono">{article.date}</div>
                                <h3 className="text-xl font-bold text-stone-900 group-hover:text-nobel-gold transition-colors leading-tight">
                                    {article.title}
                                </h3>
                            </motion.div>
                        </a>
                    ))}
                </div>
            </div>
        </section>

        {/* Impact / Philosophy */}
        <section className="py-20 md:py-32 bg-[#F9F8F4] border-t border-stone-200 overflow-hidden">
             <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-20 items-start">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className={`font-serif text-stone-900 ${lang === 'en' ? 'text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight' : 'text-4xl md:text-5xl leading-tight'}`}>
                            {lang === 'zh' ? '洞察遇见创造。' : 'Insight meets creation.'}<br />
                            {lang === 'zh' ? '我们不只是在构建工具，更是在重塑价值。' : 'We don\'t just build tools; we reshape value.'}
                        </h2>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <p className={`text-stone-500 ${lang === 'en' ? 'text-xl md:text-2xl leading-relaxed tracking-wide' : 'text-lg md:text-xl leading-relaxed'}`}>
                            {lang === 'zh' ? '我坚信，商业的深度源于对经济规律的敏锐洞察，而产品的生命力则来自设计与技术的完美融合。我致力于在复杂的数据脉络中，寻找最动人的商业表达。' : 'I firmly believe that the depth of business stems from a keen insight into economic laws, while the vitality of a product comes from the perfect fusion of design and technology. I am committed to finding the most touching business expressions within complex data threads.'}
                        </p>
                    </motion.div>
                </div>
                
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    className="w-full"
                >
                    <AnimatedGrids />
                </motion.div>
             </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 md:py-24 bg-[#F5F4F0] border-t border-stone-300">
           <div className="container mx-auto px-6">
                <div className="text-center mb-10">
                    <h2 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-4 md:mb-6 text-stone-900 tracking-tighter">{t.contact.title}</h2>
                    <p className={`text-stone-400 font-medium ${lang === 'en' ? 'text-xl sm:text-2xl md:text-3xl tracking-wide' : 'text-lg sm:text-xl md:text-2xl'}`}>{t.contact.subtitle}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
                    <AuthorCard 
                        name={lang === 'zh' ? "邮箱" : "Email"} 
                        role="3415791422@qq.com" 
                        icon={AtSign}
                        delayIdx={0} 
                        color="bg-blue-500"
                        href="mailto:3415791422@qq.com"
                        lang={lang}
                    />
                    <AuthorCard 
                        name="GitHub" 
                        role="github.com/zhangzhi" 
                        icon={Github}
                        delayIdx={1} 
                        color="bg-stone-800"
                        href="https://github.com/zhangzhi"
                        lang={lang}
                    />
                    <AuthorCard 
                        name={lang === 'zh' ? "微信" : "WeChat"} 
                        role={lang === 'zh' ? "微信号: Zhang1690599636" : "ID: Zhang1690599636"} 
                        icon={MessageCircle}
                        delayIdx={2} 
                        color="bg-green-500"
                        onClick={() => setQrModal({ open: true, title: lang === 'zh' ? '扫码加我微信' : 'Scan to add WeChat', url: '/images/wechat_qr.png' })}
                        lang={lang}
                    />
                    <AuthorCard 
                        name={lang === 'zh' ? "公众号" : "Official Acc."} 
                        role={lang === 'zh' ? "屋檐滴落鸟鸣" : "Eaves Dropping Birdsong"} 
                        icon={QrCode}
                        delayIdx={3} 
                        color="bg-indigo-500"
                        onClick={() => setQrModal({ open: true, title: lang === 'zh' ? '关注我的公众号' : 'Follow Official Account', url: '/images/official_qr.png' })}
                        lang={lang}
                    />
                </div>
                <div className="text-center mt-12">
                    <p className="text-stone-500 italic">{t.contact.footer}</p>
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-16 relative">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <motion.div 
                  className="text-white font-serif font-bold text-2xl mb-2 tracking-widest cursor-pointer inline-block"
                  whileHover={{ textShadow: "0px 0px 8px rgba(212,175,55,0.8)" }}
                  onClick={() => setSecretClicks(c => c + 1)}
                >
                  ZHANGZHI
                </motion.div>
            </div>
            
            <div className="flex items-center gap-6">
                <a href="mailto:3415791422@qq.com" className="hover:text-white transition-colors"><AtSign size={20} /></a>
                <a href="https://github.com/zhangzhi" className="hover:text-white transition-colors"><Github size={20} /></a>
                <button onClick={() => setQrModal({ open: true, title: lang === 'zh' ? '扫码加我微信' : 'Scan to add WeChat', url: '/images/wechat_qr.png' })} className="hover:text-white transition-colors cursor-pointer"><MessageCircle size={20} /></button>
                <button onClick={() => setQrModal({ open: true, title: lang === 'zh' ? '关注我的公众号' : 'Follow Official Account', url: '/images/official_qr.png' })} className="hover:text-white transition-colors cursor-pointer"><QrCode size={20} /></button>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-stone-600 tracking-widest">
            © {new Date().getFullYear()} ZHANGZHI. {lang === 'zh' ? '版权所有。' : 'ALL RIGHTS RESERVED.'}
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-4 bg-nobel-gold text-white rounded-full shadow-2xl backdrop-blur-md border border-white/20 flex items-center justify-center group transition-shadow hover:shadow-nobel-gold/40"
            aria-label={lang === 'zh' ? '回到顶部' : 'Back to top'}
          >
            <ArrowUp size={20} className="transition-transform group-hover:-translate-y-0.5" />
          </motion.button>
        )}
      </AnimatePresence>

      <QRModal 
        isOpen={qrModal.open}
        onClose={() => setQrModal({ ...qrModal, open: false })}
        title={qrModal.title}
        qrUrl={qrModal.url}
        lang={lang}
      />

      <HonorsModal 
        isOpen={honorsModalOpen}
        onClose={() => setHonorsModalOpen(false)}
        lang={lang}
      />

      <ImageModal 
        isOpen={imageModal.open}
        onClose={() => setImageModal({ ...imageModal, open: false })}
        images={imageModal.images}
        currentIndex={imageModal.index}
        setCurrentIndex={(idx) => setImageModal({ ...imageModal, index: idx })}
        lang={lang}
      />
    </div>
  );
};

export default LandingPage;
