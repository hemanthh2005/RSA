# RSA LAB – Interactive Encryption & Decryption Simulator

A modern, highly visual, beginner-friendly **RSA Algorithm Demonstration Platform** engineered for college **Network Security and Cryptography (NSCL)** lab presentations (20 Marks).

Built with **React.js, Vite, Tailwind CSS, Lucide React**, and native **JavaScript BigInt** to execute real-time mathematical operations completely inside the browser with zero external dependencies and zero server tracking.

---

## 🌟 Key Highlights & Features

1. **Pure Client-Side Cryptographic Engine**
   - High-precision arithmetic via native **JavaScript `BigInt`**.
   - Modular inverse calculated with the **Extended Euclidean Algorithm**.
   - Modular exponentiation computed via the **Square-and-Multiply** algorithm ($O(\log e)$ time complexity) with intermediate binary traces.
   - Deterministic and Miller-Rabin primality checking.
   - Absolutely no fake or hardcoded numbers—every output is computed live from user inputs.

2. **Dual Encryption Modes**
   - **Text Encryption Mode (UTF-8 Bytes)**: Converts characters to UTF-8 numbers (0–255 via `TextEncoder`), encrypts each byte independently using $C = M^e \pmod n$, and decrypts back to exact text via `TextDecoder`.
   - **Numerical Encryption Mode (Integers)**: Direct numerical demonstration ideal for blackboard and exam questions ($0 \le M < n$).

3. **Dedicated Presentation Mode (Projector-Optimized)**
   - High-contrast, large-typography slide view tailored for classroom projectors.
   - One-click **"Load Board Example"** ($p=3, q=11, e=3, M=4$).
   - Slide-by-slide progression (supports Arrow keys `←` and `→`, Space, and `Esc`).
   - Formula side-by-side with evaluated step values.

4. **Visual Cryptographic Pipeline**
   - Interactive animated stage flow:
     $$\text{Plaintext} \rightarrow \text{UTF-8 Encoding} \rightarrow \text{Message Numbers} \rightarrow \text{Public Key} \rightarrow \text{RSA Encryption} \rightarrow \text{Ciphertext} \rightarrow \text{Private Key} \rightarrow \text{RSA Decryption} \rightarrow \text{Recovered Plaintext}$$
   - "Run Complete Demonstration" automated sequence.
   - Step-by-Step manual controls.

5. **Step-by-Step Key Generation Visualizer**
   - Step 1: Prime selection ($p, q$) with distinctness and primality checking.
   - Step 2: Modulus computation ($n = p \times q$).
   - Step 3: Euler's Totient function ($\phi(n) = (p-1)(q-1)$).
   - Step 4: Public exponent ($e$) selection with GCD coprime verification.
   - Step 5: Private exponent ($d$) derivation via modular inverse.
   - Step 6: Public key $(e, n)$ and Private key $(d, n)$ assembly.

6. **Comprehensive Educational Primer & Academic Standards**
   - **14 Core Cryptographic Concepts**: Clear, beginner-friendly explanations with "What it is", "Why it is needed", "How RSA uses it", and practical examples.
   - **Real-World Applications**: Modern TLS 1.3 authentication, RSA-PSS digital signatures, hybrid email encryption (PGP/AES), and code signing.
   - **Security Limitations & Caveats**: Performance comparison against AES, message size bounds, padding requirements (OAEP & PSS), textbook RSA vulnerabilities, and quantum computing threats (Shor's algorithm).

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (version 18 or newer recommended)
- npm or pnpm

### Installation & Execution

```bash
# 1. Clone or open the project folder
cd RSA

# 2. Install dependencies
npm install

# 3. Launch local development server
npm run dev
```

Open your browser at the local URL displayed (typically `http://localhost:5173`).

### Building for Production

```bash
npm run build
npm run preview
```

---

## 🧪 Verified Mathematical Test Cases

All calculations have been mathematically verified using the integrated unit test suite (`node test-rsa.js`):

| Test Case | Inputs | Expected Key Generation | Expected Ciphertext | Expected Decrypted Output | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Test 1: Board Example** | $p=3, q=11, e=3, M=4$ | $n=33, \phi(n)=20, d=7$ | $C = 4^3 \bmod 33 = 31$ | $M = 31^7 \bmod 33 = 4$ | ✅ PASS |
| **Test 2: Single Char Text** | $p=61, q=53, e=17, \text{Msg}="A"$ | $n=3233, \phi(n)=3120, d=2753$ | $C = 65^{17} \bmod 3233 = 2790$ | $M = 2790^{2753} \bmod 3233 = 65 ("A")$ | ✅ PASS |
| **Test 3: Arbitrary Text** | $p=61, q=53, e=17, \text{Msg}="Hello\ RSA!"$ | Same keys | Per-byte sequence | Exact recovery: $"Hello\ RSA!"$ | ✅ PASS |
| **Test 4: Non-Prime Check** | $p=10, q=11$ | Rejected | N/A | Validation error displayed | ✅ PASS |
| **Test 5: Non-Coprime Exponent** | $p=3, q=11, e=2$ | $\text{GCD}(2, 20) = 2 \neq 1$ | N/A | Coprimality error displayed | ✅ PASS |
| **Test 6: Plaintext $\ge n$** | $p=3, q=11 \implies n=33, M=35$ | Valid keys | N/A | Range violation $M < n$ caught | ✅ PASS |
| **Test 7: Empty String** | Empty input | N/A | N/A | Graceful validation alert | ✅ PASS |

To re-run the unit test suite independently at any time:
```bash
node test-rsa.js
```

---

## 🏫 College Presentation Guide (20 Marks Strategy)

1. **Introduction (2-3 mins)**: Click the top-right **"PRESENTATION MODE"** button. Explain the difference between symmetric ciphers (AES) and asymmetric ciphers (RSA).
2. **Board Example Walkthrough (5-7 mins)**: Use the built-in slides to walk through $p=3, q=11, e=3, M=4$:
   - Show how $n = 33$ and $\phi(n) = 20$ are calculated.
   - Show why $e = 3$ is coprime to 20 ($\text{GCD}(3, 20) = 1$).
   - Explain modular inverse: $d \times 3 \equiv 1 \pmod{20} \implies d = 7$.
   - Show $C = 4^3 \pmod{33} = 64 \pmod{33} = 31$.
   - Show $M = 31^7 \pmod{33} = 4$.
3. **Live Interactive Simulator (5 mins)**: Exit Presentation Mode (`Esc`) and show the **"Text Encryption Mode"**. Enter custom text (e.g. `"Hello RSA!"`) or classmate names. Expand the **"View Trace"** row to show the square-and-multiply algorithm in action.
4. **Security & Real-World Context (3 mins)**: Point out the **Educational Disclaimer** and discuss why textbook RSA is not used in isolation without **RSA-OAEP** padding, and how modern **TLS 1.3** and **hybrid cryptography** operate.

---

## 📜 Academic Standards & References
- **RFC 8017 / PKCS #1 v2.2**: RSA Cryptography Specifications (OAEP & PSS schemes).
- **NIST SP 800-56B Rev. 2**: Recommendation for Pair-Wise Key Establishment Using Integer Factorization.
- **FIPS 186-5**: Digital Signature Standard (DSS).

---
Developed for Academic Excellence in Network Security & Cryptography.
