import { useState } from 'react'
import {ReadContract} from "../../model/ReadContract.js"
import {config} from "../../../wagmiconf.js";
import { ethers } from 'ethers';
import {WriteContract} from "../../model/WriteContract.js"
import {conAddr} from "../../../constant.js";

// const contractInterface = new ethers.Interface(conAddr.monsterABI);
// console.log(contractInterface)

function useToken(){
	const [bal,setBal] = useState(0);
	async function getBal(){
		let _bal = await ReadContract.getBal();
		// debugger;
		setBal(_bal)
	}

	async function buyItem(_id, _price, _units){
		let tx = await WriteContract.buyItem(_id, _price, _units);
		// setBal(_bal)
		return tx;
	}
	async function balanceOfNft(nftIds){
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