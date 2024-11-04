import {ReadContract} from "../../model/ReadContract.js"
import {config} from "../../../wagmiconf.js";
import { ethers } from 'ethers';
import {WriteContract} from "../../model/WriteContract.js"
import {conAddr} from "../../../constant.js";

const contractInterface = new ethers.Interface(conAddr.monsterABI);
// console.log(contractInterface)

function useSellBuy(){
	async function sellMon(_id,_price){
		return await WriteContract.sellMon(_id,_price)

	}
	async function buyMon(_id,_price){
		return await WriteContract.buyMon(_id,_price)

	};
	async function delMon(_id){
		return await WriteContract.delMon(_id)

	}
	async function breedMon(_id1,_id2){
		return await WriteContract.breed(_id1,_id2);
	}
	async function fightMon(_id1,_id2){
		let receipt =  await WriteContract.fight(_id1,_id2);

		const events = receipt.logs.map(log => {
		// 解析日志
			return contractInterface.parseLog(log);
		});
		console.log(events);
		// 输出解析的事件
		var eventResult = {};
		events.forEach(event => {
			if(!event)return;
			console.log("事件名:", event&&event.name);
			console.log("事件数据:", event&&event.args);
			event&&event.name&&(eventResult[event.name] = parseInt(event.args[0]));
		});

		return eventResult;
		// const parsedLog = contractInterface.parseLog(log);	
	}
	async function startShare(_id,_addr){
		return await WriteContract.startShare(_id,_addr);
	}
	async function stopShare(_id){
		return await WriteContract.shopShare(_id);
	}
	return {sellMon, buyMon ,delMon ,breedMon ,fightMon, stopShare,startShare}
}

export default useSellBuy;