const hre = require("hardhat");
const ethers = hre.ethers;
async function main() {
  const [acc0, acc1, acc2, acc3, acc4, acc5, acc6, acc7, acc8, acc9] = await ethers.getSigners();
  const token = await ethers.getContractAt("TokenMonster", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
  for (const [i, a] of [acc0, acc1, acc2, acc3, acc4, acc5, acc6, acc7, acc8, acc9].entries()) {
    const b = await token.balanceOf(a.address);
    console.log(`acc${i} ${a.address.slice(0,10)}...: ${b.toString()} wei (${ethers.formatUnits(b,18)} TM)`);
  }
}
main().catch(console.error);
