import React,{useState} from 'react';
import { Table } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from './components/Spinner'
import {addForSaleDiv, bgStyle, breedDiv, breedOption, buyDiv, imgDiv, monName, nameDiv, names, removeFromSaleDiv, statDiv} from "./components/utils.js"


function Share(){

	const [shareId, setShareId] = useState('')
	const [shareAddress, setShareAddress] = useState('')

	const [isShareLoading, setIsShareLoading] = useState(false)
	const [isStopSharingLoading, setIsStopSharingLoading] = useState(false)

	const stopSharing = function(){

	};
	const startSharing = function(){

	}
	function handleShareId(event) {
		setShareId(event.target?.value)
	}
	function handleShareAddress(event) {
		setShareAddress(event.target?.value)
	}


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

	return (
	    <Container className="vh-100">
	      <Row className="justify-content-center">
		        <Col  md={{ span: 6 }}>
		          <h1 className="p1 p1-for-centering green-glow">Share</h1>
		        </Col>
	      </Row>

	      <Row className="justify-content-center">
		        <Col  md={{ span: 6 }}>

			      <div className="rpgui-container framed-grey vs-container" style={{ marginTop: '24px', marginBottom: '48px' }}>
			        <div className="form-line-share">
			          <label className="form-label">Creature Id:</label>
			          <input className="form-input" value={shareId} onChange={(e) => handleShareId(e)} />
			        </div>
			        <div className="form-line-share">
			          <label className="form-label">Share to address:</label>
			          <input className="form-input" value={shareAddress} onChange={(e) => handleShareAddress(e)} />
			        </div>
			        <div className="form-line-share">
			          {isShareLoading ? (
			            <button className="rpgui-button" type="button" style={{ width: '100%' }}>
			              <Spinner color="#000" />
			            </button>
			          ) : (
			            <button
			              className="rpgui-button share-btn"
			              type="button"
			              onClick={() => startSharing(parseInt(shareId), shareAddress)}
			            >
			              Share
			            </button>
			          )}
			        </div>
			      </div>

		        </Col>
	      </Row>
	        <Row>
	          <Col>
	            <div className="">
	        	
		            {mons&&mons.map((mon) => (
		                <React.Fragment key={mon.id}>
		                  <div className="mon">
		                    <figure className="my-figure">
		                      {nameDiv(mon)}
		                      {imgDiv(mon)}
		                      <figcaption>{statDiv(mon)}</figcaption>
		                    </figure>
		                    <div className="sharing-div">
		                      <div className="shareTo-owner">Shared to address: {mon.sharedTo} </div>
		                      {isStopSharingLoading ? (
		                        <button className="rpgui-button" type="button" style={{ width: '100%' }}>
		                          <Spinner color="#000" />
		                        </button>
		                      ) : (
		                        <button
		                          className="stop-sharing-btn rpgui-button"
		                          type="button"
		                          style={{ float: 'right' }}
		                          onClick={() => stopSharing(mon.id)}
		                        >
		                          Stop sharing
		                        </button>
		                      )}
		                    </div>
		                  </div>
		                </React.Fragment>
		            ))}
	            </div>
	          </Col>
	        </Row>


	    </Container>
	);
}
//
export default Share;