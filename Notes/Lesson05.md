# Inheritance in Solidity

In object-oriented programming, **inheritance** is the mechanism of basing an object or class upon another object or class. An object created through inheritance, a _child object_, acquires some or all of the properties and behaviors of the _parent object_.

In Solidity, we use the `is` keyword to indicate that the current contract inherits from a parent contract. For example, in the code below, `Destructible` is the child contract and `Owned` is the parent contract.

## Basic Example

// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract Owned {
    constructor() { owner = msg.sender; }
    address  owner;
}


// Use `is` to derive from another contract. Derived
// contracts can access all non-private members including
// internal functions and state variables. These cannot be
// accessed externally via `this`, though.
contract Child1 is Owned {
    // The keyword `virtual` means that the function can change
    // its behaviour in derived classes ("overriding").
    function doThings()) virtual public {
        .... ;
    }
}



### Key Points

- The `is` keyword is used to inherit from a base contract.
- Child contracts inherit all **non-private** members of the parent.
- Functions marked with `virtual` can be **overridden** in child contracts.
- Functions intended to override a parent’s function must use the `override` keyword.

## ERC20 Inheritance Example

Solidity also supports inheritance from imported contracts, such as the OpenZeppelin ERC20 implementation.


// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;


import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract GLDToken is ERC20 {

    constructor(uint256 initialSupply) ERC20("Gold", "GLD") {
    
        _mint(msg.sender, initialSupply);
    
    }

}



### Explanation

1. The `GLDToken` contract inherits from OpenZeppelin’s `ERC20` contract.
2. The parent constructor `ERC20("Gold", "GLD")` is called within the `GLDToken` constructor.
3. The `_mint` function is used to assign the initial token supply to the contract deployer.

## Additional Resources

- [Solidity Inheritance — Official Documentation](https://docs.soliditylang.org/en/latest/contracts.html#inheritance)
- [OpenZeppelin Contracts GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)

# Require and Errors in Solidity

Solidity provides multiple mechanisms for error handling: `require`, `assert`, `revert`, and `try/catch`. These tools are essential for validating conditions, enforcing invariants, and handling exceptional cases during smart contract execution.

---

## `require`, `assert`, `revert`, and `try/catch`

### `require`

The `require` function is used to:
- Validate conditions that should be true before execution continues.
- Check function inputs, state variables, and return values from external calls.

If the condition fails, it reverts the transaction with either:
- A generic error, or
- An `Error(string)` type message.

**Use Case:** Ensuring valid input or external conditions at runtime.

**Example:**

require(_amount > 0, "Amount must be > 0");



---



// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // Alternative way to do it:
        require(
            amount <= msg.value / 2 ether,
            "Not enough Ether provided."
        );
        // Perform the purchase.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}



---

### `assert`

The `assert` function is intended for:
- Detecting internal errors.
- Checking for invariants—conditions that should always hold true.

If the condition fails, it throws a `Panic(uint256)` error. A well-functioning contract should never trigger an `assert` failure under normal or user-induced scenarios.

**Use Case:** Debugging, internal checks, invariants.

**Example:**

assert(a > b);

---

### `revert`

The `revert` statement stops execution and undoes all state changes made during the transaction. It is similar to `require` but offers more control.

It can be used:
- With a custom error message string
- With custom error types

Often, `require` is preferred for simplicity. However, `revert` is more expressive and is essential when using custom errors.

**Example:**

```plaintext
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();

    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");

        // Equivalent using require
        require(
            amount <= msg.value / 2 ether,
            "Not enough Ether provided."
        );

        // Execute purchase
    }

    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

---

### `try/catch`

The `try/catch` block enables safe calls to external contracts and handles any errors that may arise. It can catch three types of errors:
- `Error(string)` — caused by `revert` with a reason string
- `Panic(uint)` — triggered by `assert` or internal compiler checks
- Fallback errors — any error caught by default using `bytes`

**Example:**

```plaintext
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.1;

interface DataFeed {
    function getData(address token) external returns (uint value);
}

contract FeedConsumer {
    DataFeed feed;
    uint errorCount;

    function rate(address token) public returns (uint value, bool success) {
        require(errorCount < 10);

        try feed.getData(token) returns (uint v) {
            return (v, true);
        } catch Error(string memory) {
            errorCount++;
            return (0, false);
        } catch Panic(uint) {
            errorCount++;
            return (0, false);
        } catch (bytes memory) {
            errorCount++;
            return (0, false);
        }
    }
}
```

---

## Summary Table

| Mechanism    | Error Type           | Use Case                                   |
|--------------|----------------------|--------------------------------------------|
| `require`    | `Error(string)`      | Input validation, external calls           |
| `assert`     | `Panic(uint256)`     | Internal invariants, impossible conditions |
| `revert`     | Custom or string     | Manual error handling, custom errors       |
| `try/catch`  | Error / Panic / Fallback | External contract interaction errors  |

---

## Notes

- `require` is best for user-facing checks.
- `assert` should be reserved for critical internal logic.
- `revert` allows more explicit control over error signaling.
- `try/catch` is useful for working with contracts that may fail unpredictably.


# `try` / `catch` in Solidity

In Solidity, `try`/`catch` blocks are used to gracefully handle errors that may occur during external contract calls. This allows contracts to avoid complete failure due to external issues and take appropriate fallback actions.

---

## Purpose

The `try`/`catch` mechanism allows:
- Executing external function calls safely.
- Catching and responding to various types of errors.
- Preventing contract-wide reversion when only a specific external call fails.

---

## Error Types Caught

1. `Error(string)` – Triggered when `revert()` is called with a reason string.
2. `Panic(uint)` – Raised for serious issues like arithmetic overflows or assertion failures.
3. `bytes` – Captures all other low-level failures, including calls without a revert message.

---

## Example: External Call with Error Handling

```plaintext
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.1;

interface DataFeed {
    function getData(address token) external returns (uint value);
}

contract FeedConsumer {
    DataFeed feed;
    uint errorCount;

    function rate(address token) public returns (uint value, bool success) {
        // Disable operation permanently after 10 errors
        require(errorCount < 10);

        try feed.getData(token) returns (uint v) {
            return (v, true);
        } catch Error(string memory /*reason*/) {
            // Called if revert() was triggered with a reason string
            errorCount++;
            return (0, false);
        } catch Panic(uint /*errorCode*/) {
            // Called for critical errors like division by zero or overflows
            errorCount++;
            return (0, false);
        } catch (bytes memory /*lowLevelData*/) {
            // Called for any other low-level error
            errorCount++;
            return (0, false);
        }
    }
}
```

---

## Key Points

- The `try` block must call an external function that returns a value.
- All `catch` clauses are optional but provide different levels of error handling.
- Contracts should use `require()` inside `try` blocks when additional internal checks are needed.
- `errorCount` in the example helps to implement a safeguard against repeated external failures.

---

## When to Use

Use `try`/`catch` when:
- Calling functions from unknown or unreliable external contracts.
- You want to prevent entire transactions from reverting due to a single failed call.
- You need granular control over different error types for diagnostics or fallbacks.

---

## Summary

The `try`/`catch` mechanism improves contract robustness by enabling error recovery in external calls. It's especially useful in applications like data aggregators, oracles, and contract proxies where external reliability isn't guaranteed.



---


# Custom Errors in Solidity

Custom errors are a recent addition to Solidity that improve gas efficiency and readability when handling exceptional conditions. Instead of using strings in `revert()` statements, you can define structured error types and trigger them as needed.

---

## Why Use Custom Errors?

- **Gas Efficient**: They save gas compared to revert strings, especially in complex contracts.
- **Structured**: Custom errors convey structured, typed information about what went wrong.
- **Readable**: Error names and parameters make contract logic more expressive and self-documenting.

---

## Defining a Custom Error

You can define an error using the `error` keyword. It can be declared:
- At the contract level
- At the global (file) level

Example:

```plaintext
error NotEnoughFunds(uint requested, uint available);
```

This defines an error that takes two unsigned integer arguments: `requested` and `available`.

---

## Using Custom Errors with `revert`

Custom errors are triggered using the `revert` keyword.

### Example: Token Contract with Custom Error

```plaintext
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

error NotEnoughFunds(uint requested, uint available);

contract Token {
    mapping(address => uint) balances;

    function transfer(address to, uint amount) public {
        uint balance = balances[msg.sender];

        if (balance < amount)
            revert NotEnoughFunds(amount, balance);

        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}
```

In this example, if a user tries to transfer more than their balance, the `NotEnoughFunds` error is triggered with relevant details.

---

## Key Characteristics

- **Cannot Be Overloaded or Overridden**: Error names must be unique.
- **Are Inherited**: If a parent contract defines a custom error, the child contract can use it directly.
- **Only Used in Revert Statements**: You cannot instantiate or throw errors outside of `revert`.

---

## Summary

Custom errors provide a better, cheaper, and cleaner alternative to string-based error messages. They are especially useful for complex applications where detailed debugging information is needed without sacrificing performance.

---

# Reentrancy in Solidity

## Introduction

Reentrancy is a critical security vulnerability in Ethereum smart contracts. It occurs when an external call to an untrusted contract "re-enters" the original contract before its execution is complete and before internal state changes have finalized.

---

## Real-World Analogy

Imagine a bank teller who, upon your request to withdraw money:

1. **First** gives you the cash.
2. **Then** updates your account balance.

If you—acting maliciously—immediately make another withdrawal **before** the balance is updated, the system may still show your original balance, allowing you to withdraw more money than you actually have.

---

## How It Happens in Solidity

In Solidity, reentrancy typically arises in contracts that:

- Send Ether to an external address using `.call()` or `.send()`.
- Interact with other contracts that contain fallback or receive functions.

If the receiving contract has malicious logic, it can call back into the vulnerable contract **before the original function finishes**, exploiting the unchanged state (e.g., a still-positive balance).

---

## The Checks-Effects-Interactions Pattern (CEI)

A key defense mechanism is the **Checks-Effects-Interactions** pattern. This best practice dictates that you should:

1. **Check**: Validate all necessary conditions.
   - Use `require` statements.
   - Apply access control like `onlyOwner`.
2. **Effects**: Apply internal state changes.
   - E.g., set `balances[msg.sender] = 0;`
3. **Interactions**: Make external calls.
   - E.g., `msg.sender.call{value: amount}("")`

### Why It Works

By updating the internal state **before** making any external calls, you ensure that even if reentry occurs, the critical variables (such as user balances) are already set to safe values—blocking further exploitation.

---

## Additional Mitigations

- **Pull Payments**:
  - Let users **withdraw** their funds instead of pushing them.
  - This limits the contract’s exposure to external calls.

- **Reentrancy Guards**:
  - Use mutex locks to prevent functions from being called while already executing.
  - Example: OpenZeppelin's `nonReentrant` modifier.

---

## Summary

- Reentrancy allows attackers to recursively call a function and exploit state inconsistencies.
- Always follow **Checks-Effects-Interactions**.
- Prefer **pull over push** for fund transfers.
- Use **reentrancy guards** for added safety.

By following these practices, smart contract developers can significantly reduce the risk of reentrancy attacks and improve the security of decentralized applications.


# Access Control Patterns

Access control is fundamental in smart contract development to restrict who can call certain functions and perform privileged operations.

---

## 1. Ownable

### Description
- A contract has a single **owner** (an Ethereum address) who holds special privileges.
- Only the owner can call certain restricted functions, such as withdrawing funds or pausing the contract.

### Implementation
- Typically uses a constructor to set the owner at deployment.
- Uses modifiers like `onlyOwner` to restrict access to functions.

### Example Use Case
- Admin functions
- Emergency pause mechanisms
- Managing token distributions or contract upgrades

### Code Snippet

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyContract is Ownable {
function doSomethingCritical() public onlyOwner {
// Only owner can call this
}
}


---


---

## 2. Pausable

### Description
- Allows an authorized account (commonly the owner) to **pause** and **unpause** the contract.
- When paused, certain functions are disabled to protect the contract during emergencies, bugs, or upgrades.

### Implementation
- Uses a boolean state variable `paused` internally.
- Provides modifiers like `whenNotPaused` and `whenPaused` to control function execution.

### Example Use Case
- Freezing token transfers if a security exploit is detected.
- Stopping a crowdfunding campaign due to discovered bugs.

### Code Snippet

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; // If only owner can pause

contract MyPausableContract is Pausable, Ownable {
function transferTokens() public whenNotPaused {
// Logic for transferring tokens
}

function pauseContract() public onlyOwner {
    _pause(); // Inherited from Pausable
}

function unpauseContract() public onlyOwner {
    _unpause(); // Inherited from Pausable
}



# Data Structure Patterns

Efficient on-chain data storage and retrieval are essential for building performant and cost-effective smart contracts. This section covers common Solidity data structures and patterns.

---

## 1. Mapping

### Description
- A **key-value store**, similar to hash maps or dictionaries in other programming languages.
- Extremely gas-efficient for lookups.
- Cannot be iterated directly on-chain (no native way to list all keys).

### Implementation

mapping(KeyType => ValueType) public myMap;


### Example Use Cases
- Storing user balances: `mapping(address => uint)`
- Associating user data structs with addresses: `mapping(address => UserStruct)`
- Tracking NFT ownership: `mapping(uint => address)`

---

## 2. Structs & Arrays (with Mappings)

### Description
- **Structs** allow grouping multiple related variables into a single custom data type.
- **Arrays** store ordered lists of items.
- Often combined with mappings to associate IDs or addresses with structs or arrays.

### Implementation
struct User {
address userAddress;
uint256 balance;
bool isActive;
}

mapping(address => User) public users; // Map address to user struct
uint256[] public userIds; // Store a list of user IDs/indices



### Example Use Cases
- Managing a list of items for sale.
- Tracking individual user profiles.
- Storing proposals in a voting contract.

---

## 3. Enums

### Description
- Custom types that define a fixed set of constant values.
- Useful for representing discrete states within a contract.

### Implementation
enum State { Created, Active, Paused, Completed }




### Example Use Cases
- Workflow states such as funding campaigns: `Pending -> Active -> Successful -> Failed`
- Representing game states or phases.


# Security Patterns

Security patterns help protect smart contracts against common vulnerabilities and attacks.

---

## 1. Checks-Effects-Interactions (CEI)

### Description
- A critical pattern to prevent **re-entrancy attacks**.
- It enforces a specific order in function execution:
  1. **Checks:** Verify conditions (e.g., `require` statements, access control modifiers).
  2. **Effects:** Update the contract's internal state (e.g., deduct balances, set flags).
  3. **Interactions:** Call external contracts or transfer Ether.

### Implementation
- Always perform checks first.
- Update all state variables before any external calls.
- Only then interact with external contracts or send Ether.

### Example Use Case
- Any function that sends Ether or interacts with other contracts.

---

## 2. Pull vs. Push Payments (Withdrawal Pattern)

### Description
- Instead of **pushing** Ether directly to users (which risks re-entrancy if the recipient is a contract), allow users to **pull** their funds by calling a withdrawal function.

### Implementation
- Track user balances in a mapping.
- Users call `withdraw()` to retrieve their Ether safely.

### Example Use Case
- Crowdfunding platforms, salary payments, refunds.

### Code Snippet
mapping(address => uint256) public balances;

function deposit() public payable {
balances[msg.sender] += msg.value;
}

function withdraw() public {
uint256 amount = balances[msg.sender];
require(amount > 0, "No funds to withdraw");


balances[msg.sender] = 0; // Effect: Clear balance FIRST!
(bool success, ) = payable(msg.sender).call{value: amount}(""); // Interaction
require(success, "Withdrawal failed");



---

## 3. Re-entrancy Guard

### Description
- An explicit mechanism to prevent re-entrancy using a mutex lock.
- OpenZeppelin's `ReentrancyGuard` contract provides a `nonReentrant` modifier to guard functions.

### Implementation
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MyGuardedContract is ReentrancyGuard {
    mapping(address => uint256) public balances;

    function withdraw() public nonReentrant {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No funds to withdraw");

        balances[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdrawal failed");
    }
}



# Error Handling Patterns

**Purpose:** Providing clear feedback when operations fail.

## require(), revert(), assert()

### Description

- **require()**  
  Used for input validation and state checks. If the condition is false, the transaction is reverted and unused gas is refunded.  
  Common scenarios include:
  - Checking function inputs
  - Validating permissions
  - Ensuring preconditions are met

- **revert()**  
  Explicitly reverts a transaction and optionally provides an error message. Useful for complex conditionals where `require()` isn't ideal.

- **assert()**  
  Used to verify internal invariants that should **never** be violated. If it fails, **all** remaining gas is consumed. Ideal for checking conditions that indicate serious bugs.

### Example Use Cases

require(msg.sender == owner, "Not authorized");
require(amount > 0, "Amount must be positive");


// SPDX-License-Identifier: MIT
        pragma solidity ^0.8.0;

        // The contract that the factory will deploy
        contract MyChildContract {
            address public creator;
            string public name;

            constructor(string memory _name) {
                creator = msg.sender;
                name = _name;
            }
        }

        contract MyFactory {
            // Event to log the creation of new child contracts
            event ChildContractCreated(address indexed childAddress, address indexed creator, string name);

            // Mapping to keep track of created contracts (optional, but useful)
            address[] public deployedContracts;

            function createChildContract(string memory _name) public returns (address newContractAddress) {
                // Deploy a new instance of MyChildContract
                MyChildContract newChild = new MyChildContract(_name);
                newContractAddress = address(newChild);

                deployedContracts.push(newContractAddress);
                emit ChildContractCreated(newContractAddress, msg.sender, _name);
            }
        }




# Registry Pattern

**Purpose:** To provide a central, reliable lookup mechanism for managing addresses and metadata of contracts, services, or users within a smart contract system.

## Description

The **Registry Pattern** is a smart contract design that stores and manages a set of addresses, optionally with metadata. It serves as a centralized mapping or directory that other contracts or users can reference to retrieve specific addresses or services.

This pattern is especially useful in multi-contract architectures, modular systems, or upgradeable designs, where various parts of a system need to discover or verify the addresses of other components.

## Implementation

- Commonly uses `mapping(keyType => valueType)`:
  - `keyType` is often `bytes32` (hashed name), `string`, or `address`.
  - `valueType` is usually `address`, or a `struct` containing additional data.
- Frequently combined with access control mechanisms like `Ownable` to restrict who can update the registry.
- Events are often emitted for updates to aid in off-chain indexing and discovery.

## Example Use Cases

- Mapping human-readable names (e.g., `"PriceFeed"`) to contract addresses (like a simplified version of ENS).
- Whitelisting approved contracts or accounts.
- Managing versions of deployed contracts or upgrade proxies.
- Service discovery in modular or plugin-based smart contract systems.

## Code Snippet

 // SPDX-License-Identifier: MIT
        pragma solidity ^0.8.0;
        import "@openzeppelin/contracts/access/Ownable.sol";

        contract ContractRegistry is Ownable {
            // Map names to contract addresses
            mapping(bytes32 => address) public registeredContracts; // Using bytes32 for fixed-size keys

            // Event for logging registrations
            event ContractRegistered(bytes32 indexed nameHash, address indexed contractAddress, string name);

            function registerContract(string memory _name, address _contractAddress) public onlyOwner {
                bytes32 nameHash = keccak256(abi.encodePacked(_name));
                require(registeredContracts[nameHash] == address(0), "Contract already registered");
                require(_contractAddress != address(0), "Invalid contract address");

                registeredContracts[nameHash] = _contractAddress;
                emit ContractRegistered(nameHash, _contractAddress, _name);
            }

            function getContractAddress(string memory _name) public view returns (address) {
                bytes32 nameHash = keccak256(abi.encodePacked(_name));
                return registeredContracts[nameHash];
            }

            // Could add update/deregister functions, also onlyOwner
        }




# External Data Integration Patterns

**Purpose:** Securely bringing real-world or off-chain data onto the blockchain for smart contract execution.

## Oracle Pattern

### Description

The **Oracle Pattern** is a design strategy that enables smart contracts to access external (off-chain) information that the blockchain itself cannot directly retrieve. This can include anything from asset prices and weather data to sports scores, random numbers, and more.

Smart contracts are inherently deterministic and isolated, meaning they cannot call APIs or interact with the outside world directly. Oracles serve as bridges between the blockchain and external data sources, allowing trust-minimized access to real-world information.

### Implementation

There are two main approaches to implementing oracles:

#### 1. Centralized Oracle (for learning and prototyping)

- A trusted party (typically the contract owner or a known admin) manually inputs data into the contract.
- Suitable for testing, simple dApps, or environments where the data source is trusted.
- Less secure due to single-point-of-failure and reliance on the data provider’s honesty.

#### 2. Decentralized Oracle (e.g., Chainlink)

- A decentralized network of oracle nodes is used to fetch and aggregate external data.
- Provides tamper-resistant, verifiable, and trust-minimized data feeds.
- Commonly used in production-grade DeFi, gaming, and insurance dApps.
- Chainlink is the most widely adopted decentralized oracle provider.

### Example Use Cases

- **DeFi:** Fetching real-time asset prices for lending, borrowing, or synthetic assets.
- **Prediction Markets:** Determining outcomes of real-world events like elections or sports games.
- **Insurance:** Triggering payouts based on verifiable real-world events (e.g., rainfall, flight delays).
- **Games:** Providing randomness or off-chain game state verification.

### Code Snippet 

// SPDX-License-Identifier: MIT
        pragma solidity ^0.8.0;
        import "@openzeppelin/contracts/access/Ownable.sol";

        contract SimplePriceOracle is Ownable {
            uint256 public ethPriceUsd; // Stored in cents, e.g., $2000.00 would be 200000

            event PriceUpdated(uint256 newPrice, uint256 timestamp);

            // Only the owner (a trusted entity) can update the price
            function updateEthPrice(uint256 _newPrice) public onlyOwner {
                require(_newPrice > 0, "Price must be positive");
                ethPriceUsd = _newPrice;
                emit PriceUpdated(_newPrice, block.timestamp);
            }

            function getEthPrice() public view returns (uint256) {
                return ethPriceUsd;
            }

            // **For real-world use, you'd integrate with Chainlink or similar**
            // Example (conceptually, not runnable without Chainlink contract):
            // import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
            // AggregatorV3Interface internal priceFeed;
            // constructor() {
            //     priceFeed = AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419); // Mainnet ETH/USD
            // }
            // function getLatestPriceFromChainlink() public view returns (int256) {
            //     ( , int256 price, , , ) = priceFeed.latestRoundData();
            //     return price;
            // }
        }


# Financial Primitives & Incentive Patterns

**Purpose:** Implementing mechanisms for locking assets, distributing rewards, or managing shared funds.

## Staking Pattern

### Description

The **Staking Pattern** is a smart contract design that allows users to lock their tokens (usually ERC-20 tokens) within a contract to earn rewards over time. It is a foundational primitive in blockchain applications such as Proof-of-Stake consensus, yield farming, and decentralized governance.

Users are incentivized to hold and stake their tokens in return for reward distributions based on how much and how long they have staked. This pattern encourages long-term participation and alignment with the protocol’s success.

### Implementation

A typical staking contract involves the following components:

#### 1. Token Deposits

- Users must first approve the staking contract to transfer tokens on their behalf using `IERC20.approve`.
- Then, tokens are deposited via `transferFrom` or a custom deposit function.

#### 2. State Tracking

- The contract maintains mappings such as:
  - `balances`: tracks each user's staked amount.
  - `userRewardPerTokenPaid`: records the last reward per token paid to each user.
  - `rewards`: accumulates the total unclaimed rewards per user.

Example:
mapping(address => uint256) public balances;
mapping(address => uint256) public rewards;
mapping(address => uint256) public userRewardPerTokenPaid;



#### 3. Reward Calculation

- A common technique is to use a **reward-per-token accumulator**:
  - `rewardPerTokenStored` tracks the cumulative reward distributed per staked token.
  - When users interact (stake, withdraw, or claim), the contract updates their reward share based on the time elapsed.

Key variables:
uint256 public rewardPerTokenStored;
uint256 public lastUpdateTime;



- Users' pending rewards are updated using:
  - `earned = balance * (rewardPerToken - userRewardPerTokenPaid) + rewards[user];`

#### 4. Withdrawal / Claiming

- Users can:
  - Withdraw their staked tokens (usually after a lockup period or at any time, depending on design).
  - Claim their accumulated rewards via a separate `getReward()` function.

#### 5. Reward Distribution

- Rewards can be funded upfront or streamed in over time.
- Some contracts rely on an external `RewardDistributor` to periodically send tokens.
- Rewards are typically distributed proportionally to stake and time.

### Example Use Case

- **Yield Farming:** Users stake LP tokens to receive reward tokens, encouraging liquidity provision.
- **Proof-of-Stake:** Validators lock tokens to secure the network and are rewarded for honest participation.
- **Governance:** Voting power is based on how many tokens a user has staked.
- **Fixed-Term Deposits:** Users lock funds for a set duration in exchange for fixed or variable interest.



