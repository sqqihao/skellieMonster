
const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const [acc0, acc1, acc2] = await ethers.getSigners();
  const token = await ethers.getContractAt("TokenMonster", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
  const cm = await ethers.getContractAt("CryptoMonster", "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");

  // ===== S1 测试: buyMonster 缺 allowance 应该 revert =====
  console.log("\n=== S1: 测试缺 allowance ===");
  // acc0 没 approve 任何东西，直接 buyMonster 链上 #0（acc1 卖 100 TM）
  try {
    await cm.connect(acc0).buyMonster(0);
    console.log("  FAIL: 应该 revert 但成功了");
  } catch (e) {
    if (e.message.includes("Need to approve token first")) {
      console.log("  ✓ S1 PASS: 缺 allowance 时 revert 'Need to approve token first'");
    } else {
      console.log("  错误信息:", e.message.slice(0, 100));
    }
  }

  // ===== S2 测试: buyMonster 不存在的 _id =====
  console.log("\n=== S2: 测试 _id 不存在 ===");
  try {
    await cm.connect(acc0).buyMonster(99999);
    console.log("  FAIL: 应该 revert");
  } catch (e) {
    if (e.message.includes("Monster not exist")) {
      console.log("  ✓ S2 PASS: 不存在 _id revert 'Monster not exist'");
    } else {
      console.log("  错误信息:", e.message.slice(0, 100));
    }
  }

  // ===== S4 测试: fight 自打自 =====
  console.log("\n=== S4: fight self-fight ===");
  // 找 acc0 的怪，假设 #2 是 acc0 的
  const mon2 = await cm.mons(2);
  if (mon2.owner.toLowerCase() === acc0.address.toLowerCase()) {
    try {
      await cm.connect(acc0).fight(2, 2);
      console.log("  FAIL: 应该 revert");
    } catch (e) {
      if (e.message.includes("Same monster")) {
        console.log("  ✓ S4 PASS: 自打自 revert 'Same monster'");
      } else {
        console.log("  错误信息:", e.message.slice(0, 100));
      }
    }
  }

  // ===== S4 测试: 用别人怪打 =====
  console.log("\n=== S4: fight with someone else's monster ===");
  // acc0 用 acc1 的 #0 和自己的 #2
  try {
    await cm.connect(acc0).fight(0, 2);
    console.log("  FAIL: 应该 revert");
  } catch (e) {
    if (e.message.includes("Not your monster")) {
      console.log("  ✓ S4 PASS: 用别人怪打 revert 'Not your monster'");
    } else {
      console.log("  错误信息:", e.message.slice(0, 100));
    }
  }

  // ===== S4 测试: 正常 fight =====
  console.log("\n=== S4: normal fight (acc0 用 #2 vs #3) ===");
  try {
    const tx = await cm.connect(acc0).fight(2, 3);
    await tx.wait();
    console.log("  ✓ S4 PASS: 正常 fight 成功（emit FightResult 事件）");
  } catch (e) {
    console.log("  错误信息:", e.message.slice(0, 100));
  }

  // ===== S6 测试: reward 资金池不为空 =====
  console.log("\n=== S6: 验证 fight reward 资金池 ===");
  const cmBal = await token.balanceOf("0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9");
  console.log("  cryptoMonster TM balance:", ethers.formatUnits(cmBal, 18), "(应为 1.0)");

  // ===== S7 测试: 资金池正常发奖 =====
  console.log("\n=== S7+S6: fight 实际发奖 (用 #2 vs #3, acc0 win 的话) ===");
  // 检查 acc0 在 #2 #3 的 owner
  const mon3 = await cm.mons(3);
  console.log("  #2 owner:", (await cm.mons(2)).owner.slice(0,10), " #3 owner:", mon3.owner.slice(0,10));

  // ===== S8 测试: startSharing 0x0 =====
  console.log("\n=== S8: startSharing 0x0 ===");
  try {
    await cm.connect(acc0).startSharing(2, "0x0000000000000000000000000000000000000000");
    console.log("  FAIL: 应该 revert");
  } catch (e) {
    if (e.message.includes("No zero address")) {
      console.log("  ✓ S8 PASS: startSharing 0x0 revert 'No zero address'");
    } else {
      console.log("  错误信息:", e.message.slice(0, 100));
    }
  }

  // ===== S9 测试: envMater 越界 =====
  console.log("\n=== S9: envMater without owner ===");
  // acc1 试图给 #2 (acc0 拥有) 升级
  try {
    await cm.connect(acc1).envMater(2);
    console.log("  FAIL: 应该 revert 'not owner'");
  } catch (e) {
    if (e.message.includes("not owner")) {
      console.log("  ✓ S9 PASS: envMater non-owner revert 'not owner'");
    } else {
      console.log("  错误信息:", e.message.slice(0, 100));
    }
  }

  // ===== S10 测试: NFTMonster transferToken =====
  console.log("\n=== S10: NFTMonster transferToken ===");
  const nft = await ethers.getContractAt("NFTMonster", "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9");
  // 检查 nft 持有者 = address(this) 合约自己
  const bal0 = await nft.balanceOf("0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9", 0);
  console.log("  NFTMonster 合约持有 SWORD(0) 数量:", bal0.toString());
  // try transferToken
  try {
    const tx = await nft.connect(acc0).transferToken(acc1.address, 0, 1);
    await tx.wait();
    console.log("  ✓ S10 PASS: transferToken 成功（合约持有 NFT，可转出）");
  } catch (e) {
    console.log("  FAIL:", e.message.slice(0, 100));
  }
}

main().catch(console.error);
