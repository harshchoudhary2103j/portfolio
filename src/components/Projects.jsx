import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Layers } from 'lucide-react';
import { useTilt } from '../hooks/useEffects';

const projects = [
  {
    title: 'AirAware',
    description:
      'A full-stack, multi-module air quality monitoring platform that streams real-time environmental data, integrates health predictors, and uses Kafka for event-driven architecture.',
    tech: ['Java', 'Spring Boot', 'Kafka', 'React', 'Docker', 'PostgreSQL'],
    github: 'https://github.com/harshchoudhary2103j/AirAware',
    live: null,
    accent: '#00f0ff',
  },
  {
    title: 'ThinkyNotes',
    description:
      'A modern, AI-powered note-taking app with rich text editing, syntax-highlighted code blocks, Google Gemini integration, drag-and-drop sections, and auto-save.',
    tech: ['TypeScript', 'React', 'Node.js', 'MongoDB', 'Gemini AI'],
    github: 'https://github.com/harshchoudhary2103j/Thinky_Notes',
    live: null,
    accent: '#a855f7',
  },
  {
    title: 'AirBnb Clone (Backend)',
    description:
      'A comprehensive Airbnb-style backend with user authentication, property listing CRUD, booking management, and reviews — built with clean microservice patterns.',
    tech: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'REST API'],
    github: 'https://github.com/harshchoudhary2103j/AirBnb_Springboot',
    live: null,
    accent: '#6366f1',
  },
  {
    title: 'LinkedIn Microservices',
    description:
      'A LinkedIn-inspired backend breaking down core features (profiles, connections, posts) into decoupled microservices communicating via REST and event buses.',
    tech: ['Java', 'Spring Boot', 'Microservices', 'Docker', 'Kafka'],
    github: 'https://github.com/harshchoudhary2103j/Microservice_LinkedIn',
    live: null,
    accent: '#3b82f6',
  },
  {
    title: 'E-Commerce Microservices',
    description:
      'Scalable e-commerce platform using microservice architecture with separate services for orders, inventory, and user management, connected via API Gateway.',
    tech: ['Java', 'Spring Boot', 'Microservices', 'Spring Cloud', 'REST API'],
    github: 'https://github.com/harshchoudhary2103j/MicroService_ECommerce',
    live: null,
    accent: '#f59e0b',
  },
  {
    title: 'Low Level Design Patterns',
    description:
      'A comprehensive collection of object-oriented design patterns and LLD solutions in Java — covering Factory, Strategy, Observer, and real-world system designs.',
    tech: ['Java', 'OOP', 'Design Patterns', 'SOLID Principles'],
    github: 'https://github.com/harshchoudhary2103j/Low_Level_Design',
    live: null,
    accent: '#10b981',
  },
];

/* ─── 3D Tilt Project Card ─── */
function ProjectCard({ project, index }) {
  const { tilt, handlers } = useTilt(12);
  const cardRef = useRef(null);

  // Parallax: each card has a slightly different scroll speed
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40 + index * 8, -30 - index * 5]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, perspective: 1000 }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: 0.08 * index, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className="tilt-card"
        {...handlers}
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        }}
      >
        <div
          className="glass-ultra p-6 flex flex-col h-full group"
          style={{ borderColor: `${project.accent}12` }}
        >
          {/* Radial glow that follows mouse */}
          <div
            className="tilt-glow"
            style={{
              background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, ${project.accent}10, transparent 50%)`,
            }}
          />
          <div className="volumetric-pulse" style={{
            background: `radial-gradient(ellipse at 50% 0%, ${project.accent}08, transparent 60%)`
          }} />

          <div className="relative z-10 flex flex-col flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-400 group-hover:scale-110"
                style={{
                  background: `${project.accent}0a`,
                  border: `1px solid ${project.accent}18`,
                  boxShadow: `inset 0 0 15px ${project.accent}08`,
                }}
              >
                <Layers size={18} style={{ color: project.accent }} />
              </div>
              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label={`GitHub repo for ${project.title}`}
                  >
                    <Github size={17} />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label={`Live demo for ${project.title}`}
                  >
                    <ExternalLink size={17} />
                  </a>
                )}
              </div>
            </div>

            {/* Title & Desc */}
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-slate-400/80 leading-relaxed mb-5 flex-1">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[0.7rem] px-2.5 py-1 rounded-md font-medium tracking-wide"
                  style={{
                    background: `${project.accent}08`,
                    color: project.accent,
                    border: `1px solid ${project.accent}15`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Projects Section ─── */
export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      <div className="section-bg-number -bottom-8 left-4 md:left-12">03</div>

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <p className="section-label">What I&apos;ve Built</p>
          <h2 className="section-heading gradient-text">Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
