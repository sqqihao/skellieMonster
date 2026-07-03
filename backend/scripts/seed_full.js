
const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const [acc0, acc1, acc2, acc3, acc4] = await ethers.getSigners();
  console.log("acc0:", acc0.address);
  console.log("acc1:", acc1.address);
  console.log("acc2:", acc2.address);

  // 1. acc0 → acc1, acc2 各转 10000 TM (BigInt)
  const tokenMonster = await ethers.getContractAt(
    "TokenMonster",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  // 先 approve
  let tx = await tokenMonster.connect(acc0).approve(acc0.address, ethers.parseUnits("1000000", 18));
  await tx.wait();
  // 不用 approve 也能 transfer from own balance
  tx = await tokenMonster.connect(acc0).transfer(acc1.address, ethers.parseUnits("10000", 18));
  await tx.wait();
  console.log("acc0 → acc1 10000 TM");
  tx = await tokenMonster.connect(acc0).transfer(acc2.address, ethers.parseUnits("10000", 18));
  await tx.wait();
  console.log("acc0 → acc2 10000 TM");

  // 2. acc0 先把 #0 #1 上架（合约构造只 createMonster 4 只，默认 not in sale）
  // 上架后，acc1/acc2 才能 buyMonster
  const cryptoMonster = await ethers.getContractAt(
    "CryptoMonster",
    "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
  );

  tx = await cryptoMonster.connect(acc0).addSale(0, ethers.parseUnits("3", 18));
  await tx.wait();
  console.log("acc0 addSale #0 @ 3");
  tx = await cryptoMonster.connect(acc0).addSale(1, ethers.parseUnits("44", 18));
  await tx.wait();
  console.log("acc0 addSale #1 @ 44");

  // 3. acc1 买 acc0 的 #0
  const mon0 = await cryptoMonster.mons(0);
  console.log("#0 owner:", mon0.owner, "sale:", mon0.sale, "price:", ethers.formatUnits(mon0.price, 18));
  if (mon0.sale) {
    tx = await tokenMonster.connect(acc1).approve("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9", mon0.price);
    await tx.wait();
    tx = await cryptoMonster.connect(acc1).buyMonster(0);
    await tx.wait();
    console.log("acc1 bought #0");
  }

  // 3. acc1 addSale #0 price=100
  tx = await cryptoMonster.connect(acc1).addSale(0, ethers.parseUnits("100", 18));
  await tx.wait();
  console.log("acc1 addSale #0 @ 100");

  // 4. acc2 买 #1 (acc0 addSale price=44)
  const mon1 = await cryptoMonster.mons(1);
  console.log("#1 owner:", mon1.owner, "sale:", mon1.sale, "price:", ethers.formatUnits(mon1.price, 18));
  if (mon1.sale) {
    tx = await tokenMonster.connect(acc2).approve("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9", mon1.price);
    await tx.wait();
    tx = await cryptoMonster.connect(acc2).buyMonster(1);
    await tx.wait();
    console.log("acc2 bought #1");
  }

  // 5. acc2 addSale #1 price=50
  tx = await cryptoMonster.connect(acc2).addSale(1, ethers.parseUnits("50", 18));
  await tx.wait();
  console.log("acc2 addSale #1 @ 50");

  // 6. 验证
  for (let i = 0; i < 7; i++) {
    const m = await cryptoMonster.mons(i);
    console.log(`#${i} owner=${m.owner.slice(0,8)}... sale=${m.sale} price=${ethers.formatUnits(m.price, 18)} species=${m.species}`);
  }

  // 7. 检查合约 TM 余额
  const cmBal = await tokenMonster.balanceOf("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");
  console.log("cryptoMonster TM balance:", ethers.formatUnits(cmBal, 18));
}

main().catch(console.error);
