import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/5bb6e05480844c1abc24818340bbee7e");

const abi = [ 
  {"inputs":[{"internalType":"bytes32","name":"_lock","type":"bytes32"}],"stateMutability":"nonpayable","type":"constructor"},
  {"inputs":[],"name":"AddressNotRegistered","type":"error"},
  {"inputs":[],"name":"failSafeIsOn","type":"error"},
  {"inputs":[],"name":"needsKey","type":"error"},
  {"inputs":[],"name":"noCrystalFound","type":"error"},
  {"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"}],"name":"TreasureTaken","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"","type":"address"},{"indexed":false,"internalType":"bool","name":"","type":"bool"}],"name":"TreasureWasStolen","type":"event"},
  {"inputs":[{"internalType":"string","name":"key","type":"string"}],"name":"claimTreasure","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"leaderBoard","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
  {"inputs":[{"internalType":"string","name":"name","type":"string"}],"name":"register","outputs":[],"stateMutability":"nonpayable","type":"function"},
  {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userNames","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"}
];

const contractAddress = "0xE23fA1Df7AbBe8258050950142E910ca6C319F22";

const contract = new ethers.Contract(contractAddress, abi, provider);

async function readParticipants(max = 10) {
  console.log(`در حال بررسی ${max} شرکت‌کننده‌ی اول در لیدربرد:`);

  for (let i = 0; i < max; i++) {
    try {
      const addr = await contract.leaderBoard(i);
      if (addr === ethers.ZeroAddress) {
        console.log(`پایان لیست در موقعیت ${i}`);
        break;
      }
      const name = await contract.userNames(addr);
      console.log(`${i + 1}. ${name} (${addr})`);
    } catch (err) {
      console.log(`پایان لیست در موقعیت ${i} به دلیل خطا`);
      break;
    }
  }
}

readParticipants(10).catch(console.error);
