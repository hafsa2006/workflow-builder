import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[var(--app-border)] bg-[var(--app-bg)]/80 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta shadow-lg glow-terracotta transition-transform hover:scale-110">
              <Terminal className="h-6 w-6 text-ivory" />
            </div>
            <span className="font-serif text-2xl font-medium tracking-tight text-[var(--app-text)]">WorkflowAI</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-[var(--app-muted)] transition-colors hover:text-terracotta">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-[var(--app-muted)] transition-colors hover:text-terracotta">How It Works</a>
          <a href="#demo" className="text-sm font-medium text-[var(--app-muted)] transition-colors hover:text-terracotta">Demo</a>
          
          <div className="h-6 w-[1px] bg-[var(--app-border)] mx-2" />
          
          <Link to="/app">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl bg-terracotta px-5 py-2.5 text-sm font-semibold text-ivory shadow-lg glow-terracotta transition-all"
            >
              Generate Workflow
            </motion.button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6 text-[var(--app-text)]" /> : <Menu className="h-6 w-6 text-[var(--app-text)]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 top-full w-full border-b border-[var(--app-border)] bg-[var(--app-bg)]/95 px-6 py-6 backdrop-blur-2xl md:hidden"
        >
          <div className="flex flex-col gap-6">
            <a href="#features" className="text-lg font-medium text-[var(--app-text)]" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#how-it-works" className="text-lg font-medium text-[var(--app-text)]" onClick={() => setIsOpen(false)}>How It Works</a>
            <a href="#demo" className="text-lg font-medium text-[var(--app-text)]" onClick={() => setIsOpen(false)}>Demo</a>
            <Link to="/app" onClick={() => setIsOpen(false)} className="w-full">
              <button className="w-full rounded-xl bg-terracotta py-4 text-center font-semibold text-ivory shadow-lg glow-terracotta">
                Generate Workflow
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

