# 🎮 Skellie Monster

> 链上骷髅怪 NFT + RPG 链上游戏 dApp — 铸造 · 战斗 · 繁殖 · 装备 · 交易

[![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react)](https://reactjs.org/)
[![wagmi](https://img.shields.io/badge/wagmi-2.x-blueviolet)](https://wagmi.sh/)
[![RainbowKit](https://img.shields.io/badge/RainbowKit-2.x-ff6e80)](https://www.rainbowkit.com/)
[![Hardhat](https://img.shields.io/badge/Hardhat-2.x-yellow)](https://hardhat.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

在线预览 → **https://sqqihao.github.io/skellieMonster/frontend/build/**

---

## ✨ 项目特点

- 🎮 **链上游戏** — 创建怪物 → Dojo（练习场）战斗 → 进化（Evolve）→ 繁殖
- 🧪 **ERC-1155 道具** — 药瓶（HEALING / MANA / MAGIC）+ 装备（SHIELD / SWORD / LOKI'S HAMMER）
- 💰 **ERC-20 代币经济** — `TokenMonster (TM)` 作为游戏内货币
- 🛒 **交易市场** — 上架、购买、点对点转移怪物
- 🎨 **RPG 游戏 UI** — rpgui CSS 框架，怀旧像素风
- 📱 **响应式** — antd + bootstrap + react-bootstrap 多库组合
- 🛡️ **MetaMask 兼容** — 通过 RainbowKit / injected connector
- 📚 **智能 ABI 同步** — `npm run build` 自动从 hardhat artifacts 生成前端 `constant.js`

---

## 🏗️ 技术栈

| 层级 | 技术 |
|---|---|
| 前端 | React 18 + CRA 5 + antd 5 + rpgui + bootstrap + react-bootstrap |
| Web3 | wagmi 2.x + viem 2.x + RainbowKit 2.x + @tanstack/react-query |
| 路由 | react-router-dom 6 (HashRouter) |
| 智能合约 | Solidity + OpenZeppelin 5.x + Hardhat 2.x + hardhat-toolbox |
| 部署 | GitHub Pages (frontend/build/) + WSL 本地开发 |

---

## 📁 项目结构

```
skellieMonster/
├── backend/                          # Hardhat 项目
│   ├── contracts/                    # 3 个智能合约
│   │   ├── CryptoMonster.sol         # 主合约（怪物 + 战斗 + 市场）
│   │   ├── NFTMonster.sol            # ERC-1155 道具（药瓶 + 装备）
│   │   └── TokenMonster.sol          # ERC-20 游戏币
│   ├── scripts/deploy.js             # 部署 3 合约 + 写 deployed-addresses.json
│   ├── artifacts/                    # hardhat compile 输出（gitignored）
│   ├── cache/                        # hardhat 增量缓存
│   └── hardhat.config.js             # hardhat 配置
├── frontend/                         # React 前端
│   ├── src/
│   │   ├── js/
│   │   │   ├── components/           # UI 组件（Dojo / MyShop / NFT / Trade / Breed / Share）
│   │   │   ├── model/                # ReadContract / WriteContract（wagmi 封装）
│   │   │   ├── Monster.js / Trade.js / NFT.js / Dojo.js / MyShop.js / Breed.js
│   │   │   └── Share.js / ShareToMe.js
│   │   ├── sprites/                  # 159 张像素 sprite 资源
│   │   ├── css/                      # common.css (193 行) + nav.css
│   │   ├── constant.js               # AUTO-GENERATED — 合约地址 + ABI
│   │   ├── wagmiconf.js              # wagmi 配置（7 链 + local 31337）
│   │   ├── App.js / Navigation.js / MenuRouters.js
│   │   └── index.js                  # 入口 + Providers 嵌套
│   ├── scripts/build-contractCfg.js  # 自动从 artifacts 写 src/constant.js
│   ├── build/                        # production build (gitignored，GH Pages 目录)
│   └── package.json                  # prebuild + deploy + start-node
├── deployed-addresses.json           # 当前部署的合约地址（AUTO 写）
└── README.md
```

---

## 🚀 快速开始（本地开发）

### 1. 安装依赖

```bash
cd backend  && npm install
cd ../frontend && npm install --legacy-peer-deps
```

> `--legacy-peer-deps` 在 frontend 必需（CRA 5 + wagmi 2 peer dep 冲突）。

### 2. 启动本地 Hardhat 节点

```bash
cd backend && npm run start-node
# 监听 127.0.0.1:8545，输出 20 个测试账号
```

### 3. 部署合约

```bash
cd backend && npm run deploy
```

执行流程：
1. 编译合约（hardhat 自动）
2. 部署 `TokenMonster` (ERC-20) → 拿到地址
3. mint 1e15 给 Account #0 + Account #1
4. 部署 `NFTMonster` (ERC-1155) → 拿到地址
5. 部署 `CryptoMonster` (主合约) → 把 Token + NFT 地址注入构造函数
6. 把 6 种道具（id 0-5）批量 transfer 5e15 个到 CryptoMonster
7. 把 3 个地址写回仓库根 `deployed-addresses.json`

输出示例：
```
wallet1 addr: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
tokenMonster contract address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
nftMonster tokenTransfer:    0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
cryptoMonster contract address: 0x9fE46736679d2C9a65F0992F2212De1876337B14
```

### 4. 同步 ABI + 地址到前端

```bash
cd ../frontend && npm run build-contractCfg
# 或直接跳到第 5 步，prebuild/prestart 会自动跑这个
```

从 `backend/artifacts/contracts/*.json` 读取 ABI，从 `deployed-addresses.json` 读取地址，生成 `src/constant.js`。

### 5. 启动前端 dev server

```bash
cd frontend && npm start
```

打开 `http://localhost:3000`。**WSL/远程 VM** 须加 `HOST=0.0.0.0`：

```bash
HOST=0.0.0.0 PORT=4445 BROWSER=none npm start
```

### 6. 连接 MetaMask

1. 安装 [MetaMask](https://metamask.io)
2. 添加自定义网络：
   - **网络名**：Hardhat Local
   - **RPC URL**：`http://127.0.0.1:8545`
   - **Chain ID**：`31337`
   - **Currency Symbol**：ETH
3. 导入 Account #0 私钥：`0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`（这个账号已拿到 1e15 TM 代币）
4. 点页面右上角 RainbowKit **Connect Wallet**

---

## 📜 NPM 脚本

### `frontend/`

| 命令 | 作用 |
|---|---|
| `npm start` | 启动 dev server（`prestart` 自动同步 ABI） |
| `npm run build` | 生产 build → `frontend/build/`（`prebuild` 自动同步 ABI） |
| `npm run build-contractCfg` | 手动从 artifacts 重新生成 `src/constant.js` |
| `npm run deploy` | 转去 `backend/` 跑合约部署 |
| `npm run start-node` | 转去 `backend/` 启 hardhat 节点 |
| `npm test` | 跑 React 组件测试 |

### `backend/`

| 命令 | 作用 |
|---|---|
| `npm run start-node` | Hardhat 节点 → `http://127.0.0.1:8545`（chainId 31337） |
| `npm run compile` | 编译 3 个合约 |
| `npm run deploy` | 部署 → 写 `deployed-addresses.json` |
| `npm run test` | 跑合约测试（待补） |

---

## 🌐 部署前端到 GitHub Pages

`frontend/build/` 是 production 输出，**提交到 `main` 分支**后即可通过 GitHub Pages 访问。

```bash
cd /home/admini/ai/skellieMonster/frontend
npm run build                  # 输出到 build/
cd ..
git add frontend/build/
git commit -m "build vX.Y"
git push origin main
```

URL：**https://sqqihao.github.io/skellieMonster/frontend/build/**

> HashRouter 项目对静态托管很友好 — 不需要 404.html 重写，所有路径都在 URL hash 内。

---

## 📦 合约说明

### CryptoMonster.sol（主合约）

- `constructor(erc20, ierc1155)` — 注入 Token + NFT 地址
- `createMonster(spIndex, price, sale)` — 创建怪物（链上随机 species）
- `mons(id)` — 查询怪物（id/owner/species/price/sale/type/evolve/hp/atk/def/speed/sharedTo）
- `fight(id1, id2)` — Dojo 战斗，胜者按 REWARDAMOUNT 拿 TM
- `breedMonster(id1, id2)` — 两只怪物繁殖
- `addSale(id, price)` / `removeSale(id)` — 上架 / 取消
- `buyMonster(id)` — 购买（payable，ETH 转 seller）
- `buyItem(itemNumber, units)` / `burnItem(itemNumber, units)` — 道具买卖
- `startSharing(id, addr)` / `stopSharing(id)` — 分享怪物给其他地址（无须转账）
- `mintToken(amount)` / `deposit(amount)` / `withdraw(amount)` — TM 管理

### NFTMonster.sol（ERC-1155）

道具常量：
- `HEALING_POTION` `MANA_POTION` `MAGIC_POTION` （药瓶）
- `SHIELD` `SWORD` `LOKIS_HAMMER` （装备）

### TokenMonster.sol（ERC-20）

`TM` 代币，构造函数 `mint(name, symbol, initialSupply)` → 给 owner 铸造。

---

## 🎮 玩法流程

1. **Dojo（练武场）**：创建怪物 → 战斗 → 赢 TM 代币
2. **Monster（我的怪物）**：查看、繁殖、分享
3. **Trade（市场）**：上架 → 别人购买 → 卖家收 ETH
4. **MyShop（商店）**：用 TM 买药瓶 / 装备
5. **NFT（我的道具）**：查看 ERC-1155 道具
6. **Breed（繁殖）**：两只怪物配对生新怪
7. **Share（分享）**：把怪物分享给其他地址（不转移所有权）

---

## 🐛 已知问题

| 问题 | 状态 | 说明 |
|---|---|---|
| `alchemy.com` RPC 残留 | 已修 | wagmiconf.js 改用 publicnode.com 免费节点；不需 API key |
| `Spolia`/`spoilinetwork.org` 假 RPC | 已修 | 改名 sepolia，用 publicnode |
| `localhost` chainId 1337 错 | 已修 | 改 31337 匹配 hardhat 默认 |
| `constant.js` 硬编码地址 + ABI | 已修 | `prebuild`/`prestart` 自动从 artifacts + `deployed-addresses.json` 生成 |
| 旧 `frontend静态html文件/` 镜像 | 已删 | 改用 `frontend/build/` 单一来源 |
| `metaMask()` connector 隐式 `@metamask/sdk` 报错 | 已修 | wagmiconf 只用 `injected`，覆盖 MetaMask 99% 场景 |

---

## 🤝 贡献

1. Fork 仓库
2. 改合约前先 `cd backend && npm run compile && npm test`（合约测试待补充）
3. 提交前 `cd frontend && npm run build` 确认无错误
4. 提交信息用中文 OK

---

## 📄 License

MIT

---

## 🙏 致谢

Hardhat · wagmi + viem · RainbowKit · OpenZeppelin · Ant Design · RPGUI · 所有 Web3 开源贡献者
