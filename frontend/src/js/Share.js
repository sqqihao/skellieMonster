import React,{useState, useEffect} from 'react';
import { Table } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from './components/Spinner'
import {addForSaleDiv, bgStyle, breedDiv, breedOption, buyDiv, imgDiv, monName, nameDiv, names, removeFromSaleDiv, statDiv} from "./components/utils.js"


function Share(props){

	const {monster, refresh, stopShare, startShare} = props;

	const [mons, setMons] = useState([]);

	useEffect(function(){
		// debugger;
		setMons(monster);
	},[monster]);

	const [shareId, setShareId] = useState('')
	const [shareAddress, setShareAddress] = useState('')

	const [isShareLoading, setIsShareLoading] = useState(false)
	const [isStopSharingLoading, setIsStopSharingLoading] = useState(false)

	const stopSharing = async function(_id){
		await stopShare(_id);
		await refresh();
	};
	const startSharing = async function(){
		//,_addr
		await startShare(shareId, shareAddress);
		await refresh();
	}
	function handleShareId(event) {
		setShareId(event.target?.value)
	}
	function handleShareAddress(event) {
		setShareAddress(event.target?.value)
	}


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
			              onClick={startSharing}>
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
		                          onClick={() => stopSharing(mon.id)}>
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