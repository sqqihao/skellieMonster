import {config} from "../../wagmiconf.js";
import {conAddr} from "../../constant.js";


import { ethers } from 'ethers';
import { readContract,writeContract ,simulateContract,getAccount,waitForTransactionReceipt} from '@wagmi/core'



// export const isApprovedForAll = async function(userAddr, marketAddr){
// 	const args = [userAddr, marketAddr];
// 	let isApproved = await readContract(config,{
// 		address: conAddr.tokenAddr,
// 		abi: conAddr.tokenABI,
// 		functionName: "isApprovedForAll",
// 		args:args
// 	});

//     return isApproved;
// }


export const waitReceipt = async function(hash){
	const transactionReceipt = await waitForTransactionReceipt(config, {
	  hash: hash,
	});
	return transactionReceipt;
}


// export const setApprovalForAll = async function(marketAddr, state){
// 	const args = [marketAddr, state]
// 	let tx = await writeContract(config,{
// 		address: conAddr.tokenAddr,
// 		abi: conAddr.tokenABI,
// 		functionName: "setApprovalForAll",
// 		args:args
// 	});

// 	return tx;
// }

const { address } = getAccount(config)

export const WriteContract = {

	sellMon: async function (_id,_price){

		const args = [_id,_price];

		let tx = await writeContract(config,{
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			functionName: "addSale",
			args:args
		});
		return tx;
	},

	buyMon : async function (_id,_price){
		//ethers.parseEther(String(_price))

		let tx = await writeContract(config,{
			address: conAddr.tokenAddr,
			abi: conAddr.tokenABI,
			functionName: "approve",
			args:[conAddr.monsterAddr,_price],
			// value:_price
		});

		// await tx.wait();

		const args = [_id];
		tx = await writeContract(config,{
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			functionName: "buyMonster",
			args:args,
			// value:_price
		});
		// let recpt = await tx.wait();
		// console.log(recpt)
	    return tx;
	},

	delMon:async function(_id){
		const args = [_id];
		let tx = await writeContract(config,{
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			functionName: "removeSale",
			args:args
		});
		return tx;
	},

	breed:async function(_id1,_id2){
		const args = [_id1,_id2];
		let tx = await writeContract(config,{
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			functionName: "breedMonster",
			args:args
		});
		return tx;
	},

	fight:async function(_id1,_id2){
		// debugger;
		const args = [_id1,_id2];
		let tx = await writeContract(config,{
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			functionName: "fight",
			args:args
		});
		console.log(conAddr)
		console.log("tx is :" + tx);
		// let res = await tx.wait()
		// console.log(res)
		return await waitReceipt(tx)
		// return 1;
		//return tx;
	},
	startShare:async function(_id,_addr){

		const { address } = getAccount(config)
		const args = [_id,_addr];
		let tx = await writeContract(config,{
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			account:address,
			functionName: "startSharing",
			args:args
		});
		// let res = await tx.wait()
		console.log(tx);
	},
	shopShare:async function(_id){

		const { address } = getAccount(config)
		const args = [_id];
		let tx = await writeContract(config,{
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			account:address,
			functionName: "stopSharing",
			args:args
		});
		// let res = await tx.wait()
		console.log(tx);
	},
	buyItem:async function(_id,_price,_units){
		/*
		const { address } = getAccount(config)
		const args = [address, conAddr.monsterAddr];
		let isApprove = await readContract(config,{
			address: conAddr.nftAddr,
			abi: conAddr.nftABI,
			account:address,
			functionName: "isApprovedForAll",
			args:args
		});

		console.log(isApprove);
		if(!isApprove){

			const _args = [conAddr.monsterAddr, true]
			let tx = await writeContract(config,{
				address: conAddr.nftAddr,
				abi: conAddr.nftABI,
				functionName: "setApprovalForAll",
				args:_args
			});


			const transactionReceipt = await waitReceipt(tx)

		}
		*/
		let tx = await writeContract(config,{
			address: conAddr.tokenAddr,
			abi: conAddr.tokenABI,
			functionName: "approve",
			args:[conAddr.monsterAddr,_price*_units],
			// value:_price
		});

		// await tx.wait();

		const buyArgs = [_id,_units];
		tx = await writeContract(config,{
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			functionName: "buyItem",
			args:buyArgs
		});
			
		console.log(buyArgs);
		return tx;
		
	},
	burnItem:async function(_id,_units){

		const { address } = getAccount(config)
		const args = [address, conAddr.monsterAddr];
		let isApprove = await readContract(config,{
			address: conAddr.nftAddr,
			abi: conAddr.nftABI,
			account:address,
			functionName: "isApprovedForAll",
			args:args
		});

		console.log(isApprove);
		if(!isApprove){
			const _args = [conAddr.monsterAddr, true]
			let tx = await writeContract(config,{
				address: conAddr.nftAddr,
				abi: conAddr.nftABI,
				functionName: "setApprovalForAll",
				args:_args
			});
			const transactionReceipt = await waitReceipt(tx)
		}

		const sellArgs = [_id,_units];
		// debugger;
		let tx = await writeContract(config,{
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			functionName: "burnItem",
			args:sellArgs
		});
			
		console.log(sellArgs);
		return tx;
	}
	
}

