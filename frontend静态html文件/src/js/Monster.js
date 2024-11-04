import React,{useState} from 'react';
import { Table } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListRender from "./components/ListRender"
import MonImages from '../sprites'
import Spinner from './components/Spinner'

import {addForSaleDiv, bgStyle, breedDiv, breedOption, buyDiv, imgDiv, monName, nameDiv, names, removeFromSaleDiv, statDiv} from "./components/utils.js"
function Monster(){
	let mons = [{
		id:1,
		price:1,
		species:1,
		atk:10,
		def:20,
		speed:15,
		hp:60,
		monType:3
	},{
		id:4,
		price:44,
		species:125,
		atk:10,
		def:20,
		speed:9,
		hp:60,
		monType:4
	},{
		id:9,
		price:22,
		species:49,
		atk:10,
		def:110,
		speed:80,
		hp:64,
		monType:2
	},{
		id:11,
		price:110,
		species:98,
		atk:1,
		def:111,
		speed:20,
		hp:44,
		monType:5
	}];
	mons = mons.concat(JSON.parse(JSON.stringify(mons)));
	const [isAddForSaleLoading, setIsAddForSaleLoading] = useState(false)


	function addForSale(){

	}

	function handleChangePrice(ev) {

	}
	function handleChangePrice(ev){

	}
	return (
	    <Container className="vh-100">
	      <Row className="justify-content-center">
	        <Col md="12">
				<ListRender/>
		        <div className="master-container">
		        	{mons&&mons.map(function(mon){
		        		return (
					        <React.Fragment key={mon.id}>
					          <div className="mon">
					            <figure className="my-figure">
					              {nameDiv(mon)}
					              {imgDiv(mon)}
					              <figcaption>{statDiv(mon)}</figcaption>
					            </figure>
		                        {addForSaleDiv(mon, mon.price, handleChangePrice, isAddForSaleLoading, addForSale)}
					          </div>
					        </React.Fragment>)
		        	})}
		        </div>
	        </Col>
	      </Row>
	      <Row className="justify-content-center">
	        <Col md="12">

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
		            {mons&&mons.map((mon) => (
		                  <tr key={mon.id}>
		                    <td>{mon.id}</td>
		                    <td>
		                      {' '}
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
		                    <td>{monName(mon.species) || ''} </td>
		                    <td>{`HP ${mon.hp}, ATK ${mon.atk}, DEF ${mon.def}, SPD ${mon.speed}`}</td>
		                    <td>
		                      <input
		                        type="number"
		                        className="add-for-sale-input"
		                        value={mon.price}
		                        onChange={(e) => {
		                          // onHandlePriceChange(e)
		                          handleChangePrice(e)
		                        }}
		                      />
		                    </td>
		                    <td>
		                      <button
		                        className="rpgui-button mylokimons-sell-btn"
		                        type="button"
		                        value={mon.price}
		                        onClick={() => addForSale(mon.id, mon.price)}>
		                        {isAddForSaleLoading ? <Spinner color="#000" /> : 'Sell'}
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
export default Monster;