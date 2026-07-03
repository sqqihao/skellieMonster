import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import { Button, Col, Row, Dropdown } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import ListIcon from './common/listIcon'
import GridIcon from './common/gridIcon'
import "./list.css";

// URL pathname → 显示名（GH Pages basename 已剥，pathname 就是 /Monster 等）
const PATH_TO_NAME = {
  "/": "Monster",
  "/Monster": "Monster",
  "/MyShop": "My Shop",
  "/Trade": "Trade",
  "/Breed": "Breed",
  "/Dojo": "Dojo",
  "/Share": "Share",
  "/ShareToMe": "ShareToMe",
  "/NFT": "NFT",
};

function ListRender(props){
	const setSortType = props.setSortType;
	const setDisplayType = props.setDisplayType;
	const [_type,set_type] = useState(0);
	const location = useLocation();
	// basename 下 pathname 可能还含子目录，去掉 basename 部分
	const raw = location.pathname;
	const basename = (typeof window !== 'undefined' && window.location.hostname.endsWith('.github.io'))
		? '/skellieMonster/frontend/build' : '';
	const cleanPath = basename && raw.startsWith(basename) ? raw.slice(basename.length) : raw;
	const pageName = PATH_TO_NAME[cleanPath] || PATH_TO_NAME["/"] || "Monster";
	return (
	      <Row className="justify-content-center">
		    <div className="list-render">
		      <div>
		        <Col xs sm={6} md={12}>
		          <h1 className="p1 p1-for-centering green-glow">{pageName}</h1>
		        </Col>
		        <Col xs sm={6} md={12}>
		          <Button className="display-style-btn" variant={_type==1?"outline-primary":"outline-light"}  onClick={()=>{setDisplayType(1);set_type(1)}}>>
		            <ListIcon />
		          </Button>
		          &nbsp;
		          <Button className="display-style-btn"  variant={_type==0?"outline-primary":"outline-light"}  onClick={()=>{setDisplayType(0);set_type(0)}}>
		            <GridIcon />
		          </Button>
		          &nbsp;
		          <Dropdown  className="order-dropdown" onSelect={(evtK, e) => {
		              if (setSortType) setSortType(evtK, e)
		            }}>
		            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
		              Order
		            </Dropdown.Toggle>

		            <Dropdown.Menu>
		                <>
		                  <Dropdown.Item eventKey="nameAZ">By Name A-Z</Dropdown.Item>
		                  <Dropdown.Item eventKey="nameZA">By Name Z-A</Dropdown.Item>
		                </>

		              <Dropdown.Item eventKey="idDesc">By ID Descending</Dropdown.Item>
		              <Dropdown.Item eventKey="idAsc">By ID Ascending</Dropdown.Item>
		            </Dropdown.Menu>
		          </Dropdown>
		        </Col>
		      </div>
		    </div>
		</Row>
		);
}

export default ListRender;