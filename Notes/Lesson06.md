# Ethereum Virtual Machine (EVM) Cheat Sheet

## Overview
- **EVM**: Virtual machine running on Ethereum node software
- **Environment**: Self-contained, restricted environment for smart contracts
- **Comparison**: Contracts are more environment-dependent than traditional programs (e.g., Python)

## Key Characteristics
- **Type**: Stack machine
- **Stack size**: Maximum 1024 slots
- **Word size**: 256-bit (facilitates cryptographic operations)
  - Enables efficient Keccak256 hashing
  - Supports elliptic-curve computations

## Data Areas
| Location    | Persistence | Scope            | Cost  | Keyword   |
|-------------|-------------|------------------|-------|-----------|
| **Stack**   | Temporary   | Current execution| Low   | -         |
| **Memory**  | Temporary   | Function scope   | Medium| `memory`  |
| **Storage** | Permanent   | Contract-wide    | High  | `storage` |
| **Calldata**| Call-only   | Call scope       | Low   | `calldata`|
| **Code**    | Permanent   | Contract         | N/A   | -         |
| **Logs**    | Permanent   | Blockchain       | High  | -         |

## Storage vs Memory
### Storage
- Permanent part of contract state
- Accessible across all functions
- Expensive to use (modify)
- Use only when necessary
- Example: `uint256 storage myVar;`

### Memory
- Temporary storage
- Function-scoped only
- Discarded after execution
- Used for temporary calculations
- Example: `string memory tempStr;`

## Best Practices
- Minimize storage operations (expensive)
- Use memory for temporary computations
- Be mindful of stack depth limit (1024)
- Optimize for 256-bit word operations



# Complete Guide to EVM Languages

## Overview
Ethereum Virtual Machine (EVM) supports multiple programming languages for smart contract development, each with different design philosophies and capabilities.

## Main EVM Languages

### Solidity
- The most popular programming language for Ethereum contracts
- JavaScript-like syntax
- Supports:
  - Inheritance
  - Libraries
  - Complex user-defined types

### LLL (Low-level Lisp-like Language)
- Minimalist, assembly-like language
- Rarely used today
- Provides direct control over EVM operations

### Vyper
- Python-inspired language focused on security
- Key features:
  - Bounds and overflow checking
  - Support for numeric units
- Explicitly excludes:
  - Modifiers
  - Inheritance
  - Inline assembly
  - Function overloading
  - Operator overloading
  - Recursive calling
  - Infinite-length loops

### Yul/Yul+
- Intermediate language that compiles to bytecode
- Designed to support:
  - EVM 1.0
  - EVM 1.5
  - Ewasm (planned)
- Acts as common denominator across platforms

## Experimental/Alternative Languages

### FE
- Statically typed language inspired by Rust and Python
- Goals:
  - Easy to learn for new Ethereum developers
  - Enhanced safety features
- Current status: Alpha (as of January 2021)
- Features:
  - Bounds and overflow checking
  - Static typing
  - Pure function support
  - Reentrancy restrictions
  - Static looping
  - Module imports
  - Standard library

### Huff
- Low-level assembly-like language
- Provides fine-grained control over EVM operations
- Used for highly optimized contracts

### Pyramid Scheme
- Experimental Scheme compiler for EVM
- Follows SICP compilation approach
- Functional programming paradigm

### Flint
- Security-focused language
- Notable features:
  - Asset types with restricted atomic operations
  - Built-in security patterns

### LLLL
- LLL-like compiler implemented in Isabelle/HOL
- Focus on formal verification

### HAseembly-evm
- EVM assembly implemented as Haskell DSL
- Functional programming approach

### Bamboo
- Experimental language without loops
- Focuses on predictable execution

## Comparison Table

| Language       | Type           | Key Feature                     | Safety Focus |
|----------------|----------------|---------------------------------|--------------|
| Solidity       | High-level     | Most widely used                | Medium       |
| Vyper          | High-level     | Simplicity, auditability       | High         |
| Yul            | Intermediate   | Multi-backend support          | Medium       |
| FE             | High-level     | Rust/Python inspiration        | High         |
| Huff           | Low-level      | EVM optimization               | Low          |
| Flint          | High-level     | Asset-oriented programming     | High         |

## References
1. DEVCON1: Understanding the Ethereum Blockchain Protocol - Vitalik Buterin
2. Mastering Ethereum by Andreas Antonopoulos
3. Ethereum White Paper
4. Ethereum Yellow Paper
5. EVM specifications and documentation
6. Noxx articles about the EVM

## Best Practices for Language Selection
1. **For production contracts**: Use Solidity or Vyper
2. **For formal verification**: Consider FE or Flint
3. **For optimization**: Consider Yul or Huff
4. **For experimentation**: Try experimental languages
5. Always consider:
   - Auditability
   - Community support
   - Tooling availability
   - Security features





---


# Ethereum State

Ethereum uses a sophisticated state management system that relies on **Merkle Patricia Tries (MPTs)** to efficiently store and verify the blockchain's data. These tries are critical to how Ethereum ensures trustless computation, efficient proof validation, and light client functionality.

## The Three Main Tries

Ethereum maintains three primary tries:

1. **World State Trie**
2. **Transaction Trie**
3. **Transaction Receipt Trie**

Each of these tries serves a specific purpose and is designed for efficient retrieval, cryptographic integrity, and proof generation.

---

### 1. World State Trie

- **Purpose:** Represents the current state of all accounts (EOAs and contracts) on Ethereum.
- **Structure:** A Merkle Patricia Trie where each node maps an account address to an **account object**.
- **Account Object Contains:**
  - `nonce`: Number of transactions sent from this address.
  - `balance`: Amount of ETH held by the address.
  - `storageRoot`: The root of another trie (storage trie) containing the contract's storage.
  - `codeHash`: Hash of the contract bytecode (or empty for EOAs).

**Note:** The `storageRoot` points to a separate trie containing the contract's internal key-value storage.

---

### 2. Transaction Trie

- **Purpose:** Stores all transactions for a given block.
- **Structure:** A Merkle Patricia Trie where:
  - Keys = RLP-encoded index (0, 1, 2, ...)
  - Values = RLP-encoded transaction objects.
- **Usage:** Enables verification of the inclusion of a specific transaction in a block.

---

### 3. Transaction Receipt Trie

- **Purpose:** Stores receipts of each transaction, which include:
  - Gas used
  - Logs generated
  - Status (success or failure)
- **Structure:** Also a Merkle Patricia Trie, keyed by transaction index, storing the RLP-encoded receipts.
- **Usage:** Essential for validating logs, event emissions, and tracking gas usage.

---

## World State and Account State

The **World State** refers to the root trie that tracks all Ethereum accounts.

Each **Account State** (whether EOA or smart contract) includes:
- Nonce
- ETH Balance
- Contract Storage (via `storageRoot`)
- Contract Code (via `codeHash`)

Smart contract accounts point to an additional **Storage Trie**, which itself is a key-value mapping of 32-byte keys and 32-byte values. This is how contract variables are stored and read.

---

## See Also

- [Ethereum State Trie Architecture Explained](https://ethereum.org/en/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)  
  A deep dive into how Ethereum structures its global state, transactions, and receipts using MPTs.

---

## Summary

Ethereum maintains three critical tries:
- **World State Trie**: Tracks all accounts and their states.
- **Transaction Trie**: Contains all transactions in a block.
- **Transaction Receipt Trie**: Contains metadata about each transaction's execution.

Together, these data structures form the backbone of Ethereum's secure, verifiable, and decentralized state machine.

# Ethereum Virtual Machine: Languages, State, and Transactions

## EVM Languages

Ethereum supports multiple languages for writing and compiling smart contracts. Each language serves different levels of abstraction and developer preferences.

### Solidity
- The most popular high-level language for writing Ethereum smart contracts.
- C-like syntax, statically typed.
- Supports inheritance, libraries, interfaces, etc.

### Vyper
- Pythonic language for writing smart contracts.
- Strong typing and simpler syntax for improved security.
- Does **not** support:
  - Modifiers
  - Inheritance
  - Inline assembly
  - Function/operator overloading
  - Recursive calls
  - Infinite loops

### LLL (Low-level Lisp-like Language)
- Very low-level, minimalistic.
- Designed for maximum control over EVM bytecode.
- Not beginner-friendly.

### Yul / Yul+
- Intermediate language that compiles to bytecode.
- Supports multiple backends (EVM 1.0, 1.5, eWASM).
- Ideal for optimization and assembly-level programming.

### FE
- Statically typed language inspired by Python and Rust.
- Designed to be safe, secure, and beginner-friendly.
- Early development stage (alpha release in Jan 2021).
- Key features:
  - Bounds and overflow checking
  - Decidability for more precise gas estimation
  - Static typing and static looping
  - Reentrancy restrictions
  - Standard library and module imports
  - Uses Yul as intermediate representation
  - Implemented in Rust for safety

### Huff
- Low-level assembly-like language.
- Designed for writing highly optimized and gas-efficient contracts.

### Pyramid Scheme (Experimental)
- Scheme-to-EVM compiler based on the SICP approach.

### Flint
- Security-focused language with asset types and restricted operations.

### LLLL
- LLL-like compiler implemented in Isabelle/HOL.

### HAseembly-evm
- Haskell DSL for EVM assembly.

### Bamboo (Experimental)
- Language without loops.
- Designed for secure and auditable contract development.

---

## Ethereum State

Ethereum uses three Merkle Patricia Tries (MPTs) to organize its global data:

### 1. World State Trie
- Tracks all Ethereum accounts (EOAs and contracts).
- Each account contains:
  - `nonce`
  - `balance`
  - `storageRoot` (points to the contract’s storage trie)
  - `codeHash` (hash of contract bytecode)

### 2. Transaction Trie
- Contains all transactions for a given block.
- Used for verifying transaction inclusion.

### 3. Transaction Receipt Trie
- Stores the receipt of each transaction.
- Includes logs, gas used, and status of execution.

#### Reference:
[See: Ethereum State Trie Architecture Explained](https://ethereum.org/en/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)

---

## Ethereum Block Fields

### Consensus Layer (Beacon Chain)
- `randao_reveal`: Randomness for validator selection.
- `eth1_data`: Deposit contract information.
- `graffiti`: Arbitrary tag data.
- `proposer_slashings`: Validators penalized for malicious proposals.
- `attester_slashings`: Validators penalized for faulty attestations.
- `attestations`: Votes confirming the current block.
- `deposits`: New validator deposits.
- `voluntary_exits`: Validators leaving the network.
- `sync_aggregate`: Sync committee for light clients.
- `execution_payload`: Transactions from execution client.

### Execution Layer (EVM)
- `parent_hash`: Hash of the parent block.
- `fee_recipient`: Address receiving the transaction fees.
- `state_root`: Root hash of the updated world state.
- `receipts_root`: Root of the receipt trie.
- `logs_bloom`: Structure for quick log lookup.
- `prev_randao`: Used for random selection.
- `block_number`: Current block number.
- `gas_limit`: Max allowed gas in the block.
- `gas_used`: Actual gas used.
- `timestamp`: Time of block creation.
- `extra_data`: Raw arbitrary bytes.
- `base_fee_per_gas`: Base transaction fee.
- `block_hash`: Hash of the execution block.
- `transactions`: List of included transactions.

---

## Ethereum Transactions

### Fields
- `recipient`: Address receiving ETH or contract call.
- `signature`: Sender's digital signature.
- `nonce`: Count of transactions sent by the sender.
- `value`: Amount of ETH (in wei) to send.
- `data`: Optional input data (used for contract calls).
- `gasLimit`: Max gas this transaction can consume.
- `maxPriorityFeePerGas`: Tip to incentivize miners/validators.
- `maxFeePerGas`: Total max fee per gas unit (includes base + tip).

### Example Transaction

```json
{
  "from": "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  "to": "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  "gasLimit": "21000",
  "maxFeePerGas": "300",
  "maxPriorityFeePerGas": "10",
  "nonce": "0",
  "value": "10000000000"
}
```

---

# Transaction Processing
Before a transaction executes, it must pass several validity checks:
- Proper RLP encoding (recursive length prefix).
- Valid digital signature.
- Nonce matches the sender's expected nonce.
- Gas limit covers intrinsic gas cost.
- Sender’s balance can cover gas + value.
## Additional Resources
DEVCON1 – Understanding the Ethereum Blockchain Protocol - Vitalik Buterin

Mastering Ethereum – Andreas Antonopoulos

Ethereum White Paper, Beige Paper, Yellow Paper

EVM Languages – Noxx articles and community guides



   