// Seed for Trade page: give some monsters to Account #1 (not connected) so they're "other" monsters.
// We can't call createMonster from acc1 since manager is acc0.
// Strategy: createMonster as acc0, then transferOwnership to acc1.
// But there's no transferOwnership function in the contract!
// Alternative: just leave it as-is. Trade page will be empty for the connected user (acc0).
// That's actually the desired behavior — Trade page shows OTHER people's monsters for sale.

const hre = require("hardhat");

async function main() {
  const [acc0] = await hre.ethers.getSigners();
  console.log("acc0 (manager):", acc0.address);

  const CryptoMonster = await hre.ethers.getContractFactory("CryptoMonster", acc0);
  const cm = CryptoMonster.attach("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");

  // First let's check the contract: are there transferOwnership / safeTransferFrom functions?
  // (ERC721 has these). If we can't transfer to acc1, the user MUST switch MetaMask accounts
  // to see "other" monsters in Trade page.
  console.log("\nContract check:");
  console.log("  has safeTransferFrom:", typeof cm.safeTransferFrom === 'function');
  console.log("  has transferFrom:", typeof cm.transferFrom === 'function');
  console.log("  has approve:", typeof cm.approve === 'function');

  const total = Number(await cm.totalMonster());
  console.log("\nCurrent totalMonster:", total);
  for (let i = 0; i < total; i++) {
    const m = await cm.mons(i);
    console.log(`  #${i}: owner=${m.owner} sp=${m.species} price=${m.price} sale=${m.sale}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });