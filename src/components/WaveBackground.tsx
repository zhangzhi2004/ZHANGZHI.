import React, { useEffect, useRef, useState } from 'react';

interface WaveBackgroundProps {
  onTransitionComplete?: () => void;
}

export const WaveBackground: React.FC<WaveBackgroundProps> = ({ onTransitionComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasNotified, setHasNotified] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const startTime = Date.now();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      const time = (Date.now() - startTime) / 1000;
      
      // Animation progress for entry (3 seconds for a more snappy feel)
      const duration = 3;
      const progress = Math.min(time / duration, 1);
      
      if (progress === 1 && !hasNotified && onTransitionComplete) {
        onTransitionComplete();
        setHasNotified(true);
      }
      
      // Advanced easing: cubic-bezier(0.16, 1, 0.3, 1) equivalent
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(1 - progress, 4);

      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Background color - soft off-white with a subtle moving gradient
      const gradientX = centerX + Math.cos(time * 0.2) * (width * 0.2);
      const gradientY = centerY + Math.sin(time * 0.3) * (height * 0.2);
      const bgGradient = ctx.createRadialGradient(gradientX, gradientY, 0, centerX, centerY, Math.max(width, height));
      bgGradient.addColorStop(0, '#FDFCF9');
      bgGradient.addColorStop(0.5, '#F9F8F4');
      bgGradient.addColorStop(1, '#F5F4F0');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // 1. Line Animation Logic
      // Instead of 3D cylinders, we'll draw flowing 2D lines
      const numLines = 15;
      const lineSpacing = height / (numLines + 1);
      
      ctx.lineWidth = 1;
      
      // Dynamic color shift based on time
      const hueShift = Math.sin(time * 0.1) * 10;
      const baseColor = `hsla(${39 + hueShift}, 48%, 56%, `; // Nobel gold is roughly HSL(39, 48%, 56%)
      
      for (let i = 0; i < numLines; i++) {
        const yBase = lineSpacing * (i + 1);
        const lineProgress = Math.max(0, Math.min(1, easeProgress * 1.5 - (i / numLines) * 0.5));
        
        if (lineProgress <= 0) continue;

        ctx.beginPath();
        const amplitude = 50 * (1 - easeProgress) + 20 + Math.sin(time * 0.5 + i) * 10;
        const frequency = 0.002;
        const phase = time * 0.5 + i * 0.2;

        // Draw the line
        for (let x = 0; x <= width * lineProgress; x += 5) {
          const y = yBase + Math.sin(x * frequency + phase) * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Style the line with subtle color variation
        const opacity = 0.1 + (i / numLines) * 0.2;
        const lineHue = 39 + hueShift + (i * 2);
        ctx.strokeStyle = `hsla(${lineHue}, 48%, 56%, ${opacity * lineProgress})`;
        ctx.stroke();

        // Add some "nodes" or points on the lines for more detail
        if (lineProgress > 0.5) {
          const nodeCount = 5;
          for (let j = 0; j < nodeCount; j++) {
            const nodeX = (width / (nodeCount + 1)) * (j + 1);
            if (nodeX < width * lineProgress) {
              const nodeY = yBase + Math.sin(nodeX * frequency + phase) * amplitude;
              ctx.beginPath();
              ctx.arc(nodeX, nodeY, 2, 0, Math.PI * 2);
              ctx.fillStyle = `hsla(${lineHue}, 48%, 56%, ${0.4 * lineProgress})`;
              ctx.fill();
            }
          }
        }
      }

      // 2. Artistic Circles (keeping them but making them more 2D/minimal)
      const currentRadius = (width / 60) + (Math.max(width, height) * 0.2 - (width / 60)) * easeProgress;
      const numElements = Math.floor(5 + 10 * easeProgress);

      for (let i = 0; i < numElements; i++) {
        const angle = (i / numElements) * Math.PI * 2 + time * 0.1;
        const dist = 100 * easeProgress;
        const x = centerX + Math.cos(angle) * dist;
        const y = centerY + Math.sin(angle) * dist;

        ctx.beginPath();
        ctx.arc(x, y, currentRadius * (1 - i / numElements * 0.5), 0, Math.PI * 2);
        
        const circleOpacity = (0.05 * (1 - i / numElements)) * easeProgress;
        const circleHue = 39 + hueShift + (i * 5);
        ctx.fillStyle = `hsla(${circleHue}, 48%, 56%, ${circleOpacity})`;
        ctx.fill();
        
        ctx.strokeStyle = `hsla(${circleHue}, 48%, 56%, ${circleOpacity * 2})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // 8. Final Visual Polish: Subtle Grain & Depth
      const overlayGradient = ctx.createLinearGradient(0, 0, width, height);
      overlayGradient.addColorStop(0, 'rgba(249, 248, 244, 0)');
      overlayGradient.addColorStop(0.5, `rgba(249, 248, 244, ${0.05 * easeProgress})`);
      overlayGradient.addColorStop(1, 'rgba(249, 248, 244, 0)');
      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hasNotified, onTransitionComplete]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
