# 🧾 Decentralised Systems

## ❌ Problems with Centralised Systems

Centralised systems, especially in the context of monetary institutions, exhibit several weaknesses that decentralised systems aim to solve.

### 1. Monetary System Issues

- **Bank Closure / Insufficient Capital Reserves**  
  In extreme financial crises, banks may close unexpectedly.  
  _Example:_ During the **Greek debt crisis in 2015**, banks shut down, people lost access to savings, and government-backed insurance schemes failed to provide relief. This catalyzed a rise in **Bitcoin adoption** in Greece.

- **Availability of Banks**  
  Not everyone has consistent or fair access to banking services—especially in underserved or politically unstable regions.

- **Inflation**  
  Central banks control the money supply, often leading to inflation through over-issuance of currency.

- **Merchant Account Censorship**  
  Businesses can have their **merchant accounts arbitrarily shut down**, disrupting livelihoods and operations.

- **Political Control Over Money**  
  Governments can restrict financial access for political reasons.  
  _Example:_ **Wikileaks** experienced funding blockades by major financial services like PayPal, Visa, and Mastercard.

- **Security Through Restriction**  
  Traditional banks rely on **layers of access control** to prevent fraud. This results in a closed and heavily monitored financial network, trading off openness and flexibility.

---

## 🎯 Goals of Decentralisation

Decentralised systems aim to address the flaws of centralised models by promoting:

- **Participation**  
  Anyone can join and contribute without requiring permission from a central authority.

- **Diversity**  
  A variety of actors and systems reduces the risk of systemic failure and monopoly control.

- **Conflict Resolution**  
  Disputes are handled through transparent protocols and community governance rather than opaque institutional decisions.

- **Flexibility**  
  Adaptability is built in. Decentralised systems evolve with community needs and can fork or upgrade without requiring total system overhauls.

- **Moving Power to the Edge**  
  Decision-making authority is shifted from centralized institutions to **end-users**, empowering individuals over institutions.

---

# 🧾 Blockchain Timeline

## 🕰 1970s — The Foundations

In the 1970s, the early conceptual groundwork for blockchain technology began to emerge. The key focus during this period was on **security in digital communication**.

### 🔐 Problem: Security!

Two critical questions defined the era:

1. **How do I ensure that my message has not been modified?**  
   - This is the problem of **integrity**.
   - A solution emerged in the form of **cryptographic hashing** — converting data into a fixed-length string that changes completely with even a small alteration.

2. **How do I ensure that the message comes from a legitimate person?**  
   - This is the problem of **authenticity**.
   - It led to the development of **digital signatures** and **public-key cryptography**.

### 🔧 Technologies Developed

- **Hash Functions**  
  E.g., SHA (Secure Hash Algorithm) family — used to verify data integrity.

- **Public-Key Cryptography (Asymmetric Encryption)**  
  Developed by Whitfield Diffie and Martin Hellman in 1976. Allowed secure key exchange over public channels.

- **Digital Signatures**  
  Enabled verification that a message was created by a known sender.

These innovations laid the foundation for future systems like **blockchains**, which rely on cryptographic tools to provide secure, immutable, and verifiable records of data and transactions.

---

# 🔐 Cryptography Foundations

## 📜 Pre-1970s: Symmetric Cryptography

### 🔑 Symmetric Key Encryption

- **Definition**: Both sender and receiver share a **single secret key**.
- **How it works**:
  - The same key is used for **both encryption and decryption**.
  - Example: Alice and Bob use the same key to encrypt/decrypt messages.

### ⚠️ Problem: Key Management

How can Alice and Bob share a key:

- **Without meeting physically?**
- **Over an insecure or hostile network?**

> Symmetric cryptography assumes a secure way to exchange the key—which was a major limitation before the 1970s.

---

## 🚀 1970s Breakthrough: Asymmetric Cryptography

A major step forward came with the invention of **asymmetric cryptography** (also known as **public-key cryptography**).

### 🔐 Public-Key Cryptography

- Two keys:
  - **Public Key**: Used for **encryption**.
  - **Private Key**: Used for **decryption**.
- Solves the problem of sharing secrets across insecure channels.

---

## 🔁 Diffie-Hellman Key Exchange

Developed to allow the creation of a **shared secret** between two parties without needing to share any private information.

- **Goal**: Derive a mutual key over a public channel.
- **Analogy**: Mixing colors:
  - Each party chooses a private color and mixes it with a public color.
  - After exchanging the mixes, they both arrive at the same final color—**the shared secret**.

👉 See this [Guide](https://github.com/archit-p/simplest-oblivious-transfer) for a visual explanation.

---

## ✍️ Digital Signatures

**Digital signatures** were invented to prove the **origin and integrity** of a message.

### 📌 Purpose

- To confirm that a message was indeed sent by the **holder of a specific private key**.

### 📄 Example

Bob signs a document and sends it to Alice. Using Bob's public key, Alice verifies the signature.

### ✅ Key Properties of Digital Signatures

1. **Authenticity**  
   When Alice verifies the message using Bob’s **public key**, she knows **Bob signed it**.

2. **Unforgeable**  
   Only Bob can create the signature because only he knows his **private key**.

3. **Not Reusable**  
   The signature is **bound to the specific document**—it cannot be copied to another.

4. **Unalterable**  
   If the message is **modified**, the signature will **no longer validate** using Bob's public key.

---

# 🔐 Hash Functions Cheatsheet

## 📘 What is a Hash Function?

A **hash function** is a mathematical algorithm that transforms an input (or "message") into a fixed-size string of bytes, typically appearing random.

- The output is called a **hash** or **digest**.
- Used in cryptography, data structures, digital signatures, and blockchains.

### ✍️ Example

Input:
```
"Hello, world!"
```

SHA-256 Output:
```
a591a6d40bf420404a011733cfb7b190
d62c65bf0bcda32b57b277d9ad9f146e
```

---

## 🎯 Key Properties of Cryptographic Hash Functions

1. **Deterministic**  
   - Same input always gives the same output.

2. **Fast Computation**  
   - Hashing is computationally efficient.

3. **Pre-image Resistance**  
   - Given a hash, it's *computationally infeasible* to find the original input.
   - Prevents reverse-engineering.

4. **Second Pre-image Resistance**  
   - It's hard to find a different input with the same hash as a given input.

5. **Collision Resistance**  
   - It's infeasible to find two different inputs that produce the same hash.

6. **Avalanche Effect**  
   - A small change in input causes a vastly different output.

---

## 🧱 Common Hash Functions

| Name      | Output Size | Common Use Cases                      |
|-----------|-------------|----------------------------------------|
| MD5       | 128 bits    | Legacy systems, checksums (not secure)|
| SHA-1     | 160 bits    | Deprecated for security               |
| SHA-256   | 256 bits    | Blockchain (e.g., Bitcoin), SSL/TLS   |
| SHA-3     | 256 bits    | Modern secure applications            |
| Keccak256 | 256 bits    | Ethereum smart contracts              |

---

## 🔗 Applications of Hash Functions

- **Digital Signatures**  
  Hash the message before signing for efficiency.

- **Data Integrity**  
  Compare hashes to detect file or message tampering.

- **Password Storage**  
  Store hashes of passwords, not plaintext.

- **Blockchain**  
  Hashes link blocks immutably and securely.

- **Merkle Trees**  
  Use hashes to efficiently verify large data sets.

---

## ⚠️ Hashing ≠ Encryption

| Feature         | Hashing                  | Encryption                |
|------------------|--------------------------|----------------------------|
| Reversible       | ❌ No                    | ✅ Yes                     |
| Purpose          | Integrity check, ID      | Confidentiality           |
| Key Needed       | ❌ No                    | ✅ Yes (public/private key)|

---

