
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CalendarDays, Timer, ChevronRight, SlidersHorizontal, Search, Library, X, ArrowDownUp, Maximize2, AtSign, Github, MessageCircle, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageModal, QRModal } from '../components/UIComponents';
import { ImageGrid } from '../components/ImageGrid';

interface Article {
  id: number;
  title: string;
  date: string;
  category: string;
  tag: string;
  tags: string[];
  readTime: string;
  image: string;
  desc: string;
  url?: string;
  location?: string;
  camera?: string;
  longDesc?: string;
}

const articles: Article[] = [
  // LIFE CATEGORY (10 items)
  {
    id: 6,
    title: '蔚蓝之界',
    date: '2026-03-05',
    category: 'life',
    tag: 'LIFE',
    tags: ['生活', '摄影', '旅行'],
    readTime: 'Photo Collection',
    image: '/images/life_1.jpg',
    desc: '凌晨四点的青岛海边，在日出前赶到，看第一缕阳光穿透云层，海浪在脚下低语。',
    location: 'Qingdao, China',
    camera: 'Sony A7RIV | 35mm f/1.4'
  },
  {
    id: 7,
    title: '垂直森林',
    date: '2026-03-04',
    category: 'life',
    tag: 'LIFE',
    tags: ['生活', '建筑'],
    readTime: 'Photo Collection',
    image: '/images/life_2.jpg',
    desc: '钢筋水泥里的呼吸口，记录那些在繁忙都市中顽强生长的绿意与光影。',
    location: 'Shanghai, China',
    camera: 'Fujifilm X-T4 | 23mm f/2'
  },
  {
    id: 8,
    title: '纸间温度',
    date: '2026-03-03',
    category: 'life',
    tag: 'LIFE',
    tags: ['生活', '阅读'],
    readTime: 'Photo Collection',
    image: '/images/life_3.jpg',
    desc: '独处的午后时光，一杯手冲咖啡，一本未读完的书，在文字里寻找片刻的宁静。',
    location: 'Home Library',
    camera: 'iPhone 15 Pro'
  },
  {
    id: 9,
    title: '苏州旧梦',
    date: '2026-03-02',
    category: 'life',
    tag: 'LIFE',
    tags: ['生活', '人文'],
    readTime: 'Photo Collection',
    image: '/images/life_4.jpg',
    desc: '姑苏城外的慢镜头，记录老街巷弄里即将消失的传统与那些被时光遗忘的瞬间。',
    location: 'Old Town, Suzhou',
    camera: 'Leica Q2'
  },
  {
    id: 10,
    title: '瞬息万变',
    date: '2026-03-01',
    category: 'life',
    tag: 'LIFE',
    tags: ['生活', '自然'],
    readTime: 'Photo Collection',
    image: '/images/life_5.jpg',
    desc: '暴雨过后的山间馈赠，彩虹横跨天际，那是大自然在洗礼后最温柔的告白。',
    location: 'Mountain View',
    camera: 'Sony A7RIV | 16-35mm f/2.8'
  },
  {
    id: 11,
    title: '烟火人间',
    date: '2026-02-28',
    category: 'life',
    tag: 'LIFE',
    tags: ['生活', '美食'],
    readTime: 'Photo Collection',
    image: '/images/life_6.jpg',
    desc: '凌晨一点的街角面馆，忙碌一天后的胃藉，是那一碗热气腾腾的市井烟火。',
    location: 'Local Bistro',
    camera: 'Fujifilm X-T4'
  },
  {
    id: 12,
    title: '暖冬光影',
    date: '2026-02-27',
    category: 'life',
    tag: 'LIFE',
    tags: ['生活', '光影'],
    readTime: 'Photo Collection',
    image: '/images/life_7.jpg',
    desc: '窗台上的慵懒午后，阳光洒在旧木桌上，猫咪在打盹，岁月在此刻变得缓慢而静好。',
    location: 'Living Room',
    camera: 'Sony A7RIV'
  },
  {
    id: 13,
    title: '云端漫步',
    date: '2026-02-26',
    category: 'life',
    tag: 'LIFE',
    tags: ['生活', '探险'],
    readTime: 'Photo Collection',
    image: '/images/life_8.jpg',
    desc: '黄山之巅的静谧，迷失在翻涌的云海中，感受大山深处那份不被打扰的威严。',
    location: 'Yellow Mountain',
    camera: 'DJI Mavic 3'
  },
  {
    id: 14,
    title: '艺术共鸣',
    date: '2026-02-25',
    category: 'life',
    tag: 'LIFE',
    tags: ['生活', '艺术'],
    readTime: 'Photo Collection',
    image: '/images/life_9.jpg',
    desc: '在UCCA寻找自我，现代艺术的线条与色彩，在寂静的展厅中与灵魂进行一场无声对话。',
    location: 'UCCA Center',
    camera: 'Leica Q2'
  },
  {
    id: 15,
    title: '银河彼岸',
    date: '2026-02-24',
    category: 'life',
    tag: 'LIFE',
    tags: ['生活', '星空'],
    readTime: 'Photo Collection',
    image: '/images/life_10.jpg',
    desc: '戈壁滩上的星空露营，仰望浩瀚银河，人类渺小如尘埃，却在探索中变得伟大。',
    location: 'Desert Camp',
    camera: 'Sony A7RIV | 14mm f/1.8'
  },
  // ARCHIVE CATEGORY (10 items)
  {
    id: 16,
    title: '故宫红墙',
    date: '2026-02-20',
    category: 'records',
    tag: 'ARCHIVE',
    tags: ['记录', '历史'],
    readTime: 'Photo Collection',
    image: '/images/archive_1.jpg',
    desc: '岁月留下的斑驳印记，那一抹朱红在斜阳下，诉说着紫禁城六百年的风霜与荣耀。',
    location: 'Forbidden City, Beijing',
    camera: 'Sony A7RIV'
  },
  {
    id: 17,
    title: '钢铁余温',
    date: '2026-02-19',
    category: 'records',
    tag: 'ARCHIVE',
    tags: ['记录', '工业'],
    readTime: 'Photo Collection',
    image: '/images/archive_2.jpg',
    desc: '798工厂的工业记忆，废弃的管道与锈迹，是时代变迁在钢铁躯壳上刻下的勋章。',
    location: '798 Art District',
    camera: 'Fujifilm X-T4'
  },
  {
    id: 18,
    title: '故里旧事',
    date: '2026-02-18',
    category: 'records',
    tag: 'ARCHIVE',
    tags: ['记录', '情感'],
    readTime: 'Photo Collection',
    image: '/images/archive_3.jpg',
    desc: '记忆中那架老秋千，老屋前的欢声笑语已随风而去，唯有光影记录下那段无忧的童年。',
    location: 'Hometown',
    camera: 'iPhone 15 Pro'
  },
  {
    id: 19,
    title: '匠心独运',
    date: '2026-02-17',
    category: 'records',
    tag: 'ARCHIVE',
    tags: ['记录', '文化'],
    readTime: 'Photo Collection',
    image: '/images/archive_4.jpg',
    desc: '正在消失的手工艺，指尖上的艺术在匠人手中延续，那是对传统的坚守与对美的执着。',
    location: 'Intangible Heritage Center',
    camera: 'Leica Q2'
  },
  {
    id: 20,
    title: '沪上繁华',
    date: '2026-02-16',
    category: 'records',
    tag: 'ARCHIVE',
    tags: ['记录', '城市'],
    readTime: 'Photo Collection',
    image: '/images/archive_5.jpg',
    desc: '外滩天际线的百年变迁，华灯初上，记录这座魔都最璀璨的瞬间与永恒的律动。',
    location: 'The Bund, Shanghai',
    camera: 'Sony A7RIV'
  },
  {
    id: 21,
    title: '荒野律动',
    date: '2026-02-15',
    category: 'records',
    tag: 'ARCHIVE',
    tags: ['记录', '自然'],
    readTime: 'Photo Collection',
    image: '/images/archive_6.jpg',
    desc: '国家公园的原始交响，森林里的每一次呼吸，都是生命最原始、最震撼的律动。',
    location: 'National Park',
    camera: 'Sony A7RIV'
  },
  {
    id: 22,
    title: '筑梦人',
    date: '2026-02-14',
    category: 'records',
    tag: 'ARCHIVE',
    tags: ['记录', '人文'],
    readTime: 'Photo Collection',
    image: '/images/archive_7.jpg',
    desc: '记录平凡生活中的不凡，每一个专注的眼神，每一滴汗水，都是对生活的最高致敬。',
    location: 'Construction Site',
    camera: 'Fujifilm X-T4'
  },
  {
    id: 23,
    title: '实验室之光',
    date: '2026-02-13',
    category: 'records',
    tag: 'ARCHIVE',
    tags: ['记录', '科技'],
    readTime: 'Photo Collection',
    image: '/images/archive_8.jpg',
    desc: '探索未知的微观边界，蓝色的荧光在试管中跳跃，那是人类通往未来的智慧之光。',
    location: 'Tech Lab',
    camera: 'Leica Q2'
  },
  {
    id: 24,
    title: '物之静谧',
    date: '2026-02-12',
    category: 'records',
    tag: 'ARCHIVE',
    tags: ['记录', '艺术'],
    readTime: 'Photo Collection',
    image: '/images/archive_9.jpg',
    desc: '影棚里的光影实验，微观世界里的秩序，让平凡之物在镜头下展现出雕塑般的质感。',
    location: 'Studio',
    camera: 'Sony A7RIV | 90mm Macro'
  },
  {
    id: 25,
    title: '车站归途',
    date: '2026-02-11',
    category: 'records',
    tag: 'ARCHIVE',
    tags: ['记录', '情感'],
    readTime: 'Photo Collection',
    image: '/images/archive_10.jpg',
    desc: '每一个终点都是起点，在人潮拥挤的站台，记录那些关于离别、重逢与回家的故事。',
    location: 'Railway Station',
    camera: 'iPhone 15 Pro'
  },
  {
    id: 26,
    title: '当世界急于“脱钩”，春晚却唱起《We Are the World》',
    date: '2026-02-17',
    category: 'society',
    tag: 'SOCIETY',
    tags: ['社会', '文化', '春晚'],
    readTime: 'Read on WeChat',
    image: '/images/article_society.png',
    desc: '在充满变数的时代，春晚舞台上的一曲合唱，唤起了人们对全球化与和平的共鸣。',
    url: 'https://mp.weixin.qq.com/s/gSuRXgO0LDZhtLWtT8A6bg'
  },
  {
    id: 27,
    title: '茶颜悦色终于要出远门，但外面的世界已经不需要它了',
    date: '2026-02-13',
    category: 'business',
    tag: 'BUSINESS',
    tags: ['商业', '品牌', '新消费'],
    readTime: 'Read on WeChat',
    image: '/images/article_business.png',
    desc: '曾经的网红茶饮品牌，在激烈的市场竞争中，能否走出舒适区，迎接新的挑战？',
    url: 'https://mp.weixin.qq.com/s/se9tpe750fBbJpuIRODMqA'
  },
  {
    id: 28,
    title: '联合国，正在成为世界的“摆设”?',
    date: '2026-03-09',
    category: 'hot',
    tag: 'TRENDS',
    tags: ['热点', '国际政治', '联合国'],
    readTime: 'Read on WeChat',
    image: '/images/article_hot.png',
    desc: '面对日益复杂的国际局局势，联合国的地位与作用正面临前所未有的质疑与考验。',
    url: 'https://mp.weixin.qq.com/s/XN-MJ0u81bNt4iNWY0Uj5g'
  },
  {
    id: 29,
    title: '希音不再“避嫌”：中国出海企业的系统性转向？',
    date: '2026-03-23',
    category: 'business',
    tag: 'BUSINESS',
    tags: ['商业', '出海', '希音'],
    readTime: 'Read on WeChat',
    image: '/images/article_shein.png',
    desc: '从低调潜行到主动出击，希音的策略转变折射出中国出海企业在全球化新阶段的系统性思考。',
    url: 'https://mp.weixin.qq.com/s/DLK3VCrVSmh6YEuCLsOwmg'
  },
  {
    id: 30,
    title: '远在中东的炮火，是怎么烧到日本超市货架上的？',
    date: '2026-03-19',
    category: 'society',
    tag: 'SOCIETY',
    tags: ['社会', '国际', '供应链'],
    readTime: 'Read on WeChat',
    image: '/images/article_supply_chain.png',
    desc: '地缘政治的蝴蝶效应：全球化分工下，远方的冲突如何通过错综复杂的供应链影响到普通人的日常生活。',
    url: 'https://mp.weixin.qq.com/s/jvUfroV5CdnivClSofZbcg'
  },
  {
    id: 31,
    title: 'F1：为什么我们，总会偏爱那份独树一帜的勇敢',
    date: '2026-03-15',
    category: 'hot',
    tag: 'TRENDS',
    tags: ['热点', '体育', 'F1'],
    readTime: 'Read on WeChat',
    image: '/images/article_f1.png',
    desc: '在极致的速度与竞技中，那些敢于挑战常规、坚持自我的瞬间，才是赛车运动最动人的核心。',
    url: 'https://mp.weixin.qq.com/s/Vjj136ye9qAO1P1sRzt1fQ'
  },
  {
    id: 32,
    title: '口香糖还在出新，但咀嚼的理由没了',
    date: '2026-03-11',
    category: 'business',
    tag: 'BUSINESS',
    tags: ['商业', '消费', '口香糖'],
    readTime: 'Read on WeChat',
    image: '/images/article_gum.png',
    desc: '社交方式的改变与功能性替代品的出现，让曾经的收银台霸主口香糖正面临一场深刻的消费危机。',
    url: 'https://mp.weixin.qq.com/s/7VMzpMBjWI5cFCq1S-CKTg'
  },
  {
    id: 33,
    title: '“小激励”撬动“大内需”：有奖发票试点的市场效应与长远考量',
    date: '2026-03-04',
    category: 'business',
    tag: 'BUSINESS',
    tags: ['商业', '政策', '内需'],
    readTime: 'Read on WeChat',
    image: '/images/article_invoice.png',
    desc: '通过税收手段激发消费活力，有奖发票试点的背后是国家对提振内需、规范市场的深层布局。',
    url: 'https://mp.weixin.qq.com/s/STC2IrA9x6bbiPEXdo7zwQ'
  },
  {
    id: 34,
    title: '春节档遇冷背后，藏着怎样的大众情绪变迁？',
    date: '2026-02-27',
    category: 'society',
    tag: 'SOCIETY',
    tags: ['社会', '文化', '电影'],
    readTime: 'Read on WeChat',
    image: '/images/article_movie.png',
    desc: '票房数字的起伏不仅是电影市场的晴雨表，更是当下社会大众心理状态与文化消费习惯变迁的缩影。',
    url: 'https://mp.weixin.qq.com/s/pUTekS42mjRZ9cYDnXNs4A'
  },
  {
    id: 35,
    title: '“有家就有佛山造”，如今家还在，佛山怎么了？',
    date: '2026-02-24',
    category: 'society',
    tag: 'SOCIETY',
    tags: ['社会', '产业', '佛山'],
    readTime: 'Read on WeChat',
    image: '/images/article_foshan.png',
    desc: '作为中国制造业的重镇，佛山在产业转型升级的阵痛中，正努力寻找传统优势与未来赛道的新平衡。',
    url: 'https://mp.weixin.qq.com/s/HYL08MDxB12ci7nVzB1a1A'
  },
  {
    id: 36,
    title: '从微信到抖音：年轻人的社交空间是否也在随之转移？',
    date: '2026-02-15',
    category: 'hot',
    tag: 'TRENDS',
    tags: ['热点', '社交', '互联网'],
    readTime: 'Read on WeChat',
    image: '/images/article_social.png',
    desc: '社交媒介的迭代不仅是工具的更换，更意味着社交逻辑、自我表达方式以及人际关系形态的重塑。',
    url: 'https://mp.weixin.qq.com/s/VcY8whDNzpBxVFf1LtLjGw'
  }
];

interface ArticlesPageProps {
  lang: 'zh' | 'en';
  setLang: (lang: 'zh' | 'en') => void;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ lang, setLang }) => {
  const categories = [
    { id: 'all', name: lang === 'zh' ? '全部' : 'ALL', count: 31 },
    { id: 'society', name: lang === 'zh' ? 'SOCIETY | 社会' : 'SOCIETY', count: 4 },
    { id: 'business', name: lang === 'zh' ? 'BUSINESS | 商业' : 'BUSINESS', count: 4 },
    { id: 'hot', name: lang === 'zh' ? 'TRENDS | 热点' : 'TRENDS', count: 3 },
    { id: 'life', name: lang === 'zh' ? 'LIFE | 生活' : 'LIFE', count: 10 },
    { id: 'records', name: lang === 'zh' ? 'ARCHIVE | 记录' : 'ARCHIVE', count: 10 },
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [qrModal, setQrModal] = useState<{ open: boolean, title: string, url: string }>({ open: false, title: '', url: '' });
  const [imageModal, setImageModal] = useState<{ open: boolean, images: string[], index: number, metadata: any[] }>({ 
    open: false, 
    images: [], 
    index: 0,
    metadata: []
  });

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = activeTag === null || article.tags.includes(activeTag);
    return matchesCategory && matchesSearch && matchesTag;
  }).sort((a, b) => {
    if (activeCategory === 'all') {
      const isImageA = a.category === 'life' || a.category === 'records';
      const isImageB = b.category === 'life' || b.category === 'records';
      
      if (isImageA !== isImageB) {
        return isImageA ? 1 : -1; // Articles first, then images
      }
    }
    
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const renderArticleCard = (article: Article, index: number) => (
    <motion.article
      key={article.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => article.url && window.open(article.url, '_blank')}
      className="group bg-white rounded-[2rem] border border-stone-100 p-5 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-6 hover:shadow-2xl hover:shadow-stone-200/50 hover:border-nobel-gold/20 transition-all duration-500 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden relative sm:w-2/5">
        {article.image ? (
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://picsum.photos/seed/${article.id}/800/450`;
            }}
          />
        ) : (
          <div className="w-full h-full bg-stone-100 flex items-center justify-center">
            <Library size={48} className="text-stone-300 opacity-20" />
          </div>
        )}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-lg uppercase hover:bg-nobel-gold transition-colors duration-300 shadow-sm hover:shadow-md cursor-pointer"
        >
          {article.tag}
        </motion.div>
        <div className="absolute inset-0 bg-nobel-gold/0 group-hover:bg-nobel-gold/10 transition-colors duration-500"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center py-2 md:w-3/5">
        <h2 className="text-xl md:text-2xl font-bold text-stone-900 mb-4 group-hover:text-nobel-gold transition-colors leading-tight">
          {article.title}
        </h2>
        <p className="text-stone-500 text-sm line-clamp-2 mb-6 leading-relaxed">
          {article.desc}
        </p>
        <div className="mt-auto flex flex-col gap-4 pt-4 border-t border-stone-50">
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                key={tag}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveTag(tag === activeTag ? null : tag);
                }}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase transition-colors ${
                  activeTag === tag 
                    ? 'bg-nobel-gold text-white shadow-md shadow-nobel-gold/20' 
                    : 'bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-900 hover:shadow-sm'
                }`}
              >
                # {tag}
              </motion.button>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-stone-400 text-xs font-mono">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={12} /> {article.date}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-stone-400 text-xs font-medium group-hover:text-nobel-gold transition-colors">
              <Timer size={12} /> {article.readTime}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 font-sans selection:bg-nobel-gold/30">
      {/* Header Section */}
      <header className="pt-20 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-nobel-gold/20 blur-[100px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-stone-200 blur-[100px]"></div>
        </div>

        <div className="container mx-auto text-center relative z-10 pt-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 md:mb-6 text-stone-900 tracking-tight"
          >
            {lang === 'zh' ? '文章' : 'Articles'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-stone-500 text-base sm:text-lg md:text-xl font-light font-serif tracking-widest"
          >
            {lang === 'zh' ? '以经济视角洞察商业本质，用设计语言记录生活温度。' : 'Insights into business essence through an economic lens, recording life\'s warmth through design language.'}
          </motion.p>
        </div>
      </header>

      <main className="container mx-auto px-6 pb-24">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 space-y-6 lg:space-y-8">
              <div>
                <h3 className="flex items-center gap-3 text-sm font-bold tracking-[0.2em] uppercase text-stone-900 mb-4 lg:mb-6">
                  <div className="p-1.5 bg-nobel-gold/10 rounded-md border border-nobel-gold/20 shadow-sm">
                    <SlidersHorizontal size={16} className="text-nobel-gold" />
                  </div>
                  {lang === 'zh' ? '分类' : 'Categories'}
                </h3>
                <nav className="flex overflow-x-auto pb-4 lg:pb-0 lg:flex-col gap-2 lg:gap-0 lg:space-y-2 scrollbar-hide">
                  {categories.map((cat) => (
                    <motion.button
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`flex-shrink-0 lg:w-full flex items-center justify-between px-5 py-3 lg:py-3 rounded-2xl lg:rounded-xl transition-all duration-300 group ${
                        activeCategory === cat.id 
                          ? 'bg-stone-900 text-white shadow-lg shadow-stone-900/10' 
                          : 'hover:bg-stone-200/50 text-stone-500 hover:text-stone-900 bg-white lg:bg-transparent border lg:border-none border-stone-200'
                      }`}
                    >
                      <span className="text-sm font-bold lg:font-medium mr-3 lg:mr-0 tracking-wide lg:tracking-normal">{cat.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                        activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-400 group-hover:bg-stone-300 group-hover:text-stone-700'
                      }`}>
                        {cat.count}
                      </span>
                    </motion.button>
                  ))}
                </nav>
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-nobel-gold transition-colors">
                  <Search size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder={lang === 'zh' ? '搜索文章...' : 'Search articles...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-nobel-gold/20 focus:border-nobel-gold transition-all shadow-sm group-focus-within:shadow-md"
                />
              </div>
            </div>
          </aside>

          {/* Article List */}
          <section className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6 lg:mb-8 pb-4 border-b border-stone-200">
              <div className="flex flex-wrap items-center gap-2 lg:gap-4">
                <div className="text-stone-400 text-sm font-medium">
                  <span className="text-stone-900 font-bold">{filteredArticles.length}</span> {lang === 'zh' ? '篇文章' : 'Articles'}
                </div>
                {(activeCategory === 'life' || activeCategory === 'records') && (
                  <div className="flex bg-stone-100 p-1 rounded-lg ml-2">
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                    >
                      Grid
                    </button>
                    <button 
                      onClick={() => setViewMode('timeline')}
                      className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-md transition-all ${viewMode === 'timeline' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-600'}`}
                    >
                      Timeline
                    </button>
                  </div>
                )}
                {activeTag && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-nobel-gold/10 text-nobel-gold rounded-full text-xs font-bold">
                    <span># {activeTag}</span>
                    <button 
                      onClick={() => setActiveTag(null)} 
                      className="hover:text-stone-900 transition-colors"
                      aria-label="Clear tag filter"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
              <div 
                className="flex items-center gap-2 text-stone-400 text-sm cursor-pointer hover:text-stone-900 transition-colors"
                onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
              >
                <ArrowDownUp size={14} />
                <span>{lang === 'zh' ? '时间排序' : 'Sort by Date'}</span>
                <motion.span animate={{ rotate: sortOrder === 'desc' ? 0 : 180 }} transition={{ duration: 0.3 }}>
                    <ChevronRight size={14} className="rotate-90" />
                </motion.span>
              </div>
            </div>

            <div className={activeCategory === 'life' || activeCategory === 'records' ? "w-full" : "space-y-6"}>
              <AnimatePresence mode="popLayout">
                {activeCategory === 'life' || activeCategory === 'records' ? (
                  <motion.div
                    key={`${activeCategory}-${viewMode}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-4"
                  >
                    {viewMode === 'grid' ? (
                      <ImageGrid 
                        articles={filteredArticles} 
                        onImageClick={(idx) => setImageModal({ 
                          open: true, 
                          images: filteredArticles.map(a => a.image), 
                          index: idx,
                          metadata: filteredArticles
                        })}
                      />
                    ) : (
                      <div className="space-y-12 relative before:absolute before:left-[17px] before:top-0 before:bottom-0 before:w-px before:bg-stone-200">
                        {filteredArticles.map((article, idx) => (
                          <motion.div 
                            key={article.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative pl-12 group"
                          >
                            <div className="absolute left-0 top-2 w-9 h-9 rounded-full bg-white border-2 border-nobel-gold flex items-center justify-center z-10 shadow-sm group-hover:scale-110 transition-transform">
                              <div className="w-2 h-2 rounded-full bg-nobel-gold"></div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-[2rem] border border-stone-100 hover:shadow-xl transition-all duration-500 cursor-pointer" onClick={() => setImageModal({ open: true, images: filteredArticles.map(a => a.image), index: idx, metadata: filteredArticles })}>
                              <div className="w-full md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden">
                                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" loading="lazy" />
                              </div>
                              <div className="flex-1">
                                <span className="text-[10px] font-bold tracking-[0.2em] text-nobel-gold uppercase mb-2 block">{article.date}</span>
                                <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-nobel-gold transition-colors">{article.title}</h3>
                                <p className="text-stone-500 text-sm leading-relaxed mb-4">{article.desc}</p>
                                <div className="flex items-center gap-4 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                  {article.location && <span>📍 {article.location}</span>}
                                  {article.camera && <span>📷 {article.camera}</span>}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ) : activeCategory === 'all' ? (
                  <div className="space-y-12">
                    {/* Text Articles Section */}
                    <div className="space-y-6">
                      {filteredArticles.filter(a => a.category !== 'life' && a.category !== 'records').map((article, index) => 
                        renderArticleCard(article, index)
                      )}
                    </div>

                    {/* Images Section */}
                    {filteredArticles.some(a => a.category === 'life' || a.category === 'records') && (
                      <div className="pt-12 border-t border-stone-200">
                        <div className="flex items-center gap-4 mb-8">
                          <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-stone-400">生活与记录 | Life & Archive</h3>
                          <div className="h-px flex-1 bg-stone-200/60"></div>
                        </div>
                        <ImageGrid 
                          articles={filteredArticles.filter(a => a.category === 'life' || a.category === 'records')} 
                          onImageClick={(idx) => {
                            const imagesOnly = filteredArticles.filter(a => a.category === 'life' || a.category === 'records');
                            setImageModal({ 
                              open: true, 
                              images: imagesOnly.map(a => a.image), 
                              index: idx,
                              metadata: imagesOnly
                            });
                          }}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  filteredArticles.map((article, index) => renderArticleCard(article, index))
                )}
              </AnimatePresence>

              {filteredArticles.length === 0 && (
                <div className="py-24 text-center">
                  <div className="text-stone-300 mb-4">
                    <Search size={48} className="mx-auto opacity-20" />
                  </div>
                  <p className="text-stone-400 font-medium">没有找到相关文章</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 relative">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2 tracking-widest inline-block">
                  ZHANGZHI
                </div>
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

      {/* QR Modal */}
      <QRModal 
        isOpen={qrModal.open}
        onClose={() => setQrModal({ ...qrModal, open: false })}
        title={qrModal.title}
        qrUrl={qrModal.url}
        lang={lang}
      />

      {/* Image Modal */}
      <ImageModal 
        isOpen={imageModal.open}
        onClose={() => setImageModal({ ...imageModal, open: false })}
        images={imageModal.images}
        currentIndex={imageModal.index}
        setCurrentIndex={(idx) => setImageModal({ ...imageModal, index: idx })}
        lang={lang === 'zh' ? 'zh' : 'en'}
        metadata={imageModal.metadata}
      />
    </div>
  );
};

export default ArticlesPage;
