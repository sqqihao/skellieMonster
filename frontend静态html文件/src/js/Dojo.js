import React,{useState} from 'react';
import { Table } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from './components/Spinner'
import {addForSaleDiv, bgStyle, breedDiv, breedOption, fightOption, buyDiv, imgDiv, monName, nameDiv, names, removeFromSaleDiv, statDiv} from "./components/utils.js"
import { Modal, Button } from 'react-bootstrap';



function Dojo(){
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

	const [matchWinner, setMatchWinner] = useState(11)
	const [winnerID, setWinnerID] = useState(1)
	const [matches, setMatches] = useState(4)
	const [rewardAmount, setRewardAmount] = useState(623)


	const [fightChoice1, setFightChoice1] = useState(null);
	const [fightChoice2, setFightChoice2] = useState(null);


	const choiseOnClick = function(){
		handleShow();
	}
	const [show, setShow] = useState(false);

	function handleShow(breakpoint) {
		setShow(true);
	}
	function handleClose(){
		setShow(false);
	}

	return (
		<>
			<Modal show={show} className="rpgui-content custom-modal" fullscreen={true} onHide={() => setShow(false)}>
				<Modal.Body>

			      <Row className="justify-content-center">
				        <Col  md={{ span: 6}}>

			        	{mons&&mons.map(function(mon){
			        		return (
						        <React.Fragment key={mon.id}>
						          <div className="mon">
						            <figure className="my-figure">
						              {nameDiv(mon)}
						              {imgDiv(mon)}
						              <figcaption>{statDiv(mon)}</figcaption>
						            </figure>
			                        
						          </div>
						        </React.Fragment>)
			        	})}
					    
				        </Col>
			      </Row>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
					Close
					</Button>
				</Modal.Footer>
			</Modal>
			<Container className="vh-100">
				<Row className="justify-content-center">
					<Col  md={{ span: 6 }}>
						<h1 className="p1 p1-for-centering green-glow">Dojo</h1>
					</Col>
				</Row>
				<Row className="justify-content-center">
					<Col  md={{ span: 6 }}  className="vs-container rpgui-container framed-grey" >
			            <Col xs="12" lg="12" className="col-text-center d-flex justify-content-between">
								{fightOption(fightChoice1, mons, choiseOnClick)}
								{fightOption(fightChoice2, mons)}
			            </Col>
		            </Col>
				</Row>
				<Row className="justify-content-center">
					<Col  md={{ span: 6 }}>
						
	            <Table striped bordered hover variant="dark" responsive style={{ marginTop: '8px' }} className='dojo-results-table'>
	                <thead>
	                  <tr>
	                    <th>Winner</th>
	                    <th>No.</th>
	                    <th>Rewards</th>
	                  </tr>
	                </thead>
	                <tbody>
	                  <tr>
	                    <td>{matchWinner}</td>
	                    <td>{winnerID}</td>
	                    <td>{rewardAmount} Token</td>
	                  </tr>
	                </tbody>
	              </Table>
					</Col>
				</Row>
				<Row className="justify-content-center text-center">
					<Col  md={{ span: 6 }} >
						<Spinner color="gray" style={{ display:'none', marginLeft: '50%', marginRight: 'auto', padding: '8px' }} />

						<button id="fight-btn"
							className="rpgui-button"
							type="button"
							onClick={() => {
								setMatchWinner('')
								setWinnerID('')
								setMatches(0)
								setRewardAmount(0)
								//fight()
							}}>
							Fight!
						</button>
					</Col>
				</Row>
			</Container>
		</>
	);
}
//
export default Dojo;