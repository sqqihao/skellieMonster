require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */const privateKey = process.env.PRIVATE_KEY;

const config = {
  solidity: {
    version: "0.8.20",
    settings: {
      // optimizer: {
      //   enabled: true,
      //   runs: 9999,
      // },
    },
  },
  networks: {
    local: {
      url: `${process.env.PRC_URL_LOCAL}`,
      accounts: ["ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"],
      chainId: 31337,
    },
    // 跑 `npx hardhat node` 时使用的网络 — 必须跟 local 一致，
    // 否则 hardhat 节点（in-process）和 deploy 脚本（--network localhost）
    // 会出现链上数据找不到 / chainId mismatch。
    hardhat: {
      chainId: 31337, // hardhat 默认 chainId，跟 MetaMask 默认本地网络一致
    },
    // `npx hardhat run ... --network localhost` 走这里 — chainId 必须跟 hardhat 节点一致
    localhost: {
      url: 'http://127.0.0.1:8545',
      chainId: 31337,
    },
  },
  gasReporter: {
    enabled: !!process.env.REPORT_GAS,
  },
  // contractSizer: {
  //   runOnCompile: true,
  //   strict: true,
  // },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  // docgen: {
  //   path: "./docs",
  //   clear: true,
  //   runOnCompile: true,
  // },
};

module.exports = config;