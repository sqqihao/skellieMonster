import {config} from "../../wagmiconf.js";
import {conAddr} from "../../constant.js";

import { readContract, writeContract, getAccount, waitForTransactionReceipt } from '@wagmi/core';

// 关键修复：原代码在模块顶层 `const { address } = getAccount(config)` 解构，
// 但模块加载时 wallet 还没连 → address 永远 undefined，wagmi 报 "Connector not connected"。
// 改成在每个 write 函数内部 getAccount 拿当前地址。
const getAddr = () => getAccount(config).address;

export const waitReceipt = async function(hash){
	const transactionReceipt = await waitForTransactionReceipt(config, {
	  hash: hash,
	});
	return transactionReceipt;
}

export const WriteContract = {

	sellMon: async function (_id, _price){
		const args = [_id, _price];
		let tx = await writeContract(config, {
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			account: getAddr(),
			functionName: "addSale",
			args: args,
		});
		return tx;
	},

	buyMon: async function (_id, _price){
		// eslint-disable-next-line no-undef
		const priceBig = typeof _price === 'bigint' ? _price : BigInt(String(_price));
		// 第一笔：approve TokenMonster spend
		let tx = await writeContract(config, {
			address: conAddr.tokenAddr,
			abi: conAddr.tokenABI,
			account: getAddr(),
			functionName: "approve",
			args: [conAddr.monsterAddr, priceBig],
		});

		// 第二笔：buyMonster
		const args = [_id];
		tx = await writeContract(config, {
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			account: getAddr(),
			functionName: "buyMonster",
			args: args,
		});
		return tx;
	},

	delMon: async function(_id){
		const args = [_id];
		let tx = await writeContract(config, {
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			account: getAddr(),
			functionName: "removeSale",
			args: args,
		});
		return tx;
	},

	breed: async function(_id1, _id2){
		const args = [_id1, _id2];
		let tx = await writeContract(config, {
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			account: getAddr(),
			functionName: "breedMonster",
			args: args,
		});
		return tx;
	},

	fight: async function(_id1, _id2){
		const args = [_id1, _id2];
		let tx = await writeContract(config, {
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			account: getAddr(),
			functionName: "fight",
			args: args,
		});
		return await waitReceipt(tx);
	},

	startShare: async function(_id, _addr){
		const args = [_id, _addr];
		let tx = await writeContract(config, {
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			account: getAddr(),
			functionName: "startSharing",
			args: args,
		});
		return tx;
	},

	shopShare: async function(_id){
		const args = [_id];
		let tx = await writeContract(config, {
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			account: getAddr(),
			functionName: "stopSharing",
			args: args,
		});
		return tx;
	},

	buyItem: async function(_id, _price, _units){
		// eslint-disable-next-line no-undef
		const priceBig = typeof _price === 'bigint' ? _price : BigInt(String(_price));
		// eslint-disable-next-line no-undef
		const unitsBig = typeof _units === 'bigint' ? _units : BigInt(String(_units));
		const total = priceBig * unitsBig;
		let tx = await writeContract(config, {
			address: conAddr.tokenAddr,
			abi: conAddr.tokenABI,
			account: getAddr(),
			functionName: "approve",
			args: [conAddr.monsterAddr, total],
		});

		const buyArgs = [_id, unitsBig];
		tx = await writeContract(config, {
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			account: getAddr(),
			functionName: "buyItem",
			args: buyArgs,
		});
		return tx;
	},

	burnItem: async function(_id, _units){
		const addr = getAddr();
		const args = [addr, conAddr.monsterAddr];
		let isApprove = await readContract(config, {
			address: conAddr.nftAddr,
			abi: conAddr.nftABI,
			account: addr,
			functionName: "isApprovedForAll",
			args: args,
		});

		if(!isApprove){
			const _args = [conAddr.monsterAddr, true];
			let tx = await writeContract(config, {
				address: conAddr.nftAddr,
				abi: conAddr.nftABI,
				account: addr,
				functionName: "setApprovalForAll",
				args: _args,
			});
			await waitReceipt(tx);
		}

		const sellArgs = [_id, _units];
		let tx = await writeContract(config, {
			address: conAddr.monsterAddr,
			abi: conAddr.monsterABI,
			account: addr,
			functionName: "burnItem",
			args: sellArgs,
		});
		return tx;
	},

};
