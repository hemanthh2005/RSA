import React, { useState } from 'react';
import { Key, Lock, Unlock, RotateCcw, Copy, Check, Sparkles, AlertCircle, CheckCircle2, History, HelpCircle, Layers, ArrowRight } from 'lucide-react';
import { isPrime, gcd } from '../utils/rsaMath';

export default function Simulator({
  mode,
  setMode,
  pInput,
  setPInput,
  qInput,
  setQInput,
  eInput,
  setEInput,
  textMessage,
  setTextMessage,
  numMessage,
  setNumMessage,
  keyData,
  encryptionResult,
  decryptionResult,
  history,
  onGenerateKeys,
  onEncrypt,
  onDecrypt,
  onReset,
  onLoadDefaultExample,
  onLoadBoardExample,
  validationError,
  successMessage
}) {
  const [copiedKey, setCopiedKey] = useState(null);

  // Live primality indicators
  const pIsPrime = pInput ? isPrime(pInput) : null;
  const qIsPrime = qInput ? isPrime(qInput) : null;

  const handleCopy = (text, keyType) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyType);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="simulator" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Cryptographic Laboratory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Try RSA Yourself
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Configure prime parameters, generate cryptographic key pairs, and watch real-time encryption and decryption execute directly in your browser.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-lg">
            <button
              onClick={() => setMode('text')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                mode === 'text'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span>Text Encryption Mode (UTF-8)</span>
            </button>
            <button
              onClick={() => setMode('numerical')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                mode === 'numerical'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span>Numerical Encryption Mode (Integers)</span>
            </button>
          </div>
        </div>

        {/* Preset Quick Actions */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Quick-Load Preset Configurations:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onLoadBoardExample}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-violet-950/80 hover:bg-violet-900 text-violet-300 border border-violet-700/60 transition flex items-center gap-1.5"
              title="Loads college exam board example: p=3, q=11, e=3, M=4"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Load Board Example (p=3, q=11, e=3, M=4)</span>
            </button>

            <button
              onClick={onLoadDefaultExample}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Loads text mode defaults: p=61, q=53, e=17, Msg='A'"
            >
              Load Text Default (p=61, q=53, e=17)
            </button>

            <button
              onClick={onReset}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/40 transition flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Validation Errors & Success Banners */}
        {validationError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/50 border border-rose-500/60 text-rose-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">Parameter Validation Error</h4>
              <p className="text-xs mt-0.5">{validationError}</p>
            </div>
          </div>
        )}

        {successMessage && !validationError && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="text-xs font-semibold">{successMessage}</p>
          </div>
        )}

        {/* Main Grid: Parameters & Interactive Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* Left Column: Parameter Inputs & Key Generator */}
          <div className="lg:col-span-5 glass-panel-glow rounded-3xl p-6 border border-cyan-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-cyan-400" />
                  <span>RSA Parameters Configuration</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Step 01: Setup</span>
              </div>

              {/* Prime p & q Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Prime p */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-300">Prime Number p</label>
                    {pInput && (
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${pIsPrime ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'}`}>
                        {pIsPrime ? 'PRIME ✓' : 'NOT PRIME ✗'}
                      </span>
                    )}
                  </div>
                  <input
                    type="number"
                    value={pInput}
                    onChange={(e) => setPInput(e.target.value)}
                    placeholder="e.g. 61"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 font-mono text-white text-sm focus:outline-none focus:border-cyan-400 transition"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">First secret prime factor</span>
                </div>

                {/* Prime q */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-300">Prime Number q</label>
                    {qInput && (
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${qIsPrime ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'}`}>
                        {qIsPrime ? 'PRIME ✓' : 'NOT PRIME ✗'}
                      </span>
                    )}
                  </div>
                  <input
                    type="number"
                    value={qInput}
                    onChange={(e) => setQInput(e.target.value)}
                    placeholder="e.g. 53"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 font-mono text-white text-sm focus:outline-none focus:border-cyan-400 transition"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Second distinct prime factor</span>
                </div>
              </div>

              {/* Public Exponent e Input */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">Public Exponent e</label>
                  <span className="text-[10px] font-mono text-slate-400">1 &lt; e &lt; φ(n), GCD(e, φ)=1</span>
                </div>
                <input
                  type="number"
                  value={eInput}
                  onChange={(e) => setEInput(e.target.value)}
                  placeholder="e.g. 17"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 font-mono text-white text-sm focus:outline-none focus:border-cyan-400 transition"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">Common standard values: 3, 17, 65537</span>
              </div>

              {/* Generate Keys Action */}
              <button
                onClick={onGenerateKeys}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 active:scale-98 transition"
              >
                <Key className="w-4 h-4" />
                <span>1. Generate RSA Keys</span>
              </button>
            </div>

            {/* Calculated Keys Details */}
            {keyData && (
              <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-3">
                <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider block">
                  Generated Mathematical Entities:
                </span>
                
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">n = p × q</span>
                    <span className="text-cyan-300 font-bold">{keyData.n.toString()}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">φ(n) = (p-1)(q-1)</span>
                    <span className="text-cyan-300 font-bold">{keyData.phi.toString()}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">GCD(e, φ(n))</span>
                    <span className="text-emerald-400 font-bold">{keyData.gcdVal.toString()}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Private Exp d</span>
                    <span className="text-violet-400 font-bold">{keyData.d.toString()}</span>
                  </div>
                </div>

                {/* Key Badges with Copy Buttons */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-cyan-800/50">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 block">PUBLIC KEY (e, n):</span>
                      <span className="text-xs font-mono font-bold text-white">
                        ({keyData.publicKey.e.toString()}, {keyData.publicKey.n.toString()})
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(`(${keyData.publicKey.e}, ${keyData.publicKey.n})`, 'pub')}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title="Copy Public Key"
                    >
                      {copiedKey === 'pub' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-violet-800/50">
                    <div>
                      <span className="text-[10px] font-mono text-violet-400 block">PRIVATE KEY (d, n) [SECRET]:</span>
                      <span className="text-xs font-mono font-bold text-violet-300">
                        ({keyData.privateKey.d.toString()}, {keyData.privateKey.n.toString()})
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(`(${keyData.privateKey.d}, ${keyData.privateKey.n})`, 'priv')}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title="Copy Private Key"
                    >
                      {copiedKey === 'priv' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Right Column: Message Input & Operations */}
          <div className="lg:col-span-7 glass-panel-glow rounded-3xl p-6 border border-cyan-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <span>
                    {mode === 'text' ? 'Text Plaintext Message' : 'Numerical Integer Plaintext (M)'}
                  </span>
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Step 02: Message</span>
              </div>

              {/* Message Input based on mode */}
              {mode === 'text' ? (
                <div className="mb-4">
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Enter your plaintext message
                  </label>
                  <textarea
                    rows="3"
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                    placeholder="Type your message here... (e.g. Hello RSA!)"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition"
                  />
                  <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400 font-mono">
                    <span>Length: {textMessage.length} character(s)</span>
                    <span>TextEncoder will convert to UTF-8 byte stream</span>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">
                    Enter integer message M (0 ≤ M &lt; n)
                  </label>
                  <input
                    type="number"
                    value={numMessage}
                    onChange={(e) => setNumMessage(e.target.value)}
                    placeholder="e.g. 4"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition"
                  />
                  <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400 font-mono">
                    <span>Condition: 0 ≤ M &lt; {keyData ? keyData.n.toString() : 'n'}</span>
                    <span>Board Example default: 4</span>
                  </div>
                </div>
              )}

              {/* Action Buttons: Encrypt & Decrypt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <button
                  onClick={onEncrypt}
                  disabled={!keyData}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-600/20 active:scale-98 transition"
                >
                  <Lock className="w-4 h-4" />
                  <span>2. Encrypt Message</span>
                </button>

                <button
                  onClick={onDecrypt}
                  disabled={!encryptionResult}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-violet-600/20 active:scale-98 transition"
                >
                  <Unlock className="w-4 h-4" />
                  <span>3. Decrypt Message</span>
                </button>
              </div>

              {/* Results Preview Card */}
              {encryptionResult && (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                      Current Ciphertext Status:
                    </span>
                    <button
                      onClick={() => handleCopy(
                        mode === 'numerical'
                          ? encryptionResult.c?.toString()
                          : `[${encryptionResult.ciphertexts?.map(c => c.toString()).join(', ')}]`,
                        'cipher'
                      )}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-mono"
                    >
                      {copiedKey === 'cipher' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKey === 'cipher' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="font-mono text-xs sm:text-sm text-amber-300 break-all p-2.5 rounded-lg bg-slate-900/90 border border-amber-900/40">
                    {mode === 'numerical' ? (
                      <span>C = {encryptionResult.c?.toString()}</span>
                    ) : (
                      <span>[ {encryptionResult.ciphertexts?.map(c => c.toString()).join(', ')} ]</span>
                    )}
                  </div>

                  {decryptionResult && (
                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                        Decrypted Plaintext:
                      </span>
                      <div className="font-mono text-xs sm:text-sm text-emerald-300 break-all p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-900/50 font-bold">
                        {mode === 'numerical' ? decryptionResult.m?.toString() : decryptionResult.recoveredText}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Session Calculation History */}
            {history && history.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-2 font-mono">
                  <History className="w-3.5 h-3.5" />
                  <span>Session History ({history.length} operations)</span>
                </div>
                <div className="max-h-24 overflow-y-auto space-y-1 pr-1 text-[11px] font-mono text-slate-400">
                  {history.slice(-4).reverse().map((h, idx) => (
                    <div key={idx} className="flex items-center justify-between py-0.5 border-b border-slate-900">
                      <span className="text-cyan-400 font-semibold">{h.action}</span>
                      <span className="text-slate-300 truncate max-w-[200px]">{h.summary}</span>
                      <span className="text-[10px] text-slate-500">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
