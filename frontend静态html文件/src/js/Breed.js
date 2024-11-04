import React,{useState} from 'react';
import { Table } from 'react-bootstrap'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {addForSaleDiv, bgStyle, breedDiv, breedOption, buyDiv, imgDiv, monName, nameDiv, names, removeFromSaleDiv, statDiv} from "./components/utils.js"
import Spinner from './components/Spinner'
import { Modal, Button } from 'react-bootstrap';


function Breed(){
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

	const [breedChoice1, setBreedChoice1] = useState(null);
	const [breedChoice2, setBreedChoice2] = useState(null);
	const [isBreedMonLoading, setIsBreedMonLoading] = useState(false)
	const breedMons = function(){
	}
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
	const myCryptomons = [];
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
		        <Col  md={{ span: 6}}>
		          <h1 className="p1 p1-for-centering green-glow">Breed</h1>
		        </Col>
	      </Row>

	      <Row className="justify-content-center">
		        <Col md={{ span: 5}}>

					<div className="breeding-area" style={{ marginTop: '9px' }}>
						<div className="breed-selected-mons-img d-flex justify-content-between">
							{breedOption(breedChoice1, mons ,choiseOnClick)}
							{breedOption(breedChoice2, mons)}
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
							<button className="rpgui-button breed-btn" type="button" onClick={() => breedMons(breedChoice1, breedChoice2)} disabled={breedChoice1 === breedChoice2} >
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