import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListRender from "./components/ListRender"
import MonImages from '../sprites'
import Spinner from './components/Spinner'
import { EmptyCardPlaceholder, EmptyTablePlaceholder } from "./components/EmptyPlaceholder"

import {addForSaleDiv, bgStyle, breedDiv, breedOption, buyDiv, imgDiv, monName, nameDiv, names, removeFromSaleDiv, statDiv, getMonsOrder} from "./components/utils.js"
function Monster(props){
	const {monster, refresh, sellMon} = props;
	const [mons, setMons] = useState([]);

	const [isAddForSaleLoading, setIsAddForSaleLoading] = useState(false);
	const [displayType,setDisplayType] = useState(0);
	const [sortType,setSortType] = useState("");

	useEffect(function(){
		if(!sortType)return;
		let newMons = getMonsOrder(sortType, mons)
		setMons(newMons);
	},[sortType]);

	useEffect(function(){
		setMons(monster)
	},[monster]);

	async function addForSale(_id,_price){
		console.log(_id,_price);
		let tx = await sellMon(_id,_price);
		console.log(tx);
		if(tx) {
			await refresh();
		}
	}
	function changePrice(_id,_price) {
		// eslint-disable-next-line no-undef
		const newPrice = typeof _price === 'bigint' ? _price : BigInt(String(_price || '0'));
		const newMons = mons.map((e) => {
			if (e.id == _id) {
				return { ...e, price: newPrice };
			}
			return e;
		});
		setMons(newMons);
	};
	const isEmpty = !mons || mons.length === 0;
	return (
	    <Container className="vh-100">
		  <ListRender setSortType={setSortType} setDisplayType={setDisplayType} />
	      <Row className="justify-content-center" >
	        <Col md="12" className={displayType==0?"displayblock":"displaynone"}>
		        <div className="master-container ">
		        	{isEmpty ? (
		        		<EmptyCardPlaceholder
		        			icon="🐉"
		        			title="No Monsters Yet"
		        			message="You don't own any creatures. Try breeding in the Breed page or buy one from the Trade page."
		        		/>
		        	) : mons.map(function(mon){
		            	return (
				          <React.Fragment key={mon.id}>
				            <div className="mon">
				              <figure className="my-figure">
				                {nameDiv(mon)}
				                {imgDiv(mon)}
				                <figcaption>{statDiv(mon)}</figcaption>
				              </figure>
							     <div className="selling-div">
							       <label className="add-for-sale-label">Set price:</label>
							       <input type="number" value={mon.price} className="add-for-sale-input"
			                        onChange={(e) => {
			                          changePrice(mon.id,e.target.value);
			                        }}
			                      />
							       {isAddForSaleLoading ? (
							         <button className="rpgui-button" type="button" style={{ width: '100%' }}>
							           <Spinner color="#000" />
							         </button>
							       ) : (
							         <button className="rpgui-button" type="button" onClick={() => addForSale(mon.id, mon.price)}>
							           Sell
							         </button>
							       )}
							     </div>
				            </div>
				          </React.Fragment>
		            	)
		            })}
		        </div>
	        </Col>
	      </Row>
	      <Row className="justify-content-center">
	        <Col md="12" className={displayType==1?"displayblock":"displaynone"}>

		        <Table striped bordered hover variant="dark" responsive className="master-table">
		          <thead>
		            <tr>
		              <th>ID</th>
		              <th>Img</th>
		              <th>Name</th>
		              <th>Stats</th>
		              <th>Price</th>
		              <th>Action</th>
		            </tr>
		          </thead>
		          <tbody>
		            {isEmpty ? (
		            	<EmptyTablePlaceholder colSpan={6}
		            		title="No Monsters Yet"
		            		message="Try breeding in the Breed page or buy one from the Trade page." />
		            ) : mons.map((mon) => {
		                  return <tr key={mon.id}>
		                    <td data-label="ID">{mon.id}</td>
		                    <td data-label="Img">
		                      <div style={{ border: '2px solid gray', padding: '3px', borderRadius: '4px' }}>
		                        <img
		                          className="mylokimons-img"
		                          src={MonImages[`${parseInt(mon.species.toString()) + 1}`]}
		                          alt={mon.species.toString()}
		                          height="45"
		                          width="45"
		                        />
		                      </div>
		                    </td>
		                    <td data-label="Name">{monName(mon.species) || ''} </td>
		                    <td data-label="Stats">{`HP ${mon.hp}, ATK ${mon.atk}, DEF ${mon.def}, SPD ${mon.speed}`}</td>
		                    <td data-label="Price">
		                      <input
		                        type="number"
		                        className="add-for-sale-input"
		                        value={mon.price}
		                        onChange={(e) => {
		                          changePrice(mon.id,e.target.value);
		                        }}
		                      />
		                    </td>
		                    <td data-label="Action">
		                      <button
		                        className="rpgui-button mylokimons-sell-btn"
		                        type="button"
		                        onClick={() => { addForSale(mon.id, mon.price) }}>
		                        {isAddForSaleLoading ? <Spinner color="#000" /> : 'Sell'}
		                      </button>
		                    </td>
		                  </tr>
		                })}
		          </tbody>
		        </Table>

	        </Col>
	      </Row>
	    </Container>

	);
}
//
export default Monster;
