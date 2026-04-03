import React, { useEffect, useRef } from 'react';

export const AnimatedGrids: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-between items-center w-full">
      <GridCanvas type="wave" />
      <GridCanvas type="frequency" />
      <GridCanvas type="scatter" />
    </div>
  );
};

const GridCanvas: React.FC<{ type: 'wave' | 'frequency' | 'scatter' }> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Grid configuration
    const cols = 22;
    const rows = 12;
    const size = 8;
    const gap = 3;
    const width = cols * (size + gap);
    const height = rows * (size + gap);

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    let animationFrameId: number;
    let time = 0;

    // Pre-generate some random offsets for the scatter plot to make it look persistent but moving
    const scatterPoints = Array.from({ length: cols * rows }, () => ({
      x: Math.random() * cols,
      y: Math.random() * rows,
      speedX: (Math.random() - 0.5) * 0.05,
      speedY: (Math.random() - 0.5) * 0.05,
      hue: Math.random() > 0.7 ? 0 : (Math.random() > 0.4 ? 30 : 50), // Red, orange, yellow
      life: Math.random() * Math.PI * 2
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.03; // Slower, more elegant animation

      // Draw base grid
      ctx.fillStyle = '#1a1a1c';
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * (size + gap);
          const y = j * (size + gap);
          ctx.fillRect(x, y, size, size);
        }
      }

      // Draw active elements
      if (type === 'wave') {
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            // Complex wave function for a flowing ribbon effect
            const wave1 = Math.sin(i * 0.3 - time * 2) * 2;
            const wave2 = Math.cos(i * 0.2 - time * 1.5) * 1.5;
            const waveY = rows / 2 + wave1 + wave2;
            
            const dist = Math.abs(j - waveY);
            if (dist < 2.5) {
              const active = Math.max(0, 1 - dist / 2.5);
              if (active > 0) {
                const x = i * (size + gap);
                const y = j * (size + gap);
                // Gradient from blue to purple
                const hue = 220 + (i / cols) * 60; 
                ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${active})`;
                ctx.fillRect(x, y, size, size);
              }
            }
          }
        }
      } else if (type === 'frequency') {
        for (let i = 0; i < cols; i++) {
          // Animated equalizer bars
          const noise = Math.sin(i * 0.5 + time * 3) * Math.cos(i * 0.8 - time * 2);
          const height = Math.abs(noise) * (rows / 2 - 1) + 1;
          const center = rows / 2;
          
          for (let j = 0; j < rows; j++) {
            const dist = Math.abs(j - center + 0.5);
            if (dist < height) {
              const x = i * (size + gap);
              const y = j * (size + gap);
              // Green gradient based on distance from center
              const lightness = 60 - (dist / (rows/2)) * 30;
              const alpha = 0.4 + (1 - dist/height) * 0.6;
              ctx.fillStyle = `hsla(100, 70%, ${lightness}%, ${alpha})`;
              ctx.fillRect(x, y, size, size);
            }
          }
        }
      } else if (type === 'scatter') {
        // Update and draw scatter points
        scatterPoints.forEach(p => {
          p.x += p.speedX;
          p.y += p.speedY;
          p.life += 0.02;
          
          // Wrap around
          if (p.x < 0) p.x = cols;
          if (p.x >= cols) p.x = 0;
          if (p.y < 0) p.y = rows;
          if (p.y >= rows) p.y = 0;

          const i = Math.floor(p.x);
          const j = Math.floor(p.y);
          
          const alpha = (Math.sin(p.life) + 1) / 2; // Pulsing effect
          
          if (alpha > 0.2) {
            const x = i * (size + gap);
            const y = j * (size + gap);
            ctx.fillStyle = `hsla(${p.hue}, 90%, 55%, ${alpha})`;
            ctx.fillRect(x, y, size, size);
          }
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [type]);

  return (
    <div className="bg-stone-900/50 p-4 rounded-xl shadow-sm border border-stone-800 flex-1 flex justify-center backdrop-blur-sm">
      <canvas ref={canvasRef} className="max-w-full" />
    </div>
  );
};
