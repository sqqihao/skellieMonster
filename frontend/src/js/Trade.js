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
		// 关键修复：每次 mount 时主动 refresh 一次，确保 Trade 页显示最新链上数据。
		// 原因：MenuRouters 的 useEffect([]) 只在 MenuRouters mount 时跑一次（在 app 启动时），
		// 之后切路由不会重新触发 refresh。如果用户在别处停留几秒后切到 Trade，链上数据可能
		// 已经变化（有人买了/卖了），Trade 页会显示陈旧数据。主动 refresh 保证切到 Trade 时
		// 总是拉取最新数据。
		refresh();
	},[]);
	useEffect(function(){
		if(otherMonsterSell){
			setMons(otherMonsterSell);
		}

	},[otherMonsterSell]);

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
		        	{!mons || mons.length === 0 ? (
		        		<EmptyCardPlaceholder
		        			icon="🛒"
		        			title="Marketplace is Empty"
		        			message="No creatures are on sale right now. Come back later or check My Shop for your own listings."
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
	                           
		        				    <div className="buying-div">
		        				      <div className="sale-price">
		        				        Price:
		        				        <br />
		        				        {mon.price.toString()}
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
		            {!mons || mons.length === 0 ? (
		            	<EmptyTablePlaceholder colSpan={6} title="Marketplace is Empty" message="No creatures for sale." />
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