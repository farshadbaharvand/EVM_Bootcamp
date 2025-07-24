# Team Game - Lottery

## Overview

The goal of the **Team Game - Lottery** is to earn the most points for your team by interacting with a vulnerable lottery smart contract deployed on the **Sepolia testnet**. The game is intentionally insecure — designed for players to exploit its vulnerabilities in both the **smart contract code** and the **dApp architecture**.

---

## Objective

- **Score maximum points** for your team.
- **Reduce** points of other teams.
- **Explore** and **exploit** vulnerabilities in the contract.
- **Bonus**: Steal the ETH stored in the contract (if you can).

---

## Game Details

- **Frontend URL**: [https://lottery.bytecode.lol](https://lottery.bytecode.lol)
- **Network**: Sepolia Testnet

You may interact with the contract via the provided frontend **or** directly through other tools like:
- Remix
- Ethers.js
- Web3.js
- Hardhat/Foundry scripts

---

## Registration Process

Before you start playing, you must **register your team**.

### Registration Inputs:

- **Team Name** – A string that identifies your team.
- **Wallet Address** – The Ethereum address you will use.
- **Password** – Likely used in the contract as part of the RNG seed (potentially insecure).

### Registration Cost:

- `0.01 ETH` (Sepolia ETH)

### Registration Strategy:

- Use a **different wallet** for each team to manage points separately.
- Consider reusing or rotating team names and passwords in a strategic way.

---

## Gameplay: The Lottery Guess

Once your team is registered, you can begin guessing numbers in the lottery.

### Mechanics:

- **If you guess correctly**, your team earns points.
- **If you guess incorrectly**, your team loses points.

### Advice from the Game Admin:

- Make **lots of guesses**.
- Focus on **small numbers**.

### Exploitation Tip:

The random number generator (RNG) is likely **weak or predictable**:
- Review the contract’s **random number generation logic** (possibly using block variables or hashing).
- Look for **predictable seeds** (e.g., `block.timestamp`, `block.number`, `msg.sender`, or the password).
- Use these patterns to **pre-calculate** or **brute-force** the correct number.

---

## Investigate the Contract

### How to Find the Contract:

- Use browser developer tools (e.g., Network tab) while interacting with the frontend.
- Look for:
  - JSON-RPC requests (contract address in `eth_call` or `eth_sendTransaction`)
  - ABI definitions and contract interaction endpoints
- Alternatively, look on **block explorers** (like [Sepolia Etherscan](https://sepolia.etherscan.io)) under **recent contracts** or using team wallet address interactions.

### Once Found:

- Analyze the contract code and ABI
- Look for common vulnerabilities:
  - **Predictable RNG**
  - **Insecure storage of passwords or guesses**
  - **Reentrancy**
  - **Unchecked transfers**
  - **Access control issues**

---

## Bonus Challenge: Steal the ETH

The contract holds **ETH as prize or collateral**. There may be a vulnerability allowing you to:

- Drain the contract's balance
- Manipulate the point scoring mechanism
- Exploit gas refunds, fallback functions, or reentrancy

### Hints:
- Look for **withdraw functions** without proper access control.
- See if you can **guess the winning number repeatedly** and trigger ETH payouts.
- Try **reentrancy** by deploying a contract that interacts with the vulnerable functions recursively.

---

## Exploitation Tools

You can use any of the following to script and exploit:

- **Ethers.js** with a custom Node.js script
- **Foundry** (`forge script`)
- **Hardhat** task or script
- **Remix IDE** (for quick interaction and testing)
- **etherscan.io** (write to contract)

---

## Strategy Tips

- **Automate your guesses** using a script.
- **Exploit predictable RNG** by syncing block data in your script.
- **Collaborate with your team** to optimize attack patterns.
- **Track leaderboard progress** (if any) to target the highest-scoring teams.

---

## Summary

| Action                        | Notes                                                    |
|-----------------------------|-----------------------------------------------------------|
| Register Team               | Provide name, address, password – costs 0.01 ETH          |
| Guess Numbers               | Small numbers often recommended – brute-force possible    |
| Investigate Contract        | Identify RNG and any vulnerabilities                      |
| Use Flashbots / Scripts     | To speed up interaction and front-run other players       |
| Bonus: Steal Contract ETH   | Find flaws in logic or access controls                    |

---


## Disclaimer

This is a **security game** designed for educational purposes only. Do **not** attempt similar techniques on real smart contracts or mainnet deployments.


