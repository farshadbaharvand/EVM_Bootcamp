# Foundry Introduction

> "There's a bit of a trend toward writing 'clever' Solidity code and it's not a good one. Boring code is better code."

## What is Foundry?

Foundry is a smart contract development toolchain written in Solidity. It is designed to be fast, powerful, and developer-friendly, offering the tools necessary to build, test, and deploy Ethereum smart contracts efficiently.

### Features

Foundry can:

- Manage dependencies  
- Compile your project  
- Run tests  
- Deploy contracts  
- Interact with the blockchain via scripts and command line

The core tool in the Foundry suite is **Forge**, a command-line interface (CLI) used to:

- Initialise projects  
- Build smart contracts  
- Run tests

Foundry supports fast and advanced Solidity testing capabilities, including the ability to read from and write to storage slots directly.

---

## Getting Started

### 1. Install Foundry

Installation steps vary by operating system. Refer to the [Foundry Book](https://getfoundry.sh/introduction/installation/#using-foundryup) for detailed instructions.

A common Unix-based installation method:

```bash
curl -L https://foundry.paradigm.xyz 
```


### 2. Initialise a Project
To create a new project named lets_forge:
```bash
forge init lets_forge
```


This sets up a new Foundry project with a recommended directory structure.



### 3. Build the Project
Navigate to the project directory and compile the contracts:
```bash
cd lets_forge
forge build
```


### 4. Run Tests
To verify the installation and that everything works correctly:
```bash
forge test
```




# Foundry Project Structure

When you initialise a Foundry project (e.g., using `forge init hello_foundry`), it creates a clean directory structure suitable for smart contract development.

## Navigating the Project

After initializing the project, navigate into the directory:

```bash
cd hello_foundry

```

You can visualize the top-level folder structure using the tree command:
```bash
tree . -d -L 1
```


Output:

```bash
.
├── lib
├── script
├── src
└── test
```
### This reveals 4 main directories:

- **lib/** – External dependencies are stored here (e.g., OpenZeppelin).

- **script/** – Scripts for deployment and automation go here.

- **src/** – Your main contract source code lives here.

- **test/** – Solidity or other supported test files are placed here.


## Build Output
When you run the build command:
```bash
forge build
```

### Foundry generates two additional directories:

- out/ – Contains compiled artifacts such as the ABI and bytecode.

- cache/ – Stores cached data to speed up recompilation.

**These are automatically created and managed by Foundry.**


---


# Testing: Basics
Smart contracts are tested using smart contracts, which is the secret to Foundry's speed since there is no additional compilation being carried out.
A smart contract e.g. MyContract.sol is tested using a file named MyContract.t.sol:

├── src\
│ └── MyContract.sol\
└── test\
 └── MyContract.t.sol

 MyContract.t.sol will import the contract under test in order to access it's functions.

First Contract
Create a contract called A.sol and save it in src with the following contents:

```solidity

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

/// @title Encode smart contract A
/// @author Extropy.io
contract A {
    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256) {
        return number;
    }
}

```


Then create a file to test the smart contract, for example A.t.sol in test with the following contents:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

// Standard test libs
import "forge-std/Test.sol";
import "forge-std/Vm.sol";

// Contract under test
import {A} from "../src/A.sol";

contract ATest is Test {
    // Variable for contract instance
    A private a;

    function setUp() public {
        // Instantiate new contract instance
        a = new A();
    }

    function test_Log() public {
        // Various log examples
        emit log("here");
        emit log_address(address(this));
        // HEVM_ADDRESS is a special reserved address for the VM
        emit log_address(HEVM_ADDRESS);
    }

    function test_GetValue() public {
        assertTrue(a.retrieve() == 0);
    }

    function test_SetValue() public {
        uint256 x = 123;
        a.store(x);
        assertTrue(a.retrieve() == 123);
    }

    // Define the value(s) being fuzzed as an input argument
    function test_FuzzValue(uint256 _value) public {
        // Define the boundaries for the fuzzing, in this case 0 and 99999
        _value = bound(_value, 0, 99999);
        // Call contract function with value
        a.store(_value);
        // Perform validation
        assertTrue(a.retrieve() == _value);
    }
}

```
# Running Tests with Foundry

After writing your tests, you can run them using the `forge` CLI tool.

---

## Basic Test Run

Run all tests in your project with:

```bash
forge test
```


---

## Viewing Event Logs

To print event logs during the test run, use the `-vv` flag:

```bash
forge test -vv
```

---

## Viewing Trace of Failed Tests

To see a detailed trace of any failed tests, use the `-vvv` flag:

```bash
forge test -vvv
```

---


## Viewing Trace of Failed Tests

To see a detailed trace of any failed tests, use the `-vvv` flag:


```bash
forge test -vvv
```

---



## Viewing Trace of All Tests

To see a detailed trace of all tests (passed and failed), use the `-vvvv` flag:

```bash
forge test -vvvv
```

---

## Running a Specific Test

To run a specific test function, use the `--match-test` option followed by the test function name:
```bash
forge test --match-test test_myTest
```