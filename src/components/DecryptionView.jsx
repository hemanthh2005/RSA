import React from 'react';
import { Unlock, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Key, Terminal, Sparkles } from 'lucide-react';

export default function DecryptionView({
  mode,
  textMessage,
  numMessage,
  privateKey,
  decryptionResult,
  encryptionResult
}) {
  const d = privateKey?.d ? privateKey.d.toString() : '2753';
  const n = privateKey?.n ? privateKey.n.toString() : '3233';

  // Compare original with recovered
  const isMatch = mode === 'numerical'
    ? decryptionResult && decryptionResult.m?.toString() === numMessage
    : decryptionResult && decryptionResult.recoveredText === textMessage;

  return (
    <section id="decryption" className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-800 text-violet-400 text-xs font-semibold mb-2">
            <Unlock className="w-3.5 h-3.5" />
            <span>Section 7 • Reversing the Trapdoor Function</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Step 3 – RSA Decryption
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Using the recipient's secret private exponent <span className="font-mono text-violet-300">d</span> to reverse the modular exponentiation.
          </p>
        </div>

        {/* Formula & Variables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1 glass-panel rounded-2xl p-6 border border-violet-500/20 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-violet-400 tracking-wider">
                Decryption Formula
              </span>
              <div className="mt-2 text-2xl sm:text-3xl font-mono font-bold text-white bg-slate-900/90 p-4 rounded-xl border border-violet-900/60 text-center">
                M = C<sup className="text-violet-400">d</sup> mod n
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
              Only the entity holding the secret private key <span className="font-mono text-violet-300">d</span> can compute this reverse operation.
            </div>
          </div>

          <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-3 block">
              Variable Definitions & Secret Key
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="font-mono font-bold text-amber-400 text-sm">C</span>
                <p className="text-slate-300 font-medium mt-0.5">Ciphertext integer</p>
                <p className="text-[11px] text-slate-500 mt-1">Received from sender via public channel.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="font-mono font-bold text-violet-400 text-sm">d = {d}</span>
                <p className="text-slate-300 font-medium mt-0.5">Private Exponent (Secret)</p>
                <p className="text-[11px] text-slate-500 mt-1">Multiplicative inverse of e mod φ(n).</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="font-mono font-bold text-cyan-400 text-sm">n = {n}</span>
                <p className="text-slate-300 font-medium mt-0.5">Modulus (Shared with public key)</p>
                <p className="text-[11px] text-slate-500 mt-1">Cycle size for modular arithmetic.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="font-mono font-bold text-emerald-400 text-sm">M</span>
                <p className="text-slate-300 font-medium mt-0.5">Recovered Plaintext Value</p>
                <p className="text-[11px] text-slate-500 mt-1">Exactly identical to original message.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Status Banner */}
        {decryptionResult && (
          <div className="mb-8">
            {isMatch ? (
              <div className="p-5 rounded-2xl bg-emerald-950/50 border border-emerald-500/60 text-emerald-200 flex items-center justify-between gap-4 shadow-lg shadow-emerald-950/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      SUCCESS: The original plaintext has been recovered!
                    </h4>
                    <p className="text-xs text-emerald-300/90 mt-0.5">
                      Decryption executed the mathematical inverse Cᵈ mod n. The recovered output perfectly matches the original input.
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-700 text-xs font-mono font-bold text-emerald-300">
                  MATCH VERIFIED 100%
                </span>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-rose-950/50 border border-rose-500/60 text-rose-200 flex items-center gap-3">
                <XCircle className="w-6 h-6 text-rose-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    ERROR: Decrypted message does not match original plaintext!
                  </h4>
                  <p className="text-xs text-rose-300 mt-0.5">
                    Check whether the keys were generated from valid coprime parameters or if the message exceeded modulus n.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Side-by-Side Comparison Card */}
        {decryptionResult && (
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                Original Input Message:
              </span>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-sm sm:text-base text-white break-all">
                {mode === 'numerical' ? numMessage : textMessage}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-900/50">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                Decrypted & Recovered Output:
              </span>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-sm sm:text-base text-emerald-300 font-bold break-all">
                {mode === 'numerical' ? decryptionResult.m?.toString() : decryptionResult.recoveredText}
              </div>
            </div>
          </div>
        )}

        {/* Decryption Table for Text Mode */}
        {mode === 'text' && decryptionResult?.byteDetails && (
          <div className="glass-panel-glow rounded-2xl p-6 border border-violet-500/30">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-violet-400" />
              <span>UTF-8 Per-Byte Decryption Table</span>
            </h3>

            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Index</th>
                    <th className="p-3">Ciphertext C</th>
                    <th className="p-3">Private Exponent d</th>
                    <th className="p-3">Modulus n</th>
                    <th className="p-3">Recovered Value M</th>
                    <th className="p-3">Decoded Character</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {decryptionResult.byteDetails.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30 transition">
                      <td className="p-3 text-slate-500">#{item.index}</td>
                      <td className="p-3 text-amber-400 font-semibold">{item.c}</td>
                      <td className="p-3 text-violet-400">{item.d}</td>
                      <td className="p-3 text-slate-400">{item.n}</td>
                      <td className="p-3 text-emerald-400 font-bold">{item.m}</td>
                      <td className="p-3 font-sans">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold">
                          {String.fromCharCode(item.byte) === ' ' ? '␣ (Space)' : String.fromCharCode(item.byte)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Decryption View for Numerical Mode */}
        {mode === 'numerical' && decryptionResult?.m && (
          <div className="glass-panel-glow rounded-2xl p-6 border border-violet-500/30">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-violet-400" />
              <span>Numerical Decryption Step</span>
            </h3>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-slate-300">
              <div className="text-slate-400 text-xs mb-1">Mathematical Evaluation:</div>
              <div className="text-violet-300 font-bold text-base">
                M = {encryptionResult?.c?.toString()}<sup>{d}</sup> mod {n}
              </div>
              <div className="mt-3 text-slate-400 space-y-1 text-xs">
                <div>Exponentiation: {encryptionResult?.c?.toString()} raised to power {d} under modulo {n}</div>
                <div className="text-emerald-400 font-bold text-sm mt-2">
                  ⇒ Recovered Plaintext Integer M = {decryptionResult.m?.toString()}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
