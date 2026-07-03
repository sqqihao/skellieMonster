import { useState } from 'react'
import {ReadContract} from "../../model/ReadContract.js"
import {config} from "../../../wagmiconf.js";
import { ethers } from 'ethers';
import {WriteContract} from "../../model/WriteContract.js"
import {conAddr} from "../../../constant.js";
import { sampleBalances, sampleNftBalances } from "../data/sampleData.js";

// const contractInterface = new ethers.Interface(conAddr.monsterABI);
// console.log(contractInterface)

function useToken(){
	const [bal,setBal] = useState(sampleBalances.token);
	async function getBal(){
		let _bal = await ReadContract.getBal();
		// 未连钱包 / 余额为 0 → fallback sample
		if (_bal === undefined || _bal === null || (typeof _bal === 'bigint' ? _bal === 0n : String(_bal) === '0')) {
			setBal(sampleBalances.token);
		} else {
			setBal(_bal)
		}
	}

	async function buyItem(_id, _price, _units){
		let tx = await WriteContract.buyItem(_id, _price, _units);
		// setBal(_bal)
		return tx;
	}
	async function balanceOfNft(nftIds){
		// 未连钱包 → 返回 sample NFT 库存
		const { address } = (await import('@wagmi/core')).getAccount(config);
		if (!address) return sampleNftBalances;
		const nftPromises = nftIds.map(async (val,index) => {
			return await ReadContract.balanceOfNFT(val);
		});
		const allData = (await Promise.all(nftPromises));
		// let bal =  await ReadContract.balanceOf(_id);
		// console.log(allData)
		return allData;
	}
	async function getNftPrice(nftIds){

		let _bal = await ReadContract.getNftPrice();
		// debugger;

		return _bal;
	}
	async function burnItem(_nftId, _units){
		let tx = await WriteContract.burnItem(_nftId,_units);
		return tx;
	}
	return {bal,getBal,buyItem,balanceOfNft,getNftPrice,burnItem}
}

export default useToken;