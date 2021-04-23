import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './DailyCaloriesCounter.css';

class DailyCaloriesCounter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userBMR: 0
        };
    }

    addFood = () => {
        this.props.onRouteChange('addFood');
    }

    calculateBMR = (userInfo) => {
        const sameBMR =  10 * userInfo['data']['weight'] + 
            6.25 * userInfo['data']['height'] - 5 * userInfo['data']['age'];

        if(userInfo['data']['gender'] === 'male') {
            this.setState({ userBMR: sameBMR + 5 });
        } else if(userInfo['data']['gender'] === 'female') {
            this.setState({ userBMR: sameBMR - 161 });
        }
    }

    componentDidMount() {
        fetch(`http://localhost:4400/users/${this.props.user.id}/userInfo`, {
                method: 'get'
        })
            .then(response => response.json())
            .then(response => {
                if(response['statusCode'] && parseInt(response['statusCode']) !== 200)
                    console.log('ERROR: ' + response['message'] + ' of status code: ' + response['statusCode']); 
                else
                    this.calculateBMR(response);
            })
            .catch(error => console.log(error))
    }

    render() {
        
        const {
            userBMR
        } = this.state;

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
                        <div>{userBMR.toFixed()}</div>
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