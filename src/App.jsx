import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroDashboard from './components/HeroDashboard';
import Simulator from './components/Simulator';
import StepByStepKeyGen from './components/StepByStepKeyGen';
import EncryptionView from './components/EncryptionView';
import DecryptionView from './components/DecryptionView';
import FlowVisualization from './components/FlowVisualization';
import ApplicationsSection from './components/ApplicationsSection';
import ConceptsSection from './components/ConceptsSection';
import SecuritySection from './components/SecuritySection';
import PresentationModal from './components/PresentationModal';
import Footer from './components/Footer';

import {
  generateKeys,
  encryptNumber,
  decryptNumber,
  encryptText,
  decryptText
} from './utils/rsaMath';

export default function App() {
  const [mode, setMode] = useState('text'); // 'text' or 'numerical'
  const [pInput, setPInput] = useState('61');
  const [qInput, setQInput] = useState('53');
  const [eInput, setEInput] = useState('17');
  const [textMessage, setTextMessage] = useState('A');
  const [numMessage, setNumMessage] = useState('4');

  const [keyData, setKeyData] = useState(null);
  const [encryptionResult, setEncryptionResult] = useState(null);
  const [decryptionResult, setDecryptionResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [validationError, setValidationError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [presentationOpen, setPresentationOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Helper to append action to history log
  const logHistory = (action, summary) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setHistory((prev) => [...prev, { action, summary, time }]);
  };

  // 1. Generate Keys Handler
  const handleGenerateKeys = () => {
    setValidationError(null);
    setSuccessMessage(null);
    try {
      const generated = generateKeys(pInput, qInput, eInput);
      setKeyData(generated);
      setEncryptionResult(null);
      setDecryptionResult(null);
      setSuccessMessage(
        `Keys successfully generated! n = ${generated.n}, φ(n) = ${generated.phi}, d = ${generated.d}. Public: (${generated.publicKey.e}, ${generated.publicKey.n}), Private: (${generated.privateKey.d}, ${generated.privateKey.n}).`
      );
      logHistory(
        'Key Generation',
        `Generated Keys from p=${pInput}, q=${qInput}, e=${eInput} ⇒ n=${generated.n}, d=${generated.d}`
      );
      return generated;
    } catch (err) {
      setValidationError(err.message);
      setKeyData(null);
      return null;
    }
  };

  // 2. Encrypt Handler
  const handleEncrypt = (activeKeys = keyData) => {
    setValidationError(null);
    setSuccessMessage(null);

    const keysToUse = activeKeys || keyData;
    if (!keysToUse) {
      setValidationError('Please generate valid RSA keys first before encrypting.');
      return null;
    }

    try {
      if (mode === 'numerical') {
        if (!numMessage || numMessage.trim() === '') {
          throw new Error('Please enter a valid integer for message M.');
        }
        const m = BigInt(numMessage);
        const c = encryptNumber(m, keysToUse.publicKey);
        const result = { c, m };
        setEncryptionResult(result);
        setDecryptionResult(null);
        setSuccessMessage(`Encryption complete! Ciphertext C = ${c}. Formula: C = ${m}^${keysToUse.e} mod ${keysToUse.n}.`);
        logHistory('Numerical Encrypt', `M=${m} ⇒ C=${c}`);
        return result;
      } else {
        if (!textMessage || textMessage.length === 0) {
          throw new Error('Please enter plaintext message text.');
        }
        const result = encryptText(textMessage, keysToUse.publicKey);
        setEncryptionResult(result);
        setDecryptionResult(null);
        setSuccessMessage(
          `Text encrypted across ${result.ciphertexts.length} byte(s)! Ciphertexts: [${result.ciphertexts.join(', ')}].`
        );
        logHistory('Text Encrypt', `"${textMessage}" (${result.ciphertexts.length} bytes) ⇒ encrypted`);
        return result;
      }
    } catch (err) {
      setValidationError(err.message);
      return null;
    }
  };

  // 3. Decrypt Handler
  const handleDecrypt = (activeEnc = encryptionResult, activeKeys = keyData) => {
    setValidationError(null);
    setSuccessMessage(null);

    const keysToUse = activeKeys || keyData;
    const encToUse = activeEnc || encryptionResult;

    if (!keysToUse) {
      setValidationError('Private key is missing. Please generate keys first.');
      return null;
    }
    if (!encToUse) {
      setValidationError('No ciphertext found to decrypt. Please encrypt a message first.');
      return null;
    }

    try {
      if (mode === 'numerical') {
        const m = decryptNumber(encToUse.c, keysToUse.privateKey);
        const result = { m };
        setDecryptionResult(result);
        const isMatched = m.toString() === numMessage;
        setSuccessMessage(
          isMatched
            ? `Decryption SUCCESS: Recovered M = ${m} matches original plaintext exactly!`
            : `Decryption finished: Recovered M = ${m}.`
        );
        logHistory('Numerical Decrypt', `C=${encToUse.c} ⇒ Recovered M=${m} (Match: ${isMatched})`);
        return result;
      } else {
        const result = decryptText(encToUse.ciphertexts, keysToUse.privateKey);
        setDecryptionResult(result);
        const isMatched = result.recoveredText === textMessage;
        setSuccessMessage(
          isMatched
            ? `Decryption SUCCESS: Recovered text "${result.recoveredText}" matches original input!`
            : `Decryption recovered text "${result.recoveredText}".`
        );
        logHistory('Text Decrypt', `Recovered "${result.recoveredText}" (Match: ${isMatched})`);
        return result;
      }
    } catch (err) {
      setValidationError(err.message);
      return null;
    }
  };

  // Preset: Board Example (p=3, q=11, e=3, M=4)
  const handleLoadBoardExample = () => {
    setMode('numerical');
    setPInput('3');
    setQInput('11');
    setEInput('3');
    setNumMessage('4');
    setValidationError(null);

    try {
      const generated = generateKeys('3', '11', '3');
      setKeyData(generated);
      const enc = encryptNumber(4, generated.publicKey);
      const encRes = { c: enc, m: 4n };
      setEncryptionResult(encRes);
      const dec = decryptNumber(enc, generated.privateKey);
      const decRes = { m: dec };
      setDecryptionResult(decRes);

      setSuccessMessage(
        'Loaded Board Example: p=3, q=11, e=3, M=4 ⇒ n=33, φ=20, d=7, C=31, Recovered M=4. All calculations verified!'
      );
      logHistory('Board Preset', 'Loaded p=3, q=11, e=3, M=4 ⇒ C=31, M=4');
    } catch (err) {
      setValidationError(err.message);
    }
  };

  // Preset: Text Default (p=61, q=53, e=17, Msg="A")
  const handleLoadDefaultExample = () => {
    setMode('text');
    setPInput('61');
    setQInput('53');
    setEInput('17');
    setTextMessage('A');
    setValidationError(null);

    try {
      const generated = generateKeys('61', '53', '17');
      setKeyData(generated);
      const enc = encryptText('A', generated.publicKey);
      setEncryptionResult(enc);
      const dec = decryptText(enc.ciphertexts, generated.privateKey);
      setDecryptionResult(dec);

      setSuccessMessage(
        'Loaded Text Default: p=61, q=53, e=17, Message="A" ⇒ n=3233, φ=3120, d=2753, C=2790, Recovered="A"!'
      );
      logHistory('Text Preset', 'Loaded p=61, q=53, e=17, Msg="A" ⇒ C=2790');
    } catch (err) {
      setValidationError(err.message);
    }
  };

  // Reset all
  const handleReset = () => {
    setPInput('61');
    setQInput('53');
    setEInput('17');
    setTextMessage('A');
    setNumMessage('4');
    setKeyData(null);
    setEncryptionResult(null);
    setDecryptionResult(null);
    setValidationError(null);
    setSuccessMessage('Simulator reset to defaults. Click "Generate Keys" to begin.');
    logHistory('Reset', 'Cleared simulator state');
  };

  // Run Complete Demonstration sequentially
  const handleRunCompleteDemo = () => {
    const keys = handleGenerateKeys();
    if (keys) {
      setTimeout(() => {
        const enc = handleEncrypt(keys);
        if (enc) {
          setTimeout(() => {
            handleDecrypt(enc, keys);
          }, 800);
        }
      }, 600);
    }
  };

  // Copy ciphertext array helper
  const handleCopyCiphertext = () => {
    if (!encryptionResult) return;
    const textToCopy = mode === 'numerical'
      ? encryptionResult.c?.toString()
      : `[${encryptionResult.ciphertexts?.map(c => c.toString()).join(', ')}]`;
    
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Run default text setup once on first load
  useEffect(() => {
    handleLoadDefaultExample();
  }, []);

  const jumpToSimulator = () => {
    const el = document.getElementById('simulator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#060a13] text-slate-100">
      
      {/* Top Navigation Bar */}
      <Navbar onOpenPresentation={() => setPresentationOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Dashboard / Introduction */}
        <HeroDashboard
          onJumpToSimulator={jumpToSimulator}
          onOpenPresentation={() => setPresentationOpen(true)}
        />

        {/* Main Interactive RSA Simulator ("Try RSA Yourself") */}
        <Simulator
          mode={mode}
          setMode={setMode}
          pInput={pInput}
          setPInput={setPInput}
          qInput={qInput}
          setQInput={setQInput}
          eInput={eInput}
          setEInput={setEInput}
          textMessage={textMessage}
          setTextMessage={setTextMessage}
          numMessage={numMessage}
          setNumMessage={setNumMessage}
          keyData={keyData}
          encryptionResult={encryptionResult}
          decryptionResult={decryptionResult}
          history={history}
          onGenerateKeys={handleGenerateKeys}
          onEncrypt={() => handleEncrypt()}
          onDecrypt={() => handleDecrypt()}
          onReset={handleReset}
          onLoadDefaultExample={handleLoadDefaultExample}
          onLoadBoardExample={handleLoadBoardExample}
          validationError={validationError}
          successMessage={successMessage}
        />

        {/* Step 1 – RSA Key Generation (Section 5) */}
        <StepByStepKeyGen keyData={keyData} />

        {/* Step 2 – RSA Encryption (Section 6) */}
        <EncryptionView
          mode={mode}
          textMessage={textMessage}
          numMessage={numMessage}
          publicKey={keyData?.publicKey}
          encryptionResult={encryptionResult}
          onCopyCiphertext={handleCopyCiphertext}
          isCopied={isCopied}
        />

        {/* Step 3 – RSA Decryption (Section 7) */}
        <DecryptionView
          mode={mode}
          textMessage={textMessage}
          numMessage={numMessage}
          privateKey={keyData?.privateKey}
          decryptionResult={decryptionResult}
          encryptionResult={encryptionResult}
        />

        {/* Section 8 – Full Flow Visualization */}
        <FlowVisualization
          mode={mode}
          textMessage={textMessage}
          numMessage={numMessage}
          keyData={keyData}
          encryptionResult={encryptionResult}
          decryptionResult={decryptionResult}
          onRunCompleteDemo={handleRunCompleteDemo}
        />

        {/* Section 11 – Real World Applications */}
        <ApplicationsSection />

        {/* Section 10 – Understand RSA Concepts Primer */}
        <ConceptsSection />

        {/* Section 12 – Security Limitations */}
        <SecuritySection />
      </main>

      {/* Footer */}
      <Footer onOpenPresentation={() => setPresentationOpen(true)} />

      {/* Presentation Mode Fullscreen Modal (Section 13) */}
      <PresentationModal
        isOpen={presentationOpen}
        onClose={() => setPresentationOpen(false)}
      />

    </div>
  );
}
