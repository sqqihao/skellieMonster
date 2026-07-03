
import {config} from "../../wagmiconf.js";
import {conAddr} from "../../constant.js";

import { useAccount,useWriteContract } from 'wagmi'
import { readContract,writeContract ,simulateContract,getAccount,waitForTransactionReceipt} from '@wagmi/core'


export const ReadContract = {
	getBal: async function(){
		const { address } = getAccount(config)
		if (!address) return 0n;  // 未连钱包不调合约
		const args = [address];
		let bal = await readContract(config,{
			address: conAddr.tokenAddr,
			abi: conAddr.tokenABI,
			account:address,
			functionName: "balanceOf",
			args:args
		});
		return bal
	},
	getMonsterList:async function() {

		const { address } = getAccount(config)
		if (!address) return [];  // 未连钱包不调合约
		let totalMonster;
		try {
			totalMonster = await readContract(config,{
				address: conAddr.monsterAddr,
				abi: conAddr.monsterABI,
				account:address,
				functionName: "totalMonster"
			});
		} catch(e) {
			console.warn('getMonsterList totalMonster failed (likely viem 2.x no-data bug):', e.message);
			return [];
		}
		let pLen = Number(totalMonster);
		// console.log(pLen);

		// 链上空 / totalMonster > 实际存储怪数时，mons(i) 读空 slot 会 throw；
		// 整个 try/catch 包住，确保 wagmi multicall 失败时页面不崩。
		try {
			const masterPromise = new Array(pLen).fill(null).map(async (val,index) => {
			  const id = parseInt(index);
			  return await readContract(config,{
				address: conAddr.monsterAddr,
				abi: conAddr.monsterABI,
				account:address,
				functionName: "mons",
				args:[id]
				});
			});
			const allData = (await Promise.all(masterPromise));
			return allData;
		} catch(e) {
			console.warn('getMonsterList mons() batch failed (chain empty / viem decode error):', e.message);
			return [];
		}
	}
	,
	breed:async function(id1,id2){

		const { address } = getAccount(config)
		const args = [id1,id2];
		let tx = await writeContract(config,{
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			account:address,
			functionName: "breedMonster",
			args:args
		});
		// let res = await tx.wait()
		console.log(tx);

	},
	balanceOfNFT:async function(_id) {

		const { address } = getAccount(config)
		if (!address) return 0n;  // 未连钱包 fallback
		const args = [address,_id];
		let bal = await readContract(config,{
			address: conAddr.nftAddr,
			abi: conAddr.nftABI,
			account:address,
			functionName: "balanceOf",
			args:args
		});

		return bal;
	},
	getNftPrice:async function(){

		const { address } = getAccount(config)
		if (!address) return [0n, 0n];  // 未连钱包 fallback (POTIONS / EQUIP)
		const args = [];
		try {
			let bal = await readContract(config,{
				address: conAddr.monsterAddr,
				abi: conAddr.monsterABI,
				account:address,
				functionName: "EQUITMENTSPRICE",
				args:args
			});
			return bal
		} catch(e) {
			console.warn('getNftPrice EQUITMENTSPRICE failed:', e.message);
			return [0n, 0n];
		}
	}
}