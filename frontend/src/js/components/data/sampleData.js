// SAMPLE data — displayed when wallet is NOT connected.
// 让未连钱包的用户也能看到示例怪物、代币余额、NFT 库存，避免页面"空荡荡"。
//
// 字段顺序必须与 useRefreshMonster.transferData() 完全一致（id/owner/species/...）。
// 数值参数（hp/atk/def/speed）参考 CryptoMonster.sol createMonster：
//   `100 + randomGen(41)` → 范围 100-140，最大 140。

const SAMPLE_OWNER = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const SAMPLE_OTHER = [
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
  '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
  '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
];

// 9 个 SAMPLE 怪物（覆盖 myMonster / myMonsterSell / otherMonster / otherMonsterSell / sharedTo）
// HP/ATK/DEF/SPEED 全部在 100-140 范围内（合约 createMonster 上限 140）。
export function sampleMonsters() {
  return [
    { id: 1, owner: SAMPLE_OWNER,   species: 1,   price: 0,  sale: false, monsterType: 0, evolve: false, hp: 120, atk: 118, def: 112, speed: 108, sharedTo: '0x0000000000000000000000000000000000000000' },
    { id: 2, owner: SAMPLE_OWNER,   species: 12,  price: 0,  sale: false, monsterType: 1, evolve: true,  hp: 130, atk: 130, def: 128, speed: 114, sharedTo: '0x0000000000000000000000000000000000000000' },
    { id: 3, owner: SAMPLE_OWNER,   species: 25,  price: 0,  sale: false, monsterType: 2, evolve: true,  hp: 140, atk: 135, def: 130, speed: 122, sharedTo: SAMPLE_OTHER[0] },
    { id: 4, owner: SAMPLE_OWNER,   species: 47,  price: 2,  sale: true,  monsterType: 0, evolve: false, hp: 110, atk: 114, def: 109, speed: 106, sharedTo: '0x0000000000000000000000000000000000000000' },
    { id: 5, owner: SAMPLE_OTHER[0],species: 73,  price: 5,  sale: true,  monsterType: 1, evolve: true,  hp: 138, atk: 132, def: 128, speed: 118, sharedTo: '0x0000000000000000000000000000000000000000' },
    { id: 6, owner: SAMPLE_OTHER[0],species: 89,  price: 0,  sale: false, monsterType: 2, evolve: true,  hp: 140, atk: 140, def: 138, speed: 125, sharedTo: '0x0000000000000000000000000000000000000000' },
    { id: 7, owner: SAMPLE_OTHER[1],species: 110, price: 8,  sale: true,  monsterType: 0, evolve: false, hp: 105, atk: 112, def: 107, speed: 105, sharedTo: '0x0000000000000000000000000000000000000000' },
    { id: 8, owner: SAMPLE_OTHER[2],species: 134, price: 0,  sale: false, monsterType: 1, evolve: true,  hp: 132, atk: 138, def: 134, speed: 120, sharedTo: SAMPLE_OWNER },
    { id: 9, owner: SAMPLE_OTHER[3],species: 145, price: 12, sale: true,  monsterType: 2, evolve: true,  hp: 140, atk: 132, def: 130, speed: 122, sharedTo: '0x0000000000000000000000000000000000000000' },
  ];
}

// 代币余额（TM）— 用 string 避免 ES2017 环境的 BigInt literal 问题
export const sampleBalances = {
  token: '1000000000000000000',  // 1 TM (18 位)
};

// NFT 库存（HEALING / MANA / MAGIC / SHIELD / SWORD / LOKIS_HAMMER 6 种 id）— string 数组
export const sampleNftBalances = [
  '5', '3', '2', '1', '0', '1',
];

// Trade 页面 "其他人在售" 列表
export function sampleMarketList() {
  return sampleMonsters().filter(m => m.sale && m.owner !== SAMPLE_OWNER);
}

export const SAMPLE_DATA_NOTE = 'SAMPLE DATA — connect wallet to see real on-chain state';
