import React from 'react';
import { Globe, FileCheck, Mail, PackageCheck, Shield, Key, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ApplicationsSection() {
  const applications = [
    {
      id: 'tls',
      title: 'HTTPS & Transport Layer Security (TLS)',
      subtitle: 'Securing Web Browsing & Server Authentication',
      icon: Globe,
      accent: 'border-cyan-500/30 text-cyan-400',
      badge: 'Web Security',
      bullets: [
        'Server Authentication: Websites present an SSL/TLS X.509 certificate signed with RSA so your browser can verify you are talking to the genuine bank or service.',
        'RSA Key Transport (Legacy TLS 1.2): In older TLS, the client encrypted a pre-master symmetric secret using the server’s RSA public key.',
        'Modern TLS 1.3 Reality: TLS 1.3 deprecated RSA key exchange to guarantee Perfect Forward Secrecy (PFS) via Ephemeral Diffie-Hellman (ECDHE). Today, RSA is strictly used for digital signatures during certificate authentication!'
      ],
      diagram: (
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
          <div className="text-cyan-400 font-bold">TLS Handshake Authentication:</div>
          <div>Browser ─── Hello ───▶ Web Server</div>
          <div>Browser ◀─── RSA Certificate (Pub Key) ─── Web Server</div>
          <div>Browser verifies signature with CA root public key ✓</div>
          <div className="text-emerald-400 pt-1">Result: Authenticated secure TLS tunnel established</div>
        </div>
      )
    },
    {
      id: 'signatures',
      title: 'Digital Signatures & Non-Repudiation',
      subtitle: 'Proving Authenticity, Integrity & Origin',
      icon: FileCheck,
      accent: 'border-violet-500/30 text-violet-400',
      badge: 'Identity Proof',
      bullets: [
        'Signing with Private Key: To sign a document, the sender hashes the file (e.g. SHA-256) and encrypts the hash with their private key d.',
        'Verification with Public Key: Anyone can decrypt the signature with the sender’s public key e. If the decrypted hash matches the document hash, authenticity is guaranteed.',
        'RSA-PSS Standardization: Modern high-security systems use RSA-PSS (Probabilistic Signature Scheme, PKCS #1 v2.1) rather than obsolete deterministic PKCS #1 v1.5 padding.'
      ],
      diagram: (
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
          <div className="text-violet-400 font-bold">Digital Signature Pipeline:</div>
          <div>Doc Hash ──[ Private Key (d) ]──▶ RSA Signature</div>
          <div>Verify: Signature ──[ Public Key (e) ]──▶ Recovered Hash</div>
          <div className="text-emerald-400 pt-1">If HashMatches == true: Non-repudiation verified ✓</div>
        </div>
      )
    },
    {
      id: 'email',
      title: 'Secure Email & Hybrid Cryptography',
      subtitle: 'PGP, GPG & S/MIME Email Encryption',
      icon: Mail,
      accent: 'border-blue-500/30 text-blue-400',
      badge: 'Hybrid Cryptography',
      bullets: [
        'Why Hybrid Encryption? Encrypting large attachments directly with RSA would be agonizingly slow and computationally inefficient.',
        'Fast AES Symmetric Body: The email client generates a random one-time 256-bit AES key to encrypt the large message and attachments in milliseconds.',
        'RSA Key Encapsulation: The small 256-bit AES key is encrypted using the recipient’s RSA public key and attached to the email header.'
      ],
      diagram: (
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
          <div className="text-blue-400 font-bold">Hybrid Envelope Architecture:</div>
          <div>Big Email Body ──[ Random AES-256 Key ]──▶ Encrypted Body</div>
          <div>Random AES Key ──[ Recipient RSA Public Key ]──▶ Encrypted Key</div>
          <div className="text-emerald-400 pt-1">Only recipient private key d unlocks the AES key ✓</div>
        </div>
      )
    },
    {
      id: 'software',
      title: 'Software & Firmware Code Signing',
      subtitle: 'Protecting Operating Systems & App Updates',
      icon: PackageCheck,
      accent: 'border-emerald-500/30 text-emerald-400',
      badge: 'Supply Chain',
      bullets: [
        'Developer Signature: When Apple, Microsoft, or Linux distributors compile software, the developer computes a cryptographic hash of the binary and signs it with their secret private key.',
        'Tamper Detection: Before the OS or smartphone runs an update, it checks the signature with the vendor’s trusted public key embedded in the ROM or OS certificate store.',
        'Malware Prevention: If a hacker injects malicious code or tampers with a single byte, the cryptographic hash changes and the OS halts execution immediately.'
      ],
      diagram: (
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
          <div className="text-emerald-400 font-bold">OS Verification at Boot / Install:</div>
          <div>Update.exe ─── Compute Hash ───▶ Hash A</div>
          <div>Signature ─── [ Vendor Public Key ] ───▶ Hash B</div>
          <div className="text-emerald-400 pt-1">Hash A == Hash B ⇒ Safe to Install & Execute ✓</div>
        </div>
      )
    }
  ];

  return (
    <section id="applications" className="py-12 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>Section 11 • Real-World Deployments</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Where Is RSA Used in Real Life?
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            RSA is the backbone of global digital trust. Rather than encrypting gigabytes of data directly, modern production systems deploy RSA as an asymmetric key encapsulation and digital authentication mechanism.
          </p>
        </div>

        {/* 4 Application Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((app) => {
            const IconComp = app.icon;

            return (
              <div
                key={app.id}
                className="glass-panel rounded-2xl p-6 border hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-bold">
                      {app.badge}
                    </span>
                    <div className={`p-2 rounded-xl bg-slate-900 border ${app.accent}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">
                    {app.title}
                  </h3>
                  <div className="text-xs text-cyan-400 font-medium mb-4">
                    {app.subtitle}
                  </div>

                  {/* Bullet points */}
                  <ul className="space-y-2.5 mb-6 text-xs text-slate-300">
                    {app.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Diagram */}
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 mb-1.5 block">
                    Architecture Workflow:
                  </span>
                  {app.diagram}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
