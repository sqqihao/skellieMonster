import Container from 'react-bootstrap/Container';
import React from 'react'
import { Button, Col, Row, Dropdown } from 'react-bootstrap'
import ListIcon from './common/listIcon'
import GridIcon from './common/gridIcon'
import "./list.css";

function ListRender(){
	return (
	      <Row className="justify-content-center">
		    <div className="list-render">
		      <div>
		        <Col xs sm={6} md={12}>
		          <h1 className="p1 p1-for-centering green-glow">page name</h1>
		        </Col>
		        <Col
		          xs
		          sm={6}
		          md={12}>
		          <Button className="display-style-btn" variant="outline-dark">
		            <ListIcon />
		          </Button>
		          &nbsp;
		          <Button className="display-style-btn" >
		            <GridIcon />
		          </Button>
		          &nbsp;
		          <Dropdown className="order-dropdown">
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