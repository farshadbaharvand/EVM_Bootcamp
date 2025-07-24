<div dir="rtl">


# مقدمه‌ای بر Foundry

> «امروزه گرایشی به نوشتن کدهای "باهوشانه" در سالیدیتی به‌وجود آمده، اما این روند خوبی نیست. کد ساده، کد بهتری است.»

## Foundry چیست؟

Foundry یک مجموعه ابزار توسعه قرارداد هوشمند است که به زبان سالیدیتی نوشته شده است. این ابزار برای سرعت، قدرت و تجربه کاربر طراحی شده و ابزارهایی را برای ساخت، تست و استقرار قراردادهای اتریوم فراهم می‌کند.

### ویژگی‌ها

Foundry می‌تواند:

- مدیریت وابستگی‌ها  
- کامپایل پروژه  
- اجرای تست‌ها  
- استقرار قراردادها  
- تعامل با بلاک‌چین از طریق اسکریپت‌ها و خط فرمان

ابزار اصلی Foundry، ابزار **Forge** است که یک واسط خط فرمان (CLI) بوده و برای موارد زیر استفاده می‌شود:

- راه‌اندازی پروژه‌ها  
- ساخت قراردادهای هوشمند  
- اجرای تست‌ها  

Foundry از قابلیت‌های تست پیشرفته در سالیدیتی پشتیبانی می‌کند، از جمله توانایی خواندن و نوشتن مستقیم در اسلات‌های ذخیره‌سازی.

---

## شروع کار

### ۱. نصب Foundry

مراحل نصب بر اساس سیستم عامل متفاوت است. برای دستورالعمل‌های دقیق به [Foundry Book](https://getfoundry.sh/introduction/installation/#using-foundryup) مراجعه کنید.

روش معمول نصب در سیستم‌های مبتنی بر Unix:

~~~~bash
curl -L https://foundry.paradigm.xyz 
~~~~

### ۲. راه‌اندازی پروژه

برای ساخت پروژه‌ای به نام lets_forge:

~~~~bash
forge init lets_forge
~~~~

این دستور یک پروژه Foundry با ساختار پوشه پیشنهادی ایجاد می‌کند.

### ۳. ساخت پروژه

وارد پوشه پروژه شوید و قراردادها را کامپایل کنید:

~~~~bash
cd lets_forge
forge build
~~~~

### ۴. اجرای تست‌ها

برای بررسی نصب صحیح و عملکرد درست ابزار:

~~~~bash
forge test
~~~~

---

# ساختار پروژه Foundry

وقتی پروژه‌ای را با Foundry راه‌اندازی می‌کنید (مثلاً با `forge init hello_foundry`)، ساختار دایرکتوری تمیزی برای توسعه قرارداد هوشمند ایجاد می‌شود.

## پیمایش در پروژه

پس از راه‌اندازی، وارد پوشه پروژه شوید:

~~~~bash
cd hello_foundry
~~~~

برای مشاهده ساختار پوشه‌ها از دستور زیر استفاده کنید:

~~~~bash
tree . -d -L 1
~~~~

خروجی:

~~~~bash
.
├── lib
├── script
├── src
└── test
~~~~

### این ساختار شامل ۴ پوشه اصلی است:

- **lib/** – وابستگی‌های خارجی مانند OpenZeppelin اینجا ذخیره می‌شوند.

- **script/** – اسکریپت‌های استقرار و خودکارسازی اینجا قرار می‌گیرند.

- **src/** – کد منبع اصلی قرارداد شما اینجاست.

- **test/** – فایل‌های تست (سالیدیتی یا زبان‌های پشتیبانی‌شده) در این پوشه قرار دارند.

## خروجی Build

وقتی دستور build اجرا می‌شود:

~~~~bash
forge build
~~~~

### Foundry دو پوشه اضافی ایجاد می‌کند:

- **out/** – شامل خروجی‌های کامپایل‌شده مانند ABI و بایت‌کد.

- **cache/** – داده‌های کش‌شده برای سرعت بیشتر در کامپایل مجدد.

**این پوشه‌ها به‌طور خودکار توسط Foundry مدیریت می‌شوند.**

---

# تست: مبانی

قراردادهای هوشمند با استفاده از قراردادهای هوشمند دیگر تست می‌شوند؛ این راز سرعت بالای Foundry است زیرا نیازی به کامپایل اضافی نیست.

برای تست قرارداد `MyContract.sol` از فایلی با نام `MyContract.t.sol` استفاده می‌شود:

~~~~bash
├── src\
│ └── MyContract.sol\
└── test\
 └── MyContract.t.sol
~~~~

`MyContract.t.sol` قرارداد مورد تست را import می‌کند تا به توابع آن دسترسی داشته باشد.

## اولین قرارداد

قراردادی به نام A.sol بسازید و در پوشه src با محتوای زیر ذخیره کنید:

~~~~solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

/// @title قرارداد Encode A
/// @author Extropy.io
contract A {
    uint256 number;

    function store(uint256 num) public {
        number = num;
    }

    function retrieve() public view returns (uint256) {
        return number;
    }
}
~~~~

سپس فایل تستی با نام A.t.sol در پوشه test ایجاد کنید:

~~~~solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/Vm.sol";
import {A} from "../src/A.sol";

contract ATest is Test {
    A private a;

    function setUp() public {
        a = new A();
    }

    function test_Log() public {
        emit log("here");
        emit log_address(address(this));
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

    function test_FuzzValue(uint256 _value) public {
        _value = bound(_value, 0, 99999);
        a.store(_value);
        assertTrue(a.retrieve() == _value);
    }
}
~~~~

## اجرای تست‌ها با Foundry

پس از نوشتن تست‌ها، می‌توانید آن‌ها را با ابزار خط فرمان `forge` اجرا کنید.

---

### اجرای تست‌های پایه

برای اجرای تمام تست‌ها:

~~~~bash
forge test
~~~~

---

### مشاهده لاگ‌های رویداد

برای چاپ لاگ‌های رویداد هنگام اجرای تست، از فلگ `-vv` استفاده کنید:

~~~~bash
forge test -vv
~~~~

---

### مشاهده Trace برای تست‌های شکست‌خورده

برای مشاهده ردگیری دقیق تست‌های شکست‌خورده از فلگ `-vvv` استفاده کنید:

~~~~bash
forge test -vvv
~~~~

---

### مشاهده Trace برای همه تست‌ها

برای مشاهده trace همه تست‌ها (موفق و ناموفق):

~~~~bash
forge test -vvvv
~~~~

---

### اجرای یک تست خاص

برای اجرای تابع تست خاص:

~~~~bash
forge test --match-test test_myTest
~~~~

---

# مثال‌های ساده NFT

## خلاصه

~~~~solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BasicNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    constructor() ERC721("BasicNFT", "BNFT") Ownable(msg.sender) {}

    function mint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
~~~~

## NFT با فراداده (Metadata)

~~~~solidity
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
~~~~



## بازی ساده NFT
~~~~solidity

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

~~~~






</div>
