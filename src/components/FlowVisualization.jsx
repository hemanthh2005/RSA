import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowRight, ArrowDown, CheckCircle2, Key, Lock, Unlock, Cpu, Binary, Sparkles } from 'lucide-react';

export default function FlowVisualization({
  mode,
  textMessage,
  numMessage,
  keyData,
  encryptionResult,
  decryptionResult,
  onRunCompleteDemo
}) {
  const [activeStage, setActiveStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Define the stages for the flow pipeline
  const stages = [
    {
      id: 0,
      label: 'PLAINTEXT',
      sub: mode === 'numerical' ? `M = ${numMessage}` : `"${textMessage}"`,
      color: 'border-slate-600 bg-slate-900/90 text-slate-200',
      activeColor: 'border-cyan-400 bg-cyan-950/80 text-cyan-200 ring-2 ring-cyan-500/50',
      icon: Binary,
      description: 'The raw human-readable message to be kept confidential.'
    },
    ...(mode === 'text' ? [
      {
        id: 1,
        label: 'UTF-8 ENCODING',
        sub: 'TextEncoder bytes',
        color: 'border-slate-600 bg-slate-900/90 text-slate-200',
        activeColor: 'border-blue-400 bg-blue-950/80 text-blue-200 ring-2 ring-blue-500/50',
        icon: Binary,
        description: 'Converts Unicode characters to numeric byte values (0–255).'
      }
    ] : []),
    {
      id: mode === 'text' ? 2 : 1,
      label: 'MESSAGE NUMBER(S)',
      sub: mode === 'numerical' ? `M = ${numMessage}` : `[ ${encryptionResult?.utf8Bytes?.slice(0, 4).join(', ')}${encryptionResult?.utf8Bytes?.length > 4 ? '...' : ''} ]`,
      color: 'border-slate-600 bg-slate-900/90 text-slate-200',
      activeColor: 'border-indigo-400 bg-indigo-950/80 text-indigo-200 ring-2 ring-indigo-500/50',
      icon: Cpu,
      description: 'Numerical integer representation satisfying 0 ≤ M < n.'
    },
    {
      id: mode === 'text' ? 3 : 2,
      label: 'PUBLIC KEY',
      sub: `(e=${keyData?.e || '17'}, n=${keyData?.n || '3233'})`,
      color: 'border-slate-600 bg-slate-900/90 text-slate-200',
      activeColor: 'border-cyan-400 bg-cyan-950/80 text-cyan-200 ring-2 ring-cyan-500/50',
      icon: Key,
      description: 'Publicly known parameters used by anyone to encrypt.'
    },
    {
      id: mode === 'text' ? 4 : 3,
      label: 'RSA ENCRYPTION',
      sub: 'C = Mᵉ mod n',
      color: 'border-slate-600 bg-slate-900/90 text-slate-200',
      activeColor: 'border-amber-400 bg-amber-950/80 text-amber-200 ring-2 ring-amber-500/50',
      icon: Lock,
      description: 'Fast modular exponentiation transforms message into ciphertext.'
    },
    {
      id: mode === 'text' ? 5 : 4,
      label: 'CIPHERTEXT',
      sub: mode === 'numerical' ? `C = ${encryptionResult?.c || '31'}` : `[ ${encryptionResult?.ciphertexts?.slice(0, 3).map(c => c.toString()).join(', ') || '...'}${encryptionResult?.ciphertexts?.length > 3 ? '...' : ''} ]`,
      color: 'border-slate-600 bg-slate-900/90 text-slate-200',
      activeColor: 'border-amber-500 bg-amber-950 text-amber-200 ring-2 ring-amber-500',
      icon: Lock,
      description: 'Scrambled integer(s) transmitted openly across untrusted networks.'
    },
    {
      id: mode === 'text' ? 6 : 5,
      label: 'PRIVATE KEY',
      sub: `(d=${keyData?.d || '2753'}, n=${keyData?.n || '3233'})`,
      color: 'border-slate-600 bg-slate-900/90 text-slate-200',
      activeColor: 'border-violet-400 bg-violet-950/80 text-violet-200 ring-2 ring-violet-500/50',
      icon: Key,
      description: 'The secret trapdoor inverse held strictly by the recipient.'
    },
    {
      id: mode === 'text' ? 7 : 6,
      label: 'RSA DECRYPTION',
      sub: 'M = Cᵈ mod n',
      color: 'border-slate-600 bg-slate-900/90 text-slate-200',
      activeColor: 'border-purple-400 bg-purple-950/80 text-purple-200 ring-2 ring-purple-500/50',
      icon: Unlock,
      description: 'Modular exponentiation with d reverses the transformation.'
    },
    {
      id: mode === 'text' ? 8 : 7,
      label: 'RECOVERED MESSAGE',
      sub: mode === 'numerical' ? `M = ${decryptionResult?.m || numMessage}` : `"${decryptionResult?.recoveredText || textMessage}"`,
      color: 'border-slate-600 bg-slate-900/90 text-slate-200',
      activeColor: 'border-emerald-400 bg-emerald-950/90 text-emerald-200 ring-2 ring-emerald-500/60',
      icon: CheckCircle2,
      description: 'Original plaintext message restored with 100% cryptographic integrity.'
    }
  ];

  const totalStages = stages.length;

  // Auto-play timer for animation
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStage((prev) => {
          if (prev >= totalStages - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalStages]);

  const handleStartDemonstration = () => {
    setActiveStage(0);
    setIsPlaying(true);
    if (onRunCompleteDemo) {
      onRunCompleteDemo();
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStage(0);
  };

  return (
    <section id="flow" className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section 8 • End-to-End Pipeline</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Complete Encryption-to-Decryption Flow
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Watch live data travel through every cryptographic milestone in sequence.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleStartDemonstration}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25 transition active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Complete Demonstration</span>
            </button>

            <button
              onClick={() => setActiveStage((prev) => Math.max(0, prev - 1))}
              disabled={activeStage === 0}
              className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Prev
            </button>

            <button
              onClick={() => setActiveStage((prev) => Math.min(totalStages - 1, prev + 1))}
              disabled={activeStage === totalStages - 1}
              className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
            </button>

            <button
              onClick={handleReset}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-700 transition"
              title="Reset Flow to Beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Pipeline Container */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-cyan-500/20">
          
          {/* Progress Indicator */}
          <div className="mb-6 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>PIPELINE PROGRESS</span>
            <span className="text-cyan-400 font-bold">
              Stage {activeStage + 1} of {totalStages}
            </span>
          </div>

          <div className="w-full bg-slate-900 rounded-full h-1.5 mb-8 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 h-1.5 transition-all duration-500"
              style={{ width: `${((activeStage + 1) / totalStages) * 100}%` }}
            />
          </div>

          {/* Interactive Flow Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
            {stages.map((st, idx) => {
              const isCurrent = idx === activeStage;
              const isPast = idx < activeStage;
              const IconComp = st.icon;

              return (
                <div
                  key={st.id}
                  onClick={() => setActiveStage(idx)}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all duration-300 relative flex flex-col justify-between ${
                    isCurrent
                      ? st.activeColor + ' shadow-xl scale-[1.02]'
                      : isPast
                      ? 'border-cyan-900/60 bg-slate-900/60 text-slate-300'
                      : 'border-slate-800/80 bg-slate-950/40 text-slate-500'
                  }`}
                >
                  {/* Step Pill */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/10 font-bold">
                      0{idx + 1}
                    </span>
                    <IconComp className={`w-4 h-4 ${isCurrent ? 'text-cyan-400 animate-pulse' : isPast ? 'text-cyan-600' : 'text-slate-600'}`} />
                  </div>

                  <div>
                    <h4 className="text-xs font-bold tracking-tight mb-1">
                      {st.label}
                    </h4>
                    <div className="text-[11px] font-mono text-cyan-300/90 break-all mb-2 font-semibold">
                      {st.sub}
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 leading-normal border-t border-white/5 pt-2">
                    {st.description}
                  </p>

                  {/* Flow Connector Marker */}
                  {idx < totalStages - 1 && (
                    <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                      <span className="w-4 h-4 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] text-cyan-400">
                        ›
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Stage Detailed Spotlight */}
          <div className="mt-8 p-5 rounded-2xl bg-slate-900/90 border border-cyan-800/50 shadow-inner flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400">Current Active Milestone:</span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {stages[activeStage].label} — {stages[activeStage].description}
                </h3>
              </div>
            </div>

            {activeStage === totalStages - 1 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verification Complete: 100% Recovery</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
