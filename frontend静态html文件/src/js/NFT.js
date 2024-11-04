import React,{useState} from 'react';
import { Table } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from './components/Spinner'
import {addForSaleDiv, bgStyle, breedDiv, breedOption, buyDiv, imgDiv, monName, nameDiv, names, removeFromSaleDiv, statDiv} from "./components/utils.js"


function NFT(){
	const [tokenBalance,setTokenBalance] = useState(10);
	const [aNFTInfo ,setANFTInfo] = useState([
				{name:"sword",price:"500",balance:"16"},
				{name:"Shield",price:"100",balance:"18"},
				{name:"knife",price:"120",balance:"25"},
				{name:"dualswords",price:"300",balance:"76"},
				{name:"potion-red",price:"60",balance:"42"},
				{name:"tower",price:"1000",balance:"3"}]);
	const buyItem = function(){

	}

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

					    <select class="rpgui-dropdown">
		      				{aNFTInfo&&aNFTInfo.map((NFT) => (
								<option value={NFT.name.toLowerCase()}>{NFT.name}</option>
							))}
						</select>
						<br />
						<br />
		                  <div className="with-sell-item-input">
		                    <input
		                      className="form-input"
		                      placeholder="0"
		                      value="1"/>
		                  </div>
							<br />
							<br />
							<br />
							<br />
		                    <button
		                      className="rpgui-button token-input-btn"
		                      type="button">
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
	      	{aNFTInfo&&aNFTInfo.map((NFT) => (

		        <Col  md={{ span: 4 }}>

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
		                      placeholder="0"
		                      value="1"/>

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
		                      onClick={() => buyItem("1", '500', '3')}>
		                      Buy
		                    </button>
		                  </div>
		                </div>
		              </div>
		            </div>

		        </Col>

	      	))}
	      </Row>
	    </Container>
	);
}
//
export default NFT;