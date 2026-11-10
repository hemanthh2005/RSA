import React, { useState } from 'react';
import { Shield, Key, Lock, Play, Menu, X, Terminal, BookOpen, Layers, Award } from 'lucide-react';

export default function Navbar({ onOpenPresentation, activeSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'RSA Overview', href: '#overview' },
    { name: 'Interactive Simulator', href: '#simulator' },
    { name: 'Key Gen Steps', href: '#keygen-steps' },
    { name: 'Flow Diagram', href: '#flow' },
    { name: 'Applications', href: '#applications' },
    { name: 'Concepts', href: '#concepts' },
    { name: 'Security', href: '#security' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#060a13]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <a href="#home" className="flex items-center space-x-2.5 group">
              <div className="relative p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition">
                <Shield className="w-5 h-5" />
                <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#060a13]"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  RSA <span className="text-cyan-400">LAB</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 uppercase">
                    v1.0
                  </span>
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">
                  Interactive Cryptography Studio
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action: Presentation Mode Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenPresentation}
              className="relative group flex items-center space-x-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white shadow-md shadow-violet-500/20 hover:shadow-cyan-500/30 transition transform active:scale-95"
              title="Launch Fullscreen Presentation Mode for projector and classroom demonstration"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>PRESENTATION MODE</span>
              <span className="hidden xl:inline-block px-1 py-0.2 text-[9px] bg-white/20 rounded font-mono">
                20 MARKS
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#090e1a] px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPresentation();
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-medium text-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Presentation Mode</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
