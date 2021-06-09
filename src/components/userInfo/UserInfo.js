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
            emailPlaceholder: '',
            activityTypePlaceholder: '',

            newFirstName: '',
            newLastName: '',
            newAge: '',
            newWeight: '',
            newWeightGoal: '',
            newEmail: '',

            alertAge: false,
            alertWeight: false,
            alertWeightGoal: false,
            alertEmail: false,
            alertEmailAlreadyExists: false,

            sedentaryActivityType: false,
            lightActiveActivityType: false,
            veryActiveActivityType: false
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

    onEmailChange = (event) => {
        this.setState({ newEmail: event.target.value, alertEmail: false, alertEmailAlreadyExists: false });
    }

    onSedentaryActivityTypeClick = () => {
        this.setState({
            sedentaryActivityType: true,
            lightActiveActivityType: false,
            veryActiveActivityType: false
        });
    }

    onLightActiveActivityType = () => {
        this.setState({
            sedentaryActivityType: false,
            lightActiveActivityType: true,
            veryActiveActivityType: false
        });
    }

    onVeryActiveActivityType = () => {
        this.setState({
            sedentaryActivityType: false,
            lightActiveActivityType: false,
            veryActiveActivityType: true
        })
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
                        document.getElementById('formAge').value = "";
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
                        document.getElementById('formWeight').value = "";
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
                        document.getElementById('formWeightGoal').value = "";
                    }
                })
                .catch(error => console.log(error))
        }
    }

    checkEmailForm = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    updateEmail = () => {

        let makeUpdateEmailCall = true;
        if(this.checkEmailForm(this.state.newEmail) === false) {
            makeUpdateEmailCall = false;
            if(this.state.newEmail !== "")
                this.setState({ alertEmail: true });
        } else {
            this.setState({ alertEmail: false });
        }

        if(makeUpdateEmailCall === true) {

            fetch(`http://localhost:4400/users?email=${this.state.newEmail}`, {
                method: 'get'
            })
                .then(response => response.json())
                .then(response => {
                    if(response['data'] && response['data'][0] && response['data'][0]['email']) {
                        this.setState({ alertEmailAlreadyExists: true });
                        document.getElementById('formEmail').value = "";
                    }
                    else {
                        fetch(`http://localhost:4400/users/${this.props.user.id}`, {
                            method: 'put',
                            headers: {'Content-type': 'application/json'},
                            body: JSON.stringify({
                                email: this.state.newEmail,
                            })
                        })
                            .then(response => response.json())
                            .then(response => {
                                if(response['statusCode'] && parseInt(response['statusCode']) !== 200)
                                    console.log('ERROR: ' + response['message'] + " of status code " + response['statusCode']);
                                else {
                                    this.setState({ alertEmail: false });
                                    this.getUserInfo();
                                    document.getElementById('formEmail').value = "";
                                }
                            })
                            .catch(error => console.log(error))
                    }
                })
                .catch(error => console.log(error))
        }
    }

    updateActivityType = () => {

        let activityType = '';
        if(this.state.sedentaryActivityType === true)
            activityType = 'sedentary';
        if(this.state.lightActiveActivityType === true)
            activityType = 'lightlyActive';
        if(this.state.veryActiveActivityType === true)
            activityType = 'veryActive';

        if(activityType) {
            fetch(`http://localhost:4400/usersInfo`, {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    userId: this.props.user.id,
                    activityType: activityType
                })
            })
                .then(response => response.json())
                .then(response => {
                    if(response['statusCode'] && parseInt(response['statusCode']) !== 200)
                        console.log('ERROR: ' + response['message'] + " of status code " + response['statusCode']);
                    else {
                        this.getUserInfo();
                    }
                })
                .catch(error => console.log(error))
        }
    
    }

    clearCheckbox = () => {
        document.getElementById("formPersonTypeRadios1").checked = false;
        document.getElementById("formPersonTypeRadios2").checked = false;
        document.getElementById("formPersonTypeRadios3").checked = false;
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
                        document.getElementById('formFirstName').value = "";
                        document.getElementById('formLastName').value = "";
                    }
                })
                .catch(error => console.log(error))
        }

        this.updateAge();
        this.updateWeight();
        this.updateWeightGoal();
        this.updateEmail();
        this.updateActivityType();
        this.clearCheckbox();
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
                        emailPlaceholder: response['data'][0]['email']
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
                        weightGoalPlaceholder: response['data']['weightGoal'],
                        activityTypePlaceholder: response['data']['activityType']
                    })
                }
            })
            .catch(error => console.log(error))
    }

    componentDidMount = () => {
       this.getUserInfo();
    }

    parseActivityType = (activityTypeParsed, activityTypePlaceholder) => {

        switch(activityTypePlaceholder) {
            case('sedentary'):
                activityTypeParsed = 'sedentary';
                break;
            case('lightlyActive'):
                activityTypeParsed = 'lightly active';
                break;
            case('veryActive'):
                activityTypeParsed = 'very active';
                break;
            default:
                break;
        }

        return activityTypeParsed;
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
            alertWeightGoal,
            alertEmail,
            emailPlaceholder,
            activityTypePlaceholder,
            alertEmailAlreadyExists
        } = this.state;

        let activityTypeParsed = '';
        activityTypeParsed = this.parseActivityType(activityTypeParsed, activityTypePlaceholder);
        
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
                    <Col sm="2">
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last name: {lastNamePlaceholder} </Form.Label>
                            <Form.Control placeholder="change last name" onChange={this.onLastNameChange} />
                        </Form.Group>
                    </Col>
                    <Col sm="1"></Col>
                    <Col sm="3">
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email: {emailPlaceholder} </Form.Label>
                            <Form.Control onChange={this.onEmailChange} />
                            {
                                alertEmail === true &&
                                    <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>The chosen email has a wrong format!</h6>
                            }
                            {
                                alertEmailAlreadyExists === true &&
                                    <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>The chosen email is used by another account!</h6>
                            }
                        </Form.Group>
                    </Col>
                    <Col sm="1"></Col>
                </Row>
                <hr></hr>
                <Row noGutters>
                    <Col sm="1"></Col>
                    <Col sm="3">
                        <Form.Group controlId="formWeight">
                            <Form.Label>Weight: {weightPlaceholder}</Form.Label>
                            <Form.Control onChange={this.onWeightChange} />
                            {
                                alertWeight === true &&
                                    <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>The chosen weight has a wrong format!</h6>
                            }
                        </Form.Group>
                    </Col>
                    <Col sm="1"></Col>
                    <Col sm="2">
                        <Form.Group controlId="formWeightGoal">
                            <Form.Label>Weight goal: {weightGoalPlaceholder}</Form.Label>
                            <Form.Control onChange={this.onWeightGoalChange} />
                            {
                                alertWeightGoal === true &&
                                    <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>The chosen weight goal has a wrong format!</h6>
                            }
                        </Form.Group>
                    </Col>
                    <Col sm="1"></Col>
                    <Col sm="2">
                        <Form.Group controlId="formAge">
                            <Form.Label>Age: {agePlaceholder} </Form.Label>
                            <Form.Control onChange={this.onAgeChange} />
                            {
                                alertAge === true &&
                                    <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>The chosen age has a wrong format!</h6>
                            }
                        </Form.Group>
                    </Col>
                    <Col sm="2"></Col>
                </Row>
                <hr></hr>
                <Row noGutters>
                    <Col sm="1"></Col>
                    <fieldset>
                        <Form.Group as={Row}>
                        <Form.Label as="gender" column sm={8}>
                            Choose your activity level. You have now: <span style={{'color': 'black', 'fontSize': '150%'}}>{activityTypeParsed}</span>.
                        </Form.Label>
                        <Col sm={2}></Col>
                        <Col sm={8}>
                            <Form.Check
                                type="radio"
                                label="Sedentary (little or no exercise)"
                                name="formPersonType"
                                id="formPersonTypeRadios1"
                                onClick={this.onSedentaryActivityTypeClick}
                            />
                            <Form.Check
                                type="radio"
                                label="Lightly active (light exercise/sports 1-3 days/week)"
                                name="formPersonType"
                                id="formPersonTypeRadios2"
                                onClick={this.onLightActiveActivityType}
                            />
                            <Form.Check
                                type="radio"
                                label="Very active (hard exercise/sports 6-7 days a week)"
                                name="formPersonType"
                                id="formPersonTypeRadios3"
                                onClick={this.onVeryActiveActivityType}
                            />
                        </Col>
                        </Form.Group>
                    </fieldset>
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