import React,{useState,useEffect,useRef} from 'react';
import { Table } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from './components/Spinner'
import {addForSaleDiv, bgStyle, breedDiv, breedOption, fightOption, buyDiv, imgDiv, monName, nameDiv, names, removeFromSaleDiv, statDiv} from "./components/utils.js"
import { Modal, Button } from 'react-bootstrap';



function Dojo(props){
	const {monster, refresh, fightMon} = props;
	const [mons, setMons] = useState([]);

	useEffect(function(){
		// debugger;
		setMons(monster);
	},[monster]);

	// const [winnerID, setWinnerID] = useState(1)
	// const [rewardAmount, setRewardAmount] = useState(623)
	//[{winnerID:0,rewardAmount:0},{winnerID:1,rewardAmount:110}]
	const [fightResults,setFightResults] = useState([]);

	const [selectedIndex,setSelectedIndex] = useState(0);


	const [fightChoice1, setFightChoice1] = useState(null);
	const [fightChoice2, setFightChoice2] = useState(null);


	const choiseOnClick = function(choiseIndex){
		handleShow();
		setSelectedIndex(choiseIndex);
	}
	const [show, setShow] = useState(false);

	function handleShow(breakpoint) {
		setShow(true);
	}
	function handleClose(){
		setShow(false);
	}


	function selectMaster(_monsterId){
		if(selectedIndex==1) {
			setFightChoice1(_monsterId);
		}else if(selectedIndex == 2){
			setFightChoice2(_monsterId);
		}
		handleClose();
	}

	async function fight(){
		if(!fightChoice1 || !fightChoice2)return;
		let res = await fightMon(fightChoice1, fightChoice2);
		// console.log(res);
		// setWinnerID(parseInt(res.FightResult[0]))
		// setRewardAmount(parseInt(res.Rewards[0]))

		fightResults.push({winnerID:res.FightResult,rewardAmount:res.Rewards})
		setFightResults(JSON.parse(JSON.stringify(fightResults)));
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
						          <div className="mon" onClick={()=>{ selectMaster(mon.id); }}>
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
								{fightOption(fightChoice1, mons,  ()=>{choiseOnClick(1)})}
								{fightOption(fightChoice2, mons,  ()=>{choiseOnClick(2)})}
			            </Col>
		            </Col>
				</Row>
				<Row className="justify-content-center">
					<Col  md={{ span: 6 }}>
						
	            <Table striped bordered hover variant="dark" responsive style={{ marginTop: '8px' }} className='dojo-results-table'>
	                <thead>
	                  <tr>
	                    <th>WinnerId</th>
	                    <th>Rewards</th>
	                  </tr>
	                </thead>
	                <tbody>
		                {fightResults.map((result)=>{
		                	return ( 
			                  <tr>
			                    <td>{result.winnerID}</td>
			                    <td>{result.rewardAmount} Token</td>
			                  </tr>
			                )
		                })}
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
							disabled={fightChoice1 === fightChoice2}
							onClick={fight}>
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