import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class NewUserData extends Component {
    constructor(props) {
        super(props);
        this.state = {

            //first form
            showModalUserData: true,
            showModalUserGoals: false,

            userFirstName: '',
            userFirstNameNotEmpty: false,

            userLastName: '',
            userLastNameNotEmpty: false,

            ageIsEmpty: true,
            age: '',
            underAge: false,

            genderMale: false,
            genderFemale: false,
            genderChosen: false,

            alertGenderNotChecked: false,
            alertFirstNameEmpty: false,
            alertLastNameEmpty: false,
            alertAge: false,

            //second form
            userWeight: '',
            userWeightGoal: '',
            userHeight: '',
            num_of_days_goal: '',

            emptyWeight: true,
            emptyWeightGoal: true,
            emptyDaysGoal: true,
            emptyHeight: true,

            alertWeightGoal: false,
            alertWeightEmpty: false,
            alertEmptyHeight: false,
        };
    }
    
    handleSubmitFirstForm = () => {

        let makeCall = true;

        if(this.state.age < 18) {
            this.setState({ underAge: true});
            makeCall = false;
        } else 
            this.setState({ underAge: false });

        if(this.state.ageIsEmpty === true) {
            this.setState({ alertAge: true });
            makeCall = false;
        } else 
            this.setState({ alertAge: false });
        
        
        if(this.state.genderChosen === false) {
            this.setState({ alertGenderNotChecked: true });
            makeCall = false;
        }
        else
            this.setState({ alertGenderNotChecked: false });

        if(this.state.userFirstNameNotEmpty === false) {
            this.setState({ alertFirstNameEmpty: true });
            makeCall = false;
        }
        else
            this.setState({ alertFirstNameEmpty: false });

        if(this.state.userLastNameNotEmpty === false) {
            this.setState({ alertLastNameEmpty: true });
            makeCall = false;
        }
        else
            this.setState({ alertLastNameEmpty: false });

        if(makeCall === true) {
            
            fetch(`http://localhost:4400/users/${this.props.user.id}`,{
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    firstName: this.state.userFirstName,
                    lastName: this.state.userLastName
                })
            })
                .then(response => response.json())
                .then(response => {
                    if(response['meta']['statusCode'] !== 200) {
                        console.log("ERROR: " + response['meta']['statusCode']);
                        return;
                    }
                })
                .catch(err => console.log("ERROR: " + err))
            this.setState({ showModalUserData: false });
            this.setState({ showModalUserGoals: true});
        }
        
    }


    calculateBMR = (userInfo) => {

        const sameBMR =  10 * userInfo['data']['weight'] + 
            6.25 * userInfo['data']['height'] - 5 * userInfo['data']['age'];

        if(userInfo['data']['gender'] === 'male') {
            return (sameBMR + 5);
        } else if(userInfo['data']['gender'] === 'female') {
            return (sameBMR - 161);
        }
    }

    handleSubmitSecondForm = () => {

        let gender = "";
        if(this.state.genderMale === true)
            gender = 'male';
        if(this.state.genderFemale === true)
            gender = 'female';

        let makeCall = true;
        if(this.state.emptyWeight === false && this.state.emptyDaysGoal === false && this.state.emptyWeightGoal === true) {
            this.setState({ alertWeightGoal: true });
            makeCall = false;
        } else 
            this.setState({ alertWeightGoal: false });

        if(this.state.emptyWeight) {
            this.setState({ alertWeightEmpty: true });
            makeCall = false;
        } else 
            this.setState({ alertWeightEmpty: false });

        if(this.state.emptyHeight) {
            this.setState({ alertEmptyHeight: true });
            makeCall = false;
        } else 
            this.setState({ alertEmptyHeight: false });

        if(makeCall === true) {

            const userInfo = {
                age: parseInt(this.state.age),
                height: parseInt(this.state.userHeight),
                weight: parseInt(this.state.userWeight)
            }

            userInfo['weightGoal'] = -1;
            if(this.state.userWeightGoal)
                userInfo['weightGoal'] = parseInt(this.state.userWeightGoal);

            if(this.state.num_of_days_goal)
                userInfo['numberOfDaysGoal'] = parseInt(this.state.num_of_days_goal);
            else
                userInfo['numberOfDaysGoal'] = -1;

            userInfo['userId'] = this.props.user.id;
            userInfo['gender'] = gender;

            fetch('http://localhost:4400/usersInfo',{
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(
                    userInfo
                )
            })
                .then(response => response.json())
                .then(response => {
                    if(response['meta']['statusCode'] !== 200) {
                        console.log("ERROR: " + response['meta']['statusCode']);
                        return;
                    }
                    this.setState({ showModalUserGoals: false });
                    this.props.loadUser({
                        id: this.props.user.id,
                        firstName: this.props.user.firstName,
                        lastName: this.props.user.lastName,
                        email: this.props.user.email,
                        firstLogin: false
                    })
                    fetch(`http://localhost:4400/users/${this.props.user.id}/userInfo`, {
                            method: 'get'
                    })
                        .then(response => response.json())
                        .then(response => {
                            if(response['statusCode'] && parseInt(response['statusCode']) !== 200)
                                console.log('ERROR: ' + response['message'] + ' of status code: ' + response['statusCode']); 
                            else {
                                let BMR = this.calculateBMR(response);
                                this.props.setUserBMR(BMR);
                            }
                        })
                        .catch(error => console.log(error))
                })
                .catch(err => console.log("ERROR: " + err))
        }
    }

    onChangeFirstName = (event) => {
        this.setState({ userFirstName: event.target.value });
        if(event.target.value)
            this.setState({ userFirstNameNotEmpty: true });
        else
            this.setState({ userFirstNameNotEmpty: false });
    }

    onChangeLastName = (event) => {
        this.setState({ userLastName: event.target.value });
        if(event.target.value)
            this.setState({ userLastNameNotEmpty: true });
        else
            this.setState({ userLastNameNotEmpty: false });
    }

    onAgeChange = (event) => {
        this.setState({ age: event.target.value });
        if(event.target.value) 
            this.setState({ ageIsEmpty: false });
        else 
            this.setState({ ageIsEmpty: true });
    }

    onMaleClick = () => {
        this.setState({ genderMale: true });
        this.setState({ genderFemale: false });
        this.setState({ genderChosen: true });
    }

    onFemaleClick = () => {
        this.setState({ genderMale: false });
        this.setState({ genderFemale: true });
        this.setState({ genderChosen: true });
    }

    onWeightChange = (event) => {
        this.setState({ userWeight: event.target.value });
        if(event.target.value)
            this.setState({ emptyWeight: false });
        else
            this.setState({ emptyWeight: true });
    }

    onWeightGoalChange = (event) => {
        this.setState({ userWeightGoal: event.target.value });
        if(event.target.value)
            this.setState({ emptyWeightGoal: false });
        else
            this.setState({ emptyWeightGoal: true });
    }

    onHeightChange = (event) => {
        this.setState({ userHeight: event.target.value });
        if(event.target.value)
            this.setState({ emptyHeight: false });
        else
            this.setState({ emptyHeight: true });
    }

    onNumDaysGoal = (event) => {
        this.setState({ num_of_days_goal: event.target.value });
        if(event.target.value)
            this.setState({ emptyDaysGoal: false });
        else
            this.setState({ emptyDaysGoal: true });
    }

    render() {

        const { 
            showModalUserData,
            showModalUserGoals,
            alertGenderNotChecked,
            alertFirstNameEmpty,
            alertLastNameEmpty,
            alertAge,
            underAge,
            alertWeightGoal,
            alertWeightEmpty,
            alertEmptyHeight
         } = this.state;

        return (
            <div>
                <Modal show={showModalUserData} onHide={() => {}} centered keyboard={true}> 
                    <Modal.Header>
                        <Modal.Title>Let`s get started!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label style={{'color': 'black', 'paddingBottom': '5%'}}>
                            Please complete this in order to start our journey.
                        </Form.Label>
                        <Form>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control size="sm" onChange={this.onChangeFirstName} />
                            </Form.Group>
                            {
                                alertFirstNameEmpty === true
                                ? <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>Please enter you firstName!</h6>
                                : ( <div></div> )
                            }

                            <Form.Group controlId="formLastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control size="sm" onChange={this.onChangeLastName}/>
                            </Form.Group>
                            {
                                alertLastNameEmpty === true
                                ? <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>Please enter you lastName!</h6>
                                : ( <div></div> )
                            }

                            <Form.Group controlId="formAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control size="sm" onChange={this.onAgeChange} />
                            </Form.Group>
                            {
                                alertAge === true || underAge === true
                                ? <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>You are under age or you introduced a wrong age!</h6>
                                : ( <div></div> )
                            }

                            <fieldset>
                                <Form.Group as={Row}>
                                <Form.Label as="gender" column sm={5}>
                                    Choose you gender
                                </Form.Label>
                                <Col sm={7}>
                                    <Form.Check
                                    type="radio"
                                    label="male"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                    onClick={this.onMaleClick}
                                    />
                                    <Form.Check
                                    type="radio"
                                    label="female"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                                    onClick={this.onFemaleClick}
                                    />
                                </Col>
                                </Form.Group>
                            </fieldset>
                            {
                                alertGenderNotChecked === true
                                ? <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>Choose your gender!</h6>
                                : ( <div></div> )
                            }
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleSubmitFirstForm}>
                                    Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showModalUserGoals} onHide={() => {}} centered keyboard={true}> 
                    <Modal.Header>
                        <Modal.Title>A little more about you</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label style={{'color': 'black', 'paddingBottom': '5%'}}>
                           Let`s think about your goals!
                        </Form.Label>
                        <Form>
                            <Form.Group controlId="formCurrentWeight">
                                <Form.Label>What is your current weight? [kg]</Form.Label>
                                <Form.Control size="sm" onChange={this.onWeightChange}/>
                            </Form.Group>
                            {
                                alertWeightEmpty === true
                                ? <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>Please enter you current weight!</h6>
                                : ( <div></div> )
                            }
                            <Form.Group controlId="formDesiredWeight">
                                <Form.Label>What is your desired weight? [kg]</Form.Label>
                                <Form.Control size="sm" onChange={this.onWeightGoalChange} />
                            </Form.Group>
                            {
                                alertWeightGoal === true
                                ? <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>
                                    Please choose your weight goal for the number of days you selected!</h6>
                                : (<div></div>)    
                            }
                            <Form.Group controlId="formHeight">
                                <Form.Label>Please insert you height! [cm]</Form.Label>
                                <Form.Control size="sm" onChange={this.onHeightChange} />
                            </Form.Group>
                            {
                                alertEmptyHeight === true
                                ? <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>
                                    Please choose your height!</h6>
                                : (<div></div>)    
                            }
                            {/* <Form.Group controlId="formTime">
                                <Form.Label>How fast do you wish you wish to achieve your goal? [days]</Form.Label>
                                <Form.Control size="sm" onChange={this.onNumDaysGoal} />
                            </Form.Group> */}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleSubmitSecondForm}>
                                    Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default NewUserData;