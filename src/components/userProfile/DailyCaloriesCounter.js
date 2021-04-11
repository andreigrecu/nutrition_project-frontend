import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './DailyCaloriesCounter.css';

class DailyCaloriesCounter extends Component {

    constructor(props) {
        super(props);
        this.state={};
    }

    addFood = () => {
        this.props.onRouteChange('addFood');
    }

    render() {
        
        return(
            <Container fluid={true}>
                <hr></hr>
                <Row noGutters>
                    <Col sm="4" className="changeMeasureType">
                        <div>Calories Remaining &#8595;</div>
                    </Col>
                    <Col sm="8"></Col>
                </Row>
                <Row noGutters>
                    <Col sm="2" className="align">
                        <div>2150</div>
                        <div className="counterText">Goal</div>
                    </Col>
                    <Col sm="1" className="align">
                        <div>-</div>
                    </Col>
                    <Col sm="2" className="align">
                        <div>311</div>
                        <div className="counterText">Food</div>
                    </Col>
                    <Col sm="1" className="align">+</Col>
                    <Col sm="2" className="align">
                        <div>0</div>
                        <div className="counterText">Exercise</div>
                    </Col>
                    <Col sm="1" className="align">=</Col>
                    <Col sm="2" className="align">
                        <div>1839</div>
                        <div className="counterText">Total</div>
                    </Col>
                </Row>
                <hr></hr>
                <button onClick={this.addFood}>ceva</button>
            </Container>
        );
    }
}

export default DailyCaloriesCounter;