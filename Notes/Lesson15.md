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

