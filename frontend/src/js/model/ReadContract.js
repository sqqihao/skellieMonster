
import {config} from "../../wagmiconf.js";
import {conAddr} from "../../constant.js";

import { useAccount,useWriteContract } from 'wagmi'
import { readContract,writeContract ,simulateContract,getAccount,waitForTransactionReceipt} from '@wagmi/core'


export const ReadContract = {
	getBal: async function(){
		const { address } = getAccount(config)
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
		let totalMonster = await readContract(config,{
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			account:address,
			functionName: "totalMonster"
		});
		let pLen = parseInt(totalMonster);
		// console.log(pLen);


		const masterPromise = new Array(pLen).fill(null).map(async (val,index) => {
		  const id = parseInt(index);
		  // console.log(id);
		  // console.log(_catId);
		  // const array = (await marketplaceInstance.read.getOffer?.([Number(_catId)]));
		  return await readContract(config,{
				address: conAddr.monsterAddr,
				abi: conAddr.monsterABI,
				account:address,
				functionName: "mons",
				args:[id]
			});
		});
		// console.log(masterPromise)
		const allData = (await Promise.all(masterPromise));

		// console.log(allData);
		return allData;
		// createMonster
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
		const args = [];
		let bal = await readContract(config,{
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			account:address,
			functionName: "EQUITMENTSPRICE",
			args:args
		});

		return bal
	}
}