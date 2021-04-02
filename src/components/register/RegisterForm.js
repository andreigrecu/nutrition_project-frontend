import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './RegisterForm.css';


class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            termsAndConditionsAgreed: false,
            alertPasswordLength: false,
            alertPasswordsNoMatch: false,
            alertTermsAndConditonsNotAccepted: true,
            alertEmailWrongFormat: false,
            triggeredPassword: null,
            triggeredMatchPassword: false
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onConfirmPasswordChange = (event) => {
        this.setState({ confirmPassword: event.target.value })
        this.setState({ triggeredMatchPassword: true })

        if(event.target.value === this.state.password)
            this.setState({ alertPasswordsNoMatch: false })
        else 
            this.setState({ alertPasswordsNoMatch: true })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
        this.setState({ triggeredPassword: true });

        if(event.target.value.length <= 6 )
            this.setState({ alertPasswordLength: true });
        else
            this.setState({ alertPasswordLength: false }); 
    }

    onTermsAndConditionsChange = (event) => {
        this.setState({termsAndConditionsAgreed: event.target.checked})
        if(event.target.checked === true)
            this.setState({alertTermsAndConditonsNotAccepted: event.target.checked})
    }

    checkEmailForm = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    onSubmitSignIn = () => {
 
        let ok = 0;

        if(this.state.alertPasswordLength === true || this.state.alertPasswordsNoMatch === true || this.state.triggeredMatchPassword === false) {
            ok = 1;
        }

        if(this.state.triggeredPassword === null) {
            ok = 1;
            this.setState({ triggeredPassword: false });
        } else if(this.state.triggeredPassword === false) {
            this.setState({ triggeredPassword: true });
        }

        if(this.checkEmailForm(this.state.email) === false) {
            ok = 1;
            this.setState({ alertEmailWrongFormat: true })
        } else {
            this.setState({ alertEmailWrongFormat: false })
        }

        if(this.state.termsAndConditionsAgreed === false) {
            ok = 1;
            this.setState({ alertTermsAndConditonsNotAccepted: false })
        } else {
            this.setState({ alertTermsAndConditonsNotAccepted: true })
        }

        if(ok === 0) {
            

            fetch('http://localhost:4400/users/register', {
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    firstName: "",
                    lastName: "",
                    email: this.state.email,
                    password: this.state.password,
                    birthday: '1995-05-22'
                })
            })
                .then(response => response.json())
                .then(user => {
                    if(user && user['data'] && user['data']['id']) {
                        this.props.loadUser(user);
                        this.props.onRouteChange('home');
                    }
                })
        } else {
            return;
        }
    }

    render() {

        const { 
            alertPasswordLength, 
            alertPasswordsNoMatch,
            alertTermsAndConditonsNotAccepted, 
            alertEmailWrongFormat,
            triggeredPassword,
            triggeredMatchPassword
        } = this.state;

        return(
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control size="sm" placeholder="Enter email" onChange={this.onEmailChange}/>
                        {
                            alertEmailWrongFormat === false
                            ? <div>
                                <Form.Text className="text-muted">
                                    We`ll never share yout email with anyone else.
                                </Form.Text>
                              </div>
                            :(
                                <Form.Text className="text-muted">
                                    <h6 className="wrongEmail">Email does not exist!</h6>
                                </Form.Text>
                            )
                        }
                    </Form.Group>
                            
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" size="sm" placeholder="Password" onChange={this.onPasswordChange}/>
                        {
                            ( alertPasswordLength === true || triggeredPassword === false)
                            ?   <div>
                                    <Form.Text className="text-muted">
                                        <h6 style={{'color': 'red'}}>Chose a longer password!</h6>
                                    </Form.Text>
                                </div>
                            :(
                                <div></div>
                            )
                        }
                    </Form.Group>

                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control type="password" size="sm" placeholder="ConfirmPassword" onChange={this.onConfirmPasswordChange}/>
                        {
                            (alertPasswordsNoMatch === true || (triggeredMatchPassword === false && triggeredPassword === true ))
                            ? <div>
                                <Form.Text className="text-muted">
                                    <h6 style={{'color': 'red'}}>Passwords don`t match!</h6>
                                </Form.Text>
                            </div>
                            :(                              
                                <div></div>
                            )
                        }
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <input type="checkbox" id="checkboxTerms" name="checkboxTerms" onChange={this.onTermsAndConditionsChange} />
                        <Form.Label style={{'paddingLeft': '2%', 'paddingRight': '1%'}}>I agree with the</Form.Label>
                        <button type="button" className="btnLink">terms and conditions.</button>
                        {
                            alertTermsAndConditonsNotAccepted === false
                            ? <div>
                                <Form.Text className="text-muted">
                                    <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>Please accept terms and conditions!</h6>
                                </Form.Text>
                            </div>
                            : (
                                <div></div>
                            )
                        }
                    </Form.Group>

                    <Button variant="primary" onClick={this.onSubmitSignIn}>
                        Submit
                    </Button>

                    <Form.Group controlId="forgotPassword">
                        <Form.Label style={{'paddingRight': '2%', 'paddingTop': '5%'}}>Forgot password?</Form.Label>
                        <button type="button" className="btnLink">Click here</button> 
                    </Form.Group>
                
                </Form>

        )
    }
}

export default RegisterForm;