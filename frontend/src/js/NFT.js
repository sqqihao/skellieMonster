import React,{useState,useEffect, useRef} from 'react';
import { Table } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from './components/Spinner'
import {addForSaleDiv, bgStyle, breedDiv, breedOption, buyDiv, imgDiv, monName, nameDiv, names, removeFromSaleDiv, statDiv} from "./components/utils.js"


function NFT(props){
	const {bal,getBal,buyItem,balanceOfNft,getNftPrice,burnItem} = props;
	const [tokenBalance,setTokenBalance] = useState(10);
	const [sellTokenValue,setSellTokenValue] = useState(1)
	// const [nftBalances,setNftBalances] = useState(10);
    const selectRef = useRef(null); 
	const [aNFTInfo ,setANFTInfo] = useState([
				{id:0,name:"sword",price:"0",balance:"0"},
				{id:1,name:"Shield",price:"0",balance:"0"},
				{id:2,name:"knife",price:"0",balance:"0"},
				{id:3,name:"dualswords",price:"0",balance:"0"},
				{id:4,name:"potion-red",price:"0",balance:"0"},
				{id:5,name:"tower",price:"0",balance:"0"}]);

	const changeSellTokenVal = (ev)=>{
		setSellTokenValue(parseInt(ev.target.value));
	}

    const burnChangeHandler = async ()=>{
    	// debugger;
    	// console.log("选中的NFT:", selectRef.current.value); // 获取选中的值
    	var _NftId = selectRef.current.selectedOptions[0].getAttribute("idx");
    	// sellTokenValue
    	await burnItem(_NftId, sellTokenValue)
    	//更新余额刷新界面
		await getBal();

    }
    // const changeHandler = ()=>{

    // }
	const buyNFT = async function(id, _price, _units){
		await buyItem(id,  _price, _units);
		//更新余额刷新界面
		await getBal();
	}
	// debugger;
	useEffect(function(){
		async function fetchData() {

			if(bal){
				setTokenBalance(parseInt(bal));	
			}


			let nftBalances = await balanceOfNft([0,1,2,3,4,5]);
			// setNftBalances(nftBalances);
			let nftPrice = await getNftPrice();
			// debugger;

			nftBalances.map((val,index)=>{
				aNFTInfo[index].balance = parseInt(nftBalances[index])
				aNFTInfo[index].price = parseInt(nftPrice)
			});

			console.log(bal)
			console.log(nftBalances)
// 
			setANFTInfo(JSON.parse(JSON.stringify(aNFTInfo)));

		}
		fetchData();

	},[bal]);


	return (
	    <Container className="vh-100">
	      <Row className="justify-content-center">
		        <Col  md={{ span: 6 }}>
		          <h1 className="p1 p1-for-centering green-glow">NFT</h1>
		        </Col>
	      </Row>

	      <Row className="justify-content-center">
		        <Col  md={{ span: 6 }}>
	                <div className="rpgui-container framed-grey">
	                  Balance: <span style={{ fontSize: '1.5em' }}> {tokenBalance} </span>Token
	                </div>
		        </Col>
		        <hr class="golden" />
	      </Row>
	      <Row className="justify-content-center">
		        <Col  md={{ span: 4 }}>
		            <div className="rpgui-container framed-grey">
					    <select class="rpgui-dropdown" ref={selectRef} >
		      				{aNFTInfo&&aNFTInfo.map((NFT) => (
								<option key={NFT.id} idx={NFT.id} value={NFT.name.toLowerCase()}>{NFT.name}</option>
							))}
						</select>
						<br />
						<br />
		                  <div className="with-sell-item-input">
		                    <input
		                      className="form-input"
		                      placeholder="0"
		                      onChange={changeSellTokenVal}
		                      value={sellTokenValue}/>
		                  </div>
							<br />
							<br />
							<br />
							<br />
		                    <button
		                      className="rpgui-button token-input-btn"
		                      type="button"
		                      onClick={burnChangeHandler} >
		                      Sell
		                    </button>
	                </div>
		        </Col>

	      </Row>
	      <Row className="justify-content-center">
		        <Col  md={{ span: 4 }}>
		        	<h1>&nbsp;</h1>
		        </Col>
	      </Row>

	      <Row className="justify-content-center">
	      	{aNFTInfo&&aNFTInfo.map(function(NFT){
	      		let eIptVal = 0;
	      		return (
			        <Col  key={NFT.id} md={{ span: 4 }}>
			            <div className="rpgui-container framed-grey">
			              <div className="" style={{ marginBottom: '24px' }}>
			                <span className="titles-token">Buy Items (NFT)</span>
			              </div>
			              <div className="sharing-area">
			                <span className="item-label">
			                  <div className={"rpgui-icon "+NFT.name.toLowerCase()}></div> {NFT.name}
			                </span>{' '}
			                {NFT.price}
			                <div className="buy-item-input-container">
			                  <div className="with-buy-item-input">
			                    <input
			                      className="form-input"
			                      onChange={(ev)=>{;eIptVal=ev.target.value}}
			                      />
			                  </div>
			                  <div>
			                  	<p>
			                  		Balance: {NFT.balance} {NFT.name}NFT
			                  	</p>
			                  </div>
			                  <div className="with-buy-item">
			                    <button
			                      className="rpgui-button token-input-btn"
			                      type="button"
			                      onClick={() => buyNFT(NFT.id, NFT.price, eIptVal)}>
			                      Buy
			                    </button>
			                  </div>
			                </div>
			              </div>
			            </div>

			        </Col>
			    )
		        }

	      	)}
	      </Row>
	    </Container>
	);
}
//
export default NFT;