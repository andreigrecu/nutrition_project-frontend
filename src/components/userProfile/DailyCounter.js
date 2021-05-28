import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './DailyCaloriesCounter.css';
import Button from 'react-bootstrap/Button';
import PosibilitiesModal from './PosibilitiesModal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class DailyCaloriesCounter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userBMR: 0,
            showPosibilitiesModal: false,
            calculatorType: 'Calories Remaining',

            carbosGramsGoal: 0,
            fatsGramsGoal: 0,
            proteinsGramsGoal: 0 
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
                        this.setNutrientsPercentage(response['data']['carbohydratesPercent'], 
                            response['data']['fatsPercent'], response['data']['proteinsPercent']);
                    }
                })
                .catch(error => console.log(error))
        }
    }

    render() {
        
        const {
            showPosibilitiesModal,
            calculatorType,
            carbosGramsGoal,
            fatsGramsGoal,
            proteinsGramsGoal
        } = this.state;

        console.log("aici", this.props)
        const diffCalories = this.props.userBMR.toFixed() - this.props.caloriesStatus;
        const diffCarbos = carbosGramsGoal - this.props.carbosStatus;
        const diffFats = fatsGramsGoal - this.props.fatsStatus;
        const diffProteins = proteinsGramsGoal - this.props.proteinsStatus;
        let diffShow;
        let orangeDiffColor;

        switch(calculatorType) {
            case('Calories Remaining'):
                diffShow = diffCalories.toFixed();
                orangeDiffColor = ((30 * (this.props.userBMR.toFixed())) / 100);
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
                    <Col sm = "1"></Col>
                    <Col sm="1">
                        <Button onClick={this.popModalPosibilities} style={{'textAlign': 'center'}}>+</Button>
                    </Col>
                    <Col sm="8"></Col>
                </Row>
                <Row noGutters>
                    <Col sm="2" className="align">
                        {
                            this.props.user.firstLogin === true ?
                            <div>0</div> : (
                                this.props.userBMR ? 
                                    calculatorType === 'Calories Remaining' ?
                                        <div>{this.props.userBMR.toFixed()}</div> :
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
                                :(<div>{0 - this.props.caloriesStatus}</div>)
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