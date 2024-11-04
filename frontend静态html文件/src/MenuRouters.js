import { Routes, Route } from 'react-router-dom'
import Monster from "./js/Monster.js"
import MyShop from "./js/MyShop.js"
import Breed from "./js/Breed.js"
import Trade from "./js/Trade.js"
import Dojo from "./js/Dojo.js"
import Share from "./js/Share.js"
import NFT from "./js/NFT.js"
import ShareToMe from "./js/ShareToMe.js"




function MenuRouters(){
	return (
		<Routes >
			<Route path="/" element={<Monster />} />
			<Route path="/Monster" element={<Monster />} />
			<Route path="/MyShop" element={<MyShop />}  />
			<Route path="/Breed" element={<Breed />}  />
			<Route path="/Trade" element={<Trade />}  />
			<Route path="/Dojo" element={<Dojo />}  />
			<Route path="/Share" element={<Share />}  />
			<Route path="/ShareToMe" element={<ShareToMe />}  />
			<Route path="/NFT" element={<NFT />}  />
			
		</Routes>
	)
}

export default MenuRouters;