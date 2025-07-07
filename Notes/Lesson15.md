# Viem Introduction

## Overview

The landscape of Ethereum development has traditionally been shaped by foundational libraries like **Ethers.js** and **web3.js**. While instrumental in the rise of dApps, these libraries face increasing pressure to meet modern demands around performance, stability, and developer experience.

**Viem** is a next-generation Ethereum interface library built to directly address these shortcomings.

---

## The Rationale for a New Library: Addressing the 'Quadrilemma'

The authors of Viem introduce the concept of a **"quadrilemma"**—the challenge of optimizing for the following four domains simultaneously:

1. **Developer Experience**
2. **Stability**
3. **Bundle Size**
4. **Performance**

Traditional libraries often succeed in one or two of these areas but fall short in others. For example, a library might offer a great developer experience but at the cost of a large bundle size, negatively affecting web app load times.

Viem was developed by the creators of **wagmi**, a widely used React hook library for Ethereum, who encountered firsthand the architectural and DX limitations of existing libraries.

---

## Core Design Philosophy: Modularity, Performance, and Type Safety

### Lightweight & Tree-Shakable

Modern dApps must perform well on mobile and low-bandwidth networks. Viem is engineered to produce minimal bundle sizes through a **modular, tree-shakable architecture**.

- **Gzipped sizes** range from **35–63 kB**
- Only the used modules are included in the production bundle
- Example: If no transaction signing is used, that code is omitted from the bundle

### Performant

Viem optimizes for **runtime efficiency**:

- Uses efficient encoding/decoding algorithms
- Avoids unnecessary asynchronous operations
- Maintains responsiveness and fast UI interactions

### Type-Safe

Type safety is a foundational feature of Viem:

- **First-class TypeScript support**
- **Automatic type inference from the ABI**
  - Function names
  - Argument types
  - Return types
- **Benefits**
  - Autocompletion
  - Compile-time error detection
  - Fewer runtime bugs

### Explicit & Composable APIs

Viem favors **explicit over implicit** code:

- APIs may seem more verbose but are **easier to read, debug, and refactor**
- Helps developers better understand the **Ethereum JSON-RPC** interface
- Facilitates a **pedagogical learning process**—learning Viem is akin to learning Ethereum itself

---

## Key Architectural Decisions

### Native BigInt

- Viem uses **native JavaScript BigInt** for all large numerical operations (e.g., gas, balances)
- Avoids the need for external `BigNumber` libraries
- Reduces dependency size and eliminates related bugs

### Stateless Primitives

- Core functions in Viem are **pure and deterministic**
- No internal mutable state
- Improves **predictability**, **testability**, and **stability**

---

## Conclusion

Viem is a thoughtfully designed Ethereum library that directly responds to the growing demands of modern dApp development. It prioritizes:

- **Minimalism** (small bundle size)
- **Performance** (runtime efficiency)
- **Developer Empowerment** (type safety and explicit APIs)

Its architecture reflects a deep understanding of the Ethereum ecosystem and offers a powerful, future-proof foundation for building scalable, maintainable blockchain applications.

---


# Practical Details

## Initial Project Setup

To provide a practical foundation for the examples that follow, this section outlines the steps for configuring a TypeScript project to use **Viem**. This setup will serve as the basis for interacting with Solidity smart contracts using Viem.

---

## Step 1: Initialize the Project

First, create a new Node.js project directory and initialize it:

```bash
mkdir viem-contract-interaction
cd viem-contract-interaction
npm init -y

```

Then generate a tsconfig.json file for TypeScript configuration:

```bash
npx tsc --init --resolveJsonModule true
```
## 2. Install Required Dependencies
Install the core libraries and development tools:

```bash
npm install viem
npm install --save-dev typescript ts-node @types/node dotenv

```

- viem: Core library for Ethereum interaction

- typescript: Enables type checking and TS support

- ts-node: Runs TypeScript files directly

- @types/node: Type definitions for Node.js

- dotenv: Manages environment variables like RPC URLs and private keys


## 3. Project Files Setup
Create the main TypeScript file and a .env file to store sensitive configuration:

```bash
touch .env
touch index.ts

```

## 4. Configure the .env File
Edit the .env file and insert your credentials:

```
QUICKNODE_ENDPOINT="YOUR_RPC_ENDPOINT_URL"
PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"
```
- QUICKNODE_ENDPOINT: The RPC URL of your Ethereum node (can be from providers like Alchemy, Infura, or QuickNode)

- PRIVATE_KEY: A test wallet's private key (used only for signing and sending state-changing transactions)


Summary
This minimal but complete setup gives you:

A type-safe development environment using TypeScript

Access to Ethereum blockchain using Viem

Secure management of sensitive credentials via .env

You are now ready to start writing scripts in index.ts to interact with smart contracts using Viem.


---

# Foundational Concepts: Clients, Transports, and Accounts

To effectively use **Viem**, it's important to understand the three foundational concepts that define its architecture:

- **Clients**
- **Transports**
- **Accounts**

This terminology helps refine and clarify patterns from earlier libraries like Ethers.js and web3.js, resulting in a more intuitive and robust application structure.

---

## Transports: The Communication Layer

At the base of the Viem architecture is the **Transport**.

A **Transport** is responsible for formatting, sending, and managing outgoing JSON-RPC requests to an Ethereum node. It acts as the bridge between the application and the blockchain network.

Viem provides three primary types of Transports:

### 1. HTTP Transport

- Created using the `http()` function.
- Used for standard HTTP JSON-RPC endpoints.
- Most common choice for general-purpose requests.

### 2. WebSocket Transport

- Created using the `webSocket()` function.
- Connects to a WebSocket JSON-RPC endpoint.
- Ideal for applications requiring real-time updates and event subscriptions.

### 3. Custom Transport

- Created using the `custom()` function.
- Designed to connect to **EIP-1193** compliant providers.
- Most common use case: connecting to a browser-injected provider like MetaMask (`window.ethereum`).

---

## Clients: The Gateway to Ethereum Actions

A **Client** is the primary interface for performing actions on the blockchain in Viem.

It is instantiated with a specific **Transport** and gives access to a curated set of **Actions** (i.e., operations on Ethereum).

This concept is similar to the **Provider** in Ethers.js, but Viem uses the term "Client" to eliminate ambiguity.

### Client Design Goals

The distinction between different types of Clients promotes:
- Security
- Separation of concerns
- Maintainability
- Clarity in application design

---

### Public Client

A **Public Client** is for **read-only** operations. These do **not require a private key** or any signing.

Examples of **Public Actions**:
- `getBlockNumber()` — Get the latest block number.
- `getBalance({ address })` — Get the ETH balance of an account.
- `readContract()` — Call a smart contract function (read-only).

### Creating a Public Client

Use the `createPublicClient` function:

```ts
import { createPublicClient, http } from 'viem';

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});
```



---


```javascript
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

// Create a Public Client connected to the Ethereum mainnet via a public RPC.
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// Use the client to perform a read-only action.
const blockNumber = await publicClient.getBlockNumber();
console.log(`Current block number: ${blockNumber}`);
```

# Wallet Client

A **Wallet Client** in Viem is responsible for performing **state-changing operations** on the Ethereum blockchain—commonly referred to as **"Wallet Actions"**. These actions require **cryptographic signing** by a private key associated with a user’s Ethereum account.

---

## What Are Wallet Actions?

Wallet Actions are any interactions with the blockchain that:

- **Modify state**
- **Consume gas**
- **Require signature authorization**

### Common Wallet Actions include:

- `sendTransaction` — Send ETH from one address to another.
- `deployContract` — Deploy a new smart contract to the blockchain.
- `writeContract` — Call a contract's function that modifies state (e.g., token transfer).

These operations involve signing and broadcasting a transaction to the network.

---

## Creating a Wallet Client

A **Wallet Client** is instantiated using the `createWalletClient` function.

This client acts as the main interface to an Ethereum **Account** (i.e., a wallet or private key) and allows for secure execution of stateful transactions.

### Example: Creating a Wallet Client with Viem

```ts
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

// Define the account using your private key
const account = privateKeyToAccount('0xYOUR_PRIVATE_KEY');

// Create the Wallet Client
const walletClient = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
});
```

#### Important: Never expose your private key in client-side (browser) code. Use environment variables and secure key management for backend or server-side interactions.

```javascript
import { createWalletClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

// Create an account from a private key.
const account = privateKeyToAccount('0x...');

// Create a Wallet Client and "hoist" the account into it.
const walletClient = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
});
```

# Test Client and Accounts in Viem

## Test Client

Viem includes a **Test Client** designed specifically for use in **local development environments**, such as **Anvil**, **Hardhat**, or **Ganache**.

The Test Client provides a set of specialized **Test Actions** that allow developers to manipulate the state of the local Ethereum network for debugging and testing purposes.

### Features of Test Client

- **`impersonateAccount`** — Temporarily control any address for testing purposes.
- **`mine`** — Manually mine a new block to simulate passage of time or transaction confirmation.
- **`setBalance`**, **`setCode`**, etc. — Modify on-chain state directly.

These actions are only available in **test environments** and are essential for advanced integration testing workflows.

---

## Principle of Least Privilege

Viem promotes secure application architecture through **explicit client separation**:

- Use **`PublicClient`** for most frontend tasks like reading data (no signing).
- Use **`WalletClient`** only where the user must **sign transactions**.
- Use **`TestClient`** exclusively for local testing.

This design helps enforce the **principle of least privilege**, meaning:
- Only the minimum required permissions are granted to each part of the application.
- Sensitive capabilities (like sending funds) are kept isolated and secure.

---

## Accounts: The Evolution of the 'Signer'

Viem makes a deliberate terminological change:
- What Ethers.js calls a **Signer**, Viem calls an **Account**.

### Why the Change?

- **"Account"** better represents an **identity with funds and signing capabilities**.
- **"Signer"** describes an action, not an entity.
- This renaming leads to **clearer code semantics** and easier understanding for developers.

---

## Types of Accounts in Viem

Viem supports two main categories of **accounts**:

### 1. JSON-RPC Accounts

These are externally managed accounts—typically within browser wallets like **MetaMask**—that sign transactions **via RPC**.

- Private key stays **in the wallet**.
- Signing operations are delegated using **EIP-1193** provider interfaces.

### Creating a WalletClient for a JSON-RPC Account

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

// Connect to MetaMask or another injected wallet
const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
```

This setup is used for dApps interacting with a user's wallet in the browser.

```javascript
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

// This assumes the code is running in a browser with MetaMask or another EIP-1193 wallet injected.
const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!),
});

// Request access to the user's accounts.
const [address] = await walletClient.requestAddresses();

// The `address` can now be passed to wallet actions.
```

---

# Local Accounts in Viem

## Overview

**Local Accounts** are Ethereum accounts where the private key is managed directly by the application's environment, not by an external wallet or injected provider.

This approach is commonly used in:

- Backend services
- Scripts
- Testing and automation environments

In Viem, local accounts are created using utilities provided by the `viem/accounts` module.

---

## Use Cases for Local Accounts

- Server-side applications that need to sign and send transactions programmatically.
- Automated deployment or migration scripts.
- Testing environments where complete control over the account is required.

---

## Creating Local Accounts

Viem offers several utilities for generating local accounts:

- `privateKeyToAccount(privateKey)`
- `mnemonicToAccount(mnemonic)`
- `hdKeyToAccount(hdKey, path)`

These functions return an account object that can be passed directly to a `WalletClient`.

---

## Example: Using `privateKeyToAccount`

Below is a step-by-step guide to creating and using a local account with Viem:

### 1. Import Required Modules

```ts
import { createWalletClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
```


### 2. Create a Local Account
Use your private key (be sure to keep this secure and never commit it to version control):

``` ts

const account = privateKeyToAccount('0xYOUR_PRIVATE_KEY_HERE');
```

### 3. Instantiate a WalletClient with the Local Account
```ts
const walletClient = createWalletClient({
  account,                             // Local account object
  chain: mainnet,                      // Target chain (e.g., mainnet, goerli, etc.)
  transport: http("YOUR_RPC_ENDPOINT_URL"), // RPC provider (e.g., from Infura, Alchemy)
});
```



```javascript
import { createWalletClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

// 1. Create a local account object from a raw private key.
const account = privateKeyToAccount('0x...');

// 2. Create a Wallet Client and provide the local account directly.
const walletClient = createWalletClient({
  account,
  chain: mainnet,
  transport: http("YOUR_RPC_ENDPOINT_URL"),
});

// This client can now sign and send transactions on behalf of the provided account
```

✅ This walletClient can now sign and send transactions directly on behalf of the account.

#### Benefits of Local Accounts
Full Control: No reliance on external wallets.

Automation-Friendly: Ideal for CI/CD pipelines or cron jobs.

Security: Keys can be stored securely on the server and never exposed to the frontend.

#### Caution
Always treat private keys with extreme care.

Never hardcode private keys into your source code or commit them to Git.

Use environment variables and secret management tools like .env, Vault, or cloud secret managers.

#### Summary
Local accounts are essential for programmatic blockchain interaction.

Use privateKeyToAccount to convert a private key into a Viem-compatible account.

Combine the local account with createWalletClient() to sign and broadcast transactions.

Ideal for secure, backend-based dApps and testing workflows.

---

# Reading Contract State: The `readContract` Action

## Introduction

Querying data from a smart contract is one of the most fundamental operations in any dApp. Viem provides the `readContract` action for this purpose, with a design focused on:

- Simplicity
- Efficiency
- Unparalleled type safety

---

## Anatomy of a Read Call

The `readContract` action is used to call functions on a Solidity smart contract that are marked as `view` or `pure`. These functions:

- **Do not modify state**
- **Require no gas**
- **Can be executed via a `PublicClient`**

### Required Parameters

1. **address** – The address of the target contract
2. **abi** – The contract’s ABI
3. **functionName** – The view or pure function to call

### Basic Example: Read the Token Name of DAI (ERC-20)

```ts
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { erc20Abi } from './abi'; // Assume ABI file

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const tokenName = await publicClient.readContract({
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI Token
  abi: erc20Abi,
  functionName: 'name',
});

console.log(`Token name: ${tokenName}`); // Output: Token name: Dai Stablecoin
```


## Achieving Full Type Safety with as const
Viem leverages TypeScript to provide compile-time type inference from a contract’s ABI.

For this to work, the ABI should be declared with a const assertion (as const), for example:

```ts

// storageAbi.ts
export const storageAbi = [
  {
    "inputs": [],
    "name": "retrieve",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "x", "type": "uint256" }],
    "name": "store",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
```

With as const, your editor will now auto-complete and validate functionName, inputs, and return types.

## Passing Arguments and Handling Return Values
For functions with arguments, use the args field (an array). Type safety will enforce correct arguments when ABI is properly typed.

### Example: Query the Balance of an Address
```ts
import { createPublicClient, http, formatUnits } from 'viem';
import { mainnet } from 'viem/chains';
import { erc20Abi } from './abi';

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const userAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'; // vitalik.eth

const balance = await publicClient.readContract({
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  abi: erc20Abi,
  functionName: 'balanceOf',
  args: [userAddress],
});

console.log(`Balance of ${userAddress}: ${formatUnits(balance, 18)} DAI`);
```
 Return type is inferred as BigInt, compatible with Viem’s utilities like formatUnits.

## Advanced Read Options
### Historical State Reads
You can query past states by including:

- blockNumber

- or blockTag (e.g., 'safe', 'finalized', 'earliest', 'pending')

### Example:
```ts
const historicBalance = await publicClient.readContract({
  address: '0x...',
  abi: contractAbi,
  functionName: 'balanceOf',
  args: ['0x...'],
  blockTag: 'safe',
});
```

### Batched Reads (Multicall Optimization)
Viem can automatically batch multiple readContract calls into a single multicall RPC request. This:

- Reduces network overhead

- Improves efficiency on paid RPC providers

- Speeds up app performance

Enable this behavior via the batch option when configuring the client.

## Summary
- Use readContract with a PublicClient for safe, gas-free calls.

- Leverage as const in ABIs for full type safety and autocompletion.

- Use args for parameterized functions and enjoy automatic return type inference.

- Optimize performance with batching and historical queries.

This combination of safety, simplicity, and speed makes readContract a powerful tool for any Viem-based dApp.


---


# Modifying Contract State: The `simulateContract` and `writeContract` Workflow

## Introduction

Executing a state-changing transaction is one of the most critical and sensitive operations in any decentralized application (dApp). Viem promotes a **modern, safety-first** workflow that improves upon traditional patterns found in older libraries.

This workflow follows three key steps:

1. `simulateContract`
2. `writeContract`
3. `wait` for confirmation

---

## Why Simulate First?

The core function for executing a transaction is `writeContract`. This action:

- **Modifies the blockchain state**
- **Requires gas**
- **Must be called via a `WalletClient`**

However, **Viem strongly recommends** never calling `writeContract` directly. Instead, always **simulate the transaction first** to:

- Validate inputs and check for possible reverts
- Estimate gas usage
- Avoid unnecessary transaction failures
- Improve UX with better feedback

---

## Step 1: `simulateContract`

This preflight check is performed using `publicClient.simulateContract`.

### Parameters

`simulateContract` requires:

- `address`: Contract address
- `abi`: Contract ABI
- `functionName`: Name of the state-changing function
- `args`: Arguments to pass to the function
- `account`: The address that will sign the transaction

### Return Values

If successful, `simulateContract` returns:

- **`result`** – The return value of the function (if any)
- **`request`** – A fully-prepared transaction request object

### Example

```ts
import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import { storageAbi } from './abi'; // Must be defined with `as const`
import { privateKeyToAccount } from 'viem/accounts';

const account = privateKeyToAccount('0xYOUR_PRIVATE_KEY');

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

try {
  const { result, request } = await publicClient.simulateContract({
    address: '0xYourContractAddress',
    abi: storageAbi,
    functionName: 'store',
    args: [123n],
    account,
  });

  console.log('Simulation result:', result);
  console.log('Prepared transaction:', request);
} catch (err) {
  if (err.name === 'ContractFunctionRevertedError') {
    console.error('Transaction would revert:', err.shortMessage);
  } else {
    console.error('Simulation failed:', err);
  }
}
```

#### Notes
- Wrap the call in a try...catch block.

- Use the error name ContractFunctionRevertedError to detect specific simulation issues.

- The request object is used in the next step.

---


# Modifying Contract State: The `simulateContract` and `writeContract` Workflow

## Overview

Executing a **state-changing transaction** is one of the most critical and sensitive operations in any dApp. To ensure reliability and safety, **Viem** encourages a modern workflow that avoids common pitfalls seen in older libraries like Ethers.js.

Viem promotes a **three-step workflow** for writing to smart contracts:

1. **simulate**
2. **write**
3. **wait**

---

## The Critical Role of Simulation

The core function for executing state-changing contract calls is `writeContract`. This function:

- Modifies blockchain state
- Consumes gas
- Requires a valid signer via a `WalletClient`

However, **Viem strongly recommends** against calling `writeContract` directly. Instead, the transaction should first be **simulated** using `simulateContract`.

### Why Simulate?

- ✅ Predict transaction outcomes
- ✅ Detect reverts before sending
- ✅ Estimate gas usage
- ✅ Prevent wasted gas fees
- ✅ Improve transparency and UX

The `simulateContract` function performs a **dry run** of the transaction against the latest blockchain state **without actually broadcasting it**.

---

## Step 1: `simulateContract`

The first step is to simulate the contract interaction using `publicClient.simulateContract`.

### Required Parameters

- `account`: The signer account to simulate as
- `address`: The target contract's address
- `abi`: Contract ABI (must be `as const` typed)
- `functionName`: Name of the state-changing function
- `args`: Any arguments required by the function

### Return Values

If successful, `simulateContract` returns:

- `result`: The return value of the function (if applicable)
- `request`: A ready-to-send transaction object with calldata, gas estimates, etc.

---

## Example: Simulating a Write Call

```ts
import { publicClient } from './client';
import { storageAbi } from './abi';
import { account } from './config'; // Local or JSON-RPC account object

let request;
try {
  const simulation = await publicClient.simulateContract({
    account,
    address: '0xYourContractAddress',
    abi: storageAbi,
    functionName: 'store',
    args: [420n],
  });

  request = simulation.request;
  console.log('Simulation successful. Prepared request:', request);

  // Next: Send the transaction using walletClient.writeContract(request)

} catch (error) {
  console.error('Simulation failed:', error);

  // Handle gracefully – e.g., notify the user that the transaction would fail
  return;
}
```

You must always wrap simulateContract in a try...catch block to handle errors safely.

### Error Handling
Viem provides structured error types such as:

- ContractFunctionRevertedError

- CallExecutionError

These errors provide detailed information, including revert reasons, making it easier to present user-friendly error messages or logs.

#### Summary
- Always simulate before sending a transaction

- Prevent reverts and wasted gas

- Get a complete request object ready for signing

- Use walletClient.writeContract(request) only after successful simulation

Simulation is not just a best practice — it’s a safer, more predictable way to build production-grade dApps with Viem.

---



## Step 2: `writeContract`

Once a transaction has been successfully **simulated** using `simulateContract` and a **`request` object** has been obtained, the next step is to **execute** the transaction.

---

### Executing the Transaction

To perform the write, the `request` object returned from the simulation is passed directly into the `walletClient.writeContract` action.

#### Syntax

```ts
const hash = await walletClient.writeContract(request);
```
#### Behavior
Prompts the user to sign the transaction if using a JSON-RPC Account (e.g., MetaMask).

Signs locally if using a Local Account.

Broadcasts the signed transaction to the network.

#### Return Value
The only return value from writeContract is the transaction hash:

```ts
console.log('Transaction submitted. Hash:', hash);
```
writeContract returns immediately after the transaction is sent. It does not wait for it to be mined.



```javascript
import { walletClient } from './client';

// Assuming 'request' was obtained from a successful simulation.
const hash = await walletClient.writeContract(request);
console.log('Transaction sent. Hash:', hash);
// At this point, the UI can be updated to show a "Transaction Pending" state.
```

## Step 3: `waitForTransactionReceipt`

After submitting a transaction using `writeContract`, the final step in the workflow is to **wait for the transaction to be mined and confirmed** on the blockchain.

---

### Waiting for Confirmation

To do this, pass the transaction hash returned by `writeContract` to the `publicClient.waitForTransactionReceipt` action.

#### Syntax

```ts
const receipt = await publicClient.waitForTransactionReceipt({ hash });
```

#### This function:

- Polls the network.

- Resolves once the transaction is included in a block.

- Returns a detailed TransactionReceipt object.

#### Example Usage

```ts
const receipt = await publicClient.waitForTransactionReceipt({ hash });

console.log('Transaction confirmed in block:', receipt.blockNumber);
console.log('Status:', receipt.status); // 'success' or 'reverted'
console.log('Gas used:', receipt.gasUsed);

```


#### Receipt Object
- The returned TransactionReceipt contains:

- status: Indicates 'success' or 'reverted'.

- blockNumber: The block in which the transaction was included.

- gasUsed: Amount of gas consumed.

- logs: Any events emitted.

- transactionHash, from, to, etc.

### advanced Options
#### confirmations
```ts
await publicClient.waitForTransactionReceipt({
  hash,
  confirmations: 3, // Wait for 3 blocks after inclusion
});

```
Useful for applications that need higher finality guarantees, especially on chains prone to reorgs.

#### onReplaced

```ts
await publicClient.waitForTransactionReceipt({
  hash,
  onReplaced: (replacement) => {
    console.warn('Transaction was replaced:', replacement);
  },
});

```

This callback handles edge cases where:

- A user "speeds up" a pending transaction.

- A user "cancels" it via their wallet.

It provides details about the replacement transaction, helping your app react appropriately.


## Final Notes
-  This step completes the transaction lifecycle: simulate → write → wait.
-  Use the receipt to trigger UI updates, backend events, analytics, or notifications.
- Always inspect receipt.status to confirm success before assuming the transaction was effective.


### With these three steps — simulateContract, writeContract, and waitForTransactionReceipt — Viem provides a safe, reliable, and modern approach to writing Ethereum dApps.


## Complete End-to-End Example
The following code block provides a complete, commented example of the entire simulate -> write -> wait cycle, cementing this robust pattern.

```javascript
import {
  createPublicClient,
  createWalletClient,
  http,
  parseGwei,
} from 'viem';
import { mainnet } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { storageAbi } from './abi'; // Assuming a simple Storage contract ABI

async function main() {
  // 1. Setup Clients and Account
  const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
  
  const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(process.env.QUICKNODE_ENDPOINT),
  });

  const walletClient = createWalletClient({
    account,
    chain: mainnet,
    transport: http(process.env.QUICKNODE_ENDPOINT),
  });

  const contractAddress = '0xYourDeployedContractAddress';

  // 2. Step 1: Simulate the transaction
  console.log('Simulating transaction...');
  let request;
  try {
    const { request: simRequest } = await publicClient.simulateContract({
      account,
      address: contractAddress,
      abi: storageAbi,
      functionName: 'store',
      args:, // Store a random number
    });
    request = simRequest;
    console.log('Simulation successful!');
  } catch (err) {
    console.error('Transaction simulation failed:', err);
    return;
  }

  // 3. Step 2: Write the transaction
  console.log('Sending transaction...');
  const hash = await walletClient.writeContract(request);
  console.log('Transaction hash:', hash);

  // 4. Step 3: Wait for the transaction receipt
  console.log('Waiting for transaction receipt...');
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log('Transaction confirmed!');
  console.log('Status:', receipt.status);
  console.log('Block Number:', receipt.blockNumber.toString());
}

main().catch(console.error);

```


 This three-step process is a deliberate architectural pattern that decouples transaction validation, submission, and confirmation.

This separation leads to applications that are significantly safer by preventing failed transactions, more responsive by providing immediate UI feedback, and more robustly designed.

# Engaging with Contract Events

Smart contract events are a crucial mechanism for communicating information from the blockchain to off-chain applications.

Viem provides a powerful and flexible API for both listening to live events in real-time and querying historical event logs.

---

## Listening for Live Events: `watchContractEvent`

To subscribe to events as they are emitted by a contract, Viem offers the `publicClient.watchContractEvent` action.

This function sets up a listener that polls the blockchain and invokes a callback function whenever new events are detected.

### Features and Configuration

- **All Events or Specific Events:**  
  You can watch all events emitted by a contract or filter by a specific `eventName`.

- **Filter by Indexed Arguments:**  
  For more granular control, the listener can filter events based on the values of their **indexed arguments** using the `args` parameter.

- **Callback Function:**  
  The callback function is triggered each time a matching event is found.

### Resource Management

A critical feature of this action is its explicit handling of resources:

- `watchContractEvent` returns an **`unwatch` function**.
- You **must call `unwatch()`** when the listener is no longer needed (e.g., when a user navigates away from a page or component).
- This prevents **memory leaks** and unnecessary blockchain polling.

This explicit resource management reflects Viem’s architectural philosophy of clarity and safety.

---

### Example: Listening for a Transfer Event

```typescript
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { erc20Abi } from './abi';

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const unwatch = publicClient.watchContractEvent({
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI token address
  abi: erc20Abi,
  eventName: 'Transfer',
  args: {
    from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // vitalik.eth
  },
  onLogs: (logs) => {
    console.log('New Transfer event:', logs);
  },
});

// Later, when you want to stop listening:
unwatch();

```
#### In this example:

- We listen for Transfer events emitted by the DAI contract.

- We filter for events where the from address is Vitalik's account.

- When such events occur, the onLogs callback is triggered.

- unwatch() is stored so that we can stop listening when necessary.

By using watchContractEvent, developers can create responsive, event-driven dApps that react to blockchain activity in real-time, while maintaining full control over resource usage.
### Example

The following example demonstrates how to watch for Transfer events from an ERC-20 token contract:
```javascript
import { publicClient } from './client';
import { erc20Abi } from './abi';

console.log('Watching for Transfer events...');

const unwatch = publicClient.watchContractEvent({
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI Stablecoin
  abi: erc20Abi,
  eventName: 'Transfer',
  onLogs: (logs) => {
    console.log('New Transfer event(s) detected:', logs);
    logs.forEach(log => {
      // The 'args' property is fully typed thanks to the ABI
      const { from, to, value } = log.args;
      console.log(`  - From: `${from}, To: $`{to}, Value: ${value}`);
    });
  },
  onError: (error) => {
    console.error('Error watching events:', error);
  }
});

// To stop watching after a certain period (e.g., 60 seconds):
setTimeout(() => {
  unwatch();
  console.log('Stopped watching for events.');
}, 60000);

```

This design is also fault-tolerant. The documentation notes that watchContractEvent will intelligently attempt to use the most efficient underlying RPC method available, eth_newFilter, but will automatically and seamlessly fall back to the more universally supported eth_getLogs method if the connected RPC provider does not support filters.

This provides a high-performance yet stable experience for the developer without requiring complex conditional logic.

# Querying Historical Events

For applications that need to retrieve **past event logs**, Viem provides a **two-step process** that is both powerful and efficient.

---

## Step 1: Create a Filter — `createContractEventFilter`

The first step is to **create a filter object** using the `createContractEventFilter` action.

This function allows for **precise specification** of the desired logs, including:

- **`eventName`** – the specific event to filter for.
- **`args`** – the values of any indexed event parameters.
- **`fromBlock` / `toBlock`** – the range of blocks over which to search.

This structured approach allows fine-grained control over what logs are returned, minimizing unnecessary data retrieval.

---

## Step 2: Retrieve Logs — `getFilterLogs`

After creating a filter, pass it to the `getFilterLogs` action.

This action queries the node and returns an **array of all matching log entries**, each representing an emitted event that satisfies the filter’s criteria.

---

### Example: Querying Past `Transfer` Events

```typescript
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { erc20Abi } from './abi';

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const filter = await publicClient.createContractEventFilter({
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI token
  abi: erc20Abi,
  eventName: 'Transfer',
  args: {
    from: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  },
  fromBlock: 19000000n,
  toBlock: 'latest',
});

const logs = await publicClient.getFilterLogs({ filter });

console.log('Historical logs:', logs);
```

#### Key Advantages
- Efficiency: Only relevant logs are fetched based on precise filters.

- Scalability: The block range parameters (fromBlock, toBlock) allow querying small or large periods of time as needed.

- Indexed Arguments: Filters can be further narrowed using indexed parameters, reducing the volume of returned data and improving performance.

By using createContractEventFilter and getFilterLogs, developers can build features such as transaction history views, analytics dashboards, and audit trails that rely on past blockchain activity — all while maintaining performance and control.

### This example demonstrates how to fetch all Transfer events to a specific address within the last 100 blocks:
```javascript
import { publicClient } from './client';
import { erc20Abi } from './abi';

async function fetchHistoricalTransfers() {
  const toAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'; // vitalik.eth
  const currentBlock = await publicClient.getBlockNumber();

  // 1. Create the event filter
  const filter = await publicClient.createContractEventFilter({
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
    abi: erc20Abi,
    eventName: 'Transfer',
    args: {
      to: toAddress,
    },
    fromBlock: currentBlock - 100n,
    toBlock: currentBlock,
  });

  // 2. Get the logs matching the filter
  const logs = await publicClient.getFilterLogs({ filter });

  console.log(`Found `${logs.length} incoming transfers to $`{toAddress} in the last 100 blocks.`);
  console.log(logs);
}

fetchHistoricalTransfers().catch(console.error);
```

# The `getContract` Instance: An Alternative Interaction Model

While Viem's primary interaction pattern is **functional and stateless** (e.g., `client.readContract(...)`), it also provides an alternative, more **object-oriented model**. This model is particularly helpful for developers transitioning from libraries like Ethers.js. It is made possible using the `getContract` utility.

---

## Creating a Contract Instance

The `getContract` function creates a **contract instance** that bundles together:

- The contract's **address**
- Its **ABI** (Application Binary Interface)
- One or more **client objects** (PublicClient and/or WalletClient)

This setup simplifies code reuse and eliminates the need to repeatedly pass the same parameters.

You can create:

- A **read-only** instance using a `PublicClient`
- A **write-enabled** instance using a `WalletClient`
- Or a **fully featured** instance using both

```ts
import { getContract } from 'viem';
import { publicClient, walletClient } from './client';
import { storageAbi } from './abi';

const contractAddress = '0xYourDeployedContractAddress';

// Create a contract instance with both public and wallet clients
const contract = getContract({
  address: contractAddress,
  abi: storageAbi,
  client: { public: publicClient, wallet: walletClient },
});
```


# Interacting with the Instance

Once the contract instance is created, interacting with it uses a convenient, chainable syntax that leverages Viem's type inference for full autocompletion and safety.

## Reading State

Read operations are accessed through the `read` property.

```ts
const currentValue = await contract.read.retrieve();
console.log(`The current stored value is: ${currentValue}`);
```

## Writing State

Write operations are accessed through the `write` property. This still follows the best practice of simulation, but the syntax is slightly different. The `simulate` method is available on the instance, and the `write` method can then be called.

However, for a full workflow, it's often clearer to use the instance for the `write` call itself, after simulating with the public client.

For simplicity, the direct write call is shown here, which would typically be preceded by a simulation.

```ts
const hash = await contract.write.store([500n]);
console.log('Transaction to store new value sent. Hash:', hash);
```

## Watching Events

Event listeners are accessed through the `watchEvent` property.

```ts
const unwatch = contract.watchEvent.ValueStored({}, {
  onLogs: logs => console.log('ValueStored event detected:', logs)
});
```

This interaction model is also fully integrated with development frameworks like Hardhat via the `hardhat-viem` plugin, which provides helpers like `hre.viem.deployContract` and `hre.viem.getContractAt` that return these typed instances.


---


# Trade-offs: Convenience vs. Bundle Size

The primary trade-off of using the `getContract` instance is bundle size.

While this pattern offers the convenience of not repeating the `address` and `abi` for every call, it is less optimal for tree-shaking.

When a contract instance is created, it pulls in the code for a multitude of contract actions (`readContract`, `writeContract`, `estimateContractGas`, `watchContractEvent`, etc.) all at once.

If an application only uses a small subset of these actions (e.g., only reading from the contract), the final production bundle may be larger than if the functional, tree-shakable actions (`client.readContract`) were used instead.

The existence of the `getContract` instance is a testament to Viem's pragmatic design. Despite its strong philosophical preference for a functional, stateless interaction model, the library provides "escape hatches".

This alternative pattern serves as a familiar bridge for developers migrating from Ethers.js, easing their transition while still offering the core benefits of Viem's type safety.


---


# Viem in Context: A Comparative Analysis with Ethers.js

## Philosophical and Architectural Differences

The core philosophical distinction lies in their primary objectives. Ethers.js has evolved into a comprehensive, mature, and feature-rich toolkit, valued for its stability and extensive community support.

It is a reliable choice for complex dApps that require a wide array of functionalities out of the box.

Viem, in contrast, was born with the explicit goal of solving the "quadrilemma" by optimising for performance, bundle size, stability, and developer experience simultaneously.

This has resulted in a library that is more minimalist, modular, and performance-oriented. Its API design reflects this philosophy: where Ethers.js often uses a more abstracted, object-oriented model (e.g., Provider, Signer, Contract instances), Viem prefers an explicit, functional approach (e.g., PublicClient, WalletClient, and standalone Actions).

## Migration Path

For development teams considering a move from Ethers.js to Viem, the transition involves several key conceptual shifts. The official Viem documentation provides a comprehensive migration guide that maps Ethers.js concepts and methods to their Viem equivalents. The most important changes to internalise are:

- **Provider becomes Client:**  
  The Provider concept is replaced by the more specific PublicClient and WalletClient.

- **Signer becomes Account:**  
  The Signer is replaced by the Account object, which can be a JSON-RPC Account or a Local Account.

- **Instance Methods become Actions:**  
  The primary interaction model shifts from calling methods on a stateful Contract instance to using standalone, functional Actions on a Client.

## Recommendations

The following strategic recommendations can be made for development teams:

### Choose Viem for:
- All new dApp projects, especially those where performance and user experience are paramount.
- Performance-critical web applications.
- Teams that wish to leverage the full power of modern TypeScript for enhanced code quality and safety.
- Projects where minimising the final bundle size is a key consideration.
- Developers looking to deepen their understanding of Ethereum's underlying mechanics due to its pedagogical clarity.

### Consider Ethers.js for:
- Maintaining large, legacy projects with extensive, pre-existing Ethers.js codebases where the significant engineering cost of a full migration cannot be justified.
- Teams with a strong, established preference for its specific object-oriented API design.
- Projects that benefit from the vast and mature ecosystem of tutorials and community support available for Ethers.js.


---

# Introduction

The wagmi stack consists of three critical technologies working in concert:

- **wagmi:** The high-level React Hooks library that provides the intuitive, developer-facing API for managing wallets, interacting with contracts, and handling on-chain data.

- **viem:** The low-level, high-performance TypeScript interface that serves as the powerful engine executing all underlying blockchain operations. It is the modern successor to ethers.js within this ecosystem.

- **TanStack Query:** The sophisticated asynchronous state management library that underpins wagmi's advanced caching, data-fetching, and state synchronisation capabilities, providing a reactive and seamless user experience out of the box.

The relationship between wagmi and viem is particularly noteworthy. The transition from ethers.js to viem was not a simple dependency swap; it was a foundational reconstruction.

# Foundational Concepts: The Modern wagmi & viem Stack

Understanding the distinct roles of each component in the wagmi stack is crucial for leveraging its full potential. The architecture is intentionally layered to provide both high-level convenience and low-level power.

## The Role of wagmi

wagmi serves as the opinionated, developer-facing layer. It is the "React way" of building for the blockchain.

It offers a rich library of over 40 React Hooks that elegantly abstract away the intricate details of wallet connections, account state management, transaction signing, and smart contract interactions.

By using hooks, developers can manage complex on-chain state with the same declarative patterns they are accustomed to in modern React development, drastically reducing boilerplate and improving code readability.

## The viem Engine

Beneath the surface of wagmi lies viem, the high-performance engine that powers all blockchain communication.

Because wagmi is built directly on viem, applications that use wagmi inherit the benefits of viem automatically. This results in faster-loading dApps and a more robust development process, where many potential errors are caught at compile time rather than runtime.

## State Management with TanStack Query

A core feature that sets wagmi apart is its deep integration with TanStack Query for all asynchronous state management. This is not merely an implementation detail; it is a foundational pillar of the framework that provides a suite of powerful features out of the box:

- **Caching:** Smartly caches on-chain data to avoid redundant network requests. For example, a token balance, once fetched, is stored and served from the cache on subsequent requests, making the UI feel instantaneous.

- **Request Deduplication:** If multiple components on a page request the same piece of data simultaneously, wagmi ensures only a single request is sent to the RPC node, improving efficiency and reducing load.

- **Persistence:** Can be configured to persist cache data to local storage, allowing dApps to load instantly for returning users even before a fresh network request completes.

- **Auto-Refetching:** The framework is inherently reactive. It automatically listens for on-chain events and intelligently refetches relevant data when the user switches accounts, changes networks, or when a new block is mined. This eliminates a vast amount of manual state synchronisation logic that developers previously had to write themselves.

# Comparative Analysis of Web3 Front-End Stacks

To contextualise the advantages of this modern stack, the following table compares it against legacy approaches, such as using ethers.js directly or with the web3-react library.

| Feature              | wagmi & viem Stack                                                                                       | ethers.js (with custom React logic) / web3-react                                            |
|----------------------|---------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| Developer Experience | High-level hooks, composable APIs, auto-refreshing data, and integrated state management provide a streamlined workflow. Verbose but explicit APIs enhance understanding. | Lower-level and more manual. Requires developers to implement their own logic for state management, caching, and data fetching, leading to more boilerplate. |
| Type Safety          | Exceptional. Strong, automatic type inference from contract ABIs and EIP-712 data structures. Autocomplete and static validation significantly reduce runtime errors. | Present but less integrated. Requires more manual type definition and lacks the deep, automatic inference of the wagmi and viem stack. |
| Performance & Bundle Size | Highly optimised. viem is minimalist and tree-shakable, leading to tiny front-end bundle sizes. Features fast encoding and parsing algorithms. | ethers.js is more monolithic, resulting in a larger bundle size. Performance is robust for general use but not as optimised for front-end bundle size concerns. |
| State Management     | Built-in via TanStack Query. Sophisticated caching, request deduplication, and persistence are core, out-of-the-box features. | Not included. The developer is responsible for implementing a state management solution from scratch, adding complexity and potential for error. |
| Ecosystem & Stability | A modern, rapidly growing ecosystem with robust UI kits like ConnectKit and RainbowKit. Actively maintained full-time by its creators. | Mature, battle-tested, and stable with a large, established community. ethers.js is framework-agnostic, making it versatile but less tailored for React. |
