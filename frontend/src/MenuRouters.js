import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Monster from "./js/Monster.js"
import MyShop from "./js/MyShop.js"
import Breed from "./js/Breed.js"
import Trade from "./js/Trade.js"
import Dojo from "./js/Dojo.js"
import Share from "./js/Share.js"
import NFT from "./js/NFT.js"
import ShareToMe from "./js/ShareToMe.js"
import useRefreshMonster from "./js/components/use/useRefreshMonster.js"
import useSellBuy from "./js/components/use/useSellBuy.js"
import useToken from "./js/components/use/useToken.js"


// 
function MenuRouters(){

	const {monster, myMonster,myMonsterSell, otherMonster, refresh, otherMonsterSell, mySharedMonster,sharetoMeMonster } = useRefreshMonster();
	const {sellMon, buyMon, delMon, breedMon, fightMon, startShare, stopShare} = useSellBuy();
	const {bal,getBal,buyItem,balanceOfNft,getNftPrice,burnItem} = useToken();
	
	// await ReadContract.getMarketList();
	// await ReadContract.breed();
	useEffect(() => {
		// await ReadContract.getMarketList();
		// await ReadContract.breed(2,4);

		async function fetchData() {
			await refresh();
			await getBal();
		}
		fetchData();

	},[]);

	//useEffect(function(){

		// console.log(myMonster)
	//},[myMonster])
	return (
		<Routes >
			<Route path="/" element={<Monster  monster={myMonster} refresh={refresh}  sellMon={sellMon}/>} />
			<Route path="/Monster" element={<Monster  monster={myMonster} refresh={refresh}  sellMon={sellMon} />} />
			<Route path="/MyShop" element={<MyShop myMonsterSell={myMonsterSell}  refresh={refresh} delMon={delMon}  /> }  />
			<Route path="/Breed" element={<Breed  monster={myMonster} refresh={refresh} breedMon={breedMon} /> } />
			<Route path="/Trade" element={<Trade otherMonsterSell={otherMonsterSell}  refresh={refresh}  buyMon={buyMon} />}  />
			<Route path="/Dojo" element={<Dojo   monster={myMonster} refresh={refresh} fightMon={fightMon} /> } />
			<Route path="/Share" element={<Share  monster={mySharedMonster} refresh={refresh} stopShare={stopShare} startShare={startShare} /> } />
			<Route path="/ShareToMe" element={<ShareToMe   monster={sharetoMeMonster} refresh={refresh} stopShare={stopShare}/> } />
			<Route path="/NFT" element={<NFT bal={bal} getBal={getBal} buyItem={buyItem} balanceOfNft={balanceOfNft} getNftPrice={getNftPrice} burnItem={burnItem} />}  />
		</Routes>
	)
}

export default MenuRouters;