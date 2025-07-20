# Ethers.js Introduction

**Ethers.js** is a lightweight and comprehensive JavaScript library for interacting with the Ethereum blockchain. It is widely used for building secure, client-side decentralized applications (dApps). The **v6 release** introduces important architectural changes aimed at enhancing modularity, security, and clarity in application design.

---

## Core Architecture: Separation of Concerns

Ethers.js is built around three primary abstractions:

1. **Provider** – for reading data from the blockchain.
2. **Signer** – for sending transactions and writing data to the blockchain.
3. **Contract** – a higher-level abstraction that wraps around both `Provider` and `Signer` for seamless interaction with smart contracts.

This strict separation helps developers avoid accidental privilege escalation and promotes **secure-by-design** dApp architectures.

---

## The Provider: Read-Only Blockchain Access

### What is a Provider?

The **Provider** in Ethers.js is a read-only connection to an EVM-compatible blockchain. It allows users to **query the blockchain** without exposing private keys or triggering state changes.

It enforces a clear boundary between **read** and **write** operations, reducing the surface area for potential exploits.

### Use Cases

A `Provider` is used for operations such as:

- **Fetching the current block number**  
  ```javascript
  provider.getBlockNumber()
  ```

- **Querying an account's ETH balance**  
  ```javascript
  provider.getBalance(addressOrEnsName)
  ```

- **Calling read-only (view/pure) smart contract functions**

- **Querying past event logs**  
  ```javascript
  provider.getLogs(filter)
  ```

  However, for querying events in a more structured way, the following is preferred:  
  ```javascript
  contract.queryFilter(eventFilter)
  ```

### Philosophy Behind the Design

By requiring developers to use `Provider` for all read operations and `Signer` only for write operations, Ethers.js encourages **least-privilege access** and reduces the likelihood of accidental or malicious state changes.

A best-practice dApp architecture:

- Uses `Provider` as the default interaction interface.
- Only switches to `Signer` when a user **explicitly initiates** a transaction.

---

## Instantiating a Provider in Ethers.js v6

### Browser Environments (e.g., MetaMask)

In v6, Ethers.js introduces the `BrowserProvider` class for interacting with injected browser wallets such as MetaMask.

This replaces the `Web3Provider` from v5 with a more accurate and descriptive name.

#### Example:

```javascript

// v6: Connecting to a browser wallet like MetaMask
import { ethers } from "ethers";

let provider;
if (typeof window.ethereum === "undefined") {
    // Handle the case where no browser wallet is installed.
    // Using a default provider is not recommended for production applications
    // due to rate-limiting and lack of dedicated infrastructure, but it is
    // useful for quick scripts and testing.
    console.log("Browser wallet not installed; using a read-only default provider.");
    provider = ethers.getDefaultProvider("mainnet");
} else {
    // Connect to the injected EIP-1193 provider.
    provider = new ethers.BrowserProvider(window.ethereum);
}
```


---

## Summary

| Component | Purpose                              | Access Level      |
|-----------|--------------------------------------|-------------------|
| Provider  | Reading blockchain state             | Read-only         |
| Signer    | Writing to the blockchain (txs)      | Requires signing  |
| Contract  | Interface for interacting with smart contracts (read/write based on underlying Provider/Signer) | Read or Write depending on setup |

The `Provider` is the **foundation** for interacting securely with the Ethereum blockchain, making it essential to understand and use it properly when building dApps with Ethers.js.

---

# Backend/Node.js Environments in Ethers.js

In backend or Node.js environments, where there is no browser or injected provider (like MetaMask), the appropriate way to connect to the Ethereum network is by using **JsonRpcProvider**.

---

## JsonRpcProvider: Direct Blockchain Access

### What is JsonRpcProvider?

The `JsonRpcProvider` class in Ethers.js allows a backend script or server application to establish a **direct connection** to an Ethereum node using the **JSON-RPC** protocol. This node can be:

- A public RPC provider like **Alchemy**, **Infura**, or **Ankr**.
- A locally hosted development node like **Hardhat**, **Anvil**, or **Geth**.

This makes it ideal for:

- Server-side dApps
- Automated scripts and bots
- Backend testing suites
- Infrastructure services



## Example: Connecting to a Public Ethereum Node

```javascript

import { JsonRpcProvider } from "ethers";

// Using Infura
const provider = new JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");

// Using Alchemy
const provider = new JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY");

```

---

## Summary

| Class              | Environment      | Purpose                                      |
|-------------------|------------------|----------------------------------------------|
| `JsonRpcProvider` | Backend/Node.js  | Connect to Ethereum nodes via JSON-RPC       |
| `BrowserProvider` | Frontend (Web)   | Wraps injected EIP-1193 provider (e.g. MetaMask) |

The `JsonRpcProvider` is the standard tool for any backend system that needs direct, reliable access to Ethereum data and transaction capabilities.

---




# The Signer: Account Abstraction and Write Access

In Ethers.js, a **Signer** is an essential abstraction used to perform **write operations** on the blockchain. While a `Provider` enables **read-only** access, a `Signer` allows you to **sign and send transactions**, interact with contracts that modify state, and authorize messages—all without exposing the underlying private key.



## What Is a Signer?

A **Signer** represents an Ethereum account with the ability to:

- Sign transactions (to change blockchain state)
- Sign messages (for authentication or verification)
- Interact with smart contracts that require state changes

However, it doesn't give your app direct access to the user's **private key**. Instead, it delegates signing to a **secure wallet environment**, like MetaMask or another EIP-1193 compatible wallet.

---

## Why Is It Important?

This separation between your application and the user’s private key is a **security best practice**. Here's how it works in the browser:

- When you call `provider.getSigner()` from a `BrowserProvider`, the browser wallet prompts the user for permission to connect.
- Once connected, the dApp can send signing requests to the wallet.
- The wallet prompts the user to approve each action, ensuring they retain control.

This architecture allows dApps to interact with Ethereum securely **without ever storing or handling private keys directly**.

---

## Key Functions of a Signer

Here are common use cases and the corresponding functions in Ethers.js:

- **Send a transaction**  
  Sends a transaction to the Ethereum network that modifies state (e.g., transferring ETH or calling a smart contract method).  

  ```javascript

  signer.sendTransaction(txObject)

  ```

- **Sign a plain message (EIP-191)**  
  Used for off-chain authentication or proving ownership of an address. 

  ```javascript
  signer.signMessage("Hello, Ethereum!")
  ```


- **Sign typed structured data (EIP-712)**  
  Useful for DeFi applications, DAOs, and wallets that need to sign structured data securely.


```javascript
signer.signTypedData(domain, types, message)
```

- **Interact with smart contracts (write)**  
  Used to execute functions that modify contract state.  


---
# Working with Signers in Ethers.js v6

## Introduction

A `Signer` in Ethers.js is used to sign messages and transactions on behalf of a user. It is almost always obtained from a `Provider` instance. This guide outlines two primary ways to obtain a signer: from a browser wallet using `BrowserProvider`, and from a private key using the `Wallet` class.

---

## From BrowserProvider

Calling `provider.getSigner()` using `BrowserProvider` triggers the browser wallet (e.g., MetaMask) to prompt the user to connect their account. Once connected, the application can request signatures for that account.

```javascript
// v6: Acquiring a Signer from a browser wallet
const provider = new ethers.BrowserProvider(window.ethereum);

// This prompts the user to connect their wallet if not already connected.
const signer = await provider.getSigner();
const address = await signer.getAddress();
console.log("Signer Address:", address);
```

---

## From a Private Key (Wallet)

The `Wallet` class is a concrete implementation of a `Signer` that holds a private key directly in memory. This method is particularly useful in backend scripts, server-side applications, or automated testing scenarios.

>  **Important Security Note:** It is critically insecure to use the `Wallet` class in a frontend application, as doing so would expose the private key in the client-side code.

```javascript
// v6: Creating a Wallet instance (a type of Signer) for backend use
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

// This private key must be kept secret and secure, typically loaded from an environment variable.
// NEVER expose this in a frontend application or commit it to version control.
const privateKey = process.env.SERVER_WALLET_PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);
```




---


## Instantiating a Contract Object

To create a Contract instance, you need three essential pieces of information:

1. **Contract Address**  
 The on-chain address where the smart contract is deployed.

2. **Contract ABI**  
 The JSON-formatted description of the contract's public interface, generated by the Solidity compiler.  
 - Ethers.js also supports a more concise **Human-Readable ABI** format.

3. **Runner (Provider or Signer)**  
 This third argument determines what operations the contract instance can perform:  
 - If a **Provider** is supplied, the contract instance is **read-only** (can only query blockchain data).  
 - If a **Signer** is supplied, the contract instance can execute **state-changing transactions** (send transactions).

---



# Smart Contract Interaction

For Solidity developers, the primary purpose of a client-side library is to call the functions of a deployed smart contract.



## Instantiating a Contract Instance

The standard method for creating a contract instance is the `ethers.Contract` constructor. The capabilities of the instance are dictated by the **runner** (the third argument) provided at instantiation.


## Read-Only Instance

- By passing a **Provider**, you create an instance that can only call **view** and **pure** functions.
- This is the safest default for displaying data.


## Read-Write Contract Instances

### Introduction

When interacting with smart contracts using Ethers.js, you can create two types of contract instances:

- **Read-Only Instance**: Allows calling `view` or `pure` functions that do not change blockchain state.
- **Read-Write Instance**: Allows calling functions that modify state (e.g., `transfer()`), requiring a `Signer`.


### Read-Write Instance

A read-write contract instance is created using a `Signer`. This is required for sending transactions that change contract state.

```js
// Assume `signer` is already obtained from the provider.
const writeableContract = new ethers.Contract(contractAddress, contractAbi, signer);

// Example: Sending a state-changing transaction
await writeableContract.transfer("0xRecipientAddress", ethers.parseUnits("10.0", 18));
```

---

### Best Practice: Use `.connect()` to Create a Temporary Writable Instance

It is recommended to begin with a **read-only** instance for all initial data-fetching, and create a **writeable** instance only when needed.

Use the `.connect()` method to attach a signer without modifying the original contract instance. This helps avoid side effects and ensures predictability.

```js
// Start with a read-only instance
const contract = new ethers.Contract(contractAddress, contractAbi, provider);

// Later, when a user triggers a transaction (e.g., button click)
const signer = await provider.getSigner();

// Create a new instance connected to the signer
const contractWithSigner = contract.connect(signer);

// Use the signer-connected instance to send the transaction
await contractWithSigner.someStateChangingFunction();
```

---

## Executing Read-Only Functions (Constant Calls)

Functions marked as `view` or `pure` in your Solidity contract are exposed as asynchronous methods on the Ethers.js contract instance. Invoking them does **not** cost gas and simply queries the connected node for data.

---

## Direct Invocation

- These methods return a **Promise** that resolves to the function's return value(s).
- Ethers.js automatically handles the **deserialization** and **type conversion** of the return data.

---

### Data Type Conversion Examples

- Solidity `uint256` is returned as a native JavaScript **BigInt**.
- Solidity `string` is returned as a JavaScript **string**.
- Solidity `address` is returned as a **checksummed address string**.


```javascript

// Assuming an ERC-20 contract instance (`readOnlyContract`).

// Solidity: function name() public view returns (string memory);
const tokenName = await readOnlyContract.name();
// `tokenName` resolves to a string, e.g., "MyToken".

// Solidity: function totalSupply() public view returns (uint256);
const totalSupply = await readOnlyContract.totalSupply();
// `totalSupply` resolves to a BigInt.

// Solidity: function balanceOf(address account) public view returns (uint256);
const balance = await readOnlyContract.balanceOf("0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B");
// `balance` resolves to a BigInt.
```

---



# Static Calls on Write Functions

A powerful and often underutilized feature is the ability to **simulate a state-changing transaction** without actually broadcasting it or requiring a signature. This is done using the `.staticCall()` method on the function.

---

## How `.staticCall()` Works

- The node executes the transaction in a **simulated environment**.
- It returns the **result** of the transaction or throws an **error** if the transaction would revert.
- This simulation does **not** change blockchain state and does **not** consume gas.

---

## Advantages of Using `.staticCall()`

- Provides a much more **accurate prediction** of a transaction's outcome than simple client-side checks (e.g., checking a balance before a transfer).
- Accounts for **all `require` statements** and contract logic inside the transaction.
- Can dramatically **improve user experience** by providing immediate, accurate feedback on whether a transaction would succeed or fail.

```javascript

// Solidity: function transfer(address to, uint256 amount) public returns (bool);
try {
    // Simulate the transfer call.
    await writeableContract.transfer.staticCall(recipientAddress, amount);
    console.log("Validation successful: The transfer would likely succeed.");
} catch (error) {
    // The error object often contains the revert reason from the contract.
    console.error("Validation failed: The transfer would likely fail.", error);
}

```

---

# Executing State-Changing Functions (Transactions)

To execute a function that modifies the blockchain state, the contract instance **must be connected to a Signer**. The process is fundamentally asynchronous and involves two distinct steps, which Ethers.js models with two separate return objects.

---

## 1. Invoke the Method and Get a TransactionResponse

- Calling the method on the Signer-connected contract object submits the transaction to the network.
- This call returns a **Promise** that resolves almost immediately with a **TransactionResponse** object.
- The TransactionResponse confirms that the transaction has been successfully broadcast to the mempool.
- It contains details such as the transaction hash (`tx.hash`).
- At this stage, the state change has **not yet been confirmed** on-chain.

---

## 2. Wait for Mining and Get a TransactionReceipt

- To wait for the transaction to be mined and included in a block, call the `.wait()` method on the TransactionResponse object.
- This returns a **Promise** that resolves with a **TransactionReceipt** object once the transaction is confirmed.
- The receipt is the definitive proof of on-chain execution.
- It contains crucial information such as:
  - Block number
  - Gas used
  - Transaction status (`1` for success, `0` for revert)

---

## Important Notes

- Failing to distinguish between these two steps is a common source of bugs and poor user experience in dApps.
- The UI should reflect a **"pending"** state after step one.
- The UI should only update to a **"confirmed"** state after step two completes.

```javascript

import { ethers } from "ethers";
// Assume `contractWithSigner` is a contract instance connected to a Signer.
// Assume `recipientAddress` and `amountInWei` (a BigInt) are defined.

try {
    // 1. Send the transaction and get the response.
    const txResponse = await contractWithSigner.transfer(recipientAddress, amountInWei);
    console.log("Transaction sent. Hash:", txResponse.hash);
    // -- At this point, the UI should show a "Transaction Pending" status. --

    // 2. Wait for the transaction to be mined (e.g., wait for 1 confirmation).
    const txReceipt = await txResponse.wait(1);
    console.log("Transaction confirmed in block:", txReceipt.blockNumber);

    if (txReceipt.status === 1) {
        console.log("Transaction successful!");
        // -- At this point, the UI can be updated to reflect the new state. --
    } else {
        console.log("Transaction reverted on-chain.");
        // -- The UI should show a "Transaction Failed" status. --
    }

} catch (error) {
    // This catch block will typically handle errors during submission,
    // such as the user rejecting the transaction in their wallet.
    console.error("Transaction submission failed:", error);
}

```
---


# Overriding Transaction Parameters

Ethers.js provides fine-grained control over transaction parameters by allowing an **overrides object** to be passed as the last argument to any state-changing function call. This is essential for interacting with **payable functions** or for manually setting **gas parameters**.

---

## Common Overrides

- **value**  
  The amount of Ether to send with the transaction, specified as a **BigInt** in wei.  
  This is used for **payable** functions.

- **gasLimit**  
  The maximum amount of gas the transaction is allowed to consume.

- **maxFeePerGas / maxPriorityFeePerGas**  
  Parameters used for **EIP-1559** transactions to control gas fees.

---


## Example: Sending ETH to a payable function

```javascript
// Solidity: function deposit() public payable {... }

// To send 0.1 ETH with the call, first parse it to wei.
const oneTenthEthInWei = ethers.parseEther("0.1");

const tx = await contractWithSigner.deposit({ value: oneTenthEthInWei });
await tx.wait();
```
---


## Example: Specifying a custom gas limit

```javascript
// Manually setting a gas limit is generally not recommended as Ethers' estimation
// is usually sufficient, but it can be necessary for complex transactions.
const tx = await contractWithSigner.someComplexFunction(arg1, arg2, {
    gasLimit: 3_000_000n // Using BigInt literal for clarity
});
await tx.wait();
```
---

# Deploying Contracts with ContractFactory

The `ContractFactory` class is a specialized tool for deploying new contract instances to the blockchain. It is instantiated using the contract's **ABI** and **bytecode**, and it must be connected to a **Signer** to pay for the deployment transaction.

---

## Deployment Flow

The deployment flow mirrors the standard transaction flow and consists of the following steps:

1. **Instantiate the ContractFactory**  
   Create a new `ContractFactory` using the contract's ABI, bytecode, and a Signer.

2. **Call the `.deploy()` Method**  
   Invoke `.deploy()` on the factory, passing any required constructor arguments.  
   - This sends the deployment transaction.  
   - It returns a **Contract** object pre-configured with the pending deployment information.

3. **Call the `.waitForDeployment()` Method**  
   Call `.waitForDeployment()` on the returned contract object.  
   - This waits for the deployment transaction to be mined.  
   - It resolves when the contract is live on the network.

---

## Example Usage

```javascript
import { ethers } from "ethers";

// Assume `abi`, `bytecode`, and `signer` are already defined.

// 1. Instantiate ContractFactory
const factory = new ethers.ContractFactory(abi, bytecode, signer);

// 2. Deploy the contract with constructor arguments (if any)
const contract = await factory.deploy(arg1, arg2);

// 3. Wait for deployment to be mined
await contract.waitForDeployment();

console.log(`Contract deployed at address: ${contract.target}`);

```

This process provides a seamless experience, giving you a usable Contract object immediately, with methods like getAddress() and waitForDeployment() designed to resolve gracefully once the blockchain state is updated.

---

# Working with Contract Events

For Solidity developers, the `emit` keyword is a cornerstone of contract design, providing a low-cost mechanism for logging data and communicating with off-chain applications. Ethers.js provides a powerful and intuitive API for consuming these events, both in real-time and by querying historical logs.

---

## Listening for Real-Time Events

To subscribe to events as they are emitted by a contract, the primary method is:


```javascript
contract.on(eventName, listenerCallback)
```


---

# Event Payload in Ethers.js v6

The listener callback receives the event's parameters as individual arguments, followed by a final argument which is the rich **Event** object itself.

---

## Contents of the Event Object

This final object contains comprehensive metadata about the event and is the most robust source of information. It includes:

- **event.args**  
  An array-like object containing the event's parameters, accessible both by index and by name (if the ABI is complete).

- **event.log**  
  The raw Log object from the node, including details such as `blockNumber`, `transactionHash`, and more.

- **event.eventName**  
  The name of the event that was triggered.

- **event.removeListener()**  
  A convenience method to unsubscribe this specific listener.



// Solidity: event Transfer(address indexed from, address indexed to, uint256 value);

console.log("Listening for real-time Transfer events...");

contract.on("Transfer", (from, to, value, event) => {
    console.log("--- New Transfer Event Received ---");
    console.log(`From: ${from}`);
    console.log(`To: ${to}`);
    console.log(`Value: ${ethers.formatEther(value)}`); // Using a utility for display

    // Accessing metadata from the final event object
    console.log(`Block Number: ${event.log.blockNumber}`);
    console.log(`Transaction Hash: ${event.log.transactionHash}`);
});


---


# Wildcard Listener

To listen for **all events** emitted by a contract, you can use the wildcard string `*`. 

- In this case, the callback receives **only a single argument**: the **event object**.
- This is necessary because the number and type of arguments differ for each event.


## Example

```javascript
contract.on("*", (event) => {
  console.log(`Event ${event.eventName} emitted with data:`, event.args);
});

```

---


# Real-Time Event Listening Reliability

It is important to note that the reliability of real-time event listening can be **provider-dependent**.

- While it often works seamlessly, some environments—particularly with **browser-injected providers**—may experience **delays or dropped events**.
- For production applications requiring **high-reliability event streams**, establishing a dedicated **WebSocket connection** to a node service is the recommended approach.

---

# Querying Historical Event Logs

To retrieve logs for events that have already occurred, the `contract.queryFilter()` method is the standard and most robust solution in Ethers.js v6. It allows you to efficiently query a range of blocks for specific events.

## Core Method

```javascript
contract.queryFilter(eventFilter, fromBlock, toBlock)
```


---


# Arguments for `contract.queryFilter()`

The `contract.queryFilter()` method in Ethers.js v6 accepts the following arguments:

## 1. `eventFilter`

- A **filter object** that specifies:
  - The **event** to query.
  - Any **indexed parameters** to filter by.
- This filter is typically created using the `contract.filters` object.

**Example:**

```javascript
const filter = contract.filters.Transfer(senderAddress, null);
```

## 2. fromBlock (optional)
The starting block number for the query. Can be:

- A specific block number (e.g., 12345678)

- A tag such as 'earliest'

- Defaults to: 0 (the genesis block)

## 3. toBlock (optional)
The ending block number for the query. Can be:

- A specific block number

- A tag such as 'latest'

- Defaults to: 'latest' (the most recent block)


----
```javascript

// Example: Get all `Transfer` events from the last 1000 blocks.
const currentBlock = await provider.getBlockNumber();
const fromBlock = currentBlock - 1000;

// Create the filter for the "Transfer" event.
const transferFilter = contract.filters.Transfer;

// Query the blockchain for past events.
const pastEvents = await contract.queryFilter(transferFilter, fromBlock, 'latest');

console.log(`Found ${pastEvents.length} Transfer events in the last 1000 blocks.`);

pastEvents.forEach(event => {
    // The event objects returned by queryFilter are similar to those from.on()
    console.log(
        `Block `${event.blockNumber}: From $`{event.args.from} to `${event.args.to} for $`{event.args.value.toString()}`
    );
});

```

---


# Choosing the Right Method for Event Queries

While Ethers.js also provides a lower-level `provider.getLogs()` method, it is **crucial to prefer** `contract.queryFilter()` for most use cases.


## Why Prefer `contract.queryFilter()`?

- `contract.queryFilter()` automatically **scopes the query to the contract’s address**, making it:
  - **Safer**: It avoids unintended matches from unrelated contracts.
  - **More intuitive**: It uses the contract's ABI and event definitions directly.


## Limitations of `provider.getLogs()`

- Operates at the **node level**, not tied to any specific contract.
- If not configured with a specific contract address, it may return **logs from all contracts** on the chain that match the event topic.
- This can lead to:
  - **Over-fetching of data**
  - **Performance issues**
  - **Subtle bugs** when filtering logs manually


## Best Practice

Always use `contract.queryFilter()` unless you have a specific, advanced need for raw log access with `provider.getLogs()`.


---


# Creating and Using Event Filters

The efficiency of querying logs hinges on the use of the `indexed` keyword in your Solidity event declarations.


## Indexed vs. Non-Indexed Parameters

- Only **indexed parameters** can be used for **filtering at the node level**.
- This distinction has significant **performance implications**.

### Indexed Parameters:
- Are included in the log's **topics array**.
- Can be **used directly for filtering** on the node side.

### Non-Indexed Parameters:
- Are stored in the log’s **data payload**.
- Must be **filtered client-side** after fetching logs, which may involve large data sets.

---

## Using `contract.filters` in Ethers.js

Ethers.js provides the `contract.filters` object as a convenient way to construct topic filters for use with `queryFilter()`.

- These filters match the structure and logic of the `indexed` parameters in Solidity events.
- They generate the appropriate **topic filters** required to efficiently query logs.

---

## Filter Creation Example

Assume the Solidity event is defined as:

```solidity
contract.filters.EventName(arg1, arg2,...)
```

---

# Filtering Logic

When creating event filters in Ethers.js using `contract.filters`, you can apply different filtering strategies based on how you pass values for **indexed** arguments.


## 1. Exact Match

- To filter for an **exact match** on an indexed argument, pass the value directly.

```javascript
contract.filters.Transfer("0xSenderAddress", null);
```

This filter will match only events where the from address is exactly "0xSenderAddress".

---

## 2. Wildcard Match
To accept any value for an indexed argument (i.e., use a wildcard), pass null.

```javascript
contract.filters.Transfer(null, "0xRecipientAddress");
```
This filter will match any event where the to address is "0xRecipientAddress", regardless of the sender.

### 3. Multiple Values (OR Condition)
To filter for any of several values (logical OR), pass an array of those values.

```javascript
contract.filters.Transfer(["0xAddr1", "0xAddr2"], null);
```
This filter will match events where the from address is either "0xAddr1" or "0xAddr2".

---
```javascript

// Solidity: event Transfer(address indexed from, address indexed to, uint256 value);
const myAddress = "0x...";
const aliceAddress = "0x...";
const bobAddress = "0x...";

// 1. Filter for all transfers *from* myAddress to anyone.
// The second argument (`to`) is a wildcard. The third (`value`) is not indexed and cannot be filtered here.
const sentFilter = contract.filters.Transfer(myAddress, null);
const sentEvents = await contract.queryFilter(sentFilter, -10000); // last 10,000 blocks

// 2. Filter for all transfers *to* myAddress from anyone.
const receivedFilter = contract.filters.Transfer(null, myAddress);
const receivedEvents = await contract.queryFilter(receivedFilter, -10000);

// 3. Filter for transfers from either Alice OR Bob.
const fromAliceOrBobFilter = contract.filters.Transfer([aliceAddress, bobAddress]);
const complexEvents = await contract.queryFilter(fromAliceOrBobFilter, -10000);
```

---

# Parsing Event Arguments and Logs

A significant **breaking change** was introduced in **Ethers.js v6** regarding how events are accessed from a transaction receipt.


## Change from v5 to v6

- **Ethers.js v5**:  
  The `TransactionReceipt` object contained a convenient `receipt.events` array with **pre-parsed** event objects.

- **Ethers.js v6**:  
  This array has been **removed**. Instead, the `TransactionReceipt` object now contains a **raw `logs` array**.


## How to Parse Logs in v6

To get structured event data in Ethers.js v6:

1. **Access the `logs` array** from the `TransactionReceipt` object.
2. **Iterate through each log**.
3. Use the contract’s `interface` to **parse** each log manually.

---

## Example

```javascript
const receipt = await tx.wait();
for (const log of receipt.logs) {
  try {
    const parsed = contract.interface.parseLog(log);
    console.log(`Event: ${parsed.name}`, parsed.args);
  } catch (err) {
    // Log could not be parsed by this contract (e.g., from another contract)
    continue;
  }
}
```

## Why This Approach?
It is more verbose, but also more:

- Explicit: You control exactly how logs are parsed.

- Robust: You can safely ignore logs not related to your contract.

- Accurate: Prevents false positives from unrelated contract events (e.g., ERC-20 token transfers triggered within your contract's function).


---

# Essential Utilities in Ethers.js v6

Ethers.js includes a rich set of utility functions that are indispensable for building decentralized applications (dApps). These utilities handle common tasks such as numerical conversions, data formatting, and cryptographic hashing.

A major change introduced in **Ethers.js v6** is the refactoring of these utilities for a **flatter and more accessible API**.

---

## API Refactoring in v6

- The `ethers.utils` namespace has been **removed**.
- Utility functions are now accessed **directly from the root `ethers` object**.

This change simplifies the developer experience and improves code readability.

---

# Numerical Operations with BigInt

One of the most fundamental changes in v6 is the complete replacement of the custom `BigNumber` class with JavaScript's **native `BigInt`** type.

---

## Why BigInt?

- JavaScript `Number` is a **floating-point type**.
- It is only safe for integers up to `Number.MAX_SAFE_INTEGER` (2⁵³ − 1).
- This limit is **easily exceeded** by `uint256` values common in Solidity.
- `BigInt` provides support for **integers of arbitrary precision**, making it ideal for Ethereum development.

---

## Benefits of BigInt

- Enables the use of **natural arithmetic operators**:
  - Instead of `.add()`, `.sub()`, etc., you can now use `+`, `-`, `*`, `/`.
- **Simplifies and clarifies** numerical code.
- **Reduces bugs** caused by complex method chaining.

---

## Important Consideration

BigInts **cannot be mixed** with regular JavaScript Numbers in arithmetic operations.

### Example:

```javascript
const a = 1000n;           // BigInt
const b = 42;              // Number

const result = a + b;      // ❌ TypeError: Cannot mix BigInt and other types
```

You must ensure type consistency when performing arithmetic.

---

### Summary
Use BigInt for all Solidity-style integers (uint256, int128, etc.).

Prefer utility functions from the root ethers object.

Avoid mixing BigInt and Number types.

## Creating BigInts
```javascript
*   From a string: `const val = BigInt("1000000000000000000");`
*   Using the literal `n` suffix: `const val = 1000000000000000000n;`.
```

## BigInt Operations
```javascript
const price = 1500n;
const quantity = 3n;

const totalCost = price * quantity; // 4500n
const newPrice = price + 50n;      // 1550n
const isEqual = (price === 1500n);  // true

// This will throw a TypeError: Cannot mix BigInt and other types
// const invalidSum = price + 100;

// Correct way to perform the operation
const validSum = price + BigInt(100); // 1600n

```



# Ether and Token Unit Conversion (parseUnits, formatUnits)

In Ethereum development, values must be represented in their **smallest indivisible units** (like wei for Ether). However, user interfaces typically display **human-readable decimal strings**.

Ethers.js provides essential utility functions to bridge this gap between **user-friendly formats** and **EVM-compatible integers**.

---

## parseUnits

```javascript
ethers.parseUnits(valueString, decimals)
```

Converts a human-readable string (e.g., "1.5") into its smallest unit as a BigInt.

Useful when preparing a transaction amount for the blockchain.

Commonly used with ERC-20 tokens that have variable decimal places.

### Example:
```javascript

ethers.parseUnits("1.5", 6); // 1500000n
```

## parseEther
```javascript
ethers.parseEther(valueString)
```

A shorthand for ethers.parseUnits(valueString, 18).

Specifically used for Ether conversions to wei.

### Example:
```javascript
ethers.parseEther("1.0"); // 1000000000000000000n
```

## formatUnits
```javascript
ethers.formatUnits(valueBigInt, decimals)
```
Converts a BigInt in base units (like wei) into a human-readable decimal string.

Used for displaying token balances or transaction values in the UI.

### Example:
```javascript
ethers.formatUnits(1500000n, 6); // "1.5"
```

## formatEther
```javascript
ethers.formatEther(valueBigInt)
```

A shorthand for ethers.formatUnits(valueBigInt, 18).

Specifically used for converting wei to Ether.

### Example:
```javascript
ethers.formatEther(1000000000000000000n); // "1.0"
```

---


## Summary
Use parseUnits and parseEther to convert user input into BigInt for transactions.

Use formatUnits and formatEther to convert BigInt values into user-readable strings for display.

These utilities ensure accurate and safe conversions across all token and Ether operations.


---

```javascript
import { ethers } from "ethers";

// --- Parsing: Converting from user-friendly string to BigInt ---

// Parsing 1.5 ETH to its wei equivalent (18 decimals)
const ethInWei = ethers.parseEther("1.5");
// Result: 1500000000000000000n

// Parsing 250 USDC to its base unit (assuming 6 decimals)
const usdcInBaseUnits = ethers.parseUnits("250", 6);
// Result: 250000000n

// Parsing 50 Gwei (a named unit with 9 decimals)
const gweiInWei = ethers.parseUnits("50", "gwei");
// Result: 50000000000n

// --- Formatting: Converting from BigInt to user-friendly string ---

const balanceInWei = 3250000000000000000n;

// Formatting wei to an ETH string for display
const balanceInEth = ethers.formatEther(balanceInWei);
// Result: "3.25"

// Formatting a 6-decimal token's base unit value for display
const usdcBalance = 500123456n;
const usdcBalanceString = ethers.formatUnits(usdcBalance, 6);
// Result: "500.123456"
```


---

# Common Unit Names and Decimal Places

In Ethereum, Ether and token values are represented in terms of their smallest indivisible units (such as wei). The following table provides a quick reference for standard named units and their corresponding number of decimal places.

---

## Table 1: Common Unit Names and Decimals

| Unit Name | Decimals |
|-----------|----------|
| wei       | 0        |
| kwei      | 3        |
| mwei      | 6        |
| gwei      | 9        |
| szabo     | 12       |
| finney    | 15       |
| ether     | 18       |

---

### Notes

- **wei** is the smallest possible unit in Ethereum.
- **gwei** is commonly used for gas prices.
- **ether** is the standard unit used in most user interfaces.

---


# Cryptographic Hashing for On-Chain Verification (solidityPackedKeccak256)

A common requirement for decentralized applications (dApps) is to replicate a hash calculation that a smart contract performs on-chain. This is often necessary for:

- Verifying a user's signature (e.g., EIP-712)
- Checking Merkle proofs
- Other on-chain data verification tasks

---

## `ethers.solidityPackedKeccak256`

This function is designed to **precisely mimic** Solidity's `keccak256(abi.encodePacked(...))` function.

---

### Function Signature (v6)

```javascript
ethers.solidityPackedKeccak256(types, values)
```

## Arguments
### types: An array of strings representing Solidity types, such as "address", "uint256", "bytes32", etc.

### values: An array of JavaScript values corresponding to the types array.

Important Considerations
Achieving a perfect hash match between JavaScript and Solidity requires careful attention to detail:

### Type Alignment: Ensure JavaScript values match Solidity types exactly. For example:

- Use bigint for uint256

- Use checksummed addresses for address

### Encoding: Strings and bytes must be encoded exactly as Solidity expects.

Discrepancies will result in:
- A different hash value

- Failed on-chain verification or signature checks

### Example
```javascript
const hash = ethers.solidityPackedKeccak256(
  ["address", "uint256"],
  [userAddress, 1234n]
);
```

This produces a keccak256 hash identical to Solidity’s:

```solidity
keccak256(abi.encodePacked(userAddress, uint256(1234)));
```
By using ethers.solidityPackedKeccak256 correctly, developers can confidently verify data off-chain and on-chain with matching hashes.

---
```javascript
// On-chain Solidity code for signature verification:
// function verify(bytes32 _hash, bytes calldata _signature) public pure returns (address) {
//     return ECDSA.recover(_hash, _signature);
// }
//
// bytes32 messageHash = keccak256(abi.encodePacked(msg.sender, a_uint256_nonce));

// Off-chain Ethers.js v6 code to generate the same hash for signing:
import { ethers } from "ethers";

const signerAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";
const nonce = 12345n; // A bigint is required for a uint256

const messageHash = ethers.solidityPackedKeccak256(
    ["address", "uint256"],
    [signerAddress, nonce]
);
// `messageHash` will be '0x...' and can now be signed by the user's wallet.
// const signature = await signer.signMessage(ethers.getBytes(messageHash));
```

# Data and Hex String Manipulation

For more complex cryptographic operations, such as constructing data for Merkle trees or custom signature schemes, Ethers.js provides a set of low-level data manipulation utilities. The v6 release renamed several of these for clarity.

## ethers.getBytes(hexString)

- **Description** : Converts a hex string (e.g., `"0x1234"`) into a `Uint8Array`.
- **Replacement** : This replaces the `arrayify` function from v5.

```javascript

import { getBytes } from "ethers";

// Example
const byteArray = getBytes("0x1234");
console.log(byteArray); // Uint8Array(2) [18, 52]

```
## ethers.hexlify(bytes)
- **Description** : Converts a Uint8Array or an array of numbers back into a data hex string.

```javascript
import { hexlify } from "ethers";

// Example
const hexString = hexlify([18, 52]);
console.log(hexString); // "0x1234"
```

## ethers.concat(arrayOfBytesLike)
- **Description** : Joins an array of byte-like objects (hex strings or Uint8Arrays) into a single hex string.

```javascript
import { concat, getBytes } from "ethers";

// Example
const combined = concat([
  getBytes("0x1234"),
  getBytes("0xabcd")
]);
console.log(combined); // Uint8Array(4) [18, 52, 171, 205]


```
## ethers.zeroPadValue(hexString, length)
- **Description** : Left-pads a hex string with zeros to a specific byte length.

- **Use Case** : Useful when formatting values like uint128 into a bytes32 slot.

```javascript
import { zeroPadValue } from "ethers";

// Example
const padded = zeroPadValue("0x1234", 32); // 32 bytes = 64 hex chars
console.log(padded); // "0x0000000000000000000000000000000000000000000000000000000000001234"


```


These functions are the fundamental building blocks for correctly encoding data before it is hashed or sent to a smart contract that expects bytes or bytes32 arguments.


---

# Key Updates and Recent Features (Ethers v6+)

The release of Ethers.js v6 marked a significant evolution of the library, focusing on modern JavaScript features, API clarity, and improved reliability. The project remains actively maintained, consistently incorporating support for the latest Ethereum Improvement Proposals (EIPs) and demonstrating a commitment to long-term viability.

## The Transition from BigNumber to BigInt

The shift from a custom `BigNumber` class to the native JavaScript `BigInt` is the most impactful breaking change in v6.

This change leverages a feature now standard in modern JavaScript environments (ES2020), resulting in improved performance and more intuitive, readable code.

All arithmetic that previously used method calls (e.g., `n1.add(n2)`) must be refactored to use standard operators (e.g., `n1 + n2`), and instantiation now uses the `BigInt()` constructor or the `n` literal suffix.

```javascript
// v5
const n1 = ethers.BigNumber.from("100");
const n2 = ethers.BigNumber.from("50");
const sum = n1.add(n2);

// v6
const n1 = BigInt("100");
const n2 = BigInt("50");
const sum = n1 + n2;
```

## Restructuring of Providers and Utility Functions

Ethers.js v6 flattened its API structure for greater simplicity and discoverability. The `ethers.utils` namespace was eliminated, with all its functions now available directly on the root `ethers` object.

Similarly, Provider classes were moved from the `ethers.providers` namespace to be directly importable from `ethers` or the more granular `ethers/providers` path.

This change necessitates updates to import statements and function calls during migration from v5 but results in a cleaner codebase.

## Migration Quick Reference: Ethers.js v5 to v6

| Feature / Task      | Ethers.js v5 Syntax                                       | Ethers.js v6 Syntax                         |
|---------------------|-----------------------------------------------------------|---------------------------------------------|
| Big Numbers         | `const n = ethers.BigNumber.from("100");`                | `const n = BigInt("100");`                  |
| Big Number Math     | `const sum = n1.add(n2);`                                 | `const sum = n1 + n2;`                       |
| Unit Parsing        | `ethers.utils.parseEther("1.0");`                         | `ethers.parseEther("1.0");`                 |
| Unit Formatting     | `ethers.utils.formatEther(wei);`                          | `ethers.formatEther(wei);`                  |
| Solidity Hashing    | `ethers.utils.solidityKeccak256(t, v);`                   | `ethers.solidityKeccak256(t, v);`           |
| Hex Conversion      | `ethers.utils.arrayify(hex);`                             | `ethers.getBytes(hex);`                     |
| Browser Provider    | `new ethers.providers.Web3Provider(window.ethereum);`     | `new Web3Provider(window.ethereum);`        |
| RPC Provider        | `new ethers.providers.JsonRpcProvider(url);`              | `new JsonRpcProvider(url);`                 |
| Constants           | `ethers.constants.AddressZero;`                           | `ethers.ZeroAddress;`                       |

## Support for Recent EIPs

The health and future-proofing of a blockchain library can be measured by its alignment with the core protocol's evolution.

Ethers.js has demonstrated a consistent commitment to incorporating new EIPs rapidly after they are finalised, ensuring developers have the tools to leverage the latest Ethereum features.

### EIP-4844 (Shard Blob Transactions)

Support was added for broadcasting EIP-4844 "blob" transactions, which is essential for dApps that interact with Layer 2 rollups and benefit from the reduced data availability costs.

### EIP-7702 (Set EOA Account Code)

Support for this new transaction type, which enhances the capabilities of Externally Owned Accounts (EOAs), was added in version 6.14.0.

### EIP-6963 (Multi-Injected Provider Discovery)

Also added in v6.14.0, this EIP improves the user experience in browsers where multiple wallets (e.g., MetaMask, Rabby, Coinbase Wallet) are installed. The `BrowserProvider` can now discover and present all available wallets to the user.

This rapid integration signals that developers can trust Ethers.js to remain current and provide the necessary tools as the Ethereum ecosystem evolves.

## Summary of Recent Changelog Highlights (v6.12 - v6.14)

### Stability and Robustness

Fixes for low-level issues such as:

- Transaction serialization
- JSON-RPC encoding
- Call stack overflows
- Uncaught exceptions

These contribute to a more stable and reliable library suitable for production use.

### Performance Optimisation

Changes such as skipping redundant network requests for transaction receipts demonstrate an ongoing effort to improve the library's efficiency.

### Ecosystem Integration

- The `EtherscanProvider` was updated to use their newer v2 API.
- A `BlockscoutProvider` was introduced, expanding the ecosystem of supported block explorers and services.

---

This pattern of continuous, incremental refinement indicates a project that is well-suited for building and maintaining long-term, production-grade applications on EVM-compatible blockchains.
