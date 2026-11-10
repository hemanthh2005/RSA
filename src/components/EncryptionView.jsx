import React, { useState } from 'react';
import { Lock, Copy, Check, ChevronDown, ChevronUp, AlertTriangle, Info, Terminal, Sparkles } from 'lucide-react';

export default function EncryptionView({
  mode,
  textMessage,
  numMessage,
  publicKey,
  encryptionResult,
  onCopyCiphertext,
  isCopied
}) {
  const [expandedRow, setExpandedRow] = useState(null);

  const e = publicKey?.e ? publicKey.e.toString() : '17';
  const n = publicKey?.n ? publicKey.n.toString() : '3233';

  const toggleRow = (idx) => {
    setExpandedRow(expandedRow === idx ? null : idx);
  };

  return (
    <section id="encryption" className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Section 6 • Mathematical Transformation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Step 2 – RSA Encryption
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Computing ciphertext <span className="font-mono text-cyan-300">C</span> using modular exponentiation with public key <span className="font-mono text-cyan-300">(e, n)</span>.
          </p>
        </div>

        {/* Formula & Variables Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1 glass-panel rounded-2xl p-6 border border-cyan-500/20 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
                Cryptographic Formula
              </span>
              <div className="mt-2 text-2xl sm:text-3xl font-mono font-bold text-white bg-slate-900/90 p-4 rounded-xl border border-cyan-900/60 text-center">
                C = M<sup className="text-cyan-400">e</sup> mod n
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              Computed in <span className="text-cyan-300 font-mono">O(log e)</span> time using square-and-multiply modular exponentiation to prevent massive numerical overflows.
            </div>
          </div>

          <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-3 block">
              Variable Definitions & Active Parameters
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="font-mono font-bold text-cyan-400 text-sm">M</span>
                <p className="text-slate-300 font-medium mt-0.5">Plaintext represented as an integer</p>
                <p className="text-[11px] text-slate-500 mt-1">Must strictly satisfy 0 ≤ M &lt; n.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="font-mono font-bold text-cyan-400 text-sm">e = {e}</span>
                <p className="text-slate-300 font-medium mt-0.5">Public Exponent</p>
                <p className="text-[11px] text-slate-500 mt-1">Part of public key; power to which M is raised.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="font-mono font-bold text-cyan-400 text-sm">n = {n}</span>
                <p className="text-slate-300 font-medium mt-0.5">Public Modulus (p × q)</p>
                <p className="text-[11px] text-slate-500 mt-1">Defines the upper bound and cyclic modulus range.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="font-mono font-bold text-amber-400 text-sm">C</span>
                <p className="text-slate-300 font-medium mt-0.5">Resulting Ciphertext Integer</p>
                <p className="text-[11px] text-slate-500 mt-1">Transmitted safely across untrusted channels.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Highly Visible Educational Disclaimer */}
        <div className="mb-8 p-4 rounded-xl bg-amber-950/30 border border-amber-600/40 text-amber-300 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="text-amber-200">IMPORTANT CRYPTOGRAPHIC NOTICE (NSCL Lab): </strong>
            This per-byte encoding demonstrates <strong className="text-white">textbook RSA mathematics</strong> for educational clarity. It is <strong className="text-white">NOT secure for production</strong>. In textbook RSA, identical characters produce identical ciphertexts (deterministic encryption) and are vulnerable to frequency analysis and chosen-ciphertext attacks. Modern RSA uses randomized padding such as <strong className="text-white">RSA-OAEP</strong> before exponentiation.
          </div>
        </div>

        {/* Numerical Mode vs Text Mode Encryption View */}
        {mode === 'numerical' ? (
          <div className="glass-panel-glow rounded-2xl p-6 border border-cyan-500/30">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Numerical Single Integer Encryption Calculation</span>
            </h3>

            {encryptionResult ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-mono block">Plaintext M</span>
                    <span className="text-lg font-mono font-bold text-white">{numMessage}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-mono block">Exponent e</span>
                    <span className="text-lg font-mono font-bold text-cyan-400">{e}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-mono block">Modulus n</span>
                    <span className="text-lg font-mono font-bold text-cyan-400">{n}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40">
                    <span className="text-[11px] text-amber-300 font-mono block">Ciphertext C</span>
                    <span className="text-lg font-mono font-bold text-amber-400">{encryptionResult.c?.toString()}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300">
                  <div className="text-slate-400 text-xs mb-1">Step-by-Step Calculation:</div>
                  <div className="text-cyan-300 font-bold">
                    C = {numMessage}<sup>{e}</sup> mod {n}
                  </div>
                  {numMessage === '4' && e === '3' && n === '33' && (
                    <div className="text-slate-400 mt-2 space-y-1 text-xs">
                      <div>1. Compute Power: 4³ = 64</div>
                      <div>2. Apply Modulus: 64 mod 33 = 31 (since 64 = 1 × 33 + 31)</div>
                      <div className="text-amber-400 font-bold mt-1">⇒ Ciphertext C = 31</div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-slate-400">
                Click "Encrypt Message" in the simulator to execute this calculation.
              </div>
            )}
          </div>
        ) : (
          /* Text Mode UTF-8 Byte Encryption View */
          <div className="glass-panel-glow rounded-2xl p-6 border border-cyan-500/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>UTF-8 Per-Byte Encryption Table</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Input text encoded to UTF-8 numbers (TextEncoder), each encrypted via C = Mᵉ mod n.
                </p>
              </div>

              {encryptionResult && (
                <button
                  onClick={onCopyCiphertext}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{isCopied ? 'Copied Ciphertext' : 'Copy Ciphertext Array'}</span>
                </button>
              )}
            </div>

            {/* Ciphertext Array Summary Box */}
            {encryptionResult?.ciphertexts && (
              <div className="mb-6 p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
                <span className="text-slate-400 text-[10px] block mb-1 uppercase tracking-wider">
                  Resulting Ciphertext Integer Sequence [C₁, C₂, ...]:
                </span>
                <div className="text-amber-300 break-all select-all font-semibold">
                  [ {encryptionResult.ciphertexts.map(c => c.toString()).join(', ')} ]
                </div>
              </div>
            )}

            {/* Calculation Table */}
            {encryptionResult?.byteDetails ? (
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">Index</th>
                      <th className="p-3">Character</th>
                      <th className="p-3">Original Byte M</th>
                      <th className="p-3">Public Exponent e</th>
                      <th className="p-3">Modulus n</th>
                      <th className="p-3">Ciphertext C</th>
                      <th className="p-3 text-right">Modular Trace</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {encryptionResult.byteDetails.map((item, idx) => (
                      <React.Fragment key={idx}>
                        <tr className="hover:bg-slate-800/30 transition">
                          <td className="p-3 text-slate-500">#{item.index}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                              {item.char === ' ' ? '␣ (Space)' : item.char}
                            </span>
                          </td>
                          <td className="p-3 text-white font-semibold">{item.m}</td>
                          <td className="p-3 text-cyan-400">{item.e}</td>
                          <td className="p-3 text-cyan-400">{item.n}</td>
                          <td className="p-3 text-amber-400 font-bold">{item.c}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => toggleRow(idx)}
                              className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-sans hover:underline"
                            >
                              <span>{expandedRow === idx ? 'Hide Trace' : 'View Trace'}</span>
                              {expandedRow === idx ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                          </td>
                        </tr>

                        {/* Expandable Square-and-Multiply Steps */}
                        {expandedRow === idx && (
                          <tr className="bg-slate-950/80">
                            <td colSpan="7" className="p-4">
                              <div className="rounded-xl p-3 bg-slate-900/80 border border-slate-800 text-xs font-mono">
                                <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800 text-slate-300">
                                  <span>
                                    Square-and-Multiply Trace for '{item.char}' (M = {item.m}, e = {item.e}, n = {item.n}):
                                  </span>
                                  <span className="text-[10px] text-cyan-400 font-sans">
                                    Binary(e) = {item.binaryExp}
                                  </span>
                                </div>
                                
                                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2 text-[11px]">
                                  {item.steps && item.steps.length > 0 ? (
                                    item.steps.map((st, sIdx) => (
                                      <div key={sIdx} className="flex items-center justify-between py-0.5 text-slate-400">
                                        <span className="text-cyan-300">{st.step}</span>
                                        <span className="text-slate-300">{st.explanation}</span>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="text-slate-400">
                                      Single step evaluation: ({item.m}ᵉ mod {item.n}) = {item.c}
                                    </div>
                                  )}
                                </div>
                                
                                <div className="mt-2 pt-2 border-t border-slate-800 text-right text-amber-400 font-bold">
                                  Final Ciphertext C = {item.c}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-slate-400">
                Click "Encrypt Message" in the simulator to generate the byte transformation table.
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
