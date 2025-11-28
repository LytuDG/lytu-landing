import React, { useState, useEffect, useRef } from "react";
import {
  Code,
  Smartphone,
  Globe,
  ChevronRight,
  Menu,
  X,
  Cpu,
  ArrowRight,
} from "lucide-react";

// IMPORTANTE: Este componente usa clases de Tailwind CSS.
// Para que los estilos funcionen, debes tener Tailwind CSS instalado y configurado
// en tu proyecto React (por ejemplo, en tu archivo index.css o global.css).

// --- COMPONENTS ---

// 1. Interactive Particle Hero Background
const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Type definition for Particle (optional in JS, good practice in TS)
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      update(): void;
      draw(): void;
    }

    const particles: Particle[] = [];
    const particleCount = width < 768 ? 40 : 80;
    const connectionDistance = 150;
    const mouseDistance = 200;

    let mouse = { x: -1000, y: -1000 };

    class Particle implements Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        const colors = ["rgba(167, 139, 250, ", "rgba(34, 211, 238, "]; // Violet and Cyan
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
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
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
      requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 opacity-60"
    />
  );
};

// 2. Main Application Component
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/90 backdrop-blur-md shadow-lg py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-lg flex items-center justify-center transform rotate-3">
              <span className="font-bold text-white text-lg">L</span>
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">
              lytu<span className="text-cyan-400">.</span>
            </span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {["Servicios", "Filosofía", "Proyectos"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-slate-300 hover:text-cyan-400 transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-4 py-2 rounded-full text-sm font-medium border border-slate-700 text-white hover:border-cyan-400 transition-colors"
            >
              Acceder
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="bg-white text-slate-950 px-5 py-2 rounded-full font-bold text-sm hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              Hablemos
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col space-y-4 shadow-2xl">
            {["Servicios", "Filosofía", "Proyectos", "Contacto"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-left text-slate-300 hover:text-cyan-400 text-lg font-medium"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => setIsLoginOpen(true)}
              className="text-left text-white font-bold bg-indigo-600/80 px-4 py-2 rounded-full"
            >
              Acceder
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-950">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 via-slate-950/80 to-slate-950 z-10" />
          <ParticleNetwork />
        </div>

        <div className="container mx-auto px-6 relative z-20 pt-20 flex justify-center">
          <div className="max-w-4xl text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6 backdrop-blur-sm animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
              <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest">
                Software Development Studio
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight mb-8">
              Creamos el futuro <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                línea por línea.
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-400 mb-10 max-w-3xl leading-relaxed mx-auto">
              En <span className="text-white font-semibold">Lytu</span>,
              fusionamos ingeniería de software de alto nivel con diseño
              intuitivo. No solo escribimos código; forjamos experiencias
              digitales que impulsan negocios.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection("proyectos")}
                className="group relative px-8 py-4 bg-indigo-600 rounded-full font-bold text-white overflow-hidden transition-all hover:bg-indigo-700 hover:scale-105 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
              >
                <span className="relative z-10 flex items-center">
                  Ver nuestro trabajo{" "}
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={() => scrollToSection("servicios")}
                className="px-8 py-4 rounded-full font-bold text-white border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 transition-colors backdrop-blur-sm"
              >
                Nuestros Servicios
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce text-slate-500">
          <ArrowRight className="transform rotate-90" />
        </div>
      </header>

      {/* SERVICES SECTION */}
      <section id="servicios" className="py-24 relative bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ingeniería Digital Integral
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Desde la idea conceptual hasta el despliegue final. Cubrimos todo
              el ciclo de vida del desarrollo de software moderno.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Globe className="text-cyan-400" size={40} />}
              title="Desarrollo Web"
              desc="Sitios web y aplicaciones web progresivas (PWA) ultrarrápidas, escalables y optimizadas para SEO. Usamos tecnologías modernas como React, Next.js y Node."
            />
            <ServiceCard
              icon={<Smartphone className="text-violet-400" size={40} />}
              title="Apps Móviles"
              desc="Desarrollo nativo e híbrido para iOS y Android. Creamos experiencias fluidas que tus usuarios amarán llevar en su bolsillo."
            />
            <ServiceCard
              icon={<Cpu className="text-pink-400" size={40} />}
              title="Software a Medida"
              desc="Sistemas de gestión, dashboards analíticos y herramientas internas diseñadas específicamente para resolver los problemas únicos de tu empresa."
            />
          </div>
        </div>
      </section>

      {/* LOGIN MODAL */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setIsLoginOpen(false)} />
          <div className="relative w-full max-w-md mx-4">
            <div className="bg-gradient-to-br from-indigo-900/90 to-cyan-800/80 p-8 rounded-2xl shadow-2xl text-white">
              <button
                onClick={() => setIsLoginOpen(false)}
                className="absolute top-4 right-4 text-slate-300 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="mb-4">
                <h3 className="text-2xl font-bold">Bienvenido de vuelta</h3>
                <p className="text-slate-300 text-sm">Accede a tu panel y gestiona tus proyectos.</p>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <input
                  type="email"
                  placeholder="correo@empresa.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/8 border border-white/10 placeholder-slate-300 text-white focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Contraseña"
                  className="w-full px-4 py-3 rounded-lg bg-white/8 border border-white/10 placeholder-slate-300 text-white focus:outline-none"
                />

                <button className="w-full py-3 rounded-full bg-white text-indigo-700 font-bold">Entrar</button>
              </form>

              <div className="mt-4 text-center text-sm text-slate-300">
                ¿No tienes cuenta? <a href="#" className="text-white font-semibold">Contáctanos</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHILOSOPHY / ABOUT SECTION */}
      <section
        id="filosofía"
        className="py-24 bg-gradient-to-b from-slate-900/30 to-slate-950 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1/3 h-full bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="inline-block px-3 py-1 rounded-full bg-slate-800/40 border border-slate-700 text-cyan-300 text-xs font-semibold uppercase tracking-wide">
                ¿Por qué Lytu?
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:justify-between gap-12 md:gap-20">
              <div className="text-center md:text-left md:max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-snug">
                  Soluciones pensadas para crecer <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">con enfoque práctico</span>
                </h2>
                <p className="text-slate-300 text-lg">
                  Un equipo joven y profesional que aplica procesos modernos y foco en métricas reales. Entregamos productos
                  claros, mantenibles y orientados a resultados para que tu negocio avance con confianza.
                </p>
              </div>

              <div className="hidden md:flex items-start justify-end w-96">
                <div className="rounded-2xl bg-slate-900/40 border border-slate-800 p-6 shadow-md w-80">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">L</div>
                    <div>
                      <div className="text-sm text-slate-300 font-semibold">Lytu — Equipo</div>
                      <div className="text-xs text-slate-500">Partner tecnológico</div>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm">"Aceleramos entregas con prácticas modernas y comunicación directa. Trabajamos contigo para priorizar lo que realmente aporta valor."</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-6">
                <div className="flex-1 max-w-4xl">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                      <Code size={18} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Cómo trabajamos</h4>
                      <p className="text-slate-400 text-sm">Proceso claro y colaborativo para reducir fricción y acelerar resultados.</p>
                    </div>
                  </div>

                  <div className="hidden md:block mt-6">
                    <div className="relative">
                      <div className="absolute left-0 right-0 top-6 h-0.5 bg-slate-800/60" />
                      <div className="flex justify-between items-center relative z-10">
                        <div className="flex flex-col items-center text-center w-1/3 px-4">
                          <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white mb-3">1</div>
                          <div className="font-semibold">Descubrir</div>
                          <div className="text-slate-400 text-sm">Entender prioridades y métricas clave.</div>
                        </div>

                        <div className="flex flex-col items-center text-center w-1/3 px-4">
                          <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-white mb-3">2</div>
                          <div className="font-semibold">Construir</div>
                          <div className="text-slate-400 text-sm">MVPs iterativos para validar hipótesis rápido.</div>
                        </div>

                        <div className="flex flex-col items-center text-center w-1/3 px-4">
                          <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white mb-3">3</div>
                          <div className="font-semibold">Escalar</div>
                          <div className="text-slate-400 text-sm">Evolución basada en datos y feedback real.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block w-80">
                  <div className="rounded-2xl bg-gradient-to-br from-indigo-900/20 to-cyan-900/10 border border-slate-800 p-6">
                    <div className="text-slate-300 text-sm">Rápido, claro y orientado a negocio</div>
                    <div className="mt-6">
                      <div className="text-4xl font-extrabold text-white">MVP</div>
                      <div className="text-slate-400 text-sm">Validación en semanas, no meses</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:hidden mt-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white mr-3">1</div>
                      <div className="font-semibold">Descubrir</div>
                    </div>
                    <div className="text-slate-400 text-sm">Entender prioridades y métricas clave.</div>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white mr-3">2</div>
                      <div className="font-semibold">Construir</div>
                    </div>
                    <div className="text-slate-400 text-sm">MVPs iterativos para validar hipótesis rápido.</div>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white mr-3">3</div>
                      <div className="font-semibold">Escalar</div>
                    </div>
                    <div className="text-slate-400 text-sm">Evolución basada en datos y feedback real.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="proyectos" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Nuestro Trabajo
              </h2>
              <p className="text-slate-400 max-w-xl">
                Proyectos que estamos desarrollando y casos que ya hemos lanzado.
              </p>
            </div>
            <div className="hidden md:block">
              <button className="text-indigo-400 font-bold hover:text-white transition-colors flex items-center">
                Ver Github <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Project 1 - TuViaja (CORRECTED) */}
            <div className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-all duration-500">
              <div className="h-64 bg-slate-800 relative overflow-hidden">
                {/* Mockup visual */}
                <div className="absolute inset-0 bg-linear-to-tr from-cyan-900 to-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  <Smartphone size={80} className="text-cyan-400/50" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="absolute top-4 left-4 bg-cyan-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                  Lanzado
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">TuViaja</h3>
                <p className="text-slate-400 mb-6">
                  Aplicación móvil para viajeros. Gestión de itinerarios,
                  reservas y recomendaciones locales en una sola app.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Ionic", "Angular", "Capacitor", "Node.js"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#"
                  className="inline-flex items-center text-white font-bold hover:text-cyan-400 transition-colors"
                >
                  Ver caso de estudio <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </div>

            {/* Project 2 - Nova Corp */}
            <div className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-purple-500 transition-all duration-500">
              <div className="h-64 bg-linear-to-br from-purple-900 via-slate-800 to-slate-900 relative overflow-hidden">
                {/* Mockup visual */}
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-purple-400 mb-2">N</div>
                    <p className="text-purple-300 font-semibold text-lg">Nova Corp</p>
                  </div>
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                <div className="absolute top-4 left-4 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Próximo Lanzamiento
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Nova Corp</h3>
                <p className="text-slate-400 mb-6">
                  Plataforma de gestión financiera para empresas. Dashboard
                  intuitivo con análisis de datos y reportes automatizados.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-purple-400 bg-purple-900/20 px-2 py-1 rounded border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#"
                  className="inline-flex items-center text-white font-bold hover:text-purple-400 transition-colors"
                >
                  Ver caso de estudio <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </div>

            {/* Project 3 - Imago Creations */}
            <div className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-orange-500 transition-all duration-500">
              <div className="h-64 bg-linear-to-br from-orange-900 via-slate-800 to-slate-900 relative overflow-hidden">
                {/* Mockup visual */}
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-orange-400 mb-2">I</div>
                    <p className="text-orange-300 font-semibold text-lg">Imago</p>
                  </div>
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  En Desarrollo
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Imago Creations</h3>
                <p className="text-slate-400 mb-6">
                  Plataforma para solicitar y personalizar ropa corporativa.
                  Diseño intuitivo, gestión de pedidos y seguimiento en tiempo real.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Vue.js", "Express", "MongoDB", "Stripe", "Tailwind"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-orange-400 bg-orange-900/20 px-2 py-1 rounded border border-orange-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#"
                  className="inline-flex items-center text-white font-bold hover:text-orange-400 transition-colors"
                >
                  Conoce más <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section id="contacto" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-10 md:p-16 text-center shadow-2xl border border-white/10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              ¿Tienes una idea ambiciosa?
            </h2>
            <p className="text-indigo-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Somos el equipo técnico que necesitas para hacerla realidad. Sin
              intermediarios, sin burocracia, solo código excelente.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <input
                type="email"
                placeholder="tu@email.com"
                className="px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-indigo-200 focus:outline-none focus:bg-white/20 w-full sm:w-auto min-w-[300px]"
              />
              <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-full hover:bg-cyan-50 transition-colors shadow-lg">
                Iniciar Proyecto
              </button>
            </div>
            <p className="mt-4 text-sm text-indigo-200">
              O escríbenos a{" "}
              <a
                href="mailto:hola@lytu.tech"
                className="underline hover:text-white"
              >
                hola@lytu.tech
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 pt-16 pb-8 border-t border-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded flex items-center justify-center">
                  <span className="font-bold text-white text-xs">L</span>
                </div>
                <span className="text-xl font-bold text-white">lytu.</span>
              </div>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                Desarrollo de software con pasión y precisión. Ayudamos a
                startups y empresas a escalar sus productos digitales.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                  Desarrollo Web
                </li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                  Aplicaciones Móviles
                </li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                  UI/UX Design
                </li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                  Consultoría Técnica
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                  Privacidad
                </li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">
                  Términos
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
            <p>
              &copy; {new Date().getFullYear()} Lytu Software Development. Todos
              los derechos reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {/* Social placeholders */}
              <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-indigo-500 transition-colors cursor-pointer"></div>
              <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-indigo-500 transition-colors cursor-pointer"></div>
              <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-indigo-500 transition-colors cursor-pointer"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper Component for Services
function ServiceCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all duration-300 hover:-translate-y-2">
      <div className="bg-slate-950 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-800 group-hover:border-indigo-500/30 shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
