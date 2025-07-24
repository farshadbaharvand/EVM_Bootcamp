
<div dir="rtl">

# مقدمه‌ای بر Viem

## مرور کلی

فضای توسعه اتریوم به طور سنتی توسط کتابخانه‌های پایه‌ای مانند **Ethers.js** و **web3.js** شکل گرفته است. در حالی که این کتابخانه‌ها نقش اساسی در ظهور برنامه‌های غیرمتمرکز (dApps) داشته‌اند، اما با افزایش تقاضا برای عملکرد بالا، پایداری و تجربه بهتر توسعه‌دهنده، تحت فشار بیشتری قرار گرفته‌اند.

**Viem** یک کتابخانه نسل بعدی برای ارتباط با اتریوم است که به‌طور خاص برای رفع این کمبودها طراحی شده است.

---

## دلایل نیاز به کتابخانه جدید: حل «چهارضلعی»

نویسندگان Viem مفهومی به نام **"چهارضلعی (Quadrilemma)"** معرفی می‌کنند — چالش بهینه‌سازی همزمان برای چهار حوزه زیر:

1. **تجربه توسعه‌دهنده**
2. **پایداری**
3. **اندازه باندل**
4. **عملکرد**

کتابخانه‌های سنتی معمولاً در یکی دو حوزه موفق عمل می‌کنند اما در بقیه ناکام هستند. برای مثال، ممکن است تجربه توسعه‌دهنده خوبی ارائه دهند اما اندازه باندل بزرگی داشته باشند که زمان بارگذاری برنامه‌های وب را کاهش می‌دهد.

Viem توسط سازندگان **wagmi** — کتابخانه پرکاربرد React برای اتریوم — توسعه داده شده است، کسانی که محدودیت‌های معماری و DX کتابخانه‌های موجود را از نزدیک تجربه کرده‌اند.

---

## فلسفه طراحی اصلی: ماژولار، سریع و ایمن از نظر نوع

### سبک و قابل حذف توسط Tree-Shaking

برنامه‌های مدرن باید در شبکه‌های موبایل یا کم‌سرعت نیز عملکرد خوبی داشته باشند. Viem با معماری **ماژولار و قابل حذف (tree-shakable)** ساخته شده تا اندازه باندل را به حداقل برساند.

- **اندازه‌های فشرده شده (Gzipped)** بین **۳۵ تا ۶۳ کیلوبایت**
- فقط ماژول‌های استفاده‌شده در باندل نهایی گنجانده می‌شوند
- مثال: اگر امضای تراکنش استفاده نشود، کد مربوطه در باندل حذف می‌شود

### عملکرد بالا

Viem برای **بهره‌وری در زمان اجرا** بهینه‌سازی شده است:

- استفاده از الگوریتم‌های رمزگذاری/رمزگشایی بهینه
- اجتناب از عملیات‌های ناهمزمان غیرضروری
- حفظ پاسخ‌دهی و تعامل سریع در UI

### ایمنی نوع (Type-Safe)

ایمنی نوع ویژگی اصلی Viem است:

- **پشتیبانی کامل از TypeScript**
- **استنباط خودکار نوع از ABI**
  - نام توابع
  - نوع آرگومان‌ها
  - نوع خروجی‌ها
- **مزایا**
  - تکمیل خودکار (Autocompletion)
  - تشخیص خطا در زمان کامپایل
  - باگ کمتر در زمان اجرا

### APIهای صریح و قابل ترکیب

Viem ترجیح می‌دهد از **کد صریح به جای کد ضمنی** استفاده کند:

- APIها ممکن است طولانی‌تر به نظر برسند، اما **خواناتر، قابل‌اشکال‌زدایی و بازسازی آسان‌تر هستند**
- درک بهتر از **رابط JSON-RPC اتریوم** را ممکن می‌سازند
- فرایند یادگیری را تسهیل می‌کند — یادگیری Viem همانند یادگیری خود اتریوم است

---

## تصمیمات معماری کلیدی

### استفاده از BigInt بومی

- Viem از **BigInt بومی جاوااسکریپت** برای تمام عملیات‌های عددی بزرگ (مانند گس و موجودی) استفاده می‌کند
- نیازی به کتابخانه‌های خارجی مانند `BigNumber` نیست
- اندازه وابستگی‌ها کاهش می‌یابد و باگ‌های مربوطه حذف می‌شوند

### توابع بدون وضعیت

- توابع اصلی Viem **خالص و قطعی (pure and deterministic)** هستند
- بدون وضعیت داخلی تغییرپذیر
- بهبود در **قابلیت پیش‌بینی، تست‌پذیری و پایداری**

---

## نتیجه‌گیری

Viem یک کتابخانه اتریوم با طراحی دقیق است که مستقیماً به نیازهای روزافزون توسعه برنامه‌های غیرمتمرکز پاسخ می‌دهد. این کتابخانه اولویت را به:

- **حداقل‌گرایی** (اندازه باندل کوچک)
- **عملکرد** (کارایی در زمان اجرا)
- **توانمندسازی توسعه‌دهنده** (ایمنی نوع و APIهای صریح)

می‌دهد. معماری آن نشان‌دهنده درک عمیق از اکوسیستم اتریوم است و پایه‌ای قدرتمند و آینده‌نگر برای ساخت برنامه‌های مقیاس‌پذیر و قابل نگهداری فراهم می‌کند.

---

# جزئیات عملی

## راه‌اندازی اولیه پروژه

برای ارائه یک پایه عملی برای مثال‌های آینده، این بخش مراحل پیکربندی یک پروژه TypeScript برای استفاده از **Viem** را توضیح می‌دهد. این پیکربندی مبنای تعامل با قراردادهای هوشمند Solidity خواهد بود.

---

## گام ۱: مقداردهی اولیه پروژه

ابتدا یک پوشه جدید برای پروژه Node.js ایجاد کرده و آن را مقداردهی کنید:

~~~~bash
mkdir viem-contract-interaction
cd viem-contract-interaction
npm init -y
~~~~

سپس فایل tsconfig.json را برای پیکربندی TypeScript ایجاد کنید:

~~~~bash
npx tsc --init --resolveJsonModule true
~~~~

## ۲. نصب وابستگی‌های لازم

کتابخانه‌های اصلی و ابزارهای توسعه را نصب کنید:

~~~~bash
npm install viem
npm install --save-dev typescript ts-node @types/node dotenv
~~~~

- viem: کتابخانه اصلی برای تعامل با اتریوم

- typescript: پشتیبانی از بررسی نوع و TS

- ts-node: اجرای فایل‌های TypeScript به صورت مستقیم

- @types/node: تعریف‌های نوع برای Node.js

- dotenv: مدیریت متغیرهای محیطی مانند URLهای RPC و کلیدهای خصوصی

## ۳. تنظیم فایل‌های پروژه

فایل اصلی TypeScript و فایل `.env` را برای ذخیره تنظیمات حساس ایجاد کنید:

~~~~bash
touch .env
touch index.ts
~~~~

## ۴. پیکربندی فایل .env

فایل .env را ویرایش کرده و اطلاعات زیر را وارد کنید:

~~~~bash
QUICKNODE_ENDPOINT="YOUR_RPC_ENDPOINT_URL"
PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"
~~~~

- QUICKNODE_ENDPOINT: آدرس RPC نود اتریوم شما (می‌تواند از ارائه‌دهندگانی مانند Alchemy، Infura یا QuickNode باشد)

- PRIVATE_KEY: کلید خصوصی یک کیف پول تستی (فقط برای امضا و ارسال تراکنش‌های تغییر حالت استفاده می‌شود)

### خلاصه

این پیکربندی مینیمال اما کامل به شما ارائه می‌دهد:

- محیط توسعه ایمن با TypeScript
- دسترسی به بلاک‌چین اتریوم با استفاده از Viem
- مدیریت امن اطلاعات حساس از طریق `.env`

اکنون آماده‌اید که اسکریپت‌هایی در `index.ts` برای تعامل با قراردادهای هوشمند بنویسید.

---

# مفاهیم بنیادی: کلاینت‌ها، ترنسپورت‌ها و حساب‌ها

برای استفاده مؤثر از **Viem**، درک سه مفهوم اساسی زیر که معماری آن را شکل می‌دهند ضروری است:

- **Clients (کلاینت‌ها)**
- **Transports (ترنسپورت‌ها)**
- **Accounts (حساب‌ها)**

این اصطلاحات کمک می‌کنند تا الگوهای کتابخانه‌هایی مانند Ethers.js و web3.js واضح‌تر و منسجم‌تر شوند و ساختار برنامه قابل نگهداری‌تری ایجاد شود.

---

## ترنسپورت‌ها: لایه ارتباطی

در پایه معماری Viem، **ترنسپورت (Transport)** قرار دارد.

یک **ترنسپورت** مسئول قالب‌بندی، ارسال و مدیریت درخواست‌های JSON-RPC به یک نود اتریوم است. این عنصر پل بین برنامه و شبکه بلاک‌چین محسوب می‌شود.

Viem سه نوع اصلی از ترنسپورت‌ها را فراهم می‌کند:

### ۱. HTTP Transport

- با استفاده از تابع `http()` ایجاد می‌شود
- برای endpointهای معمولی JSON-RPC استفاده می‌شود
- رایج‌ترین گزینه برای درخواست‌های عمومی

### ۲. WebSocket Transport

- با استفاده از تابع `webSocket()` ایجاد می‌شود
- به endpointهای WebSocket متصل می‌شود
- مناسب برای اپلیکیشن‌هایی با نیاز به به‌روزرسانی‌های بلادرنگ و اشتراک رویدادها

### ۳. Custom Transport

- با استفاده از تابع `custom()` ایجاد می‌شود
- طراحی شده برای اتصال به ارائه‌دهندگان سازگار با **EIP-1193**
- استفاده رایج: اتصال به کیف پول‌هایی مانند MetaMask (`window.ethereum`)

---

## کلاینت‌ها: دروازه تعامل با اتریوم

**Client** در Viem رابط اصلی برای انجام عملیات روی بلاک‌چین است.

هر کلاینت با یک **ترنسپورت خاص** ساخته می‌شود و مجموعه‌ای از **Actionها** (عملیات) را فراهم می‌کند.

این مفهوم شبیه به **Provider** در Ethers.js است، اما Viem اصطلاح "Client" را برای جلوگیری از ابهام استفاده می‌کند.

### اهداف طراحی کلاینت

تمایز بین انواع مختلف کلاینت باعث بهبود موارد زیر می‌شود:

- امنیت
- جداسازی وظایف
- قابلیت نگهداری
- وضوح در طراحی برنامه

---

### کلاینت عمومی (Public Client)

**Public Client** برای عملیات **فقط‌خواندنی** استفاده می‌شود. این نوع از عملیات **نیاز به کلید خصوصی یا امضا ندارد**.

مثال‌هایی از **Public Actions**:

- `getBlockNumber()` — دریافت شماره آخرین بلاک
- `getBalance({ address })` — دریافت موجودی ETH حساب
- `readContract()` — فراخوانی تابع قرارداد (فقط‌خواندنی)

### ساخت کلاینت عمومی

از تابع `createPublicClient` استفاده کنید:

~~~~javascript
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

// ساخت کلاینت عمومی متصل به mainnet از طریق RPC عمومی
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// استفاده از کلاینت برای عملیات فقط‌خواندنی
const blockNumber = await publicClient.getBlockNumber();
console.log(`Current block number: ${blockNumber}`);
~~~~

# کلاینت کیف پول (Wallet Client)

**Wallet Client** در Viem برای انجام عملیات **تغییر وضعیت** روی بلاک‌چین اتریوم استفاده می‌شود — که معمولاً به عنوان **"Wallet Actions"** شناخته می‌شوند. این عملیات نیاز به **امضای رمزنگاری‌شده** توسط کلید خصوصی حساب اتریومی کاربر دارد.

---
## اقدامات کیف پول (Wallet Actions) چیست؟

اقدامات کیف پول به هر تعاملی با بلاک‌چین گفته می‌شود که:

- **وضعیت را تغییر دهد**
- **گس مصرف کند**
- **نیاز به امضای مجاز داشته باشد**

### اقدامات رایج کیف پول شامل موارد زیر است:

- `sendTransaction` — ارسال ETH از یک آدرس به آدرس دیگر.
- `deployContract` — استقرار یک قرارداد هوشمند جدید روی بلاک‌چین.
- `writeContract` — فراخوانی یک تابع از قرارداد که وضعیت را تغییر می‌دهد (مثلاً انتقال توکن).

این عملیات شامل امضا و پخش تراکنش در شبکه هستند.

---

## ایجاد یک Wallet Client

یک **Wallet Client** با استفاده از تابع `createWalletClient` ساخته می‌شود.

این کلاینت به عنوان واسط اصلی با یک **حساب اتریوم** (یعنی کیف پول یا کلید خصوصی) عمل می‌کند و امکان اجرای امن تراکنش‌های دارای وضعیت را فراهم می‌کند.

### مثال: ایجاد Wallet Client با Viem

~~~~ts
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

// تعریف حساب با استفاده از کلید خصوصی شما
const account = privateKeyToAccount('0xYOUR_PRIVATE_KEY');

// ایجاد Wallet Client
const walletClient = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
});
~~~~

##### مهم: هرگز کلید خصوصی خود را در کد سمت کاربر (مرورگر) نمایش ندهید. از متغیرهای محیطی و مدیریت امن کلید برای استفاده در بک‌اند یا سمت سرور استفاده کنید.

# Test Client و حساب‌ها در Viem

## Test Client

Viem شامل یک **Test Client** است که به طور خاص برای استفاده در **محیط‌های توسعه محلی** مانند **Anvil**، **Hardhat** یا **Ganache** طراحی شده است.

Test Client مجموعه‌ای از **اقدامات تستی** ویژه را فراهم می‌کند که به توسعه‌دهندگان امکان می‌دهد وضعیت شبکه اتریوم محلی را برای اشکال‌زدایی و تست تغییر دهند.

### ویژگی‌های Test Client

- **`impersonateAccount`** — کنترل موقت یک آدرس برای اهداف تستی.
- **`mine`** — استخراج دستی یک بلاک جدید برای شبیه‌سازی گذر زمان یا تایید تراکنش.
- **`setBalance`**، **`setCode`** و غیره — تغییر مستقیم وضعیت زنجیره.

این اقدامات تنها در **محیط‌های تستی** در دسترس هستند و برای جریان‌های تست پیشرفته بسیار حیاتی‌اند.

---

## اصل حداقل دسترسی

Viem با تفکیک واضح کلاینت‌ها، معماری امنی را ترویج می‌دهد:

- از **`PublicClient`** برای اغلب وظایف فرانت‌اند مانند خواندن داده‌ها استفاده کنید (نیاز به امضا ندارد).
- از **`WalletClient`** تنها زمانی استفاده کنید که کاربر باید **تراکنش امضا کند**.
- از **`TestClient`** فقط در تست‌های محلی استفاده شود.

این طراحی به اجرای **اصل حداقل دسترسی** کمک می‌کند، به این معنا که:

- فقط حداقل مجوز موردنیاز به هر بخش از برنامه داده می‌شود.
- قابلیت‌های حساس (مانند ارسال وجه) جداگانه و امن نگهداری می‌شوند.

---

## حساب‌ها: تکامل مفهوم "Signer"

Viem به طور آگاهانه از تغییر اصطلاحی استفاده می‌کند:
- آنچه در Ethers.js با نام **Signer** شناخته می‌شود، در Viem به عنوان **Account** نامیده می‌شود.

### چرا این تغییر؟

- **"Account"** بهتر نمایانگر **هویتی با وجه و قابلیت امضا** است.
- **"Signer"** تنها یک عمل را توصیف می‌کند، نه یک موجودیت.
- این تغییر نام باعث **کد خواناتر** و درک ساده‌تر برای توسعه‌دهندگان می‌شود.

---

## انواع حساب‌ها در Viem

Viem دو دسته اصلی از **حساب‌ها** را پشتیبانی می‌کند:

### 1. حساب‌های JSON-RPC

این‌ها حساب‌هایی هستند که به صورت خارجی مدیریت می‌شوند — معمولاً در کیف پول‌های مرورگری مانند **MetaMask** — و تراکنش‌ها را از طریق **RPC** امضا می‌کنند.

- کلید خصوصی در **داخل کیف پول** باقی می‌ماند.
- عملیات امضا از طریق رابط‌های **EIP-1193** انجام می‌شود.

### ایجاد WalletClient برای حساب JSON-RPC

این تنظیمات برای dAppهایی استفاده می‌شود که با کیف پول کاربر در مرورگر تعامل دارند.

~~~~javascript
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

// فرض بر این است که کد در مرورگری اجرا می‌شود که MetaMask یا کیف پولی با EIP-1193 را تزریق کرده است.
const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!),
});

// درخواست دسترسی به آدرس‌های کاربر
const [address] = await walletClient.requestAddresses();

// اکنون می‌توان آدرس را برای اقدامات کیف پول استفاده کرد.
~~~~

---

## 2. حساب‌های محلی در Viem

**حساب‌های محلی** حساب‌هایی در اتریوم هستند که کلید خصوصی آن‌ها مستقیماً توسط محیط برنامه مدیریت می‌شود، نه توسط یک کیف پول خارجی یا provider تزریق‌شده.

این روش معمولاً در موارد زیر استفاده می‌شود:

- خدمات بک‌اند
- اسکریپت‌ها
- محیط‌های تست و خودکارسازی

در Viem، حساب‌های محلی با استفاده از ابزارهایی در ماژول `viem/accounts` ساخته می‌شوند.

## موارد استفاده از حساب‌های محلی

- اپلیکیشن‌های سمت سرور که باید به صورت برنامه‌نویسی تراکنش‌ها را امضا و ارسال کنند.
- اسکریپت‌های استقرار یا مهاجرت خودکار.
- محیط‌های تستی که نیاز به کنترل کامل حساب دارند.

---

## ایجاد حساب‌های محلی

Viem چند ابزار برای تولید حساب‌های محلی فراهم می‌کند:

- `privateKeyToAccount(privateKey)`
- `mnemonicToAccount(mnemonic)`
- `hdKeyToAccount(hdKey, path)`

این توابع یک آبجکت account بازمی‌گردانند که مستقیماً می‌توان آن را به `WalletClient` پاس داد.

---

## مثال: استفاده از `privateKeyToAccount`

در ادامه راهنمای مرحله‌به‌مرحله برای ساخت و استفاده از یک حساب محلی با Viem آمده است:

### 1. وارد کردن ماژول‌های مورد نیاز

~~~~ts
import { createWalletClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
~~~~

### 2. ایجاد حساب محلی

از کلید خصوصی خود استفاده کنید (مطمئن شوید که آن را امن نگه می‌دارید و هرگز در کنترل نسخه قرار نمی‌دهید):

~~~~ts
const account = privateKeyToAccount('0xYOUR_PRIVATE_KEY_HERE');
~~~~

### 3. ساخت WalletClient با حساب محلی

~~~~ts
const walletClient = createWalletClient({
  account,                             // آبجکت حساب محلی
  chain: mainnet,                      // شبکه هدف (مثلاً mainnet، goerli و غیره)
  transport: http("YOUR_RPC_ENDPOINT_URL"), // ارائه‌دهنده RPC (مثلاً از Infura یا Alchemy)
});
~~~~

#### مثال

~~~~javascript
import { createWalletClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

// 1. ایجاد آبجکت حساب محلی از کلید خصوصی خام
const account = privateKeyToAccount('0x...');

// 2. ایجاد Wallet Client و ارسال مستقیم حساب محلی
const walletClient = createWalletClient({
  account,
  chain: mainnet,
  transport: http("YOUR_RPC_ENDPOINT_URL"),
});

// اکنون این کلاینت می‌تواند تراکنش‌ها را به نمایندگی از حساب امضا و ارسال کند
~~~~

#### مزایای حساب‌های محلی

- کنترل کامل: بدون نیاز به کیف پول‌های خارجی.
- مناسب برای خودکارسازی: ایده‌آل برای CI/CD یا کرون‌جاب‌ها.
- امنیت: کلیدها می‌توانند روی سرور امن نگهداری شوند و هرگز به فرانت‌اند ارسال نمی‌شوند.

#### هشدار

- همیشه با نهایت دقت از کلیدهای خصوصی محافظت کنید.
- هرگز کلید خصوصی را در کد منبع قرار ندهید یا در Git ذخیره نکنید.
- از متغیرهای محیطی و ابزارهای مدیریت راز مانند `.env`، Vault یا مدیر رازهای ابری استفاده کنید.

---

# خواندن وضعیت قرارداد: اقدام `readContract`

## مقدمه

پرس‌وجوی داده از قرارداد هوشمند یکی از ابتدایی‌ترین عملیات‌ها در هر dApp است. Viem اقدام `readContract` را برای این هدف فراهم کرده، با تمرکز بر:

- سادگی
- کارایی
- ایمنی نوع بی‌نظیر

---

## ساختار یک فراخوانی Read

اقدام `readContract` برای فراخوانی توابعی در قراردادهای Solidity استفاده می‌شود که با `view` یا `pure` علامت‌گذاری شده‌اند. این توابع:

- **وضعیت را تغییر نمی‌دهند**
- **نیازی به گس ندارند**
- **می‌توان آن‌ها را با یک `PublicClient` اجرا کرد**

### پارامترهای مورد نیاز

1. **address** – آدرس قرارداد هدف
2. **abi** – ABI قرارداد
3. **functionName** – نام تابع view یا pure

### مثال ساده: خواندن نام توکن DAI (ERC-20)

~~~~ts
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { erc20Abi } from './abi'; // فرض بر این است که فایل ABI موجود است

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const tokenName = await publicClient.readContract({
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // توکن DAI
  abi: erc20Abi,
  functionName: 'name',
});

console.log(`Token name: ${tokenName}`); // خروجی: Token name: Dai Stablecoin
~~~~

---
 
 ## دستیابی به ایمنی کامل نوع‌ها با `as const`

قدرت واقعی تجربه توسعه‌دهنده در Viem زمانی آشکار می‌شود که سیستم استنتاج نوع آن به‌طور کامل مورد استفاده قرار گیرد.

Viem می‌تواند ABI یک قرارداد را در سطح TypeScript تجزیه کرده و نوع‌های دقیق و قوی برای نام توابع، آرگومان‌ها و مقادیر بازگشتی فراهم کند.

برای اینکه این ویژگی کار کند، شیء ABI باید با تأییدیه const در TypeScript (`as const`) تعریف شود یا به صورت درون‌خطی در داخل فراخوانی `readContract` نوشته شود.

این افزودن ساده، ABI را از یک ساختار داده‌ای غیرفعال به ابزاری فعال در زمان کامپایل تبدیل می‌کند. به تعریف زیر برای یک قرارداد ساده Storage توجه کنید:

~~~~typescript
// storageAbi.ts
export const storageAbi = [
  {
    "inputs": [],
    "name": "retrieve",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "num",
        "type": "uint256"
      }
    ],
    "name": "store",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const; // استفاده‌ی حیاتی از 'as const'
~~~~

با استفاده از as const، زمانی که توسعه‌دهنده این ABI را با readContract استفاده می‌کند، ویرایشگر کد تکمیل خودکار را برای functionName فراهم می‌کند (تنها 'retrieve' یا 'store') و دقیقاً می‌داند که هر تابع چه آرگومان‌هایی انتظار دارد و چه مقادیری را بازمی‌گرداند.

## ارسال آرگومان‌ها و مدیریت مقادیر بازگشتی

برای توابعی که آرگومان دارند، از فیلد args (به صورت آرایه) استفاده کنید. اگر ABI به‌درستی تایپ شده باشد، ایمنی نوع اطمینان حاصل می‌کند که آرگومان‌ها صحیح هستند.

### مثال: دریافت موجودی یک آدرس
~~~~ts
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
~~~~

نوع بازگشتی به‌طور خودکار به صورت BigInt تشخیص داده می‌شود و با ابزارهای Viem مانند formatUnits سازگار است.

## گزینه‌های پیشرفته برای خواندن

### خواندن وضعیت تاریخی

شما می‌توانید وضعیت‌های گذشته را با اضافه کردن موارد زیر بازیابی کنید:

- blockNumber

- یا blockTag (مانند 'safe'، 'finalized'، 'earliest'، 'pending')

### مثال:
~~~~ts
const historicBalance = await publicClient.readContract({
  address: '0x...',
  abi: contractAbi,
  functionName: 'balanceOf',
  args: ['0x...'],
  blockTag: 'safe',
});
~~~~

### خواندن‌های دسته‌ای (بهینه‌سازی Multicall)

Viem می‌تواند چندین فراخوانی readContract را به صورت خودکار در یک درخواست multicall RPC دسته‌بندی کند. این کار:

- سربار شبکه را کاهش می‌دهد

- کارایی را در ارائه‌دهندگان RPC پولی بهبود می‌دهد

- عملکرد برنامه را سریع‌تر می‌کند

این قابلیت با فعال کردن گزینه batch در هنگام پیکربندی کلاینت انجام می‌شود.

## خلاصه

- از readContract با PublicClient برای فراخوانی‌های امن و بدون گس استفاده کنید.

- از as const در ABIs برای ایمنی نوع کامل و تکمیل خودکار بهره ببرید.

- برای توابع پارامتردار از args استفاده کرده و از تشخیص خودکار نوع بازگشتی لذت ببرید.

- عملکرد را با استفاده از دسته‌بندی و پرس‌وجوهای تاریخی بهینه کنید.

این ترکیب از ایمنی، سادگی و سرعت، readContract را به ابزاری قدرتمند برای هر dApp مبتنی بر Viem تبدیل می‌کند.

---

# تغییر وضعیت قرارداد: روند `simulateContract` و `writeContract`

## مقدمه

اجرای تراکنشی که وضعیت را تغییر می‌دهد یکی از حساس‌ترین و حیاتی‌ترین عملیات‌ها در هر برنامه غیرمتمرکز (dApp) است. Viem یک روند **مدرن و مبتنی بر ایمنی** ارائه می‌دهد که از الگوهای سنتی در کتابخانه‌های قدیمی بهتر است.

این روند شامل سه گام کلیدی است:

1. `simulateContract`
2. `writeContract`
3. `wait` برای تأیید

---

## چرا ابتدا شبیه‌سازی کنیم؟

تابع اصلی برای اجرای تراکنش `writeContract` است. این عملیات:

- **وضعیت زنجیره را تغییر می‌دهد**
- **گس مصرف می‌کند**
- **باید از طریق `WalletClient` فراخوانی شود**

اما **Viem به‌شدت توصیه می‌کند** که هرگز `writeContract` را مستقیماً فراخوانی نکنید. در عوض، ابتدا باید تراکنش **شبیه‌سازی** شود تا:

- اعتبار ورودی‌ها بررسی شود و از برگشت تراکنش جلوگیری شود
- مصرف گس برآورد شود
- از شکست‌های غیرضروری تراکنش جلوگیری شود
- تجربه کاربری بهبود یابد

---

## گام ۱: `simulateContract`

این بررسی اولیه با استفاده از `publicClient.simulateContract` انجام می‌شود.

### پارامترها

`simulateContract` به موارد زیر نیاز دارد:

- `address`: آدرس قرارداد
- `abi`: ABI قرارداد
- `functionName`: نام تابعی که وضعیت را تغییر می‌دهد
- `args`: آرگومان‌هایی که به تابع داده می‌شود
- `account`: آدرسی که تراکنش را امضا می‌کند

### مقادیر بازگشتی

در صورت موفقیت، `simulateContract` موارد زیر را بازمی‌گرداند:

- **`result`** – مقدار بازگشتی تابع (در صورت وجود)
- **`request`** – شیء درخواست تراکنش کاملاً آماده

### مثال

~~~~ts
import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import { storageAbi } from './abi'; // باید با `as const` تعریف شده باشد
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
~~~~

#### نکات

- فراخوانی را داخل بلوک try...catch قرار دهید.

- از نام خطا ContractFunctionRevertedError برای شناسایی موارد خاص استفاده کنید.

- شیء request در گام بعدی استفاده می‌شود.

---

# تغییر وضعیت قرارداد: روند `simulateContract` و `writeContract`

## مرور کلی

اجرای یک **تراکنش تغییر وضعیت** یکی از حیاتی‌ترین عملیات‌ها در هر dApp است. برای تضمین قابلیت اطمینان و ایمنی، **Viem** یک روند مدرن را پیشنهاد می‌دهد که از مشکلات رایج در کتابخانه‌هایی مانند Ethers.js جلوگیری می‌کند.

Viem یک **روند سه‌مرحله‌ای** برای نوشتن در قرارداد هوشمند پیشنهاد می‌دهد:

1. **simulate**
2. **write**
3. **wait**

---

## نقش حیاتی شبیه‌سازی

تابع اصلی برای اجرای تماس‌های تغییر وضعیت `writeContract` است. این تابع:

- وضعیت بلاکچین را تغییر می‌دهد
- گس مصرف می‌کند
- نیاز به امضاکننده معتبر از طریق `WalletClient` دارد

اما **Viem به‌شدت توصیه می‌کند** که مستقیماً `writeContract` را فراخوانی نکنید. در عوض، ابتدا باید تراکنش را با `simulateContract` شبیه‌سازی کرد.

### چرا شبیه‌سازی کنیم؟

- ✅ پیش‌بینی نتیجه تراکنش

- ✅ شناسایی برگشت‌ها پیش از ارسال

- ✅ برآورد مصرف گس

- ✅ جلوگیری از هدر رفت گس

- ✅ بهبود شفافیت و تجربه کاربری

تابع `simulateContract` یک **اجرای خشک** از تراکنش را در برابر آخرین وضعیت بلاکچین انجام می‌دهد **بدون اینکه آن را پخش کند**.

---

## گام ۱: `simulateContract`

گام اول شبیه‌سازی تعامل با قرارداد است با استفاده از `publicClient.simulateContract`.

### پارامترهای موردنیاز

- `account`: حساب امضاکننده برای شبیه‌سازی

- `address`: آدرس قرارداد هدف

- `abi`: ABI قرارداد (باید با `as const` تایپ شود)

- `functionName`: نام تابع تغییر‌دهنده وضعیت

- `args`: آرگومان‌های موردنیاز

### مقادیر بازگشتی

در صورت موفقیت، `simulateContract` بازمی‌گرداند:

- `result`: مقدار بازگشتی تابع (در صورت وجود)

- `request`: شیء تراکنش آماده ارسال شامل calldata، برآورد گس، و غیره

---

### مثال: شبیه‌سازی یک تماس نوشتنی

~~~~ts
import { publicClient } from './client';
import { storageAbi } from './abi';
import { account } from './config'; // حساب لوکال یا JSON-RPC

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

  // گام بعدی: ارسال تراکنش با walletClient.writeContract(request)

} catch (error) {
  console.error('Simulation failed:', error);

  // مدیریت خطا – مثلاً اطلاع دادن به کاربر که تراکنش شکست می‌خورد
  return;
}
~~~~

همیشه باید simulateContract را در try...catch قرار دهید تا خطاها به‌درستی مدیریت شوند.

### مدیریت خطا

Viem انواع خطاهای ساختاریافته مانند موارد زیر را فراهم می‌کند:

- ContractFunctionRevertedError

- CallExecutionError

این خطاها اطلاعات دقیقی از جمله دلیل برگشت ارائه می‌دهند که به نمایش پیام‌های کاربرپسند یا گزارش خطای دقیق کمک می‌کند.

#### خلاصه

- همیشه پیش از ارسال تراکنش آن را شبیه‌سازی کنید

- از برگشت‌ها و گس هدررفته جلوگیری کنید

- یک شیء درخواست کامل برای امضا آماده کنید

- تنها پس از شبیه‌سازی موفق، از walletClient.writeContract(request) استفاده کنید

شبیه‌سازی تنها یک بهترین‌روش نیست — بلکه روشی ایمن‌تر و قابل‌پیش‌بینی‌تر برای ساخت dAppهای تولیدی با Viem است.

---
## گام ۲: `writeContract`

پس از اینکه یک تراکنش با موفقیت با استفاده از `simulateContract` **شبیه‌سازی** شد و یک **شیء `request`** به دست آمد، گام بعدی **اجرای** تراکنش است.

---

### اجرای تراکنش

برای نوشتن، شیء `request` که از شبیه‌سازی بازگشته مستقیماً به اکشن `walletClient.writeContract` داده می‌شود.

#### سینتکس

~~~~ts
const hash = await walletClient.writeContract(request);
~~~~

#### رفتار
- اگر از حساب JSON-RPC استفاده شود (مثلاً MetaMask)، کاربر برای امضای تراکنش فراخوانی می‌شود.
- اگر از حساب محلی استفاده شود، تراکنش به صورت محلی امضا می‌شود.
- تراکنش امضا شده به شبکه ارسال می‌شود.

#### مقدار بازگشتی
تنها مقدار بازگشتی از `writeContract`، هش تراکنش است:

~~~~ts
console.log('Transaction submitted. Hash:', hash);
~~~~

تابع `writeContract` بلافاصله پس از ارسال تراکنش بازمی‌گردد و منتظر تأیید ماین شدن آن نمی‌ماند.

~~~~javascript
import { walletClient } from './client';

// فرض کنید 'request' از شبیه‌سازی موفق به دست آمده است.
const hash = await walletClient.writeContract(request);
console.log('Transaction sent. Hash:', hash);
// در این نقطه می‌توان وضعیت "تراکنش در حال انتظار" را در رابط کاربری نمایش داد.
~~~~

## گام ۳: `waitForTransactionReceipt`

پس از ارسال تراکنش با استفاده از `writeContract`، گام نهایی در روند کاری این است که **منتظر ماین شدن و تأیید تراکنش** روی بلاکچین بمانیم.

---

### انتظار برای تأیید

برای این کار، هش تراکنش برگشتی از `writeContract` را به اکشن `publicClient.waitForTransactionReceipt` می‌دهیم.

#### سینتکس

~~~~ts
const receipt = await publicClient.waitForTransactionReceipt({ hash });
~~~~

#### این تابع:

- شبکه را نظرسنجی می‌کند.
- زمانی که تراکنش در یک بلاک قرار گرفت، حل می‌شود.
- یک شیء دقیق از نوع TransactionReceipt بازمی‌گرداند.

#### مثال استفاده

~~~~ts
const receipt = await publicClient.waitForTransactionReceipt({ hash });

console.log('Transaction confirmed in block:', receipt.blockNumber);
console.log('Status:', receipt.status); // 'success' یا 'reverted'
console.log('Gas used:', receipt.gasUsed);
~~~~

#### شیء Receipt

- شیء TransactionReceipt بازگشتی شامل موارد زیر است:
  - status: نشان‌دهنده 'success' یا 'reverted'
  - blockNumber: شماره بلاکی که تراکنش در آن قرار گرفته
  - gasUsed: مقدار گس مصرف‌شده
  - logs: هر رویدادی که ارسال شده است
  - transactionHash، from، to و غیره

### گزینه‌های پیشرفته

#### confirmations

~~~~ts
await publicClient.waitForTransactionReceipt({
  hash,
  confirmations: 3, // منتظر ۳ بلاک پس از درج تراکنش بمانید
});
~~~~

این برای برنامه‌هایی که نیاز به تضمین نهایی شدن بالاتر دارند به ویژه در زنجیره‌هایی که مستعد تغییرات زنجیره‌ای (reorg) هستند مفید است.

#### onReplaced

~~~~ts
await publicClient.waitForTransactionReceipt({
  hash,
  onReplaced: (replacement) => {
    console.warn('Transaction was replaced:', replacement);
  },
});
~~~~

این کال‌بک موارد لبه‌ای را مدیریت می‌کند که در آن:

- کاربر تراکنش در حال انتظار را "شتاب می‌دهد" (speed up).
- کاربر تراکنش را از طریق کیف پول خود "لغو" می‌کند.

این کال‌بک اطلاعاتی درباره تراکنش جایگزین شده ارائه می‌دهد و به اپلیکیشن کمک می‌کند تا به درستی واکنش نشان دهد.

## نکات

- این مرحله چرخه عمر تراکنش را کامل می‌کند: شبیه‌سازی → نوشتن → انتظار.
- از رسید تراکنش برای به‌روزرسانی رابط کاربری، رویدادهای بک‌اند، تحلیل‌ها یا اعلان‌ها استفاده کنید.
- همیشه قبل از فرض موفقیت تراکنش، مقدار receipt.status را بررسی کنید.

### با این سه گام — simulateContract، writeContract، و waitForTransactionReceipt — Viem یک روش امن، قابل‌اعتماد و مدرن برای توسعه dAppهای اتریوم ارائه می‌دهد.

## مثال کامل انتها به انتها

بلاک کد زیر یک مثال کامل و کامنت‌دار از کل چرخه شبیه‌سازی -> نوشتن -> انتظار ارائه می‌دهد که این الگوی قوی را تثبیت می‌کند.

~~~~javascript
import {
  createPublicClient,
  createWalletClient,
  http,
  parseGwei,
} from 'viem';
import { mainnet } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { storageAbi } from './abi'; // فرض بر این است که ABI قرارداد Storage ساده است

async function main() {
  // ۱. راه‌اندازی کلاینت‌ها و حساب
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

  // ۲. گام اول: شبیه‌سازی تراکنش
  console.log('Simulating transaction...');
  let request;
  try {
    const { request: simRequest } = await publicClient.simulateContract({
      account,
      address: contractAddress,
      abi: storageAbi,
      functionName: 'store',
      args:, // ذخیره یک عدد تصادفی
    });
    request = simRequest;
    console.log('Simulation successful!');
  } catch (err) {
    console.error('Transaction simulation failed:', err);
    return;
  }

  // ۳. گام دوم: ارسال تراکنش
  console.log('Sending transaction...');
  const hash = await walletClient.writeContract(request);
  console.log('Transaction hash:', hash);

  // ۴. گام سوم: انتظار برای رسید تراکنش
  console.log('Waiting for transaction receipt...');
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  console.log('Transaction confirmed!');
  console.log('Status:', receipt.status);
  console.log('Block Number:', receipt.blockNumber.toString());
}

main().catch(console.error);

~~~~

این روند سه‌گامۀ معماری به صورت عمدی طراحی شده تا اعتبارسنجی، ارسال و تأیید تراکنش را از هم جدا کند.

این جداسازی منجر به برنامه‌هایی می‌شود که بسیار امن‌تر هستند چون از تراکنش‌های شکست‌خورده جلوگیری می‌کنند، پاسخگو‌تر هستند چون فیدبک فوری UI ارائه می‌دهند و با طراحی مقاوم‌تری ساخته شده‌اند.

# تعامل با رویدادهای قرارداد

رویدادهای قرارداد هوشمند مکانیزمی حیاتی برای انتقال اطلاعات از بلاکچین به برنامه‌های خارج از زنجیره هستند.

Viem یک API قدرتمند و منعطف برای هم گوش دادن به رویدادهای زنده به صورت زمان واقعی و هم پرس‌وجوی لاگ‌های تاریخی رویدادها فراهم می‌کند.

---

## گوش دادن به رویدادهای زنده: `watchContractEvent`

برای اشتراک در رویدادهایی که توسط قرارداد منتشر می‌شوند، Viem اکشن `publicClient.watchContractEvent` را ارائه می‌دهد.

این تابع یک شنونده تنظیم می‌کند که بلاکچین را بررسی کرده و هر زمان رویداد جدیدی یافت شد، تابع کال‌بک را فراخوانی می‌کند.

### ویژگی‌ها و پیکربندی

- **همه رویدادها یا رویدادهای خاص:**  
  می‌توانید همه رویدادهای منتشر شده توسط قرارداد را ببینید یا فقط بر اساس یک `eventName` خاص فیلتر کنید.

- **فیلتر بر اساس آرگومان‌های ایندکس‌شده:**  
  برای کنترل دقیق‌تر، شنونده می‌تواند رویدادها را بر اساس مقادیر آرگومان‌های **ایندکس‌شده** با پارامتر `args` فیلتر کند.

- **تابع کال‌بک:**  
  هر بار که رویداد مطابق پیدا شد، این تابع فراخوانی می‌شود.

### مدیریت منابع

ویژگی مهم این اکشن مدیریت صریح منابع است:

- `watchContractEvent` یک **تابع `unwatch`** بازمی‌گرداند.
- شما **باید `unwatch()` را فراخوانی کنید** زمانی که دیگر نیازی به شنیدن رویداد نیست (مثلاً وقتی کاربر صفحه یا کامپوننت را ترک می‌کند).
- این کار از **نشت حافظه** و درخواست‌های غیرضروری به بلاکچین جلوگیری می‌کند.

این مدیریت صریح منابع منعکس‌کننده فلسفه معماری Viem در زمینه وضوح و ایمنی است.

---

### مثال

مثال زیر نشان می‌دهد چگونه رویدادهای Transfer از قرارداد توکن ERC-20 را مشاهده کنیم:

~~~~javascript
import { publicClient } from './client';
import { erc20Abi } from './abi';

console.log('Watching for Transfer events...');

const unwatch = publicClient.watchContractEvent({
  address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // توکن DAI Stablecoin
  abi: erc20Abi,
  eventName: 'Transfer',
  onLogs: (logs) => {
    console.log('New Transfer event(s) detected:', logs);
    logs.forEach(log => {
      // خاصیت 'args' به لطف ABI به‌طور کامل تایپ شده است
      const { from, to, value } = log.args;
      console.log(`  - From: ${from}, To: ${to}, Value: ${value}`);
    });
  },
  onError: (error) => {
    console.error('Error watching events:', error);
  }
});

// برای توقف گوش دادن بعد از مدتی (مثلاً ۶۰ ثانیه):
setTimeout(() => {
  unwatch();
  console.log('Stopped watching for events.');
}, 60000);
~~~~

این طراحی همچنین مقاوم در برابر خطاست. مستندات اشاره می‌کند که `watchContractEvent` هوشمندانه سعی می‌کند از روش RPC بهینه‌تر `eth_newFilter` استفاده کند، اما اگر ارائه‌دهنده RPC متصل شده از فیلترها پشتیبانی نکند، به‌طور خودکار و بی‌وقفه به روش `eth_getLogs` که پشتیبانی وسیع‌تری دارد، بازمی‌گردد.

این موضوع تجربه‌ای با کارایی بالا و پایدار برای توسعه‌دهنده فراهم می‌کند بدون نیاز به منطق شرطی پیچیده.

# پرس‌وجوی رویدادهای تاریخی

برای برنامه‌هایی که نیاز دارند **لاگ‌های رویداد گذشته** را بازیابی کنند، Viem یک **روند دو مرحله‌ای** ارائه می‌دهد که هم قدرتمند و هم کارآمد است.

---
## گام ۱: ایجاد فیلتر — `createContractEventFilter`

اولین گام **ایجاد یک شیء فیلتر** با استفاده از اکشن `createContractEventFilter` است.

این تابع امکان **مشخص کردن دقیق** لاگ‌های مورد نظر را فراهم می‌کند، از جمله:

- **`eventName`** – رویداد خاصی که می‌خواهید فیلتر کنید.
- **`args`** – مقادیر پارامترهای ایندکس شده رویداد.
- **`fromBlock` / `toBlock`** – بازه بلاک‌هایی که باید جستجو انجام شود.

این روش ساختاریافته کنترل دقیق بر اینکه کدام لاگ‌ها بازگردانده شوند را فراهم می‌کند و دریافت داده‌های غیرضروری را به حداقل می‌رساند.

---

## گام ۲: دریافت لاگ‌ها — `getFilterLogs`

پس از ایجاد فیلتر، آن را به اکشن `getFilterLogs` پاس دهید.

این اکشن از نود پرس‌وجو کرده و یک **آرایه شامل تمام ورودی‌های لاگ مطابقت داده شده** را بازمی‌گرداند که هر کدام نمایانگر رویدادی منتشر شده است که معیارهای فیلتر را ارضا می‌کند.

### این مثال نشان می‌دهد چگونه تمام رویدادهای Transfer به یک آدرس خاص در ۱۰۰ بلاک اخیر بازیابی شود:
~~~~javascript
import { publicClient } from './client';
import { erc20Abi } from './abi';

async function fetchHistoricalTransfers() {
  const toAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'; // vitalik.eth
  const currentBlock = await publicClient.getBlockNumber();

  // ۱. ایجاد فیلتر رویداد
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

  // ۲. دریافت لاگ‌های مطابق با فیلتر
  const logs = await publicClient.getFilterLogs({ filter });

  console.log(`تعداد ${logs.length} انتقال ورودی به ${toAddress} در ۱۰۰ بلاک اخیر یافت شد.`);
  console.log(logs);
}

fetchHistoricalTransfers().catch(console.error);
~~~~

# نمونه‌ی `getContract`: یک مدل تعامل جایگزین

در حالی که الگوی اصلی تعامل Viem **تابعی و بدون حالت** است (مثلاً `client.readContract(...)`)، این کتابخانه همچنین یک مدل جایگزین و بیشتر **شیء‌گرا** ارائه می‌دهد. این مدل به‌ویژه برای توسعه‌دهندگانی که از کتابخانه‌هایی مانند Ethers.js مهاجرت می‌کنند، مفید است. این قابلیت با استفاده از ابزار `getContract` فراهم شده است.

---

## ایجاد نمونه قرارداد

تابع `getContract` یک **نمونه قرارداد** می‌سازد که موارد زیر را در خود جای می‌دهد:

- **آدرس** قرارداد
- **ABI** آن (رابط باینری برنامه کاربردی)
- یک یا چند **کلاینت** (PublicClient و/یا WalletClient)

این کار استفاده مجدد از کد را ساده می‌کند و نیاز به پاس دادن مکرر پارامترهای مشابه را حذف می‌کند.

شما می‌توانید نمونه‌های زیر را ایجاد کنید:

- نمونه **فقط خواندنی** با استفاده از `PublicClient`
- نمونه با قابلیت **نوشتن** با استفاده از `WalletClient`
- یا نمونه **کامل** با هر دو

~~~~ts
import { getContract } from 'viem';
import { publicClient, walletClient } from './client';
import { storageAbi } from './abi';

const contractAddress = '0xYourDeployedContractAddress';

// ایجاد نمونه قرارداد با هر دو کلاینت عمومی و کیف پول
const contract = getContract({
  address: contractAddress,
  abi: storageAbi,
  client: { public: publicClient, wallet: walletClient },
});
~~~~

# تعامل با نمونه قرارداد

پس از ایجاد نمونه قرارداد، تعامل با آن از طریق سینتکس زنجیره‌ای و راحت انجام می‌شود که از استنتاج نوع Viem برای تکمیل خودکار و ایمنی کامل بهره می‌برد.

## خواندن وضعیت

عملیات خواندن از طریق ویژگی `read` در دسترس است.

~~~~ts
const currentValue = await contract.read.retrieve();
console.log(`مقدار فعلی ذخیره شده: ${currentValue}`);
~~~~

## نوشتن وضعیت

عملیات نوشتن از طریق ویژگی `write` در دسترس است. این همچنان بهترین روش شبیه‌سازی را دنبال می‌کند، اما سینتکس کمی متفاوت است. متد `simulate` روی نمونه در دسترس است و سپس می‌توان متد `write` را فراخوانی کرد.

با این حال، برای یک روند کامل، اغلب واضح‌تر است که از نمونه برای فراخوانی `write` استفاده شود، پس از شبیه‌سازی با کلاینت عمومی.

برای سادگی، فراخوانی مستقیم نوشتن اینجا نشان داده شده است که معمولاً با شبیه‌سازی قبلی همراه است.

~~~~ts
const hash = await contract.write.store([500n]);
console.log('تراکنش ارسال شده برای ذخیره مقدار جدید. هش:', hash);
~~~~

## نظارت بر رویدادها

شنونده‌های رویداد از طریق ویژگی `watchEvent` در دسترس هستند.

~~~~ts
const unwatch = contract.watchEvent.ValueStored({}, {
  onLogs: logs => console.log('رویداد ValueStored تشخیص داده شد:', logs)
});
~~~~

این مدل تعامل همچنین به طور کامل با فریم‌ورک‌های توسعه مانند Hardhat از طریق افزونه `hardhat-viem` ادغام شده است که ابزارهایی مانند `hre.viem.deployContract` و `hre.viem.getContractAt` را فراهم می‌کند که نمونه‌های تایپ‌شده مشابه را بازمی‌گردانند.

---

# موازنه‌ها: راحتی در مقابل اندازه بسته

اصلی‌ترین موازنه در استفاده از نمونه `getContract` اندازه بسته (bundle size) است.

در حالی که این الگو راحتی عدم تکرار `address` و `abi` برای هر فراخوانی را ارائه می‌دهد، برای درخت‌تراشی (tree-shaking) بهینه نیست.

وقتی نمونه قرارداد ساخته می‌شود، به صورت همزمان کد تعداد زیادی از اکشن‌های قرارداد (`readContract`, `writeContract`, `estimateContractGas`, `watchContractEvent` و غیره) را وارد می‌کند.

اگر یک برنامه فقط از زیرمجموعه کوچکی از این اکشن‌ها استفاده کند (مثلاً فقط خواندن از قرارداد)، حجم نهایی بسته تولید شده ممکن است بزرگ‌تر از زمانی باشد که از اکشن‌های تابعی و درخت‌تراش‌پذیر (`client.readContract`) استفاده شود.

وجود نمونه `getContract` گواهی است بر طراحی عمل‌گرایانه Viem. با وجود تمایل فلسفی قوی برای مدل تعاملی تابعی و بدون حالت، کتابخانه "درهای خروجی" ارائه می‌دهد.

این الگوی جایگزین به عنوان پلی آشنا برای توسعه‌دهندگانی که از Ethers.js مهاجرت می‌کنند عمل می‌کند و در عین حال مزایای اصلی ایمنی نوع Viem را حفظ می‌کند.

---

# Viem در مقایسه: تحلیل مقایسه‌ای با Ethers.js

## تفاوت‌های فلسفی و معماری

تمایز فلسفی اصلی در اهداف اولیه آنها نهفته است. Ethers.js به یک مجموعه ابزار جامع، بالغ و غنی از ویژگی‌ها تبدیل شده است که به خاطر پایداری و حمایت گسترده جامعه ارزشمند است.

این گزینه‌ای قابل اطمینان برای dAppهای پیچیده است که نیازمند طیف وسیعی از قابلیت‌ها به صورت پیش‌فرض هستند.

از سوی دیگر، Viem با هدف صریح حل "کوادریلمما" (چهارگانۀ چالش‌ها) ایجاد شده است، با بهینه‌سازی همزمان برای عملکرد، اندازه بسته، پایداری و تجربه توسعه‌دهنده.

نتیجه این شده که کتابخانه‌ای مینیمالیستی‌تر، مدولارتر و عملکردگرا ارائه شود. طراحی API آن این فلسفه را بازتاب می‌دهد: در حالی که Ethers.js اغلب از مدل شیء‌گرای انتزاعی‌تر استفاده می‌کند (مانند Provider، Signer، نمونه‌های Contract)، Viem مدل صریح و تابعی را ترجیح می‌دهد (مانند PublicClient، WalletClient و اکشن‌های مستقل).

## مسیر مهاجرت

برای تیم‌های توسعه که به دنبال مهاجرت از Ethers.js به Viem هستند، تغییر شامل چندین جابجایی مفهومی کلیدی است. مستندات رسمی Viem راهنمای جامعی برای مهاجرت دارد که مفاهیم و متدهای Ethers.js را به معادل‌های آن‌ها در Viem نگاشت می‌کند. مهم‌ترین تغییراتی که باید درک شوند عبارت‌اند از:

- **Provider تبدیل به Client می‌شود:**  
  مفهوم Provider جای خود را به PublicClient و WalletClient خاص‌تر می‌دهد.

- **Signer تبدیل به Account می‌شود:**  
  Signer جای خود را به شیء Account می‌دهد که می‌تواند حساب JSON-RPC یا حساب محلی باشد.

- **متدهای نمونه تبدیل به اکشن‌ها می‌شوند:**  
  مدل تعامل اصلی از فراخوانی متد روی نمونه‌های stateful Contract به استفاده از اکشن‌های مستقل و تابعی روی کلاینت‌ها تغییر می‌کند.

## توصیه‌ها

توصیه‌های استراتژیک زیر برای تیم‌های توسعه قابل ارائه است:

### Viem را انتخاب کنید برای:
- تمام پروژه‌های جدید dApp، به ویژه آنهایی که عملکرد و تجربه کاربری اهمیت دارد.
- برنامه‌های وب با نیاز به عملکرد بالا.
- تیم‌هایی که می‌خواهند از قدرت کامل TypeScript مدرن برای کیفیت و ایمنی بهتر کد بهره ببرند.
- پروژه‌هایی که کوچک نگه داشتن اندازه نهایی بسته اهمیت دارد.
- توسعه‌دهندگانی که می‌خواهند درک عمیق‌تری از مکانیزم‌های زیربنایی اتریوم پیدا کنند به دلیل وضوح آموزشی آن.

### Ethers.js را در نظر بگیرید برای:
- نگهداری پروژه‌های بزرگ و قدیمی با کدهای گسترده Ethers.js که هزینه مهندسی مهاجرت کامل قابل توجیه نیست.
- تیم‌هایی که ترجیح قوی و تثبیت شده‌ای برای طراحی API شیء‌گرای خاص آن دارند.
- پروژه‌هایی که از اکوسیستم بالغ، گسترده و مستندات و آموزش‌های فراوان Ethers.js بهره می‌برند.

---
# مقدمه: استک wagmi

استک wagmi از سه فناوری حیاتی تشکیل شده که با هم هماهنگ کار می‌کنند:

- **wagmi:** کتابخانه‌ی سطح بالا در React Hooks که API ساده و کاربرپسندی برای مدیریت کیف‌پول‌ها، تعامل با قراردادها و مدیریت داده‌های زنجیره‌ای ارائه می‌دهد.

- **viem:** رابط TypeScript سطح پایین و با کارایی بالا که موتور قدرتمندی برای اجرای تمامی عملیات بلاکچین است. جانشین مدرن ethers.js در این اکوسیستم محسوب می‌شود.

- **TanStack Query:** کتابخانه‌ی پیشرفته مدیریت حالت غیرهمزمان که قابلیت‌های caching، واکشی داده و همگام‌سازی حالت پیشرفته wagmi را پشتیبانی می‌کند و تجربه‌ی کاربری واکنشی و روانی را به‌صورت آماده فراهم می‌کند.

رابطه بین wagmi و viem به‌خصوص قابل توجه است. انتقال از ethers.js به viem صرفاً جایگزینی وابستگی نبود؛ بلکه بازسازی بنیادی بود.

# مفاهیم پایه: استک مدرن wagmi و viem

درک نقش‌های متمایز هر مؤلفه در استک wagmi برای بهره‌برداری کامل از آن حیاتی است. معماری به‌صورت لایه‌ای طراحی شده تا هم راحتی سطح بالا و هم قدرت سطح پایین را ارائه کند.

## نقش wagmi

wagmi به عنوان لایه‌ای نظرمحور و کاربرپسند برای توسعه‌دهنده عمل می‌کند. این "روش React" برای ساخت برنامه‌های بلاکچین است.

این کتابخانه بیش از ۴۰ React Hook غنی ارائه می‌دهد که جزئیات پیچیده اتصال کیف‌پول، مدیریت وضعیت حساب، امضای تراکنش و تعامل با قراردادهای هوشمند را به شکلی زیبا انتزاع می‌کند.

با استفاده از هوک‌ها، توسعه‌دهندگان می‌توانند وضعیت پیچیده زنجیره‌ای را با همان الگوهای اعلانی که در توسعه مدرن React آشنا هستند مدیریت کنند، که به شدت کدهای تکراری را کاهش می‌دهد و خوانایی کد را بهبود می‌بخشد.

## موتور viem

در زیر سطح wagmi، viem قرار دارد، موتور با کارایی بالا که همه ارتباطات با بلاکچین را انجام می‌دهد.

از آنجا که wagmi مستقیماً روی viem ساخته شده، برنامه‌هایی که از wagmi استفاده می‌کنند به صورت خودکار از مزایای viem بهره می‌برند. این منجر به dAppهای سریع‌تر و فرآیند توسعه‌ای مقاوم‌تر می‌شود که بسیاری از خطاهای احتمالی در زمان کامپایل شناسایی می‌شوند نه زمان اجرا.

## مدیریت حالت با TanStack Query

ویژگی اصلی که wagmi را متمایز می‌کند، ادغام عمیق آن با TanStack Query برای تمام مدیریت حالت غیرهمزمان است. این فقط یک جزئیات پیاده‌سازی نیست؛ بلکه ستون بنیادی فریم‌ورک است که مجموعه‌ای از ویژگی‌های قدرتمند را به‌صورت آماده ارائه می‌دهد:

- **کشینگ:** داده‌های زنجیره‌ای را به‌طور هوشمندانه کش می‌کند تا از درخواست‌های تکراری شبکه جلوگیری شود. مثلاً موجودی یک توکن، پس از واکشی، ذخیره شده و در درخواست‌های بعدی از کش ارائه می‌شود و باعث می‌شود رابط کاربری فوری به نظر برسد.

- **حذف درخواست‌های تکراری:** اگر چند مؤلفه در یک صفحه همزمان داده یکسانی را درخواست کنند، wagmi تضمین می‌کند که فقط یک درخواست به نود RPC ارسال شود، که کارایی را بهبود می‌بخشد و بار را کاهش می‌دهد.

- **پایداری:** می‌تواند به گونه‌ای پیکربندی شود که داده‌های کش را در حافظه محلی ذخیره کند، که به dAppها اجازه می‌دهد برای کاربران بازگشتی حتی پیش از کامل شدن درخواست تازه به سرعت بارگذاری شوند.

- **بازواکشی خودکار:** این فریم‌ورک ذاتاً واکنشی است. به طور خودکار به رویدادهای زنجیره‌ای گوش می‌دهد و به هوشمندی داده‌های مرتبط را بازواکشی می‌کند وقتی کاربر حساب را عوض می‌کند، شبکه تغییر می‌کند یا بلاک جدید استخراج می‌شود. این مقدار زیادی منطق همگام‌سازی دستی را که قبلاً توسعه‌دهندگان باید می‌نوشتند حذف می‌کند.

# تحلیل مقایسه‌ای استک‌های فرانت‌اند Web3

برای قرار دادن مزایای این استک مدرن در زمینه، جدول زیر آن را در مقابل روش‌های قدیمی‌تر مانند استفاده مستقیم از ethers.js یا با کتابخانه web3-react مقایسه می‌کند.

| ویژگی               | استک wagmi و viem                                                                                       | ethers.js (با منطق سفارشی React) / web3-react                                          |
|---------------------|-------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| تجربه توسعه‌دهنده   | هوک‌های سطح بالا، APIهای ترکیب‌پذیر، داده‌های با بازخوانی خودکار و مدیریت حالت یکپارچه جریان کاری ساده را فراهم می‌کند. APIهای صریح اما مفصل فهم را افزایش می‌دهند. | سطح پایین‌تر و بیشتر دستی. توسعه‌دهندگان باید منطق مدیریت حالت، کشینگ و واکشی داده را خودشان پیاده کنند که باعث تکرار کد بیشتر می‌شود. |
| ایمنی نوع           | استثنایی. استنتاج خودکار قوی از ABI قراردادها و ساختارهای داده EIP-712. تکمیل خودکار و اعتبارسنجی ایستا به طور قابل توجهی خطاهای زمان اجرا را کاهش می‌دهد. | وجود دارد اما کمتر یکپارچه است. نیاز به تعریف دستی بیشتر نوع‌ها دارد و استنتاج خودکار عمیق wagmi و viem را ندارد. |
| عملکرد و اندازه بسته | بسیار بهینه شده. viem مینیمالیستی و درخت‌تراش‌پذیر است که منجر به بسته‌های بسیار کوچک فرانت‌اند می‌شود. الگوریتم‌های رمزگذاری و پارس سریع دارد. | ethers.js بزرگ‌تر و مونولیتیک‌تر است که اندازه بسته بیشتری دارد. عملکرد برای استفاده عمومی قوی است اما برای اندازه بسته فرانت‌اند بهینه نیست. |
| مدیریت حالت         | از طریق TanStack Query تعبیه شده است. کشینگ پیشرفته، حذف درخواست تکراری و پایداری ویژگی‌های اصلی و آماده است. | شامل نمی‌شود. توسعه‌دهنده باید خود راه‌حل مدیریت حالت را از ابتدا پیاده کند که پیچیدگی و احتمال خطا را افزایش می‌دهد. |
| اکوسیستم و پایداری  | اکوسیستم مدرن و در حال رشد سریع با کیت‌های UI قوی مثل ConnectKit و RainbowKit. توسط سازندگان به صورت تمام‌وقت نگهداری می‌شود. | بالغ، تست شده در میدان و پایدار با جامعه بزرگ و تثبیت شده. ethers.js مستقل از فریم‌ورک است و انعطاف‌پذیر ولی کمتر برای React بهینه شده است. |

---

# راه‌اندازی سریع پروژه و پیکربندی

## نصب

wagmi و وابستگی‌های هم‌نیاز آن یعنی viem و @tanstack/react-query را نصب کنید.

~~~~bash
npm install wagmi viem@2.x @tanstack/react-query
~~~~

## پیکربندی

- یک فایل پیکربندی مرکزی ایجاد کنید، مثلاً config.ts.

- با استفاده از تابع createConfig زنجیره‌های پشتیبانی‌شده و روش ارتباطی را تعریف کنید.

~~~~javascript
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
~~~~

## ارائه‌دهنده‌های برنامه

- ریشه برنامه را با WagmiProvider و QueryClientProvider بپیچید.

- این کار تنظیمات wagmi و کلاینت TanStack Query را در دسترس کل درخت مؤلفه‌ها قرار می‌دهد.

~~~~javascript
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './config'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* مؤلفه‌های برنامه شما */}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
~~~~

## ساخت مؤلفه اتصال کیف‌پول

### هوک‌های اصلی

- useAccount: اطلاعات حساب متصل شده مانند آدرس و وضعیت اتصال را فراهم می‌کند.

- useConnect: تابعی برای شروع اتصال کیف‌پول و فهرستی از کانکتورهای موجود را برمی‌گرداند.

- useDisconnect: تابعی برای قطع جلسه کیف‌پول فعلی ارائه می‌دهد.

- useBalance: موجودی توکن بومی یک آدرس مشخص را واکشی می‌کند.

### مثال مؤلفه

- این مؤلفه یک دکمه "اتصال کیف‌پول" نمایش می‌دهد.

- پس از اتصال، آدرس کاربر، موجودی و دکمه "قطع اتصال" را نشان می‌دهد.

~~~~javascript
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { injected } from 'wagmi/connectors'

export function WalletComponent() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div>
        <p>آدرس متصل شده: {address}</p>
        <p>موجودی: {balance?.formatted} {balance?.symbol}</p>
        <button onClick={() => disconnect()}>
          قطع اتصال
        </button>
      </div>
    )
  }

  return (
    <button onClick={() => connect({ connector: injected() })}>
      اتصال کیف‌پول
    </button>
  )
}
~~~~

## تعامل با قراردادهای هوشمند

## خواندن از قرارداد

- از هوک useReadContract برای توابع view یا pure که نیاز به تراکنش ندارند استفاده کنید.

- آدرس قرارداد، abi، نام تابع و آرگومان‌های لازم را فراهم کنید.

~~~~javascript
import { useReadContract } from 'wagmi'
import { contractAbi } from './abi'

const contractAddress = '0x...' // آدرس قرارداد مستقر شده

export function ReadContractComponent() {
  const { data, isPending, error } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'totalSupply',
  })

  if (isPending) return <div>در حال بارگذاری...</div>
  if (error) return <div>خطا: {error.shortMessage}</div>
  
  return <div>کل عرضه: {data?.toString()}</div>
}
~~~~

## نوشتن در قرارداد

- از هوک useWriteContract برای توابعی که وضعیت را تغییر می‌دهند و نیاز به تراکنش دارند استفاده کنید.

- این هوک یک تابع writeContract را برمی‌گرداند که برای شروع تراکنش باید فراخوانی شود.

- برای نظارت بر وضعیت تایید تراکنش از useWaitForTransactionReceipt استفاده کنید.

~~~~javascript
import * as React from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { contractAbi } from './abi'

const contractAddress = '0x...' // آدرس قرارداد مستقر شده

export function WriteContractComponent() {
  const { data: hash, isPending, writeContract } = useWriteContract()

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'mint',
      args: [1n], // مثال: ساخت یک توکن
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ hash })

  return (
    <form onSubmit={submit}>
      <button type="submit" disabled={isPending || isConfirming}>
        {isPending ? 'در انتظار تایید...' : isConfirming ? 'در حال ساخت...' : 'ساخت NFT'}
      </button>
      {hash && <div>هش تراکنش: {hash}</div>}
      {isConfirmed && <div>تراکنش موفقیت‌آمیز بود!</div>}
    </form>
  )
}
~~~~

---
# راه‌اندازی محیط و پیکربندی اصلی

راه‌اندازی یک پروژه wagmi شامل نصب پکیج‌های لازم و ایجاد یک فایل پیکربندی مرکزی است که رفتار کامل dApp را روی زنجیره تعریف می‌کند. این رویکرد متمرکز یک الگوی معماری کلیدی است که پیش‌بینی‌پذیری و نگهداری را بهبود می‌بخشد.

## نصب و وابستگی‌ها

برای شروع، wagmi و وابستگی‌های مهم آن یعنی viem و @tanstack/react-query را نصب کنید. نصب هر سه ضروری است چون wagmi به آنها وابسته است.

~~~~bash
npm install wagmi viem@2.x @tanstack/react-query
~~~~

# تابع `createConfig` در wagmi

تابع `createConfig` سنگ بنای یک برنامه wagmi است. این تابع یک شیء پیکربندی واحد تولید می‌کند که نقش یک مانیفست اعلانی برای تمام تعاملات بلاکچین را دارد.

این شیء تعاریف شبکه‌های پشتیبانی شده، گزینه‌های اتصال کیف‌پول و روش‌های ارتباطی را متمرکز می‌کند.

## هدف اصلی

- تعریف شبکه‌های بلاکچین پشتیبانی شده  
- فهرست کانکتورهای کیف‌پول در دسترس  
- نگاشت روش‌های انتقال برای هر زنجیره  

---

## توضیح ویژگی‌ها

### ۱. chains

- نوع: Chain[]  
- وارد شده از: wagmi/chains (نماینده viem/chains)  
- هدف: تعریف شبکه‌های بلاکچینی که برنامه شما پشتیبانی می‌کند.  

### ۲. connectors

- نوع: Connector[]  
- هدف: فهرست گزینه‌های کیف‌پول که کاربران می‌توانند برای اتصال استفاده کنند.  
- ارائه شده توسط: wagmi/connectors  
- کانکتورهای موجود:  
  - injected() – برای MetaMask و کیف‌پول‌های مشابه مرورگر.  
  - walletConnect() – برای کیف‌پول‌های سازگار با WalletConnect.  
  - coinbaseWallet() – برای Coinbase Wallet.  

### ۳. transports

- نوع: { [chainId: number]: Transport }  
- هدف: نگاشت هر زنجیره به روش انتقالی که برای ارسال درخواست‌ها استفاده می‌شود.  
- روش رایج: http()  

شما می‌توانید URLهای RPC سفارشی یا خصوصی برای بهبود عملکرد و حفظ حریم خصوصی ارائه دهید.

نمونه زیر یک پیکربندی قوی برای یک dApp با پشتیبانی از چهار زنجیره و سه نوع کیف‌پول را نشان می‌دهد.

~~~~javascript
import { http, createConfig } from 'wagmi';
import { mainnet, sepolia, optimism, base } from 'wagmi/chains';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';

// گرفتن شناسه پروژه از WalletConnect Cloud حیاتی است
const projectId = '<YOUR_WALLETCONNECT_PROJECT_ID>';

export const config = createConfig({
  chains: [mainnet, sepolia, optimism, base],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    coinbaseWallet({ appName: 'My Awesome dApp' }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [optimism.id]: http(),
    [base.id]: http('https://my-private-base-rpc.com'), // نمونه استفاده از RPC سفارشی
  },
});
~~~~

# ارائه‌دهنده‌های سطح برنامه در wagmi

پس از ساخت شیء `config`، باید آن را در کل برنامه در دسترس قرار دهید. این کار با پیچیدن مؤلفه ریشه در دو provider انجام می‌شود: `WagmiProvider` و `QueryClientProvider`.

## مرور ارائه‌دهنده‌ها

### ۱. `WagmiProvider`

- شیء `config` را به عنوان پراپ می‌پذیرد.  
- از React Context برای دسترسی همه هوک‌های wagmi (مثل `useAccount`, `useConnect`, `useContractRead` و غیره) به پیکربندی استفاده می‌کند.  
- برای مقداردهی اولیه wagmi در برنامه ضروری است.  

### ۲. `QueryClientProvider`

- از **TanStack Query** (`@tanstack/react-query`) می‌آید.  
- Context لازم برای کشینگ و مدیریت حالت wagmi را فراهم می‌کند.  
- برای ویژگی‌هایی مثل بازخوانی خودکار، کشینگ و ردیابی کوئری‌های قدیمی ضروری است.  

---

~~~~javascript
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './config'; // وارد کردن پیکربندی

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* همه مؤلفه‌های برنامه شما اینجا می‌آیند */}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
~~~~

## دستیابی به ایمنی کامل نوع‌ها با TypeScript در wagmi

یکی از ویژگی‌های جذاب wagmi ادغام عمیق آن با TypeScript است. برای استفاده کامل از این قابلیت، نوع `config` باید **به صورت جهانی ثبت شود**.

این کار ساده استنتاج قوی نوع‌ها در کل برنامه را فعال می‌کند. برای مثال، هر پارامتری که انتظار `chainId` دارد فقط شناسه‌های تعریف شده در `createConfig` را می‌پذیرد.

این تضمین می‌کند:

- تکمیل خودکار و راهنمای نوع‌ها برای تمام هوک‌های wagmi  
- تعامل ایمن‌تر با زنجیره‌ها، قراردادها و کیف‌پول‌ها  
- جلوگیری از خطاهای رایج زمان اجرا مربوط به پیکربندی نادرست `chainId` یا ناسازگاری انتقال  

~~~~javascript
// این را به فایل پیکربندی خود اضافه کنید (مثلاً config.ts)
import { config } from './config';

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
~~~~

## عملکرد با هوک‌های wagmi

با داشتن پیکربندی، توسعه‌دهندگان می‌توانند از مجموعه غنی هوک‌های wagmi برای ساخت قابلیت‌های اصلی dApp استفاده کنند. این هوک‌ها کل چرخه زندگی جلسه کاربر، از اتصال اولیه تا نمایش داده‌های زنجیره‌ای را مدیریت می‌کنند.

---

## اتصال کیف‌پول و مدیریت جلسه

یک مؤلفه کامل اتصال کیف‌پول با چند هوک اصلی که وضعیت جلسه کاربر را مدیریت می‌کنند ساخته می‌شود:

---

### ۱. `useConnect`

- **هدف:** شروع فرآیند اتصال کیف‌پول.  
- **برمی‌گرداند:**  
  - `connect`: تابعی برای شروع اتصال  
  - `connectors`: آرایه‌ای از کانکتورهای کیف‌پول تعریف شده در `createConfig`  

### ۲. `useAccount`

- **هدف:** فراهم کردن دسترسی به وضعیت فعلی جلسه کیف‌پول.  
- **برمی‌گرداند:**  
  - `address`: آدرس کیف‌پول متصل شده  
  - `isConnected`: بولین نشان‌دهنده اتصال یا عدم اتصال  
  - `chainId`: شناسه زنجیره متصل شده  

### ۳. `useDisconnect`

- **هدف:** پایان دادن به جلسه کیف‌پول و پاک کردن وضعیت  
- **برمی‌گرداند:**  
  - `disconnect`: تابع قطع اتصال کیف‌پول  

# نمایش داده‌های حساب زنجیره‌ای با wagmi

پس از اتصال کاربر، هوک‌های wagmi به سادگی اجازه می‌دهند اطلاعات زنجیره‌ای آن‌ها واکشی و نمایش داده شود تا یک پروفایل غنی ساخته شود.

---

## `useBalance`

هوک `useBalance` موجودی توکن بومی (مثلاً ETH) را برای یک آدرس مشخص واکشی می‌کند.

### ویژگی‌ها

- ورودی: `address`  
- خروجی: شیء `data` با موارد:  
  - `formatted`: رشته خوانا برای انسان (مثلاً "1.2345")  
  - `symbol`: نماد توکن (مثلاً "ETH")  

## `useEnsName` و `useEnsAvatar`

این هوک‌ها برای یکپارچگی با سرویس نام اتریوم (ENS) و ارائه تجربه هویت بهتر کاربر هستند.

- ۱. useEnsName  
  - ورودی: آدرس کیف‌پول  
  - خروجی: نام ENS (مثلاً vitalik.eth) در صورت ثبت بودن  

- ۲. useEnsAvatar  
  - ورودی: نام ENS  
  - خروجی: URL تصویر آواتار اگر تنظیم شده باشد  

### خلاصه

این هوک‌های wagmi دسترسی یکپارچه به داده‌های هویت و موجودی زنجیره‌ای فراهم می‌کنند:

- useBalance موجودی توکن کاربر را نمایش می‌دهد  
- useEnsName نام ENS آنها را دریافت می‌کند  
- useEnsAvatar تصویر پروفایل ENS را واکشی می‌کند  

با هم، این هوک‌ها تجربه‌ای شخصی‌سازی شده و غنی برای dApp ایجاد می‌کنند.

## مثال عملی مؤلفه: مؤلفه کامل WalletProfile

مثال زیر تمام هوک‌های این بخش را در یک مؤلفه WalletProfile کاملاً کاربردی ترکیب می‌کند. این مؤلفه با استفاده از فلگ `isConnected` از useAccount به صورت شرطی یا لیستی از دکمه‌های اتصال یا پروفایل کامل کاربر متصل را رندر می‌کند.

~~~~javascript
'use client';

import { useAccount, useConnect, useDisconnect, useBalance, useEnsName, useEnsAvatar } from 'wagmi';

export function WalletProfile() {
  const { address, isConnected, chain } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatarUrl } = useEnsAvatar({ name: ensName! });
  const { data: balance } = useBalance({ address });
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <h2>کیف‌پول من</h2>
        {ensAvatarUrl && <img src={ensAvatarUrl} alt="آواتار ENS" style={{ width: 50, borderRadius: '50%' }} ></img>}
        <div><strong>هویت:</strong> {ensName ? `${ensName} (${address})` : address}</div>
        <div><strong>موجودی:</strong> {balance ? `${balance.formatted} ${balance.symbol}` : 'در حال بارگذاری...'}</div>
        <div><strong>متصل به:</strong> {chain?.name}</div>
        <button onClick={() => disconnect()}>قطع اتصال</button>
      </div>
    );
  }

  return (
    <div>
      <h2>اتصال کیف‌پول</h2>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={isConnecting}
        >
          {connector.name}
          {isConnecting && ' (در حال اتصال...)'}
        </button>
      ))}
    </div>
  );
}
~~~~

# تعامل با قراردادهای هوشمند

تعامل با قراردادهای هوشمند نیاز اساسی هر dApp است. wagmi مجموعه‌ای قدرتمند و ایمن از هوک‌ها برای خواندن و نوشتن قراردادها فراهم می‌کند، همراه با ابزارهایی که کل فرآیند توسعه را ساده می‌کنند.

## ساده‌سازی توسعه با wagmi CLI

قبل از نوشتن دستی کد تعامل با قرارداد، توصیه می‌شود از CLI wagmi استفاده کنید.

این ابزار خط فرمان بهره‌وری را افزایش می‌دهد و بخش‌های خسته‌کننده ادغام قرارداد را خودکار می‌کند.

وظیفه اصلی آن واکشی ABI قرارداد از منابع مختلف—مثل Etherscan یا محیط‌های توسعه محلی مانند Hardhat و Foundry—و سپس تولید خودکار هوک‌های React با تایپ امن برای هر تابع قرارداد است.

با استفاده از CLI، اغلب توسعه‌دهندگان نیازی به نوشتن دستی `useReadContract` یا `useWriteContract` ندارند چون این‌ها با تایپ ایمن کامل تولید می‌شوند.

## خواندن داده‌های قرارداد با useReadContract

هوک `useReadContract` برای تعامل با توابع `view` و `pure` قرارداد هوشمند استفاده می‌شود.

این توابع فقط خواندنی هستند و وضعیت بلاکچین را تغییر نمی‌دهند، بنابراین به تراکنش یا هزینه گس نیاز ندارند.

این هوک یک شیء با پارامترهای کلیدی زیر می‌گیرد:

- `address` (آدرس قرارداد)  
- `abi`  
- `functionName`  
- آرایه اختیاری `args` برای پارامترهای تابع  

هوک یک شیء واکنشی برمی‌گرداند که شامل:

- `data` (نتیجه فراخوانی)  
- `isPending` (وضعیت بارگذاری)  
- `error` برای بازخورد UI  

برای برنامه‌هایی که نیاز به چند خواندن همزمان دارند، هوک `useReadContracts` می‌تواند آن‌ها را در یک درخواست RPC بهینه ادغام کند.

## نوشتن در قراردادها با useWriteContract

برای توابع تغییردهنده وضعیت که نیاز به تراکنش و گس دارند، wagmi هوک `useWriteContract` را ارائه می‌دهد.

باید دانست که این هوک یک جریان غیرهمزمان دو مرحله‌ای را مدیریت می‌کند. فراخوانی هوک خودش تراکنش ارسال نمی‌کند، بلکه:

- تابع `writeContract` (یا `writeContractAsync` نسخه promise‌دار) را بازمی‌گرداند که باید برای شروع تراکنش فراخوانی شود. این فراخوانی باعث می‌شود کیف‌پول کاربر باز شود و درخواست تایید کند.  

- متغیرهای حالت شامل:  
  - `data` (هش تراکنش پس از ارسال)  
  - `isPending` (در حال انتظار تایید کیف‌پول)  
  - `error`  

## نظارت بر وضعیت تراکنش با useWaitForTransactionReceipt

ارسال تراکنش و دریافت هش فقط تضمین می‌کند که تراکنش به شبکه ارسال شده است؛ موفقیت یا قرارگیری در بلاک تضمین نمی‌شود.

برای ایجاد حلقه بازخورد کامل، توسعه‌دهندگان باید تا زمان استخراج تراکنش صبر کنند.

هوک `useWaitForTransactionReceipt` دقیقاً برای این منظور طراحی شده است.

این هوک هش تراکنش برگشتی از `useWriteContract` را می‌گیرد و وضعیت آن را زیر نظر دارد.

متغیرهای حالت واکنشی خودش را بازمی‌گرداند، از جمله:

- `isLoading` (در حال تایید شدن تراکنش روی زنجیره)  
- `isSuccess` (زمانی که تراکنش با موفقیت استخراج شده)  

---

# مثال عملی: ساخت NFT

مؤلفه زیر یک مثال کامل و جامع از ساخت NFT ارائه می‌دهد. این مؤلفه به زیبایی **useWriteContract** و **useWaitForTransactionReceipt** را ترکیب می‌کند تا بازخورد واضحی به کاربر از لحظه تایید کیف‌پول تا نهایی شدن تراکنش ارائه دهد.

~~~~javascript
'use client';

import * as React from 'react';
import { useWriteContract, useWaitForTransactionReceipt, type BaseError } from 'wagmi';
import { nftAbi } from './nft-abi'; // فرض بر این است که فایل ABI وارد شده است

const nftContractAddress = '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2'; // آدرس نمونه قرارداد

export function MintNFT() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const tokenId = BigInt(formData.get('tokenId') as string);
    writeContract({
      address: nftContractAddress,
      abi: nftAbi,
      functionName: 'mint',
      args: [tokenId],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  return (
    <form onSubmit={submit}>
      <label htmlFor="tokenId">شناسه توکن:</label>
      <input name="tokenId" id="tokenId" defaultValue="69420" required ></input>
      <button type="submit" disabled={isPending || isConfirming}>
        {isPending && 'لطفاً در کیف‌پول تایید کنید...'}
        {isConfirming && 'در حال ساخت...'}
        {!isPending && !isConfirming && 'ساخت NFT'}
      </button>

      {hash && <div>هش تراکنش: {hash}</div>}
      {isConfirmed && <div>ساخت موفقیت‌آمیز بود!</div>}
      {error && <div>خطا: {(error as BaseError).shortMessage || error.message}</div>}
    </form>
  );
}
~~~~

# تکنیک‌های پیشرفته و ادغام اکوسیستم

فریم‌ورک wagmi با معماری لایه‌ای و قابل توسعه طراحی شده است و به توسعه‌دهندگان هم انتزاع‌های سطح بالا و هم راه‌گریزهایی به APIهای سطح پایین ارائه می‌دهد. این اطمینان می‌دهد توسعه‌دهندگان هرگز توسط نظرات فریم‌ورک محدود نمی‌شوند و می‌توانند هر چالشی را حل کنند.

## راه‌گریز: استفاده مستقیم از عملیات viem

در حالی که هوک‌های wagmi بیشتر موارد رایج را پوشش می‌دهند، گاهی توسعه‌دهنده نیاز به کنترل دقیق‌تر یا انجام عملی بدون هوک اختصاصی دارد. در این موارد، wagmi راه‌گریزی بی‌دردسر به کتابخانه viem ارائه می‌دهد.

با استفاده از هوک `useClient` (برای عملیات خواندنی عمومی) یا `useConnectorClient` (برای عملیات نوشتنی مربوط به کیف‌پول)، توسعه‌دهنده می‌تواند یک نمونه کاملاً پیکربندی شده از viem Client دریافت کند.

این کلاینت امکان فراخوانی صدها اکشن viem را مستقیم می‌دهد و قدرت کامل کتابخانه پایه را بدون ترک کانتکست wagmi آزاد می‌کند.

این رویکرد لایه‌ای بهترین ترکیب راحتی سطح بالا برای کارهای رایج و قدرت سطح پایین برای نیازهای سفارشی را فراهم می‌کند.

## ساخت برنامه‌های چند زنجیره‌ای

wagmi از ابتدا برای پشتیبانی از برنامه‌های چند زنجیره‌ای ساخته شده است.

پس از تعریف شبکه‌های پشتیبانی شده در createConfig، توسعه‌دهندگان می‌توانند از هوک‌های اضافی برای ایجاد تجربه کاربری روان چند زنجیره‌ای بهره ببرند.

هوک useSwitchChain اجازه می‌دهد برنامه به صورت برنامه‌ریزی شده کاربر را به سوی تغییر شبکه هدایت کند.

در ترکیب با شیء chain برگشتی از useAccount، توسعه‌دهندگان می‌توانند UIهایی بسازند که به شبکه متصل فعلی کاربر واکنش نشان می‌دهند، مثلاً قابلیت‌هایی که روی یک زنجیره خاص موجود نیستند را غیرفعال کنند.

## استفاده از اکوسیستم UI Kit

برای تیم‌هایی که می‌خواهند توسعه را تسریع کنند و تجربه کاربری صیقل خورده ارائه دهند، اکوسیستم کتابخانه‌های UI ساخته شده روی wagmi یک منبع ارزشمند است.

کتابخانه‌هایی مثل `ConnectKit`، `RainbowKit` و `Dynamic` مودال‌های "اتصال کیف‌پول" آماده تولید و سایر مؤلفه‌ها را ارائه می‌دهند.

این کیت‌ها زمان توسعه زیادی را با مدیریت موارد خاص اتصال کیف‌پول در مرورگرها، دستگاه‌ها و ارائه‌دهندگان مختلف صرفه‌جویی می‌کنند.

آنها یک معاوضه ارائه می‌دهند: توسعه‌دهندگان می‌توانند UI اتصال خود را با هوک‌های اصلی wagmi از ابتدا بسازند برای کنترل حداکثری و برندینگ منحصربه‌فرد، یا UI kitها را برای سرعت توسعه و رابط کاربری حرفه‌ای ادغام کنند.

## خلاصه

- از useClient و useConnectorClient برای دسترسی کامل به عملیات سطح پایین viem وقتی هوک‌های داخلی wagmi کافی نیستند استفاده کنید.  
- برنامه‌های چند زنجیره‌ای را با useSwitchChain و useAccount بسازید.  
- از UI kitهای قدرتمند مانند ConnectKit، RainbowKit و Dynamic برای تسریع توسعه و تضمین سازگاری استفاده کنید.  
- انعطاف‌پذیری wagmi امکان نمونه‌سازی سریع و معماری سازمانی را از طریق طراحی قابل ترکیب و راه‌گریز فراهم می‌آورد.






</div>
