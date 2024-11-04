import React,{useState,useEffect} from 'react';
import { Table } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from './components/Spinner';

import {addForSaleDiv, bgStyle, breedDiv, breedOption, buyDiv, imgDiv, monName, nameDiv, names, removeFromSaleDiv, statDiv} from "./components/utils.js"

function ShareToMe(props){

	const {monster, refresh, stopShare} = props;

	const [mons, setMons] = useState([]);

	useEffect(function(){
		// debugger;
		setMons(monster);
	},[monster]);

	const [isStopSharingLoading, setIsStopSharingLoading] = useState(false)
	const stopSharing = async function(_id){

		await stopShare(_id);
		await refresh();
	};

	return (
	    <Container className="vh-100">
	      <Row className="justify-content-center">
		        <Col  md={{ span: 6 }}>
		          <h1 className="p1 p1-for-centering green-glow">Share to Me</h1>
		        </Col>
	      </Row>

      	  <div className="rpgui-container framed-grey table-container">
		      <Row className="justify-content-center">
			        <Col  md={{ span: 10 }}>
			            {mons&&mons.map((mon) => (
		                    <React.Fragment key={mon?.id}>
		                      <div className="mon">
		                        <figure className="my-figure">
		                          {nameDiv(mon)}
		                          {imgDiv(mon)}
		                          <figcaption>{statDiv(mon)}</figcaption>
		                        </figure>
		                        <div className="sharing-div">
		                          <label className="shared-owner">Creature Owner: {mon?.owner} </label>
		                          {isStopSharingLoading ? (
		                            <button className="rpgui-button" type="button" style={{ width: '100%' }}>
		                              <Spinner color="#000" />
		                            </button>
		                          ) : (
		                            <button
		                              className="stop-sharing-btn rpgui-button"
		                              type="button"
		                              style={{ float: 'right' }}
		                              onClick={() => stopSharing(mon?.id)}
		                            >
		                              Stop sharing
		                            </button>
		                          )}
		                        </div>
		                      </div>
		                    </React.Fragment>
			            ))}
			        </Col>
		      </Row>
		    </div>

	    </Container>
	);
}
//
export default ShareToMe;