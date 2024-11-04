import React,{useState,useEffect} from 'react';
import { Table } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListRender from "./components/ListRender"
import MonImages from '../sprites'
import Spinner from './components/Spinner'
import {addForSaleDiv, bgStyle, breedDiv, breedOption, buyDiv, imgDiv, monName, nameDiv, names, removeFromSaleDiv, statDiv, getMonsOrder} from "./components/utils.js"

function Trade( props ){
	const {otherMonsterSell,refresh,buyMon} = props;
	const [mons, setMons] = useState([]);
	const [displayType,setDisplayType] = useState(0);
	const [sortType,setSortType] = useState("");
	const [isBuyMonLoading, setIsBuyMonLoading] = useState(false);

	const buyMonster = async function(_id, _price){
		await buyMon(_id, _price);
		await refresh();
	}
	useEffect(function(){
		if(otherMonsterSell){
			setMons(otherMonsterSell);
		}

	},otherMonsterSell);

	useEffect(function(){
		if(!sortType)return;
		let newMons = getMonsOrder(sortType, mons)
		setMons(newMons);
	},[sortType]);

	return (
	    <Container className="vh-100">
		  <ListRender  setSortType={setSortType} setDisplayType={setDisplayType} />
	      <Row className="justify-content-center">
	        <Col md="12"   className={displayType==0?"displayblock":"displaynone"}>
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
		                        
							    <div className="buying-div">
							      <div className="sale-price">
							        Price:
							        <br />
							        {mon.price}
							      </div>
							      <div className="sale-owner">Creature Owner: {mon.owner} </div>
							      {isBuyMonLoading ? (
							        <button className="rpgui-button" type="button" style={{ width: '100%' }}>
							          <Spinner color="#000" />
							        </button>
							      ) : (
							        <button
							          className="sale-btn rpgui-button"
							          type="button"
							          style={{ float: 'right' }}
							          onClick={() => buyMonster(mon.id, mon.price)}
							        >
							          Buy
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
	        <Col md="12"   className={displayType==1?"displayblock":"displaynone"}>
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

							<td>{mon.price || 0}</td>
							<td>
		                      <button
		                        className="rpgui-button mylokimons-sell-btn"
		                        type="button"
		                        onClick={() => (mon.id && mon.price ? buyMonster(mon.id, mon.price) : null)}
		                      >
		                        {isBuyMonLoading ? <Spinner color="#000" /> : 'Buy'}
		                      </button>
							</td>
		                  </tr>
		                ))}
		          </tbody>
		        </Table>
			</Col>
		  </Row>
		 </Container>
	)
}
//
export default Trade;