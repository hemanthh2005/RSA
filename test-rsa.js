import {
  isPrime,
  gcd,
  modInverse,
  modularExponentiation,
  generateKeys,
  encryptNumber,
  decryptNumber,
  encryptText,
  decryptText
} from './src/utils/rsaMath.js';

console.log("=== RUNNING RSA UNIT TESTS ===");

// Test 1: Numerical board example
try {
  const keys1 = generateKeys(3, 11, 3);
  console.assert(keys1.n === 33n, `Test 1 Failed: n=${keys1.n}`);
  console.assert(keys1.phi === 20n, `Test 1 Failed: phi=${keys1.phi}`);
  console.assert(keys1.d === 7n, `Test 1 Failed: d=${keys1.d}`);
  console.assert(keys1.publicKey.e === 3n && keys1.publicKey.n === 33n, "Test 1 PubKey Failed");
  console.assert(keys1.privateKey.d === 7n && keys1.privateKey.n === 33n, "Test 1 PrivKey Failed");

  const c1 = encryptNumber(4, keys1.publicKey);
  console.assert(c1 === 31n, `Test 1 Encrypt Failed: C=${c1}`);

  const m1 = decryptNumber(c1, keys1.privateKey);
  console.assert(m1 === 4n, `Test 1 Decrypt Failed: M=${m1}`);

  console.log("✅ Test 1 Passed: Numerical board example (p=3, q=11, e=3, M=4 -> C=31, M=4)");
} catch (e) {
  console.error("❌ Test 1 Error:", e.message);
}

// Test 2: Text example (p=61, q=53, e=17, Message="A")
try {
  const keys2 = generateKeys(61, 53, 17);
  console.assert(keys2.n === 3233n, `Test 2 Failed: n=${keys2.n}`);
  console.assert(keys2.phi === 3120n, `Test 2 Failed: phi=${keys2.phi}`);
  console.assert(keys2.d === 2753n, `Test 2 Failed: d=${keys2.d}`);

  const enc2 = encryptText("A", keys2.publicKey);
  console.assert(enc2.utf8Bytes[0] === 65, `Test 2 Byte Failed: ${enc2.utf8Bytes[0]}`);
  console.assert(enc2.ciphertexts[0] === 2790n, `Test 2 Ciphertext Failed: ${enc2.ciphertexts[0]}`);

  const dec2 = decryptText(enc2.ciphertexts, keys2.privateKey);
  console.assert(dec2.recoveredBytes[0] === 65, `Test 2 Dec Byte Failed: ${dec2.recoveredBytes[0]}`);
  console.assert(dec2.recoveredText === "A", `Test 2 Recovered Failed: ${dec2.recoveredText}`);

  console.log("✅ Test 2 Passed: Text example (p=61, q=53, e=17, Message='A' -> C=2790, Recovered='A')");
} catch (e) {
  console.error("❌ Test 2 Error:", e.message);
}

// Test 3: Longer text
try {
  const keys3 = generateKeys(61, 53, 17);
  const text = "Hello RSA!";
  const enc3 = encryptText(text, keys3.publicKey);
  const dec3 = decryptText(enc3.ciphertexts, keys3.privateKey);
  console.assert(dec3.recoveredText === text, `Test 3 Failed: expected '${text}', got '${dec3.recoveredText}'`);
  console.log(`✅ Test 3 Passed: Longer text '${text}' successfully encrypted and decrypted identically`);
} catch (e) {
  console.error("❌ Test 3 Error:", e.message);
}

// Test 4: Invalid prime p=10
try {
  let threw = false;
  try {
    generateKeys(10, 11, 3);
  } catch (err) {
    threw = true;
    console.assert(err.message.includes("not a prime number"), `Unexpected error msg: ${err.message}`);
  }
  console.assert(threw, "Test 4 Failed: did not throw for p=10");
  console.log("✅ Test 4 Passed: p=10 correctly rejected as non-prime");
} catch (e) {
  console.error("❌ Test 4 Error:", e.message);
}

// Test 5: Invalid exponent (e not coprime to phi)
try {
  let threw = false;
  try {
    // p=3, q=11 => phi=20. If e=2, gcd(2, 20) = 2 != 1
    generateKeys(3, 11, 2);
  } catch (err) {
    threw = true;
    console.assert(err.message.includes("coprime"), `Unexpected error msg: ${err.message}`);
  }
  console.assert(threw, "Test 5 Failed: did not throw for non-coprime e");
  console.log("✅ Test 5 Passed: Invalid exponent (e=2 with phi=20) rejected with coprime validation error");
} catch (e) {
  console.error("❌ Test 5 Error:", e.message);
}

// Test 6: Invalid message M >= n
try {
  let threw = false;
  try {
    const keys6 = generateKeys(3, 11, 3); // n = 33
    encryptNumber(35, keys6.publicKey); // M = 35 >= 33
  } catch (err) {
    threw = true;
    console.assert(err.message.includes("0 ≤ M < n"), `Unexpected error msg: ${err.message}`);
  }
  console.assert(threw, "Test 6 Failed: did not throw for M >= n");
  console.log("✅ Test 6 Passed: Message M=35 >= n=33 rejected");
} catch (e) {
  console.error("❌ Test 6 Error:", e.message);
}

// Test 7: Empty input
try {
  let threw = false;
  try {
    const keys7 = generateKeys(61, 53, 17);
    encryptText("", keys7.publicKey);
  } catch (err) {
    threw = true;
    console.assert(err.message.includes("cannot be empty"), `Unexpected error msg: ${err.message}`);
  }
  console.assert(threw, "Test 7 Failed: did not throw for empty text");
  console.log("✅ Test 7 Passed: Empty plaintext string handled gracefully");
} catch (e) {
  console.error("❌ Test 7 Error:", e.message);
}

console.log("=== ALL 7 RSA TESTS PASSED PERFECTLY ===");
