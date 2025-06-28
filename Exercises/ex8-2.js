// فایل باید با پسوند .mjs ذخیره شود یا package.json باید "type": "module" داشته باشد
import { ethers } from 'ethers';

// URL نود – می‌تونی از Infura، Alchemy یا هر RPC دیگر استفاده کنی
const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/5bb6e05480844c1abc24818340bbee7e");

// آدرس قرارداد
const contractAddress = "0xE23fA1Df7AbBe8258050950142E910ca6C319F22";

// ABI ساده‌شده برای فقط توابع مورد نیاز
const abi = [
  "function leaderBoard(uint256) view returns (address)",
  "function userNames(address) view returns (string)"
];

const contract = new ethers.Contract(contractAddress, abi, provider);

async function main() {
  console.log("🔍 بررسی 10 شرکت‌کننده‌ی اول در لیدربرد:\n");

  for (let i = 0; i < 10; i++) {
    try {
      const address = await contract.leaderBoard(i);
      const name = await contract.userNames(address);
      console.log(`#${i + 1} — ${name} (${address})`);
    } catch (err) {
      console.log(`پایان لیست در موقعیت ${i}`);
      break;
    }
  }
}

main();
