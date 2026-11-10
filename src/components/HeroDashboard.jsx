import React from 'react';
import { Key, Lock, Unlock, ArrowRight, ShieldCheck, Sparkles, Cpu, Binary } from 'lucide-react';

export default function HeroDashboard({ onJumpToSimulator, onOpenPresentation }) {
  return (
    <section id="overview" className="relative pt-8 pb-16 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/80 text-cyan-300 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Network Security & Cryptography Lab (NSCL)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span className="text-slate-300 font-mono">20 Marks Presentation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            RSA LAB – <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">Interactive Encryption & Decryption</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Explore how public-key cryptography transforms plaintext into ciphertext and recovers the original message using fundamental number theory.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-mono">
            <span className="text-cyan-400 font-bold">RSA</span> = <span className="text-white">Rivest</span> – <span className="text-white">Shamir</span> – <span className="text-white">Adleman</span> (Published 1977)
          </div>
        </div>

        {/* Asymmetric Core Principle Card */}
        <div className="mb-12 glass-panel rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto border border-cyan-900/40 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="space-y-3 text-left">
              <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>The Asymmetric Cryptography Paradigm</span>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">
                Unlike symmetric encryption (such as AES) where the same secret key is used for both encrypting and decrypting, <strong className="text-white">RSA is an asymmetric cryptographic algorithm</strong> that uses two mathematically related keys:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-cyan-800/40">
                  <Key className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-white">1. Public Key (e, n)</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Shared openly with the whole world. Anyone can use it to encrypt a message for you.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-violet-800/40">
                  <Lock className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-white">2. Private Key (d, n)</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Kept strictly secret by the owner. Only this key can reverse the mathematical trapdoor to decrypt.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Flow Diagram */}
        <div className="mb-14">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Cryptographic Transmission Flow
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              From Plaintext to Ciphertext and Back
            </h3>
          </div>

          <div className="glass-panel rounded-2xl p-5 sm:p-6 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[760px] gap-2">
              
              {/* Step 1: Original Message */}
              <div className="flex-1 flex flex-col items-center p-3 rounded-xl bg-slate-900/90 border border-slate-700/60 shadow text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Input</span>
                <div className="w-9 h-9 my-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Binary className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-white">Original Message</span>
                <span className="text-[10px] font-mono text-cyan-400 mt-0.5">M (Plaintext)</span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />

              {/* Step 2: Public Key */}
              <div className="flex-1 flex flex-col items-center p-3 rounded-xl bg-slate-900/90 border border-cyan-800/50 shadow text-center">
                <span className="text-[10px] font-mono text-cyan-400 uppercase">Key 1</span>
                <div className="w-9 h-9 my-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Key className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-white">Public Key</span>
                <span className="text-[10px] font-mono text-cyan-300 mt-0.5">(e, n)</span>
              </div>

              <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />

              {/* Step 3: RSA Encryption */}
              <div className="flex-1 flex flex-col items-center p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 shadow-lg text-center">
                <span className="text-[10px] font-mono text-cyan-300 uppercase">Process</span>
                <div className="w-9 h-9 my-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
                  <Lock className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-white">RSA Encryption</span>
                <span className="text-[10px] font-mono text-cyan-200 mt-0.5">C = Mᵉ mod n</span>
              </div>

              <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />

              {/* Step 4: Ciphertext */}
              <div className="flex-1 flex flex-col items-center p-3 rounded-xl bg-amber-950/30 border border-amber-600/40 shadow text-center">
                <span className="text-[10px] font-mono text-amber-400 uppercase">Output</span>
                <div className="w-9 h-9 my-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-white">Ciphertext</span>
                <span className="text-[10px] font-mono text-amber-300 mt-0.5">C (Encrypted)</span>
              </div>

              <ArrowRight className="w-4 h-4 text-violet-400 shrink-0" />

              {/* Step 5: Private Key */}
              <div className="flex-1 flex flex-col items-center p-3 rounded-xl bg-slate-900/90 border border-violet-800/50 shadow text-center">
                <span className="text-[10px] font-mono text-violet-400 uppercase">Key 2 (Secret)</span>
                <div className="w-9 h-9 my-1.5 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <Key className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-white">Private Key</span>
                <span className="text-[10px] font-mono text-violet-300 mt-0.5">(d, n)</span>
              </div>

              <ArrowRight className="w-4 h-4 text-violet-400 shrink-0" />

              {/* Step 6: RSA Decryption */}
              <div className="flex-1 flex flex-col items-center p-3 rounded-xl bg-violet-950/40 border border-violet-500/40 shadow-lg text-center">
                <span className="text-[10px] font-mono text-violet-300 uppercase">Process</span>
                <div className="w-9 h-9 my-1.5 rounded-lg bg-violet-500/20 border border-violet-400/50 flex items-center justify-center text-violet-300">
                  <Unlock className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-white">RSA Decryption</span>
                <span className="text-[10px] font-mono text-violet-200 mt-0.5">M = Cᵈ mod n</span>
              </div>

              <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />

              {/* Step 7: Recovered Message */}
              <div className="flex-1 flex flex-col items-center p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 shadow text-center">
                <span className="text-[10px] font-mono text-emerald-400 uppercase">Success</span>
                <div className="w-9 h-9 my-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-white">Original Message</span>
                <span className="text-[10px] font-mono text-emerald-300 mt-0.5">M (Recovered)</span>
              </div>

            </div>
          </div>
        </div>

        {/* Three Beginner-Friendly Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Card 1: Key Generation */}
          <div className="glass-panel rounded-2xl p-6 border-t-4 border-t-cyan-500 hover:border-t-cyan-400 transition hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                PHASE 01
              </span>
              <Key className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Key Generation</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Two secret prime numbers <span className="font-mono text-cyan-300">p</span> and <span className="font-mono text-cyan-300">q</span> are multiplied together to create modulus <span className="font-mono text-cyan-300">n = p × q</span>. Using Euler's Totient function <span className="font-mono text-cyan-300">φ(n)</span>, a public exponent <span className="font-mono text-cyan-300">e</span> and a matching private exponent <span className="font-mono text-violet-300">d</span> are calculated.
            </p>
            <div className="text-[11px] font-mono p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 space-y-1">
              <div>Public: <span className="text-cyan-400 font-semibold">(e, n)</span></div>
              <div>Private: <span className="text-violet-400 font-semibold">(d, n)</span></div>
            </div>
          </div>

          {/* Card 2: Encryption */}
          <div className="glass-panel rounded-2xl p-6 border-t-4 border-t-blue-500 hover:border-t-blue-400 transition hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-950 border border-blue-800">
                PHASE 02
              </span>
              <Lock className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">RSA Encryption</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              The sender converts their message into a number <span className="font-mono text-cyan-300">M</span> and computes the ciphertext using the recipient's public key: <span className="font-mono text-amber-300">C = Mᵉ mod n</span>. Anyone can compute this, but nobody can reverse it without <span className="font-mono text-violet-300">d</span>.
            </p>
            <div className="text-[11px] font-mono p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 space-y-1">
              <div>Formula: <span className="text-amber-400 font-semibold">C = Mᵉ mod n</span></div>
              <div>Condition: <span className="text-slate-400">0 ≤ M &lt; n</span></div>
            </div>
          </div>

          {/* Card 3: Decryption */}
          <div className="glass-panel rounded-2xl p-6 border-t-4 border-t-violet-500 hover:border-t-violet-400 transition hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-violet-400 px-2 py-0.5 rounded bg-violet-950 border border-violet-800">
                PHASE 03
              </span>
              <Unlock className="w-5 h-5 text-violet-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">RSA Decryption</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              The intended receiver takes the ciphertext <span className="font-mono text-amber-300">C</span> and raises it to their secret exponent <span className="font-mono text-violet-300">d</span>: <span className="font-mono text-emerald-300">M = Cᵈ mod n</span>. By Euler's theorem, this mathematically restores the original message <span className="font-mono text-cyan-300">M</span>.
            </p>
            <div className="text-[11px] font-mono p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 space-y-1">
              <div>Formula: <span className="text-emerald-400 font-semibold">M = Cᵈ mod n</span></div>
              <div>Trapdoor: <span className="text-slate-400">d is secret inverse of e</span></div>
            </div>
          </div>

        </div>

        {/* Action Callouts */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onJumpToSimulator}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition active:scale-95"
          >
            <span>Try Interactive Simulator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onOpenPresentation}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 transition active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch Presentation View (Classroom Mode)</span>
          </button>
        </div>

      </div>
    </section>
  );
}
