/**
 * RSA Cryptographic Mathematical Engine
 * Built strictly with JavaScript BigInt for precision and correctness.
 * Implements standard textbook RSA operations with educational step tracing.
 */

/**
 * Deterministic Primality Test for BigInt.
 * Uses 6k +/- 1 trial division for educational range and Miller-Rabin for larger values.
 * 
 * @param {bigint|number|string} num - The number to test for primality.
 * @returns {boolean} True if num is prime, false otherwise.
 */
export function isPrime(num) {
  try {
    const n = BigInt(num);
    if (n <= 1n) return false;
    if (n <= 3n) return true;
    if (n % 2n === 0n || n % 3n === 0n) return false;

    // Small prime trial division for speed
    let i = 5n;
    while (i * i <= n && i <= 10000n) {
      if (n % i === 0n || n % (i + 2n) === 0n) return false;
      i += 6n;
    }

    if (i * i > n) return true;

    // Miller-Rabin probabilistic test with deterministic bases for 64-bit integers
    return millerRabinTest(n);
  } catch {
    return false;
  }
}

/**
 * Miller-Rabin primality test helper with deterministic bases.
 */
function millerRabinTest(n) {
  let d = n - 1n;
  let s = 0n;
  while (d % 2n === 0n) {
    d /= 2n;
    s += 1n;
  }

  // Bases sufficient for deterministic check up to 2^64
  const bases = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];
  for (const a of bases) {
    if (n <= a) break;
    let x = modularExponentiation(a, d, n);
    if (x === 1n || x === n - 1n) continue;

    let composite = true;
    for (let r = 1n; r < s; r++) {
      x = modularExponentiation(x, 2n, n);
      if (x === n - 1n) {
        composite = false;
        break;
      }
    }
    if (composite) return false;
  }
  return true;
}

/**
 * Computes the Greatest Common Divisor (GCD) using the Euclidean algorithm.
 * 
 * @param {bigint} a 
 * @param {bigint} b 
 * @returns {bigint} GCD of a and b.
 */
export function gcd(a, b) {
  let x = BigInt(a);
  let y = BigInt(b);
  if (x < 0n) x = -x;
  if (y < 0n) y = -y;
  while (y !== 0n) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x;
}

/**
 * Extended Euclidean Algorithm.
 * Finds integers x, y such that a*x + b*y = gcd(a, b).
 * Also records step-by-step history for educational display.
 * 
 * @param {bigint} a 
 * @param {bigint} b 
 * @returns {{ gcd: bigint, x: bigint, y: bigint, steps: Array }}
 */
export function extendedGcd(a, b) {
  let old_r = BigInt(a), r = BigInt(b);
  let old_s = 1n, s = 0n;
  let old_t = 0n, t = 1n;

  const steps = [];

  while (r !== 0n) {
    const quotient = old_r / r;
    const remainder = old_r % r;

    steps.push({
      old_r: old_r.toString(),
      r: r.toString(),
      quotient: quotient.toString(),
      remainder: remainder.toString(),
      equation: `${old_r} = (${quotient} × ${r}) + ${remainder}`
    });

    let temp_r = r;
    r = remainder;
    old_r = temp_r;

    let temp_s = s;
    s = old_s - quotient * s;
    old_s = temp_s;

    let temp_t = t;
    t = old_t - quotient * t;
    old_t = temp_t;
  }

  return {
    gcd: old_r,
    x: old_s,
    y: old_t,
    steps
  };
}

/**
 * Calculates modular multiplicative inverse d such that:
 * (e * d) = 1 (mod phi)
 * 
 * @param {bigint} e - Public exponent
 * @param {bigint} phi - Euler's totient
 * @returns {bigint} d - Private exponent
 * @throws {Error} if inverse does not exist (e.g. gcd != 1)
 */
export function modInverse(e, phi) {
  const eBig = BigInt(e);
  const phiBig = BigInt(phi);
  const egcd = extendedGcd(eBig, phiBig);

  if (egcd.gcd !== 1n) {
    throw new Error(`Modular inverse does not exist because GCD(${eBig}, ${phiBig}) = ${egcd.gcd} !== 1.`);
  }

  // Ensure d is positive within [1, phi - 1]
  let d = (egcd.x % phiBig + phiBig) % phiBig;
  if (d === 0n) d += phiBig;
  return d;
}

/**
 * Square-and-multiply algorithm for efficient modular exponentiation.
 * Computes (base ^ exponent) mod modulus in O(log exponent) steps.
 * 
 * @param {bigint} base 
 * @param {bigint} exponent 
 * @param {bigint} modulus 
 * @param {boolean} recordSteps - Whether to return step-by-step trace
 * @returns {bigint | { result: bigint, steps: Array }}
 */
export function modularExponentiation(base, exponent, modulus, recordSteps = false) {
  let b = BigInt(base);
  let exp = BigInt(exponent);
  const mod = BigInt(modulus);

  if (mod === 1n) {
    return recordSteps ? { result: 0n, steps: [] } : 0n;
  }

  let result = 1n;
  b = b % mod;
  const steps = [];

  const binaryExp = exp.toString(2);

  for (let i = 0; i < binaryExp.length; i++) {
    const bit = binaryExp[i];
    const prevResult = result;
    
    // Square step (except before the very first bit)
    if (i > 0) {
      result = (result * result) % mod;
      if (recordSteps) {
        steps.push({
          step: `Bit ${bit} (Index ${i}): Square`,
          explanation: `Result = (${prevResult}² mod ${mod}) = ${result}`,
          value: result.toString()
        });
      }
    }

    // Multiply step if bit is 1
    if (bit === '1') {
      const beforeMult = result;
      result = (result * b) % mod;
      if (recordSteps) {
        steps.push({
          step: `Bit ${bit} (Index ${i}): Multiply by Base (${b})`,
          explanation: `Result = (${beforeMult} × ${b}) mod ${mod} = ${result}`,
          value: result.toString()
        });
      }
    }
  }

  return recordSteps ? { result, steps, binaryExp } : result;
}

/**
 * Generates RSA Key Pairs (Public & Private) with validation.
 * 
 * @param {bigint|number|string} pInput 
 * @param {bigint|number|string} qInput 
 * @param {bigint|number|string} eInput 
 * @returns {Object} Keys and intermediate values
 */
export function generateKeys(pInput, qInput, eInput) {
  const p = BigInt(pInput);
  const q = BigInt(qInput);
  const e = BigInt(eInput);

  // Validations
  if (!isPrime(p)) {
    throw new Error(`Parameter p (${p}) is not a prime number.`);
  }
  if (!isPrime(q)) {
    throw new Error(`Parameter q (${q}) is not a prime number.`);
  }
  if (p === q) {
    throw new Error(`p and q must be distinct prime numbers. Both are currently ${p}.`);
  }

  // Modulus n = p * q
  const n = p * q;
  if (n <= 1n) {
    throw new Error(`Modulus n (${n}) must be greater than 1.`);
  }

  // Euler's Totient phi(n) = (p - 1) * (q - 1)
  const phi = (p - 1n) * (q - 1n);

  // Validate e
  if (e <= 1n || e >= phi) {
    throw new Error(`Public exponent e (${e}) must satisfy 1 < e < φ(n) (${phi}).`);
  }

  const gcdVal = gcd(e, phi);
  if (gcdVal !== 1n) {
    throw new Error(`Public exponent e (${e}) and φ(n) (${phi}) must be coprime (GCD must be 1, but is ${gcdVal}).`);
  }

  // Calculate private exponent d
  const d = modInverse(e, phi);

  return {
    p,
    q,
    n,
    phi,
    e,
    d,
    gcdVal,
    publicKey: { e, n },
    privateKey: { d, n }
  };
}

/**
 * Encrypts a single numerical integer M: C = M^e mod n.
 * 
 * @param {bigint|number|string} message 
 * @param {{ e: bigint, n: bigint }} publicKey 
 * @param {boolean} recordSteps 
 * @returns {bigint | { result: bigint, steps: Array }}
 */
export function encryptNumber(message, publicKey, recordSteps = false) {
  const m = BigInt(message);
  const e = BigInt(publicKey.e);
  const n = BigInt(publicKey.n);

  if (m < 0n || m >= n) {
    throw new Error(`Message M (${m}) must satisfy 0 ≤ M < n (${n}).`);
  }

  return modularExponentiation(m, e, n, recordSteps);
}

/**
 * Decrypts a single numerical ciphertext C: M = C^d mod n.
 * 
 * @param {bigint|number|string} ciphertext 
 * @param {{ d: bigint, n: bigint }} privateKey 
 * @param {boolean} recordSteps 
 * @returns {bigint | { result: bigint, steps: Array }}
 */
export function decryptNumber(ciphertext, privateKey, recordSteps = false) {
  const c = BigInt(ciphertext);
  const d = BigInt(privateKey.d);
  const n = BigInt(privateKey.n);

  if (c < 0n || c >= n) {
    throw new Error(`Ciphertext C (${c}) must satisfy 0 ≤ C < n (${n}).`);
  }

  return modularExponentiation(c, d, n, recordSteps);
}

/**
 * Encrypts arbitrary text message byte-by-byte for educational demonstration.
 * 
 * @param {string} text 
 * @param {{ e: bigint, n: bigint }} publicKey 
 * @returns {{ ciphertexts: bigint[], byteDetails: Array, utf8Bytes: number[] }}
 */
export function encryptText(text, publicKey) {
  if (!text || text.length === 0) {
    throw new Error("Plaintext message cannot be empty.");
  }

  const n = BigInt(publicKey.n);
  if (n <= 255n) {
    throw new Error(
      `Modulus n (${n}) is too small to encrypt UTF-8 text bytes (0-255). Please select larger prime numbers such that n = p × q > 255 (e.g., p=61, q=53 produces n=3233).`
    );
  }

  const encoder = new TextEncoder();
  const utf8Bytes = Array.from(encoder.encode(text));

  const byteDetails = [];
  const ciphertexts = [];

  for (let i = 0; i < utf8Bytes.length; i++) {
    const byteVal = utf8Bytes[i];
    const m = BigInt(byteVal);
    
    // Detailed calculation trace for each byte
    const expResult = modularExponentiation(m, BigInt(publicKey.e), n, true);
    const c = expResult.result;

    ciphertexts.push(c);
    byteDetails.push({
      index: i,
      char: text[i] !== undefined ? text[i] : `[Byte ${i}]`,
      byte: byteVal,
      m: m.toString(),
      e: publicKey.e.toString(),
      n: publicKey.n.toString(),
      c: c.toString(),
      steps: expResult.steps,
      binaryExp: expResult.binaryExp
    });
  }

  return {
    ciphertexts,
    byteDetails,
    utf8Bytes
  };
}

/**
 * Decrypts an array of ciphertext values back into UTF-8 text.
 * 
 * @param {Array<bigint|string|number>} ciphertexts 
 * @param {{ d: bigint, n: bigint }} privateKey 
 * @returns {{ recoveredText: string, recoveredBytes: number[], byteDetails: Array }}
 */
export function decryptText(ciphertexts, privateKey) {
  if (!ciphertexts || ciphertexts.length === 0) {
    throw new Error("Ciphertext values array is empty.");
  }

  const n = BigInt(privateKey.n);
  const d = BigInt(privateKey.d);

  const recoveredBytes = [];
  const byteDetails = [];

  for (let i = 0; i < ciphertexts.length; i++) {
    const c = BigInt(ciphertexts[i]);
    const expResult = modularExponentiation(c, d, n, true);
    const m = expResult.result;
    const byteNum = Number(m);

    recoveredBytes.push(byteNum);
    byteDetails.push({
      index: i,
      c: c.toString(),
      d: d.toString(),
      n: n.toString(),
      m: m.toString(),
      byte: byteNum,
      steps: expResult.steps
    });
  }

  const decoder = new TextDecoder('utf-8', { fatal: false });
  const recoveredText = decoder.decode(new Uint8Array(recoveredBytes));

  return {
    recoveredText,
    recoveredBytes,
    byteDetails
  };
}
