import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { useMousePosition, useMagnetic } from '../hooks/useEffects';

const roles = [
  'Backend Developer',
  'System Design Enthusiast',
  'GenAI Explorer',
  'Java & Spring Boot Developer',
];

/* ─── Interactive Particle Field ─── */
function ParticleField() {
  const canvasRef = useRef(null);
  const mouse = useMousePosition();
  const particlesRef = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Generate particles
    const count = Math.min(120, Math.floor((w * h) / 12000));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const particles = particlesRef.current;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        // Mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (dist < maxDist && dist > 0) {
          const force = ((maxDist - dist) / maxDist) * 0.015;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Drift
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const glow = dist < maxDist ? 0.6 + ((maxDist - dist) / maxDist) * 0.4 : p.alpha;
        ctx.fillStyle = `rgba(0, 240, 255, ${glow})`;
        ctx.fill();
      });

      // Draw connections near mouse
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (d < 100) {
            const aMouse = Math.sqrt((a.x - mouse.x) ** 2 + (a.y - mouse.y) ** 2);
            const bMouse = Math.sqrt((b.x - mouse.x) ** 2 + (b.y - mouse.y) ** 2);
            if (aMouse < 200 || bMouse < 200) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - d / 100) * 0.15})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [mouse]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}

/* ─── Magnetic Button ─── */
function MagneticButton({ children, className, ...props }) {
  const { offset, handlers } = useMagnetic(0.25);
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;
    const id = Date.now();
    setRipples((prev) => [...prev, { x, y, size, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
  };

  return (
    <motion.a
      {...props}
      {...handlers}
      onClick={handleClick}
      animate={{
        x: offset.x,
        y: offset.y,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.5 }}
      className={className}
      style={{ position: 'relative' }}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="ripple"
          style={{
            left: r.x - r.size / 2,
            top: r.y - r.size / 2,
            width: r.size,
            height: r.size,
          }}
        />
      ))}
      {children}
    </motion.a>
  );
}

/* ─── Hero Section ─── */
export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    let timeout;
    if (!isDeleting) {
      if (displayText.length < role.length) {
        timeout = setTimeout(() => setDisplayText(role.slice(0, displayText.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 25);
      } else {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ParticleField />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="section-label mb-8"
        >
          ⟨ Welcome to my portfolio ⟩
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.95]"
        >
          <span className="text-white/90">Hi, I&apos;m</span>
          <br />
          <motion.span
            className="gradient-text inline-block"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Harsh Choudhary
          </motion.span>
          <span className="text-neon-cyan">.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-400 mb-12 h-10 flex items-center justify-center font-light"
        >
          <span className="text-slate-300">{displayText}</span>
          <span className="typing-cursor ml-0.5">&nbsp;</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <MagneticButton href="#projects" className="btn-kinetic">
            View My Work <ArrowDown size={18} />
          </MagneticButton>
          <MagneticButton
            href={`${import.meta.env.BASE_URL}Harsh_Choudhary_Resume.pdf`}
            download
            className="btn-outline-kinetic"
          >
            <Download size={18} /> Download Resume
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-9 border border-slate-600/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-0.5 h-2 bg-neon-cyan/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
