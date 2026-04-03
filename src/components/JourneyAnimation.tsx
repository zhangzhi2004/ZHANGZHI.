import React, { useEffect, useRef } from 'react';

export const JourneyAnimation: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize);
    resize();

    const particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];
    const maxParticles = 40;

    const draw = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      ctx.clearRect(0, 0, width, height);
      time += 0.008; // Slightly faster for more energy

      // 1. Draw multiple layers of flowing background lines with more visibility
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        const yOffset = height * (0.15 + i * 0.1);
        const opacity = 0.03 + (i % 3) * 0.04;
        ctx.strokeStyle = `rgba(197, 160, 89, ${opacity})`;
        ctx.lineWidth = i % 2 === 0 ? 1 : 0.5;

        for (let x = 0; x <= width; x += 10) {
          const y = yOffset + 
                    Math.sin(x * 0.003 + time + i) * 30 + 
                    Math.cos(x * 0.001 - time * 0.3) * 15;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // 2. Enhanced Particles (Sparks)
      if (particles.length < 60 && Math.random() < 0.1) {
        particles.push({
          x: -20,
          y: Math.random() * height,
          vx: 0.8 + Math.random() * 2,
          vy: (Math.random() - 0.5) * 0.4,
          life: 1,
          color: Math.random() > 0.3 ? 'rgba(197, 160, 89, 0.6)' : 'rgba(28, 25, 23, 0.2)'
        });
      }

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy + Math.sin(time * 2 + p.x * 0.02) * 0.8;
        p.life -= 0.002;

        if (p.x > width + 20 || p.life <= 0) {
          particles.splice(i, 1);
          return;
        }

        // Draw particle with a small glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5 * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Dynamic trail
        ctx.beginPath();
        ctx.moveTo(p.x - p.vx * 15 * p.life, p.y - p.vy * 15 * p.life);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = p.color.replace(/[\d.]+\)$/, `${0.2 * p.life})`);
        ctx.lineWidth = 1 * p.life;
        ctx.stroke();
      });

      // 3. Central "Main Path" with Glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(197, 160, 89, 0.3)';
      
      ctx.beginPath();
      ctx.lineWidth = 2;
      const mainGradient = ctx.createLinearGradient(0, 0, width, 0);
      mainGradient.addColorStop(0, 'rgba(197, 160, 89, 0)');
      mainGradient.addColorStop(0.2, 'rgba(197, 160, 89, 0.4)');
      mainGradient.addColorStop(0.5, 'rgba(197, 160, 89, 0.6)');
      mainGradient.addColorStop(0.8, 'rgba(197, 160, 89, 0.4)');
      mainGradient.addColorStop(1, 'rgba(197, 160, 89, 0)');
      ctx.strokeStyle = mainGradient;

      ctx.moveTo(0, height / 2);
      for (let x = 0; x <= width; x += 5) {
        const y = height / 2 + 
                  Math.sin(x * 0.004 + time * 1.2) * 40 + 
                  Math.cos(x * 0.008 - time * 0.6) * 25;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      
      ctx.shadowBlur = 0; // Reset shadow for next elements

      // 4. Add "Milestone Nodes" on the main path
      for (let i = 1; i < 6; i++) {
        const nodeX = (width / 6) * i;
        const nodeY = height / 2 + 
                      Math.sin(nodeX * 0.004 + time * 1.2) * 40 + 
                      Math.cos(nodeX * 0.008 - time * 0.6) * 25;
        
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(197, 160, 89, 0.8)';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 6 + Math.sin(time * 3) * 2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(197, 160, 89, 0.2)';
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full ${className}`}
    />
  );
};
