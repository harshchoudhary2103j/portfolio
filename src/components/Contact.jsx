import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Send, Github, Linkedin, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="section-bg-number bottom-4 left-4 md:left-12">05</div>

      <div className="max-w-3xl mx-auto relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <p className="section-label">Get in Touch</p>
          <h2 className="section-heading gradient-text">Contact Me</h2>
          <p className="text-slate-400/80 mt-4 max-w-lg mx-auto text-[0.95rem] leading-relaxed">
            Have a question, want to collaborate, or just say hi? Reach out via
            email or connect with me on social media.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glass-ultra p-8 md:p-10"
        >
          <div className="volumetric-pulse" />

          <div className="relative z-10">
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-neon-indigo/8 border border-neon-indigo/12 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Mail size={20} className="text-neon-indigo" />
                </div>
                <div>
                  <p className="text-[0.65rem] text-slate-500/70 uppercase tracking-[0.15em] mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:work.harshchoudhary.it@gmail.com"
                    className="text-sm text-slate-300 hover:text-neon-cyan transition-colors duration-300 break-all"
                  >
                    work.harshchoudhary.it@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-neon-cyan/6 border border-neon-cyan/12 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <MapPin size={20} className="text-neon-cyan" />
                </div>
                <div>
                  <p className="text-[0.65rem] text-slate-500/70 uppercase tracking-[0.15em] mb-1">
                    Location
                  </p>
                  <p className="text-sm text-slate-300">Guwahati, Assam, India</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <motion.a
                href="https://github.com/harshchoudhary2103j"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass-ultra p-5 flex items-center justify-center gap-3 text-slate-400 hover:text-white transition-colors duration-300 group"
              >
                <Github size={22} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">GitHub</span>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/harsh-choudhary-43ba32258/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="glass-ultra p-5 flex items-center justify-center gap-3 text-slate-400 hover:text-white transition-colors duration-300 group"
              >
                <Linkedin size={22} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">LinkedIn</span>
              </motion.a>
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                href="mailto:work.harshchoudhary.it@gmail.com"
                className="btn-kinetic inline-flex"
              >
                <Send size={16} /> Send me an Email
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
