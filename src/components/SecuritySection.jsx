import React from 'react';
import { ShieldAlert, Zap, Lock, FileCode, AlertOctagon, Cpu, ShieldCheck } from 'lucide-react';

export default function SecuritySection() {
  const limitations = [
    {
      title: '1. Asymmetric Performance vs Symmetric Speed',
      icon: Zap,
      accent: 'text-amber-400 border-amber-500/30',
      description: 'RSA calculations involve exponentiation with massive 2048-bit numbers, making it approximately 1,000 times slower than hardware-accelerated symmetric ciphers like AES-GCM. That is why production systems use hybrid encryption (AES encrypts the payload, RSA encrypts the AES key).'
    },
    {
      title: '2. Message Size Bound (M < n)',
      icon: FileCode,
      accent: 'text-cyan-400 border-cyan-500/30',
      description: 'Mathematically, the numerical plaintext M cannot exceed modulus n. To encrypt large video or document files directly with RSA would require breaking them into thousands of tiny blocks, drastically multiplying compute overhead and ciphertext expansion.'
    },
    {
      title: '3. Fatal Flaws of "Textbook RSA" (No Padding)',
      icon: AlertOctagon,
      accent: 'text-rose-400 border-rose-500/30',
      description: 'Textbook RSA (as demonstrated in classroom lectures) is completely deterministic: encrypting the letter "A" always yields the exact same ciphertext. It is also multiplicatively homomorphic: (M₁ᵉ)(M₂ᵉ) ≡ (M₁M₂)ᵉ mod n, making it vulnerable to chosen-ciphertext and malleability attacks.'
    },
    {
      title: '4. Modern Secure Padding (OAEP & PSS)',
      icon: ShieldCheck,
      accent: 'text-emerald-400 border-emerald-500/30',
      description: 'To neutralize structural mathematical attacks, production RSA requires randomized padding. Encryption mandates RSA-OAEP (Optimal Asymmetric Encryption Padding), which mixes random noise and hash functions. Digital signatures mandate RSA-PSS (Probabilistic Signature Scheme).'
    },
    {
      title: '5. Key Lengths in Modern Cryptanalysis',
      icon: Lock,
      accent: 'text-violet-400 border-violet-500/30',
      description: 'Small RSA keys are easily factored. 512-bit RSA was publicly cracked in 1999; 768-bit was factored in 2009. Today, NIST and BSI enforce a minimum key length of 2048 bits for general security, with 4096 bits recommended for long-term top-secret root certificates.'
    },
    {
      title: '6. The Quantum Threat & Shor’s Algorithm',
      icon: Cpu,
      accent: 'text-purple-400 border-purple-500/30',
      description: 'On classical computers, factoring n relies on the General Number Field Sieve (GNFS), which takes sub-exponential time. However, Peter Shor (1994) proved that a fault-tolerant quantum computer can factor n in polynomial time O((log n)³). NIST is actively migrating to Post-Quantum Cryptography (ML-KEM / Kyber).'
    }
  ];

  return (
    <section id="security" className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800 text-rose-400 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Section 12 • Cryptanalysis & Best Practices</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            RSA Security: Important Limitations
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Understanding theoretical elegance versus real-world implementation vulnerabilities is essential for college network security mastery.
          </p>
        </div>

        {/* Obvious Educational Use Only Warning Banner */}
        <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-rose-950/60 via-amber-950/40 to-slate-900 border border-amber-500/50 shadow-xl">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                Educational-Use-Only Notice
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                "This simulator demonstrates textbook RSA mathematics. It is not suitable for protecting real confidential information. Production RSA requires secure padding, secure key generation and proper key management."
              </p>
            </div>
          </div>
        </div>

        {/* Limitations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {limitations.map((lim, idx) => {
            const IconComp = lim.icon;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`p-2 rounded-lg bg-slate-900 border ${lim.accent}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white">
                    {lim.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lim.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
