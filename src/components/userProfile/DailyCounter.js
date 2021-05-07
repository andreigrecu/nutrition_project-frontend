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
        const carbosGramsGoal = parseInt(((carbosPercentage * this.state.userBMR) / 400).toFixed());
        const fatsGramsGoal = parseInt(((fatsPercentage * this.state.userBMR) / 900).toFixed());
        const proteinsGramsGoal = parseInt(((proteinsPercentage * this.state.userBMR) / 400).toFixed());
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

        const diffCalories = this.props.userBMR.toFixed() - this.props.caloriesStatus;
        const diffCarbos = carbosGramsGoal - this.props.carbosStatus;
        const diffFats = fatsGramsGoal - this.props.fatsStatus;
        const diffProteins = proteinsGramsGoal - this.props.proteinsStatus;
        let diffShow;
        let orangeDiffColor;

        switch(calculatorType) {
            case('Calories Remaining'):
                diffShow = diffCalories;
                orangeDiffColor = ((30 * (this.props.userBMR.toFixed())) / 100).toFixed();
                break;
            case('Carbohydrates Remaining'):
                diffShow = diffCarbos;
                orangeDiffColor = ((30 * carbosGramsGoal) / 100).toFixed();
                break;
            case('Fats Remaining'):
                orangeDiffColor = ((30 * fatsGramsGoal) / 100).toFixed();
                diffShow = diffFats;
                break;
            case('Proteins Remaining'):
                orangeDiffColor = ((30 * proteinsGramsGoal) / 100).toFixed();
                diffShow = diffProteins;
                break;
            default:
                break;
        }

        return(
            <Container fluid={true} className="p-0">
                <hr style={{'margin': '0'}}></hr>
                <Row noGutters>
                    <Col sm="4" className="changeMeasureType">
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
                                <div>{this.props.caloriesStatus}</div> :
                            calculatorType === 'Carbohydrates Remaining' ?
                                <div>{this.props.carbosStatus}</div> :
                            calculatorType === 'Fats Remaining' ?   
                                <div>{this.props.fatsStatus}</div> :
                            calculatorType === 'Proteins Remaining' &&
                                <div>{this.props.proteinsStatus}</div> 
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
                                    diffShow < 0 ?
                                    <div style={{'color': 'red'}}>{diffShow}</div> :(
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