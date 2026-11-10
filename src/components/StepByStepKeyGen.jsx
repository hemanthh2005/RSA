import React, { useState } from 'react';
import { Key, ArrowRight, ArrowLeft, CheckCircle2, Eye, EyeOff, RotateCcw, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

export default function StepByStepKeyGen({ keyData }) {
  const [activeStep, setActiveStep] = useState(1);
  const [showAll, setShowAll] = useState(false);

  // If keys are not generated yet, provide guidance or fallback
  const p = keyData?.p ? keyData.p.toString() : '61';
  const q = keyData?.q ? keyData.q.toString() : '53';
  const n = keyData?.n ? keyData.n.toString() : '3233';
  const phi = keyData?.phi ? keyData.phi.toString() : '3120';
  const e = keyData?.e ? keyData.e.toString() : '17';
  const d = keyData?.d ? keyData.d.toString() : '2753';
  const gcdVal = keyData?.gcdVal ? keyData.gcdVal.toString() : '1';

  const steps = [
    {
      num: 1,
      title: 'Select Two Distinct Prime Numbers',
      subtitle: 'The foundational security bedrock of RSA',
      formula: 'p, q ∈ Primes, where p ≠ q',
      values: `p = ${p}, q = ${q}`,
      description: 'RSA begins by choosing two distinct prime numbers. A prime number is an integer greater than 1 that is divisible only by 1 and itself.',
      mathDetails: [
        { label: 'Prime p', value: p, note: 'Kept strictly secret' },
        { label: 'Prime q', value: q, note: 'Kept strictly secret' },
        { label: 'Distinct Check', value: p !== q ? 'Passed (p ≠ q)' : 'Failed (p = q)', isGood: p !== q },
      ],
      note: 'In production RSA, p and q are chosen randomly as 1024-bit or 2048-bit numbers to prevent factorization.'
    },
    {
      num: 2,
      title: 'Calculate Modulus n',
      subtitle: 'The public modulus used in both keys',
      formula: 'n = p × q',
      values: `${n} = ${p} × ${q}`,
      description: 'The modulus n is the product of the two prime numbers. It defines the size of the key and the finite field in which all modular operations occur.',
      mathDetails: [
        { label: 'Calculation', value: `${p} × ${q} = ${n}`, note: 'Computed via BigInt multiplication' },
        { label: 'Modulus n', value: n, note: 'Publicly released as part of both keys' },
        { label: 'Bit Length', value: `${BigInt(n).toString(2).length} bits`, note: 'Educational size (Production uses 2048+ bits)' }
      ],
      note: 'It is computationally trivial to compute n by multiplying p and q, but extremely hard to factor n back into p and q.'
    },
    {
      num: 3,
      title: "Calculate Euler's Totient φ(n)",
      subtitle: 'The count of integers coprime to n',
      formula: 'φ(n) = (p - 1) × (q - 1)',
      values: `φ(${n}) = (${p} - 1) × (${q} - 1) = ${phi}`,
      description: "Euler's totient function φ(n) counts how many positive integers up to n are relatively prime (coprime) to n. For the product of two primes, it simply equals (p - 1)(q - 1).",
      mathDetails: [
        { label: 'p - 1', value: (BigInt(p) - 1n).toString(), note: `(${p} - 1)` },
        { label: 'q - 1', value: (BigInt(q) - 1n).toString(), note: `(${q} - 1)` },
        { label: 'Totient φ(n)', value: phi, note: 'Kept secret! Anyone knowing φ(n) can derive private key d' }
      ],
      note: 'Totient φ(n) is the hidden trapdoor. Only someone who knows p and q can compute φ(n) quickly.'
    },
    {
      num: 4,
      title: 'Select Public Exponent e',
      subtitle: 'Must be coprime to Euler’s totient',
      formula: '1 < e < φ(n) and GCD(e, φ(n)) = 1',
      values: `e = ${e}, GCD(${e}, ${phi}) = ${gcdVal}`,
      description: 'The public exponent e is chosen so that it shares no common divisors with φ(n) other than 1. "GCD" stands for Greatest Common Divisor; GCD(e, φ(n)) = 1 means they are coprime.',
      mathDetails: [
        { label: 'Public Exponent e', value: e, note: 'Common choices: 3, 17, 65537 (2¹⁶ + 1)' },
        { label: 'Range Check', value: `1 < ${e} < ${phi}`, isGood: BigInt(e) > 1n && BigInt(e) < BigInt(phi) },
        { label: 'GCD(e, φ(n))', value: gcdVal, isGood: gcdVal === '1', note: 'Coprimality is mandatory for modular inverse' }
      ],
      note: 'Exponent 65537 (2¹⁶ + 1) is widely used in practice because its binary form (10000000000000001) enables fast square-and-multiply computation.'
    },
    {
      num: 5,
      title: 'Calculate Private Exponent d',
      subtitle: 'The modular multiplicative inverse of e mod φ(n)',
      formula: 'd × e ≡ 1 (mod φ(n))',
      values: `${d} × ${e} ≡ 1 (mod ${phi})`,
      description: 'The private exponent d is calculated using the Extended Euclidean Algorithm. It is the number that "undoes" the exponentiation by e in the modular clock arithmetic of φ(n).',
      mathDetails: [
        { label: 'Private Exponent d', value: d, note: 'Calculated via Extended Euclidean Algorithm' },
        { label: 'Verification Check', value: `(${d} × ${e}) mod ${phi} = ${(BigInt(d) * BigInt(e)) % BigInt(phi)}`, isGood: (BigInt(d) * BigInt(e)) % BigInt(phi) === 1n },
        { label: 'Secrecy Level', value: 'ULTRA SECRET', note: 'Only the receiver must ever know d' }
      ],
      note: 'Mathematical proof: d × e = k × φ(n) + 1. By Euler-Fermat theorem, (M^e)^d ≡ M^(e·d) ≡ M^(k·φ(n) + 1) ≡ M (mod n).'
    },
    {
      num: 6,
      title: 'Generate RSA Key Pairs',
      subtitle: 'Public Key and Private Key are complete',
      formula: 'Public Key = (e, n) | Private Key = (d, n)',
      values: `Public: (${e}, ${n})  •  Private: (${d}, ${n})`,
      description: 'Key generation is complete! The public key can be published in a digital certificate or directory for anyone to use. The private key must be safely stored in a secure hardware token or encrypted keystore.',
      mathDetails: [
        { label: 'Public Key (e, n)', value: `(${e}, ${n})`, note: 'Publish to the world for encryption & signature verification' },
        { label: 'Private Key (d, n)', value: `(${d}, ${n})`, note: 'Keep strictly confidential for decryption & digital signing' },
        { label: 'Status', value: 'Ready for Cryptographic Operations', isGood: true }
      ],
      note: 'Notice that both keys share the exact same modulus n. Only the exponents (e vs d) differ!'
    }
  ];

  return (
    <section id="keygen-steps" className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-2">
              <Key className="w-3.5 h-3.5" />
              <span>Section 5 • Interactive Walkthrough</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Step 1 – RSA Key Generation
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Reveal each algebraic phase step-by-step using your actual live parameters.
            </p>
          </div>

          {/* Presentation Step Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              {showAll ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{showAll ? 'Step-by-Step Mode' : 'Show All Steps'}</span>
            </button>

            {!showAll && (
              <>
                <button
                  disabled={activeStep === 1}
                  onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                <div className="px-2.5 py-1 text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 rounded-lg">
                  {activeStep} / 6
                </div>

                <button
                  disabled={activeStep === 6}
                  onClick={() => setActiveStep((prev) => Math.min(6, prev + 1))}
                  className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-medium rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow transition"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Step Cards Grid / Single View */}
        <div className={`grid gap-6 ${showAll ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {steps.map((s) => {
            const isVisible = showAll || s.num === activeStep;
            if (!isVisible) return null;

            return (
              <div
                key={s.num}
                className="glass-panel-glow rounded-2xl p-6 border border-cyan-500/30 transition-all duration-300 relative overflow-hidden"
              >
                {/* Header with step number & badges */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                      {s.num}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                        {s.title}
                      </h3>
                      <span className="text-[11px] text-cyan-300">{s.subtitle}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700">
                    Step {s.num} of 6
                  </span>
                </div>

                {/* Primary Formula Box */}
                <div className="mb-4 p-3.5 rounded-xl bg-slate-900/90 border border-cyan-900/60 shadow-inner">
                  <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1">
                    Algebraic Formula:
                  </div>
                  <div className="font-mono text-xs sm:text-sm text-cyan-300 font-bold">
                    {s.formula}
                  </div>
                  <div className="mt-1 pt-1.5 border-t border-slate-800 text-xs sm:text-sm font-mono text-emerald-400">
                    Current Evaluation: <span className="text-white font-bold">{s.values}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {s.description}
                </p>

                {/* Detailed Math Breakdown Table */}
                <div className="space-y-2 mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  {s.mathDetails.map((detail, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/50 last:border-0">
                      <span className="text-slate-400 font-medium">{detail.label}:</span>
                      <div className="text-right">
                        <span className={`font-mono font-semibold ${detail.isGood === false ? 'text-rose-400' : 'text-cyan-300'}`}>
                          {detail.value}
                        </span>
                        {detail.note && (
                          <div className="text-[10px] text-slate-500">{detail.note}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Key Insight Note Box */}
                <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-[11px] text-indigo-300 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white">Note: </strong>
                    {s.note}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Quick Stepper Dots */}
        {!showAll && (
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3, 4, 5, 6].map((stepNum) => (
              <button
                key={stepNum}
                onClick={() => setActiveStep(stepNum)}
                className={`w-3 h-3 rounded-full transition-all ${
                  stepNum === activeStep
                    ? 'bg-cyan-400 w-8'
                    : stepNum < activeStep
                    ? 'bg-cyan-800 hover:bg-cyan-700'
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
                aria-label={`Jump to step ${stepNum}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
