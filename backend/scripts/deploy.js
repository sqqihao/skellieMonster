// require hre, { ethers } from "hardhat";
const hre = require("hardhat");
const ethers = hre.ethers;
const fs = require("fs");

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



  await nftMonster.transferToken(cryptoMonsterAddress,0,5**15)
  await nftMonster.transferToken(cryptoMonsterAddress,1,5**15)
  await nftMonster.transferToken(cryptoMonsterAddress,2,5**15)
  await nftMonster.transferToken(cryptoMonsterAddress,3,5**15)
  await nftMonster.transferToken(cryptoMonsterAddress,4,5**15)
  await nftMonster.transferToken(cryptoMonsterAddress,5,5**15)

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