import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './DailyCaloriesCounter.css';
import Button from 'react-bootstrap/Button';
import PosibilitiesModal from './PosibilitiesModal';

class DailyCaloriesCounter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userBMR: 0,
            showPosibilitiesModal: false,
        };
    }

    handlePossibilitiesModalClose = () => {
        this.setState({ showPosibilitiesModal: false });
    }

    addFood = () => {
        this.props.onRouteChange('addFood');
    }

    popModalPosibilities = () => {
        this.setState({ showPosibilitiesModal: true });
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
        
        if(this.props.user.firstLogin === false) {
            fetch(`http://localhost:4400/users/${this.props.user.id}/userInfo`, {
                    method: 'get'
            })
                .then(response => response.json())
                .then(response => {
                    if(response['statusCode'] && parseInt(response['statusCode']) !== 200)
                        console.log('ERROR: ' + response['message'] + ' of status code: ' + response['statusCode']); 
                    else {
                        this.calculateBMR(response);
                        this.props.setUserBMR(this.state.userBMR);
                    }
                })
                .catch(error => console.log(error))
        }
    }

    render() {
        
        const {
            showPosibilitiesModal
        } = this.state;

        const diff = this.props.userBMR.toFixed() - this.props.caloriesStatus;
        return(
            <Container fluid={true} className="p-0">
                <hr></hr>
                <Row noGutters>
                    <Col sm="4" className="changeMeasureType">
                        <div>Calories Remaining &#8595;</div>
                    </Col>
                    <Col sm="8"></Col>
                </Row>
                <Row noGutters>
                    <Col sm="2" className="align">
                        {
                            this.props.user.firstLogin === true ?
                            <div>0</div> : (
                                this.props.userBMR ?
                                    <div>{this.props.userBMR.toFixed()}</div>
                                :(<div>0</div>)
                            )
                        }                       
                        <div className="counterText">Goal</div>
                    </Col>
                    <Col sm="1" className="align">
                        <div>-</div>
                    </Col>
                    <Col sm="2" className="align">
                        <div>{this.props.caloriesStatus}</div>
                        <div className="counterText">Food</div>
                    </Col>
                    <Col sm="1" className="align">+</Col>
                    <Col sm="2" className="align">
                        <div>0</div>
                        <div className="counterText">Exercise</div>
                    </Col>
                    <Col sm="1" className="align">=</Col>
                    <Col sm="2" className="align">
                        {
                            this.props.user.firstLogin === true ?
                            <div>{0 - this.props.caloriesStatus}</div> : (
                                this.props.userBMR ?
                                    diff < 0 ?
                                    <div style={{'color': 'red'}}>{diff}</div> :(
                                        diff < 500 ?
                                        <div style={{'color': 'orange'}}>{diff}</div> :(
                                            <div>{diff}</div>
                                        )
                                    )
                                :(<div>{0 - this.props.caloriesStatus}</div>)
                            )
                        }                     
                        <div className="counterText">Total</div>
                    </Col>
                </Row>
                <hr></hr>
                <Row noGutters>
                    <Col sm="10"></Col>
                    <Col sm="2">
                        <Button onClick={this.popModalPosibilities} style={{'textAlign': 'center'}}>+</Button>
                    </Col>
                </Row>
                {   
                    showPosibilitiesModal === true ?
                    <PosibilitiesModal 
                        showPosibilitiesModal={showPosibilitiesModal}
                        handlePossibilitiesModalClose={this.handlePossibilitiesModalClose}
                        setMealType={this.props.setMealType}
                    /> :(<div></div>)
                }
            </Container>
        );
    }
}

export default DailyCaloriesCounter;