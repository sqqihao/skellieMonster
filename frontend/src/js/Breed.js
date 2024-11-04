import React,{useState,useEffect} from 'react';
import { Table } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {addForSaleDiv, bgStyle, breedDiv, breedOption, buyDiv, imgDiv, monName, nameDiv, names, removeFromSaleDiv, statDiv} from "./components/utils.js"
import Spinner from './components/Spinner'
import { Modal, Button } from 'react-bootstrap';


function Breed(props){
	const {monster, refresh, breedMon} = props;


	const [breedChoice1, setBreedChoice1] = useState(null);
	const [breedChoice2, setBreedChoice2] = useState(null);
	const [selectedIndex,setSelectedIndex] = useState(0);
	const [isBreedMonLoading, setIsBreedMonLoading] = useState(false)
	const [mons, setMons] = useState([]);
	const [show, setShow] = useState(false);


	useEffect(function(){
		// debugger;
		setMons(monster);
	},[monster]);

	const breedMons = async function(){
		let tx = await breedMon(breedChoice1,breedChoice2);
		console.log(tx);
		await refresh();
	}
	const choiseOnClick = function(choiseIndex){
		handleShow();
		setSelectedIndex(choiseIndex);
	}

	function handleShow(breakpoint) {
		setShow(true);
	}
	function handleClose(){
		setShow(false);
	}
	function selectMaster(_monsterId){
		// console.log(_monsterId);
		if(selectedIndex==1) {
			setBreedChoice1(_monsterId);
		}else if(selectedIndex == 2){
			setBreedChoice2(_monsterId);
		}
		handleClose();
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
		        <Col  md={{ span: 6}}>
		          <h1 className="p1 p1-for-centering green-glow">Breed</h1>
		        </Col>
	      </Row>

	      <Row className="justify-content-center">
		        <Col md={{ span: 5}}>

					<div className="breeding-area" style={{ marginTop: '9px' }}>
						<div className="breed-selected-mons-img d-flex justify-content-between">
							{breedOption(breedChoice1, mons , ()=>{choiseOnClick(1)})}
							{breedOption(breedChoice2, mons , ()=>{choiseOnClick(2)})}
						</div>
					</div>
		        </Col>
		  </Row>
	      <Row className="justify-content-center text-center">
		        <Col md={{ span: 6}}>
						{isBreedMonLoading ? (
							<button className="rpgui-button" type="button" style={{ width: '100%' }}>
								<Spinner color="#000" />
							</button>
							) : (
							<button className="rpgui-button breed-btn" type="button" onClick={() => breedMons()} disabled={breedChoice1 === breedChoice2} >
								Breed Monster
							</button>
						)}
		        </Col>
		  </Row>
	    </Container>
	    </>
	)
}
//
export default Breed;