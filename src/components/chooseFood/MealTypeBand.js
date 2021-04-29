import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './MealTypeBand.css';

class MealTypeBand extends Component {

    constructor(props) {
        super(props);
        this.state={};
    }

    render() {
        return(
            <Container fluid={true} className="p-0">
                <Row noGutters>
                    <Col sm="12">
                        <Navbar>
                            <Nav className="m-auto">
                                <h3 className="mealTypeOnBand">{this.props.mealType.toUpperCase()}</h3>
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default MealTypeBand;