import React, { useEffect, useRef } from 'react';

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Canvas setup
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        // Use a mix of primary color (#19e6bd) and some dimmer variants
        const colors = ['rgba(25, 230, 189, 0.8)', 'rgba(25, 230, 189, 0.3)', 'rgba(199, 209, 209, 0.2)'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.min((canvas.width * canvas.height) / 15000, 100);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(25, 230, 189, ${0.1 - distance / 1500})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid background (subtle)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      // We don't draw the grid every frame for performance, just use CSS background for that
      
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px]" />
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-60"
        style={{ background: 'transparent' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
    </div>
  );
};

export default BackgroundAnimation;