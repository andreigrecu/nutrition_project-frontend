import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './DailyCaloriesCounter.css';
import Button from 'react-bootstrap/Button';
import PosibilitiesModal from './PosibilitiesModal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

class DailyCaloriesCounter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userBMR: 0,
            showPosibilitiesModal: false,
            calculatorType: 'Calories Remaining',

            carbosGramsGoal: 0,
            fatsGramsGoal: 0,
            proteinsGramsGoal: 0,

            hasProgram: false,
            showWorkoutModal: false,
            burnedCalories: 0,
            alertWrongValue: false
        };
    }

    onChangeCalculatorType = (type) => {
        this.setState({ calculatorType: type + ' Remaining' });
    }

    setNutrientsPercentage = (carbosPercentage, fatsPercentage, proteinsPercentage) => {
        this.setState({ carbosPercentage, fatsPercentage, proteinsPercentage });

        let carbosGramsGoal = 0;
        let fatsGramsGoal = 0;
        let proteinsGramsGoal = 0;
        if(carbosPercentage >= 0)
            carbosGramsGoal = parseInt(((carbosPercentage * this.state.userBMR) / 400).toFixed());
        if(fatsPercentage >= 0)
            fatsGramsGoal = parseInt(((fatsPercentage * this.state.userBMR) / 900).toFixed());
        if(proteinsPercentage >= 0)
            proteinsGramsGoal = parseInt(((proteinsPercentage * this.state.userBMR) / 400).toFixed());
        this.setState({ carbosGramsGoal, fatsGramsGoal, proteinsGramsGoal });
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

        let percentage = 0;
        if(userInfo['data'] && userInfo['data']['program']['percentageType'])
            percentage = userInfo['data']['program']['percentageType'] - 100;

        let sameBMR =  10 * userInfo['data']['weight'] + 
            6.25 * userInfo['data']['height'] - 5 * userInfo['data']['age'];

        if(userInfo['data']['gender'] === 'male') {
            sameBMR = sameBMR + 5;
            sameBMR = (sameBMR + ((percentage * sameBMR) / 100));

            if(userInfo['data'] && userInfo['data']['programId'] && userInfo['data']['programId'] !== null && userInfo['data']['programId'] !== " ")
                this.setState({ userBMR: sameBMR });
        } else if(userInfo['data']['gender'] === 'female') {
            sameBMR = sameBMR - 161;
            sameBMR = (sameBMR + ((percentage * sameBMR) / 100));
            if(userInfo['data'] && userInfo['data']['programId'] && userInfo['data']['programId'] !== null && userInfo['data']['programId'] !== " ")
                this.setState({ userBMR: sameBMR });
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
                        this.setNutrientsPercentage(response['data']['carbohydratesPercent'], 
                            response['data']['fatsPercent'], response['data']['proteinsPercent']);
                    }
                })
                .catch(error => console.log(error))
        }
    }

    onAddWorkoutClick = () => {

        this.setState({ showWorkoutModal: true });
    }

    onHideWorkoutModal = () => {
        this.setState({ showWorkoutModal: false, alertWrongValue: false });
    }

    onBurnedCaloriesClick = () => {
        if((parseInt(this.state.burnedCalories) >= 0 && parseInt(this.state.burnedCalories) <= 4000) ||
            (parseInt(this.state.burnedCalories) <= 0 && parseInt(this.state.burnedCalories) >= -4000)) {
            
                fetch(`http://localhost:4400/users/${this.props.user.id}/updateWorkout`, {
                    method: 'put',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify({
                        workoutVal: parseInt(this.state.burnedCalories),
                    })
                })
                    .then(response => response.json())
                    .then(response => {
                        if(response['statusCode'] && parseInt(response['statusCode']) !== 200)
                            console.log("ERROR: " + response['message'] + "of status code " + response['statusCode']);
                        this.setState({showWorkoutModal: false });
                        this.props.getGraphicData();
                    })
                    .catch(error => console.log(error))
        }
        else
            this.setState({ alertWrongValue: true });
    }

    setBurnedCalories = (event) => {
        this.setState({ burnedCalories: event.target.value, alertWrongValue: false });
    }

    render() {
        
        const {
            showPosibilitiesModal,
            calculatorType,
            carbosGramsGoal,
            fatsGramsGoal,
            proteinsGramsGoal,
            showWorkoutModal,
            alertWrongValue
        } = this.state;

        let showUserBMR = parseFloat(this.props.userBMR);
        const diffCalories = showUserBMR.toFixed() - this.props.caloriesStatus;
        const diffCarbos = carbosGramsGoal - this.props.carbosStatus;
        const diffFats = fatsGramsGoal - this.props.fatsStatus;
        const diffProteins = proteinsGramsGoal - this.props.proteinsStatus;
        let diffShow;
        let orangeDiffColor;

        switch(calculatorType) {
            case('Calories Remaining'):
                diffShow = diffCalories.toFixed();
                orangeDiffColor = ((30 * (showUserBMR.toFixed())) / 100);
                break;
            case('Carbohydrates Remaining'):
                diffShow = diffCarbos.toFixed();
                orangeDiffColor = ((30 * carbosGramsGoal) / 100);
                break;
            case('Fats Remaining'):
                diffShow = diffFats.toFixed();
                orangeDiffColor = ((30 * fatsGramsGoal) / 100);
                break;
            case('Proteins Remaining'):
                diffShow = diffProteins.toFixed();
                orangeDiffColor = ((30 * proteinsGramsGoal) / 100);
                break;
            default:
                break;
        }


        return(
            <Container fluid={true} className="p-0">
                <Modal show={showWorkoutModal} onHide={this.onHideWorkoutModal} centered keyboard={true}> 
                    <Modal.Header>
                        <h4>Enter your burned calories!</h4>
                        {
                            alertWrongValue === true &&
                                <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>You introduced a wrong value. Try again!</h6>
                        }
                    </Modal.Header>
                    <Modal.Body>
                        <Container fluid={true} className="p-0">
                            <Row noGutters>
                                <Col sm="1"></Col>
                                <Col sm="4">
                                    <Form.Control size="sm" type="text" onChange={this.setBurnedCalories} />
                                </Col>
                                <Col sm="1"></Col>
                                <Col sm="3">
                                    <h6>Good Job!</h6>
                                </Col>
                                <Col sm="3"></Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.onBurnedCaloriesClick}>Add</Button>
                    </Modal.Footer>
                </Modal>
                <hr style={{'margin': '0'}}></hr>
                <Row noGutters>
                    <Col sm="2" className="changeMeasureType">
                        <DropdownButton id="calculator-dropdown" title={calculatorType}>
                            <Dropdown.Item 
                                onClick={() => this.onChangeCalculatorType('Calories')}
                            >
                                Calories
                            </Dropdown.Item>
                            <Dropdown.Item 
                                onClick={() => this.onChangeCalculatorType('Carbohydrates')}
                            >
                                Carbohydrates
                            </Dropdown.Item>
                            <Dropdown.Item 
                                onClick={() => this.onChangeCalculatorType('Fats')}
                            >
                                Fats
                            </Dropdown.Item>
                            <Dropdown.Item 
                                onClick={() => this.onChangeCalculatorType('Proteins')}
                            >
                                Proteins
                            </Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col sm="7"></Col>
                    <Col sm="1" style={{'textAlign': 'right'}}>
                        <Button onClick={this.popModalPosibilities}>+</Button>
                    </Col>
                    <Col sm="2" style={{'textAlign': 'right'}}>
                        <Button 
                            variant="primary" 
                            style={{'textAlign': 'right'}} 
                            onClick={this.onAddWorkoutClick}
                        >
                            Add Workout
                        </Button>
                    </Col>
                </Row>
                <Row noGutters>
                    <Col sm="2" className="align">
                        {
                            this.props.user.firstLogin === true ?
                            <div>0</div> : (
                                this.props.userBMR ? 
                                    calculatorType === 'Calories Remaining' ?
                                        <div>{showUserBMR.toFixed()}</div> :
                                    calculatorType === 'Carbohydrates Remaining' ?
                                        <div>{carbosGramsGoal}</div> :
                                    calculatorType === 'Fats Remaining' ?
                                        <div>{fatsGramsGoal}</div> :
                                    calculatorType === 'Proteins Remaining' &&
                                        <div>{proteinsGramsGoal}</div>
                                : (<div>0</div>)
                            )
                        }                       
                        <div className="counterText">Goal</div>
                    </Col>
                    <Col sm="1" className="align">
                        <div>-</div>
                    </Col>
                    <Col sm="2" className="align">
                        {
                            calculatorType === 'Calories Remaining' ?
                                <div>{this.props.caloriesStatus.toFixed()}</div> :
                            calculatorType === 'Carbohydrates Remaining' ?
                                <div>{this.props.carbosStatus.toFixed()}</div> :
                            calculatorType === 'Fats Remaining' ?   
                                <div>{this.props.fatsStatus.toFixed()}</div> :
                            calculatorType === 'Proteins Remaining' &&
                                <div>{this.props.proteinsStatus.toFixed()}</div> 
                        }
                        <div className="counterText">Food</div>
                    </Col>
                    <Col sm="1" className="align">
                    {
                            calculatorType === 'Calories Remaining' &&
                            <div>+</div>
                    }
                    </Col>
                    <Col sm="2" className="align">
                        {
                            calculatorType === 'Calories Remaining' &&
                            <div>
                                <div>{this.props.todayWorkout}</div>
                                <div className="counterText">Exercise</div>
                            </div>
                        }
                    </Col>
                    <Col sm="1" className="align">=</Col>
                    <Col sm="2" className="align">
                        {
                            this.props.user.firstLogin === true ?
                            <div>{0 - this.props.caloriesStatus}</div> : (
                                diffShow < -1 ?
                                <div style={{'color': 'red'}}>{diffShow}</div> :
                                    diffShow <= 0 && diffShow > -1 ?
                                        <div style={{'color': 'red'}}>{0}</div> 
                                            :(
                                                diffShow < orangeDiffColor ?
                                                <div style={{'color': 'orange'}}>{diffShow}</div> :(
                                                    <div>{diffShow}</div>
                                                )
                                            )
                            )
                        }                     
                        <div className="counterText">Total</div>
                    </Col>
                </Row>
                <hr style={{'marginBottom': '0%'}}></hr>
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