import React from 'react';
import { Shield, Heart, Terminal, BookOpen, ExternalLink } from 'lucide-react';

export default function Footer({ onOpenPresentation }) {
  return (
    <footer className="border-t border-slate-800 bg-[#04070e] text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                RSA <span className="text-cyan-400">LAB</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Built for college Network Security and Cryptography (NSCL) lab presentations (20 Marks). Interactive, real-time client-side RSA simulator powered by JavaScript BigInt and modern cryptographic principles.
            </p>
            <div className="text-[11px] font-mono text-cyan-400">
              No servers • Pure browser calculations • Zero external data transfer
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Simulator Modules
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#simulator" className="hover:text-cyan-400 transition">Interactive Simulator</a></li>
              <li><a href="#keygen-steps" className="hover:text-cyan-400 transition">Key Gen Step-by-Step</a></li>
              <li><a href="#encryption" className="hover:text-cyan-400 transition">Encryption Demonstration</a></li>
              <li><a href="#decryption" className="hover:text-cyan-400 transition">Decryption Demonstration</a></li>
              <li><a href="#flow" className="hover:text-cyan-400 transition">Full Flow Visualization</a></li>
            </ul>
          </div>

          {/* Educational References */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Academic Standards
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><span className="text-slate-300">RFC 8017:</span> PKCS #1 v2.2 (RSA-OAEP, RSA-PSS)</li>
              <li><span className="text-slate-300">NIST SP 800-56B:</span> Pair-Wise Key Establishment</li>
              <li><span className="text-slate-300">FIPS 186-5:</span> Digital Signature Standard (DSS)</li>
              <li className="pt-2">
                <button
                  onClick={onOpenPresentation}
                  className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  <span>Launch Presentation Mode</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} RSA Interactive Laboratory. Developed for Educational & Academic Demonstration.</p>
          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <span>Algorithm: RSA-2048 (Reference)</span>
            <span>•</span>
            <span>Math Engine: JS BigInt</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
