import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { JourneyAnimation } from '../components/JourneyAnimation';
import { PuzzleAnimation } from '../components/PuzzleAnimation';

interface AboutPageProps {
  lang: 'zh' | 'en';
}

const AboutPage: React.FC<AboutPageProps> = ({ lang }) => {
  const t = {
    zh: {
      tag: 'About Me',
      title: '关于 ZHANGZHI',
      lead: '我是一名行走在数字经济与人文艺术交界处的探索者，致力于用数据洞察商业本质，用设计赋予技术温度。',
      journeyTag: '关于我',
      journeyTitle: '我的历程',
      journeyInitial: '你',
      journeyContent1: '好，很高兴在这里遇见你。我一直认为，数字经济不只是冷冰冰的代码和报表，它更像是一场关于“人”与“价值”的深刻对话。在我的世界里，Python 和 SQL 是我探寻真相的显微镜，而 Power BI 则是将复杂规律转化为直觉的画笔。我喜欢在宏观经济的脉络中寻找微观的切入点，用数据去讲故事，用产品去解决问题。',
      journeyContent2: '我并不想被单一的标签定义。在设计艺术中，我寻找感性的共鸣；在项目管理里，我坚守理性的秩序。从跨领域的碰撞到 Antigravity 的高效协同，我始终在追求一种“新商科”的平衡——既有商业的敏锐，又有技术的温度。我是一个持续进化的学习者，在这个充满变数的时代，我期待与你一起，去拼凑出未来的更多可能。',
      insight1: '在信息过载的当下，我坚信“洞察”比“数据”更重要。我的思维模式深受经济学逻辑的影响，强调在有限的资源中寻找最优解。无论是分析一个商业模式的闭环，还是设计一个产品的交互链路，我都在追求一种效率与美感的动态平衡。',
      insight2: '在技术工具的选择上，我偏爱那些能直接触达价值核心的利器。Python 和 SQL 让我能够穿透表象看本质，而 Power BI 则是我与世界沟通的视觉语言。对我而言，技术不应只是冰冷的工具，它应当是连接商业洞察与用户体验的桥梁。',
      quote: '设计不仅仅是外观和感觉。设计是它的工作原理。',
      beliefsTitle: '我的核心信念',
      belief1Title: '设计驱动工程',
      belief1Desc: '优秀的代码不仅要运行良好，还要服务于卓越的用户体验。技术是实现设计的手段，而设计是技术的灵魂。',
      belief2Title: '细节决定成败',
      belief2Desc: '从一个微小的过渡动画到整体的架构设计，细节是区分平庸与卓越的关键。我致力于打磨每一个交互瞬间。',
      belief3Title: '持续进化',
      belief3Desc: '技术在变，但解决问题的本质不变。保持好奇心，不断学习，是我在快速发展的技术浪潮中保持敏锐的秘诀。',
    },
    en: {
      tag: 'About Me',
      title: 'About ZHANGZHI',
      lead: 'I am an explorer at the intersection of the digital economy and humanistic arts, dedicated to insight into business essence through data and empowering technology with warmth through design.',
      journeyTag: 'MY JOURNEY',
      journeyTitle: 'My Journey',
      journeyInitial: 'H',
      journeyContent1: 'ello, nice to meet you here. I have always believed that the digital economy is not just cold code and reports; it is more like a profound dialogue about "people" and "value." In my world, Python and SQL are my microscopes for finding the truth, while Power BI is the brush that transforms complex patterns into intuition. I like to find micro-entry points in the context of the macroeconomy, using data to tell stories and products to solve problems.',
      journeyContent2: 'I don\'t want to be defined by a single label. In design art, I look for emotional resonance; in project management, I adhere to rational order. From cross-domain collisions to high-efficiency collaboration, I have always pursued a "new business" balance—having both business acumen and technological warmth. I am a continuously evolving learner, and in this era of change, I look forward to piecing together more possibilities for the future with you.',
      insight1: 'In an era of information overload, I firmly believe that "insight" is more important than "data." My thinking mode is deeply influenced by economic logic, emphasizing finding the optimal solution within limited resources. Whether analyzing a business model loop or designing a product interaction flow, I pursue a dynamic balance between efficiency and aesthetics.',
      insight2: 'In the choice of technical tools, I prefer those that can directly reach the core of value. Python and SQL allow me to see through the surface to the essence, while Power BI is my visual language for communicating with the world. To me, technology should not just be a cold tool; it should be a bridge connecting business insights and user experience.',
      quote: 'Design is not just what it looks like and feels like. Design is how it works.',
      beliefsTitle: 'My Core Beliefs',
      belief1Title: 'Design-Driven Engineering',
      belief1Desc: 'Great code must not only run well but also serve an excellent user experience. Technology is the means to achieve design, and design is the soul of technology.',
      belief2Title: 'Details Matter',
      belief2Desc: 'From a tiny transition animation to the overall architectural design, details are the key to distinguishing mediocrity from excellence. I am dedicated to polishing every interaction moment.',
      belief3Title: 'Continuous Evolution',
      belief3Desc: 'Technology changes, but the essence of problem-solving remains the same. Staying curious and constantly learning is my secret to staying sharp in the rapidly developing wave of technology.',
    }
  }[lang];

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 font-sans selection:bg-nobel-gold/30">
      <div className="container mx-auto px-6 py-24 md:py-32 max-w-4xl relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-nobel-gold/10 blur-[100px]"></div>
            <div className="absolute bottom-[20%] left-[-10%] w-[30%] h-[30%] rounded-full bg-stone-300/30 blur-[80px]"></div>
        </div>
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-1 bg-nobel-gold"></div>
            <span className="text-nobel-gold font-bold tracking-[0.2em] uppercase text-sm">{t.tag}</span>
          </div>
          <h1 className={`font-serif text-stone-900 mb-8 md:mb-12 tracking-tight ${lang === 'en' ? 'text-4xl sm:text-6xl md:text-7xl' : 'text-5xl sm:text-6xl md:text-7xl'}`}>{t.title}</h1>
          
          <div className="prose prose-stone prose-lg max-w-none">
            <p className="lead text-xl sm:text-2xl text-stone-600 font-light font-serif leading-relaxed mb-8 md:mb-10">
              {t.lead}
            </p>
            
            {/* My Journey Section - Matching Screenshot */}
            <div className="my-16 md:my-24 relative">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                <div className="md:col-span-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-stone-100 rounded-full border border-stone-200 mb-6">
                    <div className="w-2 h-2 rounded-full bg-nobel-gold"></div>
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">{t.journeyTag}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className={`font-serif text-stone-900 tracking-tight ${lang === 'en' ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-4xl md:text-5xl'}`}>{t.journeyTitle}</h2>
                    <PuzzleAnimation className="w-12 h-12 md:w-16 md:h-16" />
                  </div>
                  <div className="w-24 h-1.5 bg-nobel-gold"></div>
                </div>
                <div className="md:col-span-8">
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-6xl sm:text-7xl font-serif text-nobel-gold leading-none">{t.journeyInitial}</span>
                    <p className="text-stone-700 text-base sm:text-lg leading-relaxed pt-2">
                      {t.journeyContent1}
                    </p>
                  </div>
                  <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
                    {t.journeyContent2}
                  </p>
                </div>
              </div>
              
              {/* Artistic Looping Animation in the empty space below */}
              <div className="mt-12 h-64 w-full relative rounded-3xl overflow-hidden border border-stone-100/50 bg-white/30 backdrop-blur-sm">
                <JourneyAnimation className="absolute inset-0 opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-stone-300 font-serif italic text-sm opacity-40 tracking-widest uppercase">CONTINUOUS EVOLUTION</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
                <div className="space-y-6">
                    <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
                      {t.insight1}
                    </p>
                    <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
                      {t.insight2}
                    </p>
                </div>
                <div className="bg-stone-100/50 p-6 md:p-8 rounded-3xl border border-stone-200/60 flex flex-col justify-center">
                    <div className="text-4xl font-serif text-stone-300 mb-4">"</div>
                    <p className="text-lg sm:text-xl font-serif text-stone-700 italic leading-relaxed mb-6">
                        {t.quote}
                    </p>
                    <div className="text-sm font-bold tracking-widest text-stone-400 uppercase">— Steve Jobs</div>
                </div>
            </div>

            <div className="my-12 md:my-16 p-6 md:p-10 bg-white rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-nobel-gold/5 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150"></div>
              <h3 className="text-2xl font-bold text-stone-900 mb-8 font-serif">{t.beliefsTitle}</h3>
              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-stone-50 rounded-xl text-nobel-gold shadow-sm border border-stone-100">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-stone-900 mb-2">{t.belief1Title}</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">{t.belief1Desc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-stone-50 rounded-xl text-nobel-gold shadow-sm border border-stone-100">
                    <Target size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-stone-900 mb-2">{t.belief2Title}</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">{t.belief2Desc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="p-2 bg-stone-50 rounded-xl text-nobel-gold shadow-sm border border-stone-100">
                    <Zap size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-stone-900 mb-2">{t.belief3Title}</h4>
                    <p className="text-stone-600 text-sm leading-relaxed">{t.belief3Desc}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
