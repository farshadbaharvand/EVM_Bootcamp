# 🧠 Solidity Cheatsheet (کامل در یک بلاک Markdown)

مروری سریع و کاربردی بر مفاهیم اصلی زبان Solidity برای توسعه قراردادهای هوشمند روی Ethereum

---

## 📦 ساختار پایه قرارداد

```solidity
pragma solidity ^0.8.0;

contract MyContract {
    // State variables
    // Constructor
    // Functions
}
```

---

## 🔢 انواع داده‌ها

| نوع         | توضیح                              | نمونه |
|-------------|-------------------------------------|--------|
| `uint`      | عدد بدون علامت                     | `uint x = 10;` |
| `int`       | عدد با علامت                       | `int y = -5;` |
| `bool`      | مقدار منطقی                        | `bool flag = true;` |
| `address`   | آدرس اتریوم                        | `address owner;` |
| `string`    | رشته‌ی متنی                        | `string name = "Ali";` |
| `bytes32`   | آرایه بایت ثابت                    | `bytes32 hash;` |

---

## 🧮 Mapping

```solidity
mapping(address => uint) public balances;

function getBalance(address user) public view returns (uint) {
    return balances[user];
}
```

- ساختار داده‌ای برای نگاشت کلید به مقدار  
- کلیدها قابل شمارش نیستند

---

## ⚙️ Constructor

```solidity
address public owner;

constructor() {
    owner = msg.sender;
}
```

- فقط یک‌بار هنگام deploy اجرا می‌شود.

---

## 🧱 توابع ویژه: `receive` و `fallback`

```solidity
receive() external payable {
    // دریافت ETH
}

fallback() external {
    // فراخوانی تابع ناموجود
}
```

- `receive`: دریافت مستقیم ETH بدون data
- `fallback`: اجرای خودکار در صورت نبود تابع مطابق با calldata

---

## 🔐 Visibility (سطوح دسترسی)

| سطح دسترسی | توضیح |
|------------|--------|
| `public`   | قابل دسترسی از داخل و بیرون قرارداد |
| `private`  | فقط داخل همان قرارداد |
| `internal` | فقط در داخل یا قراردادهای ارث‌بر |
| `external` | فقط از بیرون قابل فراخوانی است |

```solidity
function x() public {}
function y() private {}
function z() internal {}
function w() external {}
```

---

## 🎛️ Modifiers (تعدیل‌کننده‌ها)

```solidity
modifier onlyOwner {
    require(msg.sender == owner, "Not owner");
    _;
}

function withdraw() public onlyOwner {
    // فقط مالک اجازه دارد
}
```

- کد تکراری را قبل یا بعد از اجرای تابع درج می‌کند.

---

## 📣 Events (رویدادها)

```solidity
event Transferred(address from, address to, uint amount);

function transfer(address to, uint amount) public {
    emit Transferred(msg.sender, to, amount);
}
```

- برای ارسال رخدادها به frontend استفاده می‌شود.

---

## 👪 Inheritance (وراثت)

```solidity
contract A {
    function foo() public pure returns (string memory) {
        return "A";
    }
}

contract B is A {
    function bar() public pure returns (string memory) {
        return "B";
    }
}
```

- استفاده مجدد از کد و گسترش قرارداد پایه

---

## 📚 منابع پیشنهادی

- [Solidity Docs](https://docs.soliditylang.org)
- [Remix IDE](https://remix.ethereum.org)
- [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)
