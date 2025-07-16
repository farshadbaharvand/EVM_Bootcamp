# Recent Attacks

For a weekly update on security, see our **Security Bytes**.  
Another useful resource is [Rekt News](https://rekt.news).

## Hyperliquid

The **Hyperliquid exploit** in **March 2025** demonstrates the risks associated with weak oracle manipulation protection and flaws in liquidation mechanisms.

A trader opened a substantial **$6 million short position** on the relatively illiquid asset **$JELLY** on Hyperliquid while simultaneously accumulating **long positions in the spot market** for $JELLY on other exchanges.

The trader then **deliberately pumped the price** of $JELLY on these external exchanges, which in turn triggered the **liquidation of their own short position** on Hyperliquid.

Due to Hyperliquid's **automated position inheritance**, the protocol's **liquidity pool (HLP)** automatically took over this now-toxic short position.

As the price of $JELLY continued to surge, the HLP faced the risk of **massive losses**. The exploit took advantage of several vulnerabilities:

- The lack of real position limits on illiquid assets  
- Weak protection against oracle manipulation that allowed external price movements to heavily influence Hyperliquid's price  
- The automated inheritance of liquidated positions  
- The absence of circuit breakers to halt trading during extreme price movements  

Faced with potential **losses of around $12 million**, Hyperliquid ultimately resorted to a **centralised intervention**, using a validator vote to forcibly delist **$JELLY**.

This incident highlights:

- The risks associated with insufficient safeguards against **market manipulation**
- The potential for even **automated liquidation mechanisms** to be exploited
- The growing concern about **centralisation** in protocols that claim to be decentralised

---


## ByBit Hack

Bybit, a major cryptocurrency exchange, experienced a significant security breach on **February 21, 2025**, resulting in the theft of approximately **$1.5 billion in Ethereum**. This is considered the largest cryptocurrency heist in history.

### Key Points of the Exploit

- **Scale of the theft**: Around **400,000 ETH**, valued at **$1.5 billion**, was stolen, marking the largest single theft of cryptocurrencies to date.
- **Attribution**: The **US FBI** has publicly attributed the hack to the North Korean entity **"TraderTraitor"**, also known as the **Lazarus Group**.
- **Method of attack**:
  - Attackers employed **advanced persistent threat (APT)** techniques.
  - They gained access to Bybit's **multi-signature wallet system**.
  - Exploited a **"blind-signing" vulnerability** and a **lack of secondary verification** in Bybit's transaction approval process.
  - This allowed them to reroute funds to wallets under their control.
- **Bybit's response**:
  - Acknowledged the hack within hours.
  - Reassured users about the safety of **cold wallets**.
  - Launched a **bounty program**, offering up to **10% of recovered funds** as a reward.
  - Cooperated with law enforcement and **blockchain analytics firms**.
- **Laundering efforts**:
  - Stolen Ethereum is being laundered through **DeFi services**, including:
    - **Decentralized exchanges (DEXs)**
    - **Cross-chain bridges** like **THORChain**
  - A second phase of laundering involves **cryptocurrency mixers** such as:
    - **Wasabi**
    - **CryptoMixer**
- **FBI involvement**:
  - Issued a **public service announcement** identifying **North Korea** as responsible.
  - Urged crypto platforms to **block transactions** associated with laundering addresses.

### Safe{Wallet}'s Investigation

**Safe{Wallet}'s preliminary report**, based on **Mandiant's forensic investigation**, indicates the incident was a **sophisticated, state-sponsored attack** attributed by the **FBI** to **TraderTraitor (UNC4899)**.

#### Key Findings

- **Attribution**:
  - The attack is attributed to **TraderTraitor**, linked to **North Korea**, known for **crypto heists**.
- **Attack Method**:
  - A **Safe{Wallet} developer’s laptop** was compromised.
  - **AWS session tokens** were hijacked.
  - **Multi-factor authentication was bypassed**, giving attackers **commit access** to Safe{Wallet} servers.
- **Security Measures Bypassed**:
  - Despite the presence of:
    - **Limited access controls**
    - **Peer reviews**
    - **Monitoring**
    - **Audits**
  - Attackers successfully bypassed security layers.
- **Impact**:
  - **Smart contracts** remained **unaffected**.
  - **Backend services** were **compromised**.
- **Response and Recovery**:
  - Safe{Wallet} initiated:
    - **Full infrastructure reset**
    - **Enhanced monitoring**
    - Collaboration with **Blockaid** for malicious transaction detection
  - Working with **Mandiant** on further security upgrades.
- **Call to Action**:
  - Highlights the need for **industry-wide Web3 security improvements**.
  - Emphasis on:
    - Simplifying **secure transaction management**
    - Improving **user experience** for transaction verification
  - Safe{Wallet} urges users to **verify transactions before signing** and has published a **guide** on this topic.
  - Investigations are ongoing; systems are being restored with **enhanced security measures**.

### Resources

- [The Bybit heist: how the hackers took control - Crystal Intelligence](https://www.crystalblockchain.com)
- [Lessons from the Bybit hack: how to store crypto safely – Kaspersky official blog](https://www.kaspersky.com)
- [The Bybit Hack: A crypto heist with cloud security lessons | SC Media](https://www.scmagazine.com)
- [North Korea Responsible for $1.5 Billion Bybit Hack - Internet Crime Complaint Center](https://www.ic3.gov)
- [Bybit Hack Update: North Korea Moves to Next Stage of Laundering - TRM Labs](https://www.trmlabs.com)
- [Safe{Wallet} Investigation Updates](https://www.safewallet.com)


## AI Code Poisoning Attack

### Overview

Scammers are actively **polluting AI training data** with **malicious crypto code**, a practice known as **AI code poisoning**. This type of attack targets developers who rely on AI tools to generate or recommend code, particularly in high-risk domains like cryptocurrencies.

### Real-World Example

A user on Twitter reported the following incident:

> "Be careful with information from @OpenAI! Today I was trying to write a bump bot for pump.fun and asked @ChatGPTapp to help me with the code. I got what I asked but I didn't expect that ChatGPT would recommend me a scam @solana API website. I lost around $2.5k"

#### Key Takeaways:

- The user requested AI assistance for a trading bot related to **pump.fun**, a platform built on **Solana**.
- ChatGPT responded with code that referenced a **fraudulent API URL**, which appeared legitimate but was under the control of scammers.
- As a result, the user lost approximately **$2,500 USD** in crypto assets.

### Attack Vector

- **Poisoned training data**: Malicious actors inject fake or scammy code examples into the public internet (e.g., GitHub, forums, blogs), which AI models may later ingest during training.
- **AI model reuse**: These poisoned examples can be surfaced in auto-generated responses by AI coding assistants.
- **Social engineering**: Victims are misled by realistic-looking domains, fake libraries, or convincing but dangerous API examples.

### Recommendations

1. **Always audit AI-generated code**, especially when dealing with wallet interactions, API calls, or external services.
2. **Avoid copy-pasting code blindly** without understanding what it does.
3. **Manually verify domains**, especially if they are new, unofficial, or unfamiliar.
4. **Cross-check libraries and endpoints** against trusted sources such as:
   - Official documentation
   - Open-source repositories with strong reputations
   - Developer communities like Stack Overflow or Discord
5. **Use static analysis and code auditing tools** before deploying AI-generated smart contracts or bots.
6. **Limit API key or wallet access** when testing unfamiliar code.

### Call to Action

The rise of AI-assisted development requires a renewed emphasis on **security awareness**. As models continue to improve, **bad actors are also evolving**, aiming to exploit trust in automated tools. The crypto space is particularly vulnerable, and developers must adopt **zero-trust principles** when integrating AI-recommended code into real-world applications.



