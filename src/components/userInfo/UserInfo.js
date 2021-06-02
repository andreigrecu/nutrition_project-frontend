import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import SignedInNavigationBar from '../userProfile/SignedInNavigationBar';
import Footer from '../footer/Footer';
import './UserInfo.css';
import Button from 'react-bootstrap/Button';

class UserInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstNamePlaceholder: '',
            lastNamePlaceholder: '',
            agePlaceholder: '',
            weightPlaceholder: '',
            heightPlaceholder: '',
            weightGoalPlaceholder: '',

            newFirstName: '',
            newLastName: '',
            newAge: '',
            newWeight: '',
            newWeightGoal: '',

            alertAge: false,
            alertWeight: false,
            alertWeightGoal: false
        }
    }

    onFirstNameChange = (event) => {
        this.setState({ newFirstName: event.target.value });
    }

    onLastNameChange = (event) => {
        this.setState({ newLastName: event.target.value });
    }

    onAgeChange = (event) => {
        this.setState({ newAge: event.target.value, alertAge: false });
    }

    onWeightChange = (event) => {
        this.setState({ newWeight: event.target.value, alertWeight: false });
    }

    onWeightGoalChange = (event) => {
        this.setState({ newWeightGoal: event.target.value, alertWeightGoal: false });
    }

    updateAge = () => {

        let makeAgeUpdateCall = true;
        if(parseInt(this.state.newAge) < 18 || parseInt(this.state.newAge) > 100 || (!this.state.newAge.trim() && this.state.newAge)) {
            makeAgeUpdateCall = false;
            this.setState({ 
                alertAge: true,
            })
        } else {
            this.setState({ 
                alertAge: false 
            })
        }

        if(makeAgeUpdateCall === true) {
            fetch(`http://localhost:4400/usersInfo`, {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    age: this.state.newAge,
                    userId: this.props.user.id
                })
            })
                .then(response => response.json())
                .then(response => {
                    if(response['statusCode'] && parseInt(response['statusCode']) !== 200)
                        console.log('ERROR: ' + response['message'] + " of status code " + response['statusCode']);
                    else {
                        this.setState({ alertAge: false });
                        this.getUserInfo();
                    }
                })
                .catch(error => console.log(error))
        }
    }

    updateWeight = () => {

        let makeWeightUpdateCall = true;
        if(parseInt(this.state.newWeight) < 30 || parseInt(this.state.newWeight) > 200 || (!this.state.newWeight.trim() && this.state.newWeight)) {
            makeWeightUpdateCall = false;
            this.setState({ 
                alertWeight: true,
            })
        } else {
            this.setState({ 
                alertWeight: false 
            })
        }

        if(makeWeightUpdateCall === true) {
            fetch(`http://localhost:4400/usersInfo`, {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    weight: this.state.newWeight,
                    userId: this.props.user.id
                })
            })
                .then(response => response.json())
                .then(response => {
                    if(response['statusCode'] && parseInt(response['statusCode']) !== 200)
                        console.log('ERROR: ' + response['message'] + " of status code " + response['statusCode']);
                    else {
                        this.setState({ alertWeight: false });
                        this.getUserInfo();
                    }
                })
                .catch(error => console.log(error))
        }
    }

    updateWeightGoal = () => {

        let makeWeightGoalUpdateCall = true;
        if(parseInt(this.state.newWeightGoal) < 30 || parseInt(this.state.newWeightGoal) > 200 || (!this.state.newWeightGoal.trim() && this.state.newWeightGoal)) {
            makeWeightGoalUpdateCall = false;
            this.setState({ 
                alertWeightGoal: true,
            })
        } else {
            this.setState({ 
                alertWeightGoal: false 
            })
        }

        if(makeWeightGoalUpdateCall === true) {
            fetch(`http://localhost:4400/usersInfo`, {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    weightGoal: this.state.newWeightGoal,
                    userId: this.props.user.id
                })
            })
                .then(response => response.json())
                .then(response => {
                    if(response['statusCode'] && parseInt(response['statusCode']) !== 200)
                        console.log('ERROR: ' + response['message'] + " of status code " + response['statusCode']);
                    else {
                        this.setState({ alertWeightGoal: false });
                        this.getUserInfo();
                    }
                })
                .catch(error => console.log(error))
        }
    }

    onSaveClick = () => {

        let lastName = "";
        let firstName = "";

        if(this.state.newLastName)
            lastName= this.state.newLastName;
        if(this.state.newFirstName)
            firstName = this.state.newFirstName;

        if(this.state.newFirstName || this.state.newLastName) {
            fetch(`http://localhost:4400/users/${this.props.user.id}`, {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName
                })
            })
                .then(response => response.json())
                .then(response => {
                    if(response['statusCode'] && parseInt(response['statusCode']) !== 200)
                        console.log("ERROR: " + response['message'] + " of status code " + response['statusCode']);
                    else {
                        this.getUserInfo();
                    }
                })
                .catch(error => console.log(error))
        }

       
        this.updateAge();
        this.updateWeight();
        this.updateWeightGoal();
    }

    getUserInfo = () => {
        fetch(`http://localhost:4400/users?id=${this.props.user.id}`, {
            method: 'get'
        })
            .then(response => response.json())
            .then(response => {
                if(response['statusCode'] &&  parseInt(response['statusCode']) !== 200)
                    console.log("ERROR: " + response['message'] + "of status code " + response['statusCode']);
                else {
                    this.setState({ 
                        firstNamePlaceholder: response['data'][0]['firstName'], 
                        lastNamePlaceholder: response['data'][0]['lastName'], 
                    });
                }
            })
            .catch(error => console.log(error))

        fetch(`http://localhost:4400/users/${this.props.user.id}/userInfo`, {
            method: 'get'
        })
            .then(response => response.json())
            .then(response => {
                if(response['statusCode'] &&  parseInt(response['statusCode']) !== 200)
                    console.log("ERROR: " + response['message'] + "of status code " + response['statusCode']);
                else {
                    this.setState({ 
                        agePlaceholder: response['data']['age'],
                        weightPlaceholder: response['data']['weight'],
                        heightPlaceholder: response['data']['height'],
                        weightGoalPlaceholder: response['data']['weightGoal']
                    })
                }
            })
            .catch(error => console.log(error))
    }

    componentDidMount = () => {
       this.getUserInfo();
    }

    
    render() {

        const {
            firstNamePlaceholder,
            lastNamePlaceholder,
            weightPlaceholder,
            weightGoalPlaceholder,
            alertAge,
            agePlaceholder,
            alertWeight,
            alertWeightGoal
        } = this.state;
        
        return(
            <Container fluid={true} className="p-0">
                <SignedInNavigationBar />
                
                <Row noGutters>
                    <Col sm="4">
                        <h3 className="details">YOUR ACCOUNT DETAILS</h3>
                    </Col>
                    <Col sm="8"></Col>
                </Row>
                <hr></hr>
                <Row noGutters>
                    <Col sm="1"></Col>
                    <Col sm="3">
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First name: {firstNamePlaceholder} </Form.Label>
                            <Form.Control placeholder="change first name" onChange={this.onFirstNameChange}/>
                        </Form.Group>
                    </Col>
                    <Col sm="1"></Col>
                    <Col sm="3">
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last name: {lastNamePlaceholder} </Form.Label>
                            <Form.Control placeholder="change last name" onChange={this.onLastNameChange} />
                        </Form.Group>
                    </Col>
                    <Col sm="1"></Col>
                    <Col sm="2">
                        <Form.Group controlId="formAge">
                            <Form.Label>Age: {agePlaceholder} </Form.Label>
                            {
                                alertAge === true &&
                                    <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>The chosen age has a wrong value o format!</h6>
                            }
                            <Form.Control onChange={this.onAgeChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <hr></hr>
                <Row noGutters>
                    <Col sm="1"></Col>
                    <Col sm="3">
                        <Form.Group controlId="formWeight">
                            <Form.Label>Weight: {weightPlaceholder}</Form.Label>
                            {
                                alertWeight === true &&
                                    <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>The chosen weight has a wrong value o format!</h6>
                            }
                            <Form.Control onChange={this.onWeightChange} />
                        </Form.Group>
                    </Col>
                    <Col sm="1"></Col>
                    <Col sm="2">
                        <Form.Group controlId="formWightGoal">
                            <Form.Label>Weight goal: {weightGoalPlaceholder}</Form.Label>
                            {
                                alertWeightGoal === true &&
                                    <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>The chosen weight goal has a wrong value o format!</h6>
                            }
                            <Form.Control onChange={this.onWeightGoalChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <hr></hr>
                <Row noGutters style={{'paddingBottom': '12%', 'paddingTop': '5%'}}>
                    <Col sm="10"></Col>
                    <Col sm="2">
                        <Button 
                            variant="success" 
                            className="saveBtn"
                            onClick={this.onSaveClick}
                        >
                        Save
                        </Button>
                    </Col>
                </Row>
                <Footer />
            </Container>
        )
    }
}

export default UserInfo;