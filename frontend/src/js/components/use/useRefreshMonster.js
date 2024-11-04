import {ReadContract} from "../../model/ReadContract.js"
import { useState } from 'react'
import {config} from "../../../wagmiconf.js";
import { readContract,writeContract ,simulateContract,getAccount,waitForTransactionReceipt} from '@wagmi/core'


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
			acc[key] = (typeof value == "bigint" ? parseInt(value):value); // 将值映射到固定键上
			return acc;
		}, {});
		results.push(result);
	}
	return results;
}

function useRefreshMonster() {
	const { address } = getAccount(config)
	const [monster, setMonster] = useState([]);
	const [myMonster, setMyMonster] = useState([]);
	const [myMonsterSell, setMyMonsterSell] = useState([]);
	const [otherMonster, setOtherMonster] = useState([]);
	const [otherMonsterSell, setOtherMonsterSell] = useState([]);
	const [mySharedMonster, setMySharedMyMonster] = useState([]);
	const [sharetoMeMonster, setsharetoMeMonster] = useState([]);
	

	async function refresh(){
		let arrMon = await ReadContract.getMonsterList();
		// console.log(arrMon);
		let results = transferData(arrMon);
		// console.log(results);
		setMonster(results)

		setMyMonster(results.filter((mon)=>{return mon.owner==address&&mon.sale==false}));
		setMyMonsterSell(results.filter((mon)=>{return mon.owner==address&&mon.sale==true}));

		setOtherMonster(results.filter((mon)=>{return mon.owner!=address}));
		setOtherMonsterSell(results.filter((mon)=>{return mon.owner!=address&&mon.sale==true}));

		setMySharedMyMonster(results.filter((mon)=>{return (mon.owner==address)&&(mon.sharedTo!=address)}));

		setsharetoMeMonster(results.filter((mon)=>{return (mon.owner!=mon.sharedTo)&&(mon.sharedTo==address)}));
		// setMyMonster(()=>{});
	}
	return {monster, myMonster,myMonsterSell, otherMonster, refresh,otherMonsterSell,mySharedMonster,sharetoMeMonster}
}

export default useRefreshMonster;