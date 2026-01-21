import { useEffect, useRef } from "react";

const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimize for no alpha if background is solid
    if (!ctx) return;

    // Use Intersection Observer to pause animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(canvas);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const setSize = () => {
      canvas.width = width;
      canvas.height = height;
    };
    setSize();

    // Type definition for Particle
    interface ParticleInterface {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      update(): void;
      draw(): void;
    }

    const particles: ParticleInterface[] = [];
    const particleCount = width < 768 ? 20 : 50;
    const connectionDistance = 150;
    const mouseDistance = 200;

    let mouse = { x: -1000, y: -1000 };

    class Particle implements ParticleInterface {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 1;
        const colors = ["rgba(167, 139, 250, ", "rgba(34, 211, 238, "];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseDistance - distance) / mouseDistance;
          const directionX = forceDirectionX * force * 2;
          const directionY = forceDirectionY * force * 2;

          this.x -= directionX;
          this.y -= directionY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + "0.8)";
        ctx.fill();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!isVisibleRef.current) {
        return;
      }

      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistance * connectionDistance) {
            const distance = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(167, 139, 250, ${
              1 - distance / connectionDistance
            })`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
      requestRef.current = requestAnimationFrame(animate);
    };

    init();

    const startAnimation = () => {
      if (requestRef.current === null) {
        // Check for null
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    const stopAnimation = () => {
      if (requestRef.current !== null) {
        // Check for null
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      });
    };

    // Create new observer for the visibility toggle
    const intersectionObserver = new IntersectionObserver(observerCallback, {
      threshold: 0.01,
    });
    intersectionObserver.observe(canvas);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      setSize();
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isVisibleRef.current) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      stopAnimation();
      observer.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 opacity-60 pointer-events-none" // pointer-events-none to let clicks pass through if needed,
      // but wait, mouse interaction needs events?
      // The original code used window.mousemove, so pointer-events-none is safe
      // and good for scrolling perf.
    />
  );
};

export default ParticleNetwork;
