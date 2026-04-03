
import React from 'react';
import { motion } from 'framer-motion';

interface ImageGridProps {
  articles: any[];
  onImageClick: (index: number) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ articles, onImageClick }) => {
  const getGridClass = (index: number) => {
    // Creating a more dynamic bento-style grid with varied aspect ratios
    const patterns = [
      'md:col-span-2 md:row-span-2 aspect-auto', // Large featured
      'aspect-square', // Standard
      'aspect-square', // Standard
      'md:col-span-2 aspect-[16/9] md:aspect-auto', // Wide
      'aspect-square', // Standard
      'md:row-span-2 aspect-auto', // Tall
      'aspect-square', // Standard
      'aspect-square', // Standard
      'md:col-span-2 aspect-auto', // Wide
      'aspect-square' // Standard
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[250px]">
      {articles.map((article, index) => (
        <motion.div
          key={article.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -12, scale: 1.01 }}
          className={`relative group cursor-pointer overflow-hidden rounded-[2.5rem] bg-stone-100 shadow-sm hover:shadow-2xl transition-all duration-700 ${getGridClass(index)}`}
          onClick={() => onImageClick(index)}
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${article.id}/1200/1200`;
            }}
          />
          
          {/* Subtle inner glow for depth */}
          <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/10 pointer-events-none"></div>
        </motion.div>
      ))}
    </div>
  );
};
