import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { User } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="section-bg-number top-8 -left-8 md:left-8">01</div>

      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <p className="section-label">Get to know me</p>
          <h2 className="section-heading gradient-text">About Me</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glass-ultra p-8 md:p-12"
        >
          <div className="volumetric-pulse" />

          <div className="relative z-10">
            <div className="flex items-start gap-5 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-neon-indigo/8 border border-neon-indigo/15 flex items-center justify-center shrink-0">
                <User size={24} className="text-neon-indigo" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
                  Harsh Choudhary
                </h3>
                <p className="text-sm text-neon-cyan/80 font-medium">
                  B.Tech CSE — IIIT Guwahati | Incoming Analyst @ Deloitte USI
                </p>
              </div>
            </div>

            <div className="space-y-5 text-slate-300/90 leading-[1.8] text-[0.95rem]">
              <p>
                I&apos;m a <span className="text-white font-medium">final-year Computer Science undergraduate</span> at
                the Indian Institute of Information Technology, Guwahati, with a deep passion for building
                <span className="text-neon-cyan"> scalable backend systems</span> and exploring the frontiers
                of <span className="text-neon-cyan">Generative AI</span>.
              </p>
              <p>
                Currently, I&apos;m a
                <span className="text-white font-medium"> Research Intern at NIT Warangal</span>, working on
                Multi-Objective Optimization Algorithms like Harmony Search Optimization (HSO). Previously, I
                interned as a <span className="text-white font-medium">Backend Developer at LivZone Design</span>,
                where I designed REST APIs, optimized databases, and shipped features at scale. I thrive
                on turning complex business logic into clean, maintainable microservice architectures using
                <span className="text-neon-cyan"> Java, Spring Boot, and Docker</span>.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me deep-diving into system design patterns,
                experimenting with AI-powered applications, or smashing shuttlecocks on the badminton court.
                I&apos;m set to join <span className="text-white font-medium">Deloitte USI as an Analyst in 2026</span>,
                and I&apos;m always looking for opportunities to learn, build, and collaborate.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
