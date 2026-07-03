// wagmi 2.x + RainbowKit 2.x 配置
// 关键修复：用 RainbowKit 的 connectorsForWallets() 把 wallet 列表转成 wagmi connectors。
// 这样 RainbowKit 才能知道有哪些 wallet，Connect Modal 才会显示选项。
// 之前用 wagmi 内置的 injected() connector，RainbowKit 识别不到 → modal 空白。

import { http, createConfig } from 'wagmi';
import { mainnet, sepolia, polygon, optimism, arbitrum, base, bsc } from 'wagmi/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
// 关键修复：用 injectedWallet 而非 metaMaskWallet。
// metaMaskWallet 内部用 @metamask/sdk，它的 analytics 子模块调 `openapi_fetch.default` 报错（CJS/ESM 不兼容）。
// injectedWallet 直接读 window.ethereum，无 SDK 依赖，干净。
import { injectedWallet } from '@rainbow-me/rainbowkit/wallets';

const localChain = {
  id: 31337,  // hardhat 默认 chainId（MetaMask 切到 "Localhost 8545" 时也是 31337）
  name: 'Hardhat Local',
  network: 'hardhat',
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
    public:  { http: ['http://127.0.0.1:8545'] },
  },
  testnet: true,
};

// RainbowKit 需要 projectId（即使不用 WalletConnect 也要传个值，否则某些 wallet 内部报错）
const WALLET_CONNECT_PROJECT_ID = 'skellieMonster-dev-no-walletconnect';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Popular',
      wallets: [injectedWallet],
    },
  ],
  {
    appName: 'SkellieMonster',
    projectId: WALLET_CONNECT_PROJECT_ID,
  }
);

export const config = createConfig({
  chains: [mainnet, sepolia, bsc, polygon, arbitrum, optimism, base, localChain],
  connectors,
  transports: {
    [mainnet.id]:   http('https://ethereum-rpc.publicnode.com'),
    [sepolia.id]:   http('https://ethereum-sepolia-rpc.publicnode.com'),
    [bsc.id]:       http('https://bsc.publicnode.com'),
    [polygon.id]:   http('https://polygon-bor-rpc.publicnode.com'),
    [arbitrum.id]:  http('https://arbitrum-one-rpc.publicnode.com'),
    [optimism.id]:  http('https://optimism-rpc.publicnode.com'),
    [base.id]:      http('https://base-rpc.publicnode.com'),
    [localChain.id]: http('http://127.0.0.1:8545'),
  },
  ssr: false,
});

if (typeof window !== 'undefined') {
  window.__wagmiConfig = config;
}