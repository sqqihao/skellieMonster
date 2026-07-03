// Seed: acc0 owns 3 monsters (1 on sale), acc0 creates one on sale for the test.
// We don't need acc1 monsters for the basic flow test.
const hre = require("hardhat");

async function main() {
  const [acc0] = await hre.ethers.getSigners();
  console.log("acc0:", acc0.address);

  // attach to deployed contract
  const CryptoMonster = await hre.ethers.getContractFactory("CryptoMonster", acc0);
  const cm = CryptoMonster.attach("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");

  // First clear all existing monsters by checking totalMonster
  // Then make sure we have at least 4 monsters owned by acc0.
  // Strategy: if totalMonster < 7, create more; if >= 7, just leave it.
  const total = Number(await cm.totalMonster());
  console.log("Existing totalMonster:", total);

  // 4 are from constructor (Dryad, Hamadryad, Leshy, Santelmo all owned by manager = acc0)
  // So we should already have 4 monsters owned by acc0.
  // Let's create 1 more in-sale for Trade page
  if (total < 5) {
    console.log("Creating one more monster on sale...");
    const tx = await cm.createMonster(25, 5, true); // Raijin sp=25
    await tx.wait();
  }

  const total2 = Number(await cm.totalMonster());
  console.log("Final totalMonster:", total2);
  for (let i = 0; i < total2; i++) {
    const m = await cm.mons(i);
    console.log(`  #${i}: owner=${m.owner.slice(0,8)}... species=${m.species} price=${m.price} sale=${m.sale} hp=${m.hp}`);
  }

  // Make one in sale for Trade
  if (total2 >= 1) {
    console.log("Setting #0 on sale at price 3...");
    const tx = await cm.addSale(0, 3);
    await tx.wait();
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
