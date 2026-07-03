import React,{useState,useEffect} from 'react';
import { Table } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListRender from "./components/ListRender"
import MonImages from '../sprites'
import Spinner from './components/Spinner'

import {addForSaleDiv, bgStyle, breedDiv, breedOption, buyDiv, imgDiv, monName, nameDiv, names, removeFromSaleDiv, statDiv, getMonsOrder} from "./components/utils.js"
import { EmptyCardPlaceholder, EmptyTablePlaceholder } from "./components/EmptyPlaceholder"


function MyShop(props){
	const { refresh, myMonsterSell, delMon} = props;
	const [mons, setMons] = useState([]);
	const [displayType,setDisplayType] = useState(0);
	const [sortType,setSortType] = useState("");

	useEffect(function(){
		if(!sortType)return;
		let newMons = getMonsOrder(sortType, mons)
		setMons(newMons);
	},[sortType]);

	useEffect(function(){
		// debugger;
		setMons(myMonsterSell)
	},[myMonsterSell]);
	const [isRemoveFromSaleLoading, setIsRemoveFromSaleLoading] = useState(false)


	async function removeFromSale(_id){
		await delMon(_id);
		refresh();
	}

	return (
	    <Container className="vh-100">
	      <ListRender setSortType={setSortType} setDisplayType={setDisplayType} />
	      <Row className="justify-content-center">
	        <Col md="12"  className={displayType==0?"displayblock":"displaynone"}>
		        <div className="master-container">
		        	{!mons || mons.length === 0 ? (
		        		<EmptyCardPlaceholder
		        			icon="🏪"
		        			title="Your Shop is Empty"
		        			message="You haven't listed any creatures for sale yet. Go to the Monster page to set a price and list one."
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
							       <label className="remove-from-sale-label">
							         Price:
							         <br />
							         {mon.price ? mon.price.toString() : '0'}
							       </label>
							       {isRemoveFromSaleLoading ? (
							         <button className="rpgui-button" type="button" style={{ width: '100%' }}>
							           <Spinner color="#000" />
							         </button>
							       ) : (
							         <button className="rpgui-button" type="button" onClick={() => removeFromSale(mon.id)}>
							           Delist
							           {isRemoveFromSaleLoading && <Spinner color="#000" />}
							         </button>
							       )}
							     </div>
				            </div>
				          </React.Fragment>)
		        	})}
		        </div>
	        </Col>
	      </Row>
	      <Row className="justify-content-center">
	        <Col md="12"  className={displayType==1?"displayblock":"displaynone"}>

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
		            {!mons || mons.length === 0 ? (
		            	<EmptyTablePlaceholder colSpan={6} title="Your Shop is Empty" message="No creatures listed for sale." />
		            ) : mons.map((mon) => (
		                  <tr key={mon.id}>
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

								<td data-label="Price">{mon.price ? mon.price.toString() : '0'}</td>
								<td data-label="Action">
										<button
										className="rpgui-button mylokimons-sell-btn" type="button" onClick={() => (mon.id ? removeFromSale(mon.id) : null)}>
										{isRemoveFromSaleLoading ? <Spinner color="#000" /> : 'Delist'}
										</button>
									</td>
		                  </tr>
		                ))}
		          </tbody>
		        </Table>

	        </Col>
	      </Row>

	    </Container>

	);
}
//
export default MyShop;