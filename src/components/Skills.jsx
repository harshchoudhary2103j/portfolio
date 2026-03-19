import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import { useMousePosition } from '../hooks/useEffects';

const skillCategories = [
  {
    category: 'Languages',
    skills: ['Java', 'C++', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    category: 'Backend & Frameworks',
    skills: ['Spring Boot', 'Spring AI', 'Spring Security', 'Node.js', 'Express.js', 'REST APIs'],
  },
  {
    category: 'Databases & Tools',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Git'],
  },
  {
    category: 'Architecture & Concepts',
    skills: ['Microservices', 'System Design', 'Design Patterns', 'OOP', 'SOLID', 'LLD'],
  },
  {
    category: 'AI & Data',
    skills: ['GenAI', 'Gemini AI', 'Kafka', 'Data Analysis', 'Machine Learning'],
  },
];

/* ─── Constellation Canvas ─── */
function ConstellationField({ containerRef }) {
  const canvasRef = useRef(null);
  const mouse = useMousePosition();
  const nodesRef = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();

    // Create constellation nodes
    const count = 40;
    nodesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 2 + 1,
    }));

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [containerRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    const nodes = nodesRef.current;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const rect = container.getBoundingClientRect();
      const mx = mouse.x - rect.left;
      const my = mouse.y - rect.top;

      ctx.clearRect(0, 0, w, h);

      nodes.forEach((n) => {
        // Mouse proximity reaction
        const dx = mx - n.x;
        const dy = my - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = 180;

        if (dist < proximity && dist > 0) {
          // Repel slightly
          const force = ((proximity - dist) / proximity) * 0.008;
          n.vx -= (dx / dist) * force;
          n.vy -= (dy / dist) * force;
        }

        n.x += n.vx;
        n.y += n.vy;
        n.vx *= 0.995;
        n.vy *= 0.995;

        // Bounce off edges
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.x = Math.max(0, Math.min(w, n.x));
        n.y = Math.max(0, Math.min(h, n.y));

        // Draw node
        const glow = dist < proximity ? 0.4 + ((proximity - dist) / proximity) * 0.6 : 0.2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${glow})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - d / 120) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [mouse, containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ─── Skills Section ─── */
export default function Skills() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const mouse = useMousePosition();

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      <div className="section-bg-number top-4 -right-4 md:right-8">04</div>

      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <p className="section-label">My Toolbox</p>
          <h2 className="section-heading gradient-text">Skills & Technologies</h2>
        </motion.div>

        <div className="relative" ref={containerRef}>
          <ConstellationField containerRef={containerRef} />

          <div className="space-y-10 relative z-10">
            {skillCategories.map((cat, catIdx) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 35 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.12 * catIdx, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <h3 className="text-xs text-slate-500/70 uppercase tracking-[0.2em] font-medium mb-4 text-center md:text-left">
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  {cat.skills.map((skill, skillIdx) => (
                    <SkillNode
                      key={skill}
                      skill={skill}
                      inView={inView}
                      delay={0.12 * catIdx + 0.04 * skillIdx}
                      mouse={mouse}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Individual Skill Node ─── */
function SkillNode({ skill, inView, delay, mouse }) {
  const nodeRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!nodeRef.current) return;
    const rect = nodeRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = mouse.x - cx;
    const dy = mouse.y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const proximity = 150;

    if (dist < proximity && dist > 0) {
      const push = ((proximity - dist) / proximity) * 8;
      setOffset({
        x: -(dx / dist) * push,
        y: -(dy / dist) * push,
      });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [mouse]);

  return (
    <motion.span
      ref={nodeRef}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={
        inView
          ? {
              opacity: 1,
              scale: 1,
              x: offset.x,
              y: offset.y,
            }
          : {}
      }
      transition={{
        opacity: { duration: 0.4, delay },
        scale: { duration: 0.4, delay },
        x: { type: 'spring', stiffness: 150, damping: 15 },
        y: { type: 'spring', stiffness: 150, damping: 15 },
      }}
      whileHover={{ scale: 1.12, y: -4 }}
      className="skill-node"
    >
      {skill}
    </motion.span>
  );
}
