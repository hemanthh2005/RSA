import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, RotateCcw, Sparkles, CheckCircle2, Key, Lock, Unlock, Maximize2, Shield, Play } from 'lucide-react';
import { generateKeys, encryptNumber, decryptNumber } from '../utils/rsaMath';

export default function PresentationModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dedicated board example state
  const [p, setP] = useState(3);
  const [q, setQ] = useState(11);
  const [e, setE] = useState(3);
  const [m, setM] = useState(4);

  // Calculated state
  const [keys, setKeys] = useState(null);
  const [ciphertext, setCiphertext] = useState(null);
  const [decryptedMsg, setDecryptedMsg] = useState(null);

  // Initialize or reset board example
  const loadBoardExample = () => {
    setP(3);
    setQ(11);
    setE(3);
    setM(4);
    const generated = generateKeys(3, 11, 3);
    setKeys(generated);
    const enc = encryptNumber(4, generated.publicKey);
    setCiphertext(enc);
    const dec = decryptNumber(enc, generated.privateKey);
    setDecryptedMsg(dec);
    setCurrentSlide(0);
  };

  useEffect(() => {
    if (isOpen && !keys) {
      loadBoardExample();
    }
  }, [isOpen]);

  // Keyboard navigation (Arrow keys + Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (evt) => {
      if (evt.key === 'ArrowRight' || evt.key === ' ') {
        evt.preventDefault();
        setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (evt.key === 'ArrowLeft') {
        evt.preventDefault();
        setCurrentSlide((prev) => Math.max(0, prev - 1));
      } else if (evt.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!isOpen) return null;

  // Slide content definitions
  const slides = [
    {
      title: 'RSA Algorithm Demonstration',
      badge: 'College NSCL Presentation • 20 Marks',
      subtitle: 'Rivest – Shamir – Adleman Asymmetric Public-Key Cryptography',
      content: (
        <div className="space-y-6 text-center max-w-3xl mx-auto py-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 font-mono text-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Interactive Blackboard Demonstration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            How Two Keys Protect the Modern Internet
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            In this interactive live demonstration, we trace every mathematical phase of the RSA algorithm from initial prime selection to verified ciphertext decryption.
          </p>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-left font-mono text-sm space-y-2">
            <div className="text-cyan-400 font-bold mb-2">Active Board Demonstration Parameters:</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-xs block">Prime p</span>
                <span className="text-xl font-bold text-white">{p}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-xs block">Prime q</span>
                <span className="text-xl font-bold text-white">{q}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-xs block">Public Exp e</span>
                <span className="text-xl font-bold text-cyan-400">{e}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-xs block">Message M</span>
                <span className="text-xl font-bold text-emerald-400">{m}</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Stage 1: Prime Number Selection',
      badge: 'Step 1 of Key Generation',
      subtitle: 'Choosing two distinct prime numbers p and q',
      content: (
        <div className="space-y-6 max-w-3xl mx-auto py-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-800/60 shadow-xl space-y-4">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Algebraic Requirement:
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-white">
              p = {p}, q = {q} (where p ≠ q and both are prime)
            </div>
            <p className="text-slate-300 text-base leading-relaxed">
              We select two secret primes <span className="font-mono text-cyan-300 font-bold">p = 3</span> and <span className="font-mono text-cyan-300 font-bold">q = 11</span>. In real-world security, these numbers are hundreds of digits long (1024 or 2048 bits each).
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-sm block">Prime p Check</span>
              <span className="text-lg font-mono font-bold text-emerald-400">3 is Prime ✓</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-sm block">Prime q Check</span>
              <span className="text-lg font-mono font-bold text-emerald-400">11 is Prime ✓</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Stage 2: Calculate Modulus n & Totient φ(n)',
      badge: 'Step 2 & 3 of Key Generation',
      subtitle: 'Establishing the cyclic field and the secret trapdoor',
      content: (
        <div className="space-y-6 max-w-3xl mx-auto py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-800/60 shadow-xl">
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider">Formula 1: Modulus n</span>
              <div className="text-2xl font-mono font-bold text-white mt-2 mb-3">
                n = p × q
              </div>
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-emerald-400 text-lg font-bold">
                n = 3 × 11 = 33
              </div>
              <p className="text-slate-400 text-xs mt-3">
                Modulus n is made public. It determines the finite range of all encryption operations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-indigo-800/60 shadow-xl">
              <span className="text-xs font-mono uppercase text-indigo-400 tracking-wider">Formula 2: Euler's Totient</span>
              <div className="text-2xl font-mono font-bold text-white mt-2 mb-3">
                φ(n) = (p - 1) × (q - 1)
              </div>
              <div className="p-3 rounded-xl bg-slate-950 font-mono text-cyan-300 text-lg font-bold">
                φ(33) = (3 - 1) × (11 - 1) = 2 × 10 = 20
              </div>
              <p className="text-slate-400 text-xs mt-3">
                φ(n) counts integers coprime to 33. This value is the secret trapdoor!
              </p>
            </div>

          </div>
        </div>
      )
    },
    {
      title: 'Stage 3: Public Exponent e & Private Exponent d',
      badge: 'Step 4 & 5 of Key Generation',
      subtitle: 'Finding the modular multiplicative inverse using Extended Euclidean Algorithm',
      content: (
        <div className="space-y-6 max-w-3xl mx-auto py-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-800/60 shadow-xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase">Public Exponent Condition:</span>
                <div className="text-lg font-mono font-bold text-cyan-400 mt-1">
                  1 &lt; e &lt; φ(n) and GCD(e, φ(n)) = 1
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  We choose <strong className="text-white">e = 3</strong>. Since GCD(3, 20) = 1, e is valid!
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 uppercase">Private Exponent Inverse:</span>
                <div className="text-lg font-mono font-bold text-violet-400 mt-1">
                  d × e ≡ 1 (mod φ(n))
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  d × 3 ≡ 1 (mod 20) ⇒ <strong className="text-white">d = 7</strong> (since 3 × 7 = 21 ≡ 1 mod 20).
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-slate-950 rounded-xl border border-cyan-800/50">
                <span className="text-cyan-400 text-xs font-mono block">PUBLIC KEY (e, n)</span>
                <span className="text-xl font-mono font-bold text-white">(3, 33)</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-violet-800/50">
                <span className="text-violet-400 text-xs font-mono block">PRIVATE KEY (d, n)</span>
                <span className="text-xl font-mono font-bold text-violet-300">(7, 33)</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Stage 4: RSA Encryption in Action',
      badge: 'Step 6: Encryption',
      subtitle: 'Computing ciphertext C = Mᵉ mod n with the Public Key',
      content: (
        <div className="space-y-6 max-w-3xl mx-auto py-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-600/50 shadow-xl space-y-4">
            <span className="text-xs font-mono uppercase text-amber-400 tracking-wider">
              Encryption Formula:
            </span>
            <div className="text-3xl font-mono font-bold text-white text-center py-2 bg-slate-950 rounded-xl border border-slate-800">
              C = M<sup className="text-cyan-400">e</sup> mod n
            </div>

            <div className="font-mono text-sm sm:text-base space-y-2 text-slate-200 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>• Substitute values: C = 4³ mod 33</div>
              <div>• Power calculation: 4³ = 4 × 4 × 4 = 64</div>
              <div>• Modular reduction: 64 mod 33 = 64 - (1 × 33) = 31</div>
              <div className="text-amber-400 font-bold text-lg pt-2 border-t border-slate-800">
                ⇒ Ciphertext C = 31
              </div>
            </div>

            <p className="text-xs text-slate-400">
              The sender transmits number <strong className="text-amber-400">31</strong> over the untrusted network. An attacker seeing 31 cannot recover 4 without the private exponent d.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Stage 5: RSA Decryption in Action',
      badge: 'Step 7: Decryption',
      subtitle: 'Recovering original message M = Cᵈ mod n with Private Key',
      content: (
        <div className="space-y-6 max-w-3xl mx-auto py-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-violet-600/50 shadow-xl space-y-4">
            <span className="text-xs font-mono uppercase text-violet-400 tracking-wider">
              Decryption Formula:
            </span>
            <div className="text-3xl font-mono font-bold text-white text-center py-2 bg-slate-950 rounded-xl border border-slate-800">
              M = C<sup className="text-violet-400">d</sup> mod n
            </div>

            <div className="font-mono text-sm sm:text-base space-y-2 text-slate-200 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>• Substitute values: M = 31⁷ mod 33</div>
              <div>• 31 ≡ -2 (mod 33)</div>
              <div>• (-2)⁷ = -128</div>
              <div>• -128 mod 33 = -128 + (4 × 33) = -128 + 132 = 4</div>
              <div className="text-emerald-400 font-bold text-lg pt-2 border-t border-slate-800">
                ⇒ Recovered Plaintext M = 4
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Mathematical Proof: (Mᵉ)ᵈ ≡ M^(e·d) ≡ M^(1 mod 20) ≡ M (mod 33) Verified!</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Summary & Mathematical Verification',
      badge: 'Algorithm Summary',
      subtitle: 'Complete evaluation table verifying all computed values',
      content: (
        <div className="space-y-6 max-w-3xl mx-auto py-4">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/50 shadow-2xl">
            <h3 className="text-xl font-bold text-white text-center mb-4">
              RSA Mathematical Verification Summary
            </h3>

            <div className="overflow-hidden rounded-xl border border-slate-800 text-xs font-mono">
              <table className="w-full text-left">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Parameter / Stage</th>
                    <th className="p-3">Formula</th>
                    <th className="p-3 text-right">Computed Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="p-3 text-cyan-400 font-bold">Prime p</td>
                    <td className="p-3">Selected Prime</td>
                    <td className="p-3 text-right font-bold text-white">3</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-cyan-400 font-bold">Prime q</td>
                    <td className="p-3">Selected Prime</td>
                    <td className="p-3 text-right font-bold text-white">11</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-cyan-400 font-bold">Modulus n</td>
                    <td className="p-3">n = p × q</td>
                    <td className="p-3 text-right font-bold text-white">33</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-cyan-400 font-bold">Euler's Totient φ(n)</td>
                    <td className="p-3">φ(n) = (p-1)(q-1)</td>
                    <td className="p-3 text-right font-bold text-white">20</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-cyan-400 font-bold">Public Key (e, n)</td>
                    <td className="p-3">GCD(e, φ)=1</td>
                    <td className="p-3 text-right font-bold text-cyan-300">(3, 33)</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-violet-400 font-bold">Private Key (d, n)</td>
                    <td className="p-3">d × e ≡ 1 mod φ(n)</td>
                    <td className="p-3 text-right font-bold text-violet-300">(7, 33)</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-amber-400 font-bold">Ciphertext C</td>
                    <td className="p-3">C = 4³ mod 33</td>
                    <td className="p-3 text-right font-bold text-amber-300">31</td>
                  </tr>
                  <tr className="bg-emerald-950/40">
                    <td className="p-3 text-emerald-400 font-bold">Recovered Message M</td>
                    <td className="p-3">M = 31⁷ mod 33</td>
                    <td className="p-3 text-right font-bold text-emerald-400 text-sm">4 (100% Match)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={loadBoardExample}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
              >
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span>Re-run Board Example</span>
              </button>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#060a13] text-white">
      
      {/* Top Projector Toolbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#090e1a]">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <span>RSA LAB</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-violet-950 border border-violet-800 text-violet-300 font-mono">
                PRESENTATION MODE
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Slide {currentSlide + 1} of {slides.length} • Press Arrow Keys or Space to Navigate
            </span>
          </div>
        </div>

        {/* Toolbar Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={loadBoardExample}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset Demo</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-xs font-medium text-rose-200 border border-rose-800 transition"
          >
            <X className="w-4 h-4" />
            <span>Exit Presentation (Esc)</span>
          </button>
        </div>
      </header>

      {/* Slide Canvas */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-12 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
          
          {/* Slide Header */}
          <div className="text-center mb-6">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-400 uppercase tracking-widest inline-block mb-2">
              {slides[currentSlide].badge}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              {slides[currentSlide].title}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-1">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          {/* Slide Body */}
          {slides[currentSlide].content}

        </div>
      </main>

      {/* Bottom Navigation Footer */}
      <footer className="px-6 py-4 border-t border-slate-800 bg-[#090e1a] flex items-center justify-between">
        <button
          onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous (←)</span>
        </button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === currentSlide
                  ? 'w-8 bg-cyan-400'
                  : 'w-2.5 bg-slate-700 hover:bg-slate-600'
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold shadow-lg shadow-cyan-600/30 transition"
        >
          <span>Next Slide (→)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </footer>

    </div>
  );
}
