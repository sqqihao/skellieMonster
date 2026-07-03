import {ReadContract} from "../../model/ReadContract.js"
import { useState, useEffect } from 'react'
import {config} from "../../../wagmiconf.js";
import { readContract,writeContract ,simulateContract,getAccount,waitForTransactionReceipt } from '@wagmi/core'
// [F7 修复] useAccount 是 react hook，必须从 'wagmi' 导入（不是 @wagmi/core）
import { useAccount } from 'wagmi'
import { sampleMonsters, sampleBalances, sampleNftBalances, sampleMarketList } from "../data/sampleData.js"


function transferData(arrMons){
	var results = [];
	for(var i=0; i<arrMons.length; i++) {
		const keys = [
			"id",
			"owner",
			"species",
			"price",
			"sale",
			"monsterType",
			"evolve",
			"hp",
			"atk",
			"def",
			"speed",
			"sharedTo"
		]; // 固定的键
		const result = keys.reduce((acc, key, index) => {

			let value = arrMons[i][index]
			// [F1+F15 修复] BigInt 保持 BigInt，Number 保持 Number；species 转 Number 才能索引 names
			if (key === 'species') {
				acc[key] = typeof value === 'bigint' ? Number(value) : Number(value);
			} else if (typeof value === "bigint") {
				// 价格/数值保留 BigInt 防止 wei 精度丢失
				acc[key] = value;
			} else {
				acc[key] = value;
			}
			return acc;
		}, {});
		results.push(result);
	}
	return results;
}

function useRefreshMonster() {
	const { address } = useAccount(config)
	// 未连钱包 → 用 SAMPLE_OWNER 当作"当前用户"，让 9 个示例怪物 5 类都填满
	const effectiveAddress = address || sampleMonsters()[0].owner;
	const [monster, setMonster] = useState(sampleMonsters());
	const [myMonster, setMyMonster] = useState(sampleMonsters().filter(m => m.owner === effectiveAddress && !m.sale));
	const [myMonsterSell, setMyMonsterSell] = useState(sampleMonsters().filter(m => m.owner === effectiveAddress && m.sale));
	const [otherMonster, setOtherMonster] = useState(sampleMonsters().filter(m => m.owner !== effectiveAddress));
	const [otherMonsterSell, setOtherMonsterSell] = useState(sampleMonsters().filter(m => m.owner !== effectiveAddress && m.sale));
	const [mySharedMonster, setMySharedMyMonster] = useState(sampleMonsters().filter(m => m.owner === effectiveAddress && m.sharedTo !== effectiveAddress));
	const [sharetoMeMonster, setsharetoMeMonster] = useState(sampleMonsters().filter(m => m.owner !== m.sharedTo && m.sharedTo === effectiveAddress));


	async function refresh(){
		try {
			let arrMon = await ReadContract.getMonsterList();
			let results = arrMon && arrMon.length ? transferData(arrMon) : sampleMonsters();
			setMonster(results)

			const currentAddr = (await import('@wagmi/core')).getAccount(config).address || effectiveAddress;
			setMyMonster(results.filter((mon)=>{return mon.owner==currentAddr&&mon.sale==false}));
			setMyMonsterSell(results.filter((mon)=>{return mon.owner==currentAddr&&mon.sale==true}));

			setOtherMonster(results.filter((mon)=>{return mon.owner!=currentAddr}));
			setOtherMonsterSell(results.filter((mon)=>{return mon.owner!=currentAddr&&mon.sale==true}));

			setMySharedMyMonster(results.filter((mon)=>{return (mon.owner==currentAddr)&&(mon.sharedTo!=currentAddr)}));

			setsharetoMeMonster(results.filter((mon)=>{return (mon.owner!=mon.sharedTo)&&(mon.sharedTo==currentAddr)}));
		} catch (err) {
			console.error('refresh failed:', err);
			// 保持当前 state，不清空
		}
	}

	// [F7 修复] 监听 address 变化：切 MetaMask 账户或断/连钱包时自动 refresh
	useEffect(() => {
		refresh();
	}, [address]);

	return {monster, myMonster,myMonsterSell, otherMonster, refresh,otherMonsterSell,mySharedMonster,sharetoMeMonster}
}

export default useRefreshMonster;
