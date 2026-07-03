// We use hardhat's configured localhost network (chainId 31337 by default).
// `npm run start-node` boots the node at http://127.0.0.1:8545.
const hre = require("hardhat");
const ethers = hre.ethers;
const fs = require("fs");
const path = require("path");

// const { ethers } = require("ethers");

async function main() {

  const [wallet1] = await ethers.getSigners();
  console.log("wallet1 addr:" + wallet1.address);

  const amount = 10**15;

  const TokenMonster = await ethers.getContractFactory("TokenMonster",wallet1);
  const tokenMonster = await TokenMonster.deploy("TM", "TM",amount);
  await tokenMonster.waitForDeployment();
  const tokenMonsterAddress = await tokenMonster.getAddress();
  console.log("tokenMonster contract address: "+tokenMonsterAddress);

  
  let tx = await tokenMonster.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",amount)
  await tx.wait();
  tx = await tokenMonster.mint("0x70997970C51812dc3A010C7d01b50e0d17dc79C8",amount)
  await tx.wait();

  const NFTMonster = await ethers.getContractFactory("NFTMonster",wallet1);
  const nftMonster = await NFTMonster.deploy();
  await nftMonster.waitForDeployment();
  const nftMonsterAddress = await nftMonster.getAddress();  
  console.log("nftMonster tokenTransfer: "+nftMonsterAddress);

  const CryptoMonster = await ethers.getContractFactory("CryptoMonster",wallet1);
  const cryptoMonster = await CryptoMonster.deploy(tokenMonsterAddress, nftMonsterAddress);
  await cryptoMonster.waitForDeployment();
  const cryptoMonsterAddress = await cryptoMonster.getAddress();
  console.log("cryptoMonster contract address: "+cryptoMonsterAddress);



  // [S7 修复] 给 CryptoMonster 合约 mint 一笔 TM 作为 fight reward 资金池，
  // 否则合约持有 TM = 0，所有 fight reward 都会跳过。
  // [F-fix] 用 ethers.parseUnits 转 BigInt 避免 JS Number 精度溢出（10**18 > 2^53）
  tx = await tokenMonster.mint(cryptoMonsterAddress, ethers.parseUnits("1", 18));
  await tx.wait();

  // Write deployed addresses to repo-root deployed-addresses.json so frontend
  // scripts/build-contractCfg.js can pick them up regardless of CWD.
  const addresses = {
    tokenAddress: tokenMonsterAddress,
    nftAddress:   nftMonsterAddress,
    monsterAddress: cryptoMonsterAddress,
  };
  const outPath = path.join(__dirname, '..', '..', 'deployed-addresses.json');
  fs.writeFileSync(outPath, JSON.stringify(addresses, null, 2));
  console.log('Saved deployed addresses → ' + outPath);
  console.log(JSON.stringify(addresses, null, 2));

  // // console.log(contract.interface.format('json'))
  // let data = {
  //   address: catContractAddress,
  //   abi: catContract.interface.format('json')
  // }
  // fs.writeFileSync('./CatContract.json', JSON.stringify(data))


  // // console.log(contract.interface.format('json'))
  // data = {
  //   address: marketContractAddress,
  //   abi: marketContract.interface.format('json')
  // }
  // fs.writeFileSync('./CatMarketplace.json', JSON.stringify(data))


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});