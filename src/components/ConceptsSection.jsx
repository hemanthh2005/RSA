import React, { useState } from 'react';
import { BookOpen, Search, HelpCircle, ChevronDown, ChevronUp, Sparkles, Check } from 'lucide-react';

export default function ConceptsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedConcept, setExpandedConcept] = useState(null);

  const concepts = [
    {
      id: 1,
      title: 'What is Cryptography?',
      tag: 'Core Concept',
      what: 'Cryptography is the science and art of securing communications and data so that only the intended recipient can read and verify it.',
      why: 'In the digital world, data travels across public networks, Wi-Fi, and cables where eavesdroppers could intercept confidential credentials or financial transactions.',
      how: 'RSA is one of the most famous algorithms in modern cryptography, providing both confidential message encryption and digital identity signatures.',
      example: 'Writing a letter in an invisible code so that an intercepted postal courier cannot read your private secrets.'
    },
    {
      id: 2,
      title: 'What is RSA?',
      tag: 'Algorithm',
      what: 'RSA is an asymmetric public-key cryptographic algorithm named after its inventors Ron Rivest, Adi Shamir, and Leonard Adleman who published it in 1977.',
      why: 'Before RSA, secure communication required two parties to somehow physically exchange a shared secret key beforehand—which was impossible across the global internet.',
      how: 'RSA solved this key exchange dilemma by creating two distinct keys: a public key for locking messages and a private key for unlocking them.',
      example: 'A public mailbox on your front porch: anyone can drop a letter inside through the slot, but only you have the key to open the door and take it out.'
    },
    {
      id: 3,
      title: 'What is Asymmetric Cryptography?',
      tag: 'Paradigm',
      what: 'A cryptographic system that uses a mathematically linked pair of keys—a public key and a private key—rather than a single shared secret key.',
      why: 'Symmetric encryption (like AES) requires pre-sharing a secret key. Asymmetric cryptography eliminates this risk because the public key can be openly published anywhere.',
      how: 'RSA relies on one-way trapdoor mathematical functions where computing in one direction is easy, but reversing it without the trapdoor key is virtually impossible.',
      example: 'A padlock sent open to a friend. Your friend snaps it shut over a secret box and mails it back. Only you have the padlock key to reopen it.'
    },
    {
      id: 4,
      title: 'What is a Public Key?',
      tag: 'Key Pair',
      what: 'A cryptographic key composed of a public exponent (e) and a modulus (n) that is intentionally made accessible to everyone in the world.',
      why: 'Allows any stranger, client, or server to safely send you encrypted information or verify your digital signatures without sharing passwords.',
      how: 'In RSA, the public key is represented as the pair (e, n). Anyone encrypts with formula C = Mᵉ mod n.',
      example: 'Your public email address or phone number: anyone can contact you using it, but having your phone number does not let them log into your private account.'
    },
    {
      id: 5,
      title: 'What is a Private Key?',
      tag: 'Key Pair',
      what: 'A secret cryptographic key composed of a private exponent (d) and modulus (n) that must be safeguarded and never revealed to anyone.',
      why: 'If your private key is leaked, attackers can decrypt all past and future confidential messages sent to you, or impersonate your digital signature.',
      how: 'In RSA, the private key is (d, n). It reverses the modular exponentiation using M = Cᵈ mod n.',
      example: 'Your private house key or online banking password: only you possess it to unlock your front door or authorize wire transfers.'
    },
    {
      id: 6,
      title: 'What are Prime Numbers?',
      tag: 'Number Theory',
      what: 'Integers greater than 1 that have exactly two factors: 1 and the number itself (e.g. 2, 3, 5, 7, 11, 13, 17, 61...).',
      why: 'Prime numbers are the "indivisible atoms" of number theory. Multiplying two large primes is instant, but factoring their product back into primes is extraordinarily difficult.',
      how: 'RSA generates keys by choosing two large secret prime numbers p and q to form the modulus n = p × q.',
      example: 'Multiplying 61 × 53 gives 3233 in a split second. But if someone hands you 3233 and asks for its prime factors, it takes much longer trial division.'
    },
    {
      id: 7,
      title: 'What is Modulus n?',
      tag: 'Parameters',
      what: 'The mathematical upper bound and modulus base of the RSA system, calculated by multiplying the two chosen primes: n = p × q.',
      why: 'It defines the finite cyclic ring (clock arithmetic) where all calculations happen, ensuring numbers do not grow infinitely large.',
      how: 'Both the public key (e, n) and the private key (d, n) share this exact same modulus n.',
      example: 'A 12-hour clock: after 12 o\'clock, 13:00 wraps around to 1:00. Modulus n wraps numbers within the range 0 to n - 1.'
    },
    {
      id: 8,
      title: "What is Euler's Totient Function φ(n)?",
      tag: 'Number Theory',
      what: 'A special function φ(n) (phi) that counts how many positive integers less than n are relatively prime (coprime) to n.',
      why: "It serves as the hidden mathematical trapdoor. Knowing φ(n) allows the recipient to compute the private key d.",
      how: 'For n = p × q (product of two distinct primes), Euler proved that φ(n) = (p - 1) × (q - 1).',
      example: 'For p = 3 and q = 11: n = 33, and φ(33) = (3 - 1) × (11 - 1) = 2 × 10 = 20 numbers less than 33 share no common factor with 33.'
    },
    {
      id: 9,
      title: 'What is Greatest Common Divisor (GCD)?',
      tag: 'Arithmetic',
      what: 'The largest positive integer that divides two numbers without leaving any remainder.',
      why: 'Two numbers are called "coprime" or "relatively prime" if their GCD is 1, meaning they have no common factors other than 1.',
      how: 'RSA requires that the public exponent e must be coprime to Euler\'s totient φ(n), meaning GCD(e, φ(n)) must equal 1.',
      example: 'GCD(3, 20) = 1 (coprime, valid for RSA). But GCD(4, 20) = 4 ≠ 1 (invalid for RSA, because no modular inverse exists).'
    },
    {
      id: 10,
      title: 'What is a Modular Multiplicative Inverse?',
      tag: 'Modular Arithmetic',
      what: 'An integer d such that multiplying it by e leaves a remainder of 1 when divided by φ(n): (d × e) ≡ 1 (mod φ(n)).',
      why: 'It acts as the mathematical "undo" button. When you raise a number to power e and then to power d, they cancel each other out modulo n.',
      how: 'Calculated using the Extended Euclidean Algorithm to derive private key d from public exponent e and φ(n).',
      example: 'If e = 3 and φ(n) = 20, then d = 7 because (3 × 7) = 21, and 21 mod 20 = 1.'
    },
    {
      id: 11,
      title: 'What is Encryption?',
      tag: 'Process',
      what: 'The computational process of converting readable plaintext into unintelligible ciphertext using an encryption algorithm and key.',
      why: 'Ensures confidentiality so that anyone snooping on network traffic sees only random gibberish.',
      how: 'In RSA: C = Mᵉ mod n. The message M is raised to public exponent e modulo n.',
      example: 'Converting the clear English word "HELLO" into a meaningless number like 2790.'
    },
    {
      id: 12,
      title: 'What is Decryption?',
      tag: 'Process',
      what: 'The process of transforming ciphertext back into the original plaintext using a corresponding decryption key.',
      why: 'Allows the authorized receiver to recover the original secret message.',
      how: 'In RSA: M = Cᵈ mod n. The ciphertext C is raised to private exponent d modulo n, restoring M.',
      example: 'Taking the scrambled number 2790 and computing 2790ᵈ mod n to yield 65, which is the ASCII letter "A".'
    },
    {
      id: 13,
      title: 'What is Ciphertext?',
      tag: 'Data',
      what: 'The encrypted, scrambled output generated by an encryption algorithm that cannot be understood without the private key.',
      why: 'It is designed to be completely unreadable and mathematically indistinguishable from random noise to an eavesdropper.',
      how: 'In our simulator, ciphertext is represented as individual integers or an array of integers C.',
      example: 'The number 31 when encrypting message 4 with public key (3, 33).'
    },
    {
      id: 14,
      title: 'What is Plaintext?',
      tag: 'Data',
      what: 'The original, unencrypted readable message or numerical data before any cryptographic transformation has occurred.',
      why: 'It is the valuable content (passwords, credit card numbers, messages) that humans or software applications read and process.',
      how: 'In RSA, plaintext is encoded as an integer M satisfying the mathematical requirement 0 ≤ M < n.',
      example: 'The message "Hello RSA!" or the numerical value M = 4.'
    }
  ];

  const filteredConcepts = concepts.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.what.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="concepts" className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Section 10 • Cryptography Primer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Understand RSA – Learn the Concepts
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Fourteen fundamental principles explained in simple, beginner-friendly terms with practical examples.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter concepts..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
            />
          </div>
        </div>

        {/* Concepts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredConcepts.map((item) => {
            const isExpanded = expandedConcept === item.id;

            return (
              <div
                key={item.id}
                className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/30 transition-all duration-200"
              >
                <div
                  onClick={() => setExpandedConcept(isExpanded ? null : item.id)}
                  className="cursor-pointer flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-850 mt-0.5">
                      #{item.id}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white hover:text-cyan-300 transition">
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400">
                        Category: {item.tag}
                      </span>
                    </div>
                  </div>

                  <button className="text-slate-400 hover:text-cyan-400 p-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Primary What it is summary */}
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  <strong className="text-cyan-300">What it is: </strong>
                  {item.what}
                </p>

                {/* Expanded Details: Why, How, Example */}
                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block mb-0.5">
                        Why It Is Needed:
                      </span>
                      <p className="text-slate-300 leading-normal">{item.why}</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block mb-0.5">
                        How RSA Uses It:
                      </span>
                      <p className="text-slate-300 leading-normal">{item.how}</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-0.5">
                        Simple Real-Life Example:
                      </span>
                      <p className="text-emerald-200/90 leading-normal">{item.example}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
