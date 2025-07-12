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

```bash

├── src\
│ └── MyContract.sol\
└── test\
 └── MyContract.t.sol
 ```

 MyContract.t.sol will import the contract under test in order to access it's functions.

## First Contract
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
## Running Tests with Foundry

After writing your tests, you can run them using the `forge` CLI tool.

---

### Basic Test Run

Run all tests in your project with:

```bash
forge test
```


---

### Viewing Event Logs

To print event logs during the test run, use the `-vv` flag:

```bash
forge test -vv
```

---

### Viewing Trace of Failed Tests

To see a detailed trace of any failed tests, use the `-vvv` flag:

```bash
forge test -vvv
```

---


### Viewing Trace of Failed Tests

To see a detailed trace of any failed tests, use the `-vvv` flag:


```bash
forge test -vvv
```

---



### Viewing Trace of All Tests

To see a detailed trace of all tests (passed and failed), use the `-vvvv` flag:

```bash
forge test -vvvv
```

---

### Running a Specific Test

To run a specific test function, use the `--match-test` option followed by the test function name:
```bash
forge test --match-test test_myTest
```


# Basic NFT Examples

## Gist
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BasicNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    constructor() ERC721("BasicNFT", "BNFT") Ownable(msg.sender) {
        // msg.sender will be the initial owner
    }
    
    function mint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
    
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}

```

## NFT With Metadata
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MetadataNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    constructor() ERC721("MetadataNFT", "MNFT") Ownable(msg.sender) {}
    
    function mintWithURI(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

```

## Simple Game NFT
```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SimpleGameNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    
    Counters.Counter private _tokenIdCounter;
    
    struct Character {
        string name;
        uint256 level;
        uint256 strength;
        uint256 agility;
        uint256 intelligence;
        uint256 experience;
        bool isActive;
    }
    
    mapping(uint256 => Character) public characters;
    mapping(address => bool) public gameControllers;
    
    string private _baseTokenURI;
    
    event CharacterCreated(uint256 tokenId, string name);
    event CharacterLevelUp(uint256 tokenId, uint256 newLevel);
    event ExperienceGained(uint256 tokenId, uint256 experience);
    
    constructor(string memory baseURI) ERC721("SimpleGameNFT", "SGNFT") Ownable(msg.sender) {
        _baseTokenURI = baseURI;
    }
    
    modifier onlyGameController() {
        require(gameControllers[msg.sender] || msg.sender == owner(), "Not authorized");
        _;
    }
    
    function createCharacter(
        address to,
        string memory name,
        uint256 strength,
        uint256 agility,
        uint256 intelligence
    ) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        characters[tokenId] = Character({
            name: name,
            level: 1,
            strength: strength,
            agility: agility,
            intelligence: intelligence,
            experience: 0,
            isActive: true
        });
        
        _safeMint(to, tokenId);
        emit CharacterCreated(tokenId, name);
    }
    
    function gainExperience(uint256 tokenId, uint256 exp) public onlyGameController {
        require(_ownerOf(tokenId) != address(0), "Character does not exist");
        
        characters[tokenId].experience += exp;
        emit ExperienceGained(tokenId, exp);
        
        // Check for level up (100 exp per level)
        uint256 newLevel = (characters[tokenId].experience / 100) + 1;
        if (newLevel > characters[tokenId].level) {
            characters[tokenId].level = newLevel;
            // Increase stats on level up
            characters[tokenId].strength += 1;
            characters[tokenId].agility += 1;
            characters[tokenId].intelligence += 1;
            emit CharacterLevelUp(tokenId, newLevel);
        }
    }
    
    function getCharacter(uint256 tokenId) public view returns (Character memory) {
        require(_ownerOf(tokenId) != address(0), "Character does not exist");
        return characters[tokenId];
    }
    
    function setGameController(address controller, bool authorized) public onlyOwner {
        gameControllers[controller] = authorized;
    }
    
    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
    
    // Helper function to check if token exists
    function tokenExists(uint256 tokenId) public view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
    
    // Get character stats as arrays for easy frontend consumption
    function getCharacterStats(uint256 tokenId) public view returns (
        string memory name,
        uint256 level,
        uint256[4] memory stats, // [strength, agility, intelligence, experience]
        bool isActive
    ) {
        require(_ownerOf(tokenId) != address(0), "Character does not exist");
        Character memory char = characters[tokenId];
        
        return (
            char.name,
            char.level,
            [char.strength, char.agility, char.intelligence, char.experience],
            char.isActive
        );
    }
}

```