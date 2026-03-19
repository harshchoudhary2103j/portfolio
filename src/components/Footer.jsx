import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/4 py-8 px-6 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <a href="#" className="text-lg font-bold gradient-text">
          HC.
        </a>
        <p className="text-xs text-slate-600 flex items-center gap-1.5 tracking-wide">
          Built with <Heart size={12} className="text-red-400/60" /> by Harsh
          Choudhary &copy; {new Date().getFullYear()}
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/harshchoudhary2103j"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-600 hover:text-neon-cyan transition-colors duration-300 tracking-wide"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/harsh-choudhary-43ba32258/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-600 hover:text-neon-cyan transition-colors duration-300 tracking-wide"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
