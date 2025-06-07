# Adding Other Contracts and Libraries

When thinking about interacting with other contracts or libraries, it is useful to distinguish between what happens at **compile time** and what happens at **runtime**.

---

## Compile Time

If your contract references another contract or library—whether through inheritance or for an external function call—the compiler needs access to the relevant code.

- Use the `import` statement to include the code in your compilation unit.
- Alternatively, you could copy the code directly into your file; both approaches achieve the same effect.
- In some cases, such as when verifying a contract on Etherscan, you need to gather all contract code into one file. This process is called **flattening**.
  - Tools like Remix and Truffle provide plugins to automate flattening.

### Inheritance

If you inherit another contract (e.g., OpenZeppelin's `Ownable`), then during compilation:

- All functions and variables (except those marked `private`) from the parent contract are merged into your contract.
- The resulting bytecode includes everything from both contracts.
- After compilation, the origin of those functions becomes irrelevant to the EVM.

---

## Runtime

At runtime, your contract can interact with other deployed bytecode in two primary ways:

### External Calls

Your contract can call functions of another deployed contract. This requires:

1. The function's signature to be available at compile time.
2. The address of the target contract to be available at runtime.

#### Example

```plaintext
pragma solidity ^0.8.0;

contract InfoFeed {
    uint256 price;

    function info() public view returns (uint256 ret_) { 
        return price;
    }

    // other functions    
}

contract Consumer {
    InfoFeed feed;

    constructor(InfoFeed _feed){
        feed = _feed;
    }

    function callFeed() public view returns (uint256) { 
        return feed.info(); 
    }
}
```

---

## Using Libraries

A **library** is a special kind of smart contract with **no state**. Instead, its functions execute in the context of your contract.

- Libraries can help reduce contract size and encourage code reuse.
- See the [OpenZeppelin Math library](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/Math.sol) as an example.

### Example: Using the Math Library

```plaintext
pragma solidity ^0.8.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/utils/math/Math.sol";

contract Test {
    using Math for uint256;

    function bigger(uint256 _a, uint256 _b) public pure returns(uint256){
        uint256 big = _a.max(_b);
        return big;
    }
}
```

- The `using` keyword associates a data type with a library.
- After that, you can use the library’s functions via dot notation on variables of that type.

```plaintext
uint256 big = _a.max(_b);
```

### Linking at Deployment

- You can reference **already deployed libraries**.
- At deployment, a **linking process** assigns the library’s address to your contract.
- If the library functions are:
  - **External/Public**: The deployed contract must link to the library at deploy time.
  - **Internal**: The functions will be **inlined** into your contract at compile time.

---

By understanding how compilation and runtime behavior differ, and how contracts interact through inheritance, external calls, and libraries, you can write more modular, maintainable, and secure smart contracts.

---

# OpenZeppelin Guide

## About OpenZeppelin

OpenZeppelin is a highly respected organization in the Ethereum community. They provide a comprehensive suite of **audited smart contracts and libraries** that have become an industry standard.

- Inheriting OpenZeppelin contracts provides **enhanced security** and **robustness**.
- Recommended for both beginners and experienced developers.
- Official documentation: [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/)

---

## OpenZeppelin Token Contracts

OpenZeppelin offers libraries for common Ethereum token standards:

- **ERC20**: Fungible tokens
- **ERC721**: Non-fungible tokens (NFTs)
- **ERC777**: Advanced fungible tokens
- **ERC1155**: Multi-token standard (supports both fungible and non-fungible)

Each library includes implementations that cover the most common use cases, reducing the need for custom and error-prone logic.

### Safe Functions

Functions like `safeTransferFrom()` were introduced to avoid the issue of tokens being sent to contracts that do not know how to handle them—preventing tokens from getting "stuck."

---

## OpenZeppelin Access Control and Security Contracts

These contracts help manage permissions and secure contract logic:

- **Ownable**: Simple ownership pattern for access control
- **AccessControl**: Role-based access management
- **TimeLockController**: Timelock for scheduled execution of sensitive operations
- **Pausable**: Circuit breaker pattern to pause contract operations
- **ReentrancyGuard**: Prevents reentrancy attacks
- **PullPayment**: Secure pattern for handling payments

---

## OpenZeppelin Governance Contracts

OpenZeppelin also provides governance modules:

- Implements on-chain voting protocols similar to **Compound’s Governor Alpha & Bravo**
- Useful for DAOs and decentralized project governance

---

## OpenZeppelin Cryptography Contracts

These libraries are useful for cryptographic operations:

- **ECDSA**: For signature verification
- **MerkleProof**: To prove inclusion in a Merkle tree

---

## OpenZeppelin Introspection Contracts

Contracts that allow runtime interface checks:

- Determine whether a contract supports a given interface (e.g., using ERC165)

---

## OpenZeppelin Math Contracts

- **SafeMath**: Prevents integer overflows/underflows (mostly unnecessary in Solidity ≥0.8.0 due to built-in checks)

---

## OpenZeppelin Payment Contracts

- **PaymentSplitter**: Distributes payments among a group of recipients
- **Escrow**: Handles conditional fund transfers

---

## OpenZeppelin Collections Contracts

- **EnumerableSet**: Set data structure with enumeration
- **EnumerableMap**: Map with enumeration capabilities

---

## OpenZeppelin Miscellaneous Contracts

- **Address**: Utility functions for address types
- **Multicall**: Batches multiple calls into a single transaction

---

## OpenZeppelin Upgradability Contracts

- **Proxy**: Used to deploy upgradeable smart contracts via proxy pattern

---

## Importing from GitHub in Remix

You can import OpenZeppelin contracts directly into Remix using:

```plaintext
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";
```

Or using npm-style imports (supported in Hardhat, Foundry, etc.):

```plaintext
import "@openzeppelin/contracts@4.2.0/token/ERC20/ERC20.sol";
```

---

## References and Resources

- [Solidity Documentation](https://docs.soliditylang.org/)
- [OpenZeppelin Contracts Documentation](https://docs.openzeppelin.com/contracts)
- [OpenZeppelin GitHub Repository](https://github.com/OpenZeppelin/openzeppelin-contracts)
- Useful concepts:
  - **Globally Available Variables** in Solidity
  - OpenZeppelin’s modular and secure **libraries** for production-grade smart contracts

---

Using OpenZeppelin's audited libraries ensures security best practices and saves development time by leveraging battle-tested code.


# Using OpenZeppelin Contracts

## Overview

OpenZeppelin Contracts is a **library for secure smart contract development**. It provides a robust foundation built on community-audited code and is widely adopted in Ethereum development.

Key features include:

- Implementations of token standards like **ERC20**, **ERC721**, **ERC777**, and more.
- A **flexible role-based permissioning scheme**.
- **Reusable Solidity components** to build custom contracts and complex decentralized systems.
- Support for both manual implementation and a **contract wizard** to auto-generate contract code.
- Direct integration with **Remix** for quick testing and deployment.

Official Repository: [OpenZeppelin GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)

---

## Opening in Remix

You can open the contracts in Remix directly by importing them from the GitHub repo or npm-style syntax.

```plaintext
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

This allows you to write and deploy contracts using OpenZeppelin's pre-built components without setting up a full local environment.

---

## Constructing an ERC-20 Token Contract

Using OpenZeppelin Contracts, we can easily create an ERC-20 token. Below is an example of a custom token contract for a game currency called **Gold (GLD)**.

```plaintext
// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GLDToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Gold", "GLD") {
        _mint(msg.sender, initialSupply);
    }
}
```

### Explanation

- This contract inherits from the OpenZeppelin `ERC20` base contract.
- The `constructor` passes the **token name** ("Gold") and **symbol** ("GLD") to the base ERC20 constructor.
- `_mint` is used to create the `initialSupply` and assign it to the deployer’s address.

This approach gives you:

- A standard ERC-20 compliant token
- Optional metadata (name, symbol, decimals)
- Inherited functions such as `transfer`, `approve`, `allowance`, and `balanceOf`

---

## Token Decimals

By default, the ERC20 contract sets **18 decimals**, similar to how Ether uses 18 decimal places. You can override the default by implementing the `decimals()` function.

```plaintext
function decimals() public view virtual override returns (uint8) {
  return 16;
}
```

### Example Usage

To send 5 tokens using a token contract with 18 decimals, you would call:

```plaintext
transfer(recipient, 5 * (10 ** 18));
```

If your custom decimals is set to 16, the same logic applies:

```plaintext
transfer(recipient, 5 * (10 ** 16));
```

---

By using OpenZeppelin’s Contracts library, you gain the advantages of security, modularity, and industry-standard practices—all while accelerating development time.

---

## Further Resources

- [OpenZeppelin Docs](https://docs.openzeppelin.com/contracts)
- [ERC Standards on EIP](https://eips.ethereum.org/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Remix IDE](https://remix.ethereum.org/)

``` 

Let me know if you'd like a [custom token wizard demo](f), [token decimal conversion table](f), or [ERC20 vs ERC721 comparison](f).
