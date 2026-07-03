import React,{useState,useEffect, useRef} from 'react';
import { Table } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from './components/Spinner'
import {addForSaleDiv, bgStyle, breedDiv, breedOption, buyDiv, imgDiv, monName, nameDiv, names, removeFromSaleDiv, statDiv} from "./components/utils.js"
import { EmptyPlaceholder } from "./components/EmptyPlaceholder"


function NFT(props){
	const {bal,getBal,buyItem,balanceOfNft,getNftPrice,burnItem} = props;
	const [tokenBalance,setTokenBalance] = useState('0');
	const [sellTokenValue,setSellTokenValue] = useState(1)
    const selectRef = useRef(null);
    // [F-fix] NFT 页 balance 数字格式化：把 18 位 wei 数字转成可读 TM 单位
    // 之前直接 toString() 显示 1000000000000000000 = 1e18 wei = 1 TM
    // 用户看到这个数以为是 9999 亿，所以必须格式化为 "1.0" 之类
    const formatTM = (raw) => {
      if (raw === undefined || raw === null || raw === '0' || raw === 0) return '0';
      try {
        // raw 是 BigInt wei (18 decimals)
        // eslint-disable-next-line no-undef
        const wei = typeof raw === 'bigint' ? raw : BigInt(String(raw));
        // eslint-disable-next-line no-undef
        const whole = wei / 1000000000000000000n;
        // eslint-disable-next-line no-undef
        const frac = wei % 1000000000000000000n;
        // eslint-disable-next-line no-undef
        if (frac === 0n) return whole.toString();
        // 保留 4 位小数
        const fracStr = frac.toString().padStart(18, '0').slice(0, 4).replace(/0+$/, '');
        return fracStr ? `${whole.toString()}.${fracStr}` : whole.toString();
      } catch (e) {
        return String(raw);
      }
    };
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

		if(bal !== undefined && bal !== null){
			// [F12 修复] 链上 balance 是 BigInt (wei)，直接 toString() 保留 18 位精度
			setTokenBalance(bal.toString());
		}


			let nftBalances = await balanceOfNft([0,1,2,3,4,5]);
			// setNftBalances(nftBalances);
			let nftPrice = await getNftPrice();
			// debugger;

			// [F12 修复] 用 toString() 保留 BigInt 完整精度
			// parseInt(10^27) = 1（精度丢光），BigInt.toString() 保留 1000000...0
			nftBalances.map((val,index)=>{
				aNFTInfo[index].balance = val.toString();
				aNFTInfo[index].price = nftPrice.toString();
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
                  Balance: <span style={{ fontSize: '1.5em' }}> {formatTM(tokenBalance)} </span>Token
                </div>
		        </Col>
		        <hr className="golden" />
	      </Row>
	      <Row className="justify-content-center">
		        <Col  md={{ span: 4 }}>
		            <div className="rpgui-container framed-grey">
					    <select className="rpgui-dropdown" ref={selectRef} >
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
	      {aNFTInfo.length === 0 ? (
	        <Col md={{ span: 8 }}>
	          <EmptyPlaceholder
	            icon="🛍️"
	            title="No Items Available"
	            message="The shop is empty. Items may be out of stock."
	          />
	        </Col>
	      ) : aNFTInfo.map(function(NFT){
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
                <span className="nft-price">{formatTM(NFT.price)} TM</span>
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