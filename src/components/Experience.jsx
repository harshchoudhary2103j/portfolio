import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, GraduationCap, FlaskConical } from 'lucide-react';

const timeline = [
  {
    type: 'work',
    icon: Briefcase,
    title: 'Analyst',
    org: 'Deloitte USI',
    period: '2026 — Upcoming',
    description:
      'Incoming Analyst at Deloitte USI, ready to tackle enterprise-scale consulting and technology challenges.',
    color: {
      bg: 'rgba(168, 85, 247, 0.06)',
      border: 'rgba(168, 85, 247, 0.15)',
      dot: '#a855f7',
      glow: 'rgba(168, 85, 247, 0.5)',
      text: '#d8b4fe',
    },
  },
  {
    type: 'research',
    icon: FlaskConical,
    title: 'Research Intern',
    org: 'NIT Warangal',
    period: 'Jan 2026 — Present',
    description:
      'Conducting research on Multi-Objective Optimization Algorithms, with a focus on Harmony Search Optimization (HSO) and its variants for solving complex engineering problems.',
    color: {
      bg: 'rgba(0, 240, 255, 0.05)',
      border: 'rgba(0, 240, 255, 0.12)',
      dot: '#00f0ff',
      glow: 'rgba(0, 240, 255, 0.5)',
      text: '#67e8f9',
    },
  },
  {
    type: 'work',
    icon: Briefcase,
    title: 'Backend Developer Intern',
    org: 'LivZone Design',
    period: 'May 2025 — Jun 2025',
    description:
      'Designed and implemented RESTful APIs, optimized database queries, and integrated third-party services to deliver production-ready backend solutions.',
    color: {
      bg: 'rgba(99, 102, 241, 0.06)',
      border: 'rgba(99, 102, 241, 0.15)',
      dot: '#6366f1',
      glow: 'rgba(99, 102, 241, 0.5)',
      text: '#a5b4fc',
    },
  },
  {
    type: 'education',
    icon: GraduationCap,
    title: 'B.Tech in Computer Science & Engineering',
    org: 'IIIT Guwahati',
    period: '2022 — 2026',
    description:
      'Pursued a comprehensive Computer Science education covering DSA, DBMS, OS, Computer Networks, and Software Engineering. Active in competitive programming and hackathons.',
    color: {
      bg: 'rgba(59, 130, 246, 0.06)',
      border: 'rgba(59, 130, 246, 0.15)',
      dot: '#3b82f6',
      glow: 'rgba(59, 130, 246, 0.5)',
      text: '#93c5fd',
    },
  },
];

export default function Experience() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });
  const timelineRef = useRef(null);

  // Scroll-driven timeline fill
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.5'],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden">
      <div className="section-bg-number top-8 right-4 md:right-12">02</div>

      <div className="max-w-3xl mx-auto relative z-10" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <p className="section-label">My Journey</p>
          <h2 className="section-heading gradient-text">
            Experience & Education
          </h2>
        </motion.div>

        <div className="relative" ref={timelineRef}>
          {/* Timeline track with scroll-driven fill */}
          <div className="timeline-track">
            <motion.div className="timeline-fill" style={{ height: fillHeight }} />
          </div>

          <div className="space-y-12 pl-14">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              const c = item.color;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40, scale: 0.95 }}
                  animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 * index,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="relative"
                >
                  {/* Animated dot */}
                  <motion.div
                    className={`timeline-dot ${inView ? 'timeline-dot-active' : ''}`}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 * index + 0.3,
                      type: 'spring',
                      stiffness: 300,
                    }}
                    style={{
                      background: c.dot,
                      '--dot-glow-color': c.glow,
                    }}
                  />

                  <div
                    className="glass-ultra p-6 group"
                    style={{ borderColor: c.border }}
                  >
                    <div className="volumetric-pulse" style={{
                      background: `radial-gradient(ellipse at 50% 0%, ${c.bg}, transparent 60%)`
                    }} />
                    <div className="relative z-10 flex items-start gap-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-400 group-hover:scale-110"
                        style={{
                          background: c.bg,
                          border: `1px solid ${c.border}`,
                          boxShadow: `inset 0 0 20px ${c.bg}`,
                        }}
                      >
                        <Icon size={18} style={{ color: c.text }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                          <h3 className="text-white font-semibold text-[1.05rem] tracking-tight">
                            {item.title}
                          </h3>
                          <span
                            className="text-[0.7rem] font-medium tracking-[0.1em] px-3 py-1 rounded-full shrink-0"
                            style={{
                              background: c.bg,
                              color: c.text,
                              border: `1px solid ${c.border}`,
                            }}
                          >
                            {item.period}
                          </span>
                        </div>
                        <p className="text-sm font-medium mb-2" style={{ color: c.text }}>
                          {item.org}
                        </p>
                        <p className="text-sm text-slate-400/80 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
