import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SignInForm.css';
import Modal from 'react-bootstrap/Modal';

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            alertEmailWrongFormat: false,
            wrongCredentials: false
        }
    }

    changeRouteToRegister = () => {
        this.props.onRouteChange('signout');
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    checkEmailForm = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleClose = () => {
        this.setState({ wrongCredentials: false });
    }

    onSubmitSignIn = () => {

        let ok = 0;
        if(this.checkEmailForm(this.state.email) === false) {
            ok = 1;
            this.setState({ alertEmailWrongFormat: true })
        } else {
            this.setState({ alertEmailWrongFormat: false })
        }
        
        if(ok === 0) {
            fetch('http://localhost:4400/users/login', {
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            
                .then(response => response.json())
                .then(response => {
                    if(response && response['data'] && response['data']['user']['id']) {
                        this.props.loadUser(response['data']['user']);
                        this.props.onRouteChange('home');
                    }
                    else {
                        this.setState({ wrongCredentials: true });
                        return;
                    }
                })
        }
    }

    render() {

        const { 
            alertEmailWrongFormat,
            wrongCredentials
         } = this.state;

        return(
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label style={{'color': 'white'}}>Email address</Form.Label>
                    <Form.Control placeholder="Enter email" onChange={this.onEmailChange} />
                    {
                        alertEmailWrongFormat === false
                        ?  <div>
                                <Form.Text style={{'color': 'white'}}>Please enter your email to log in</Form.Text>
                           </div>
                        : (
                            <div>
                                <Form.Text style={{'color': 'red', 'fontSize': '125%'}}>The email format is wrong!</Form.Text>
                            </div>
                        )
                    }
                </Form.Group>

                
                <Modal show={wrongCredentials} onHide={this.handleClose} centered keyboard={true}> 
                    <Modal.Header closeButton>
                        <Modal.Title style={{'color': 'red'}}>Wrong username or password!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Please try again!</p>
                    </Modal.Body>
                </Modal>
                
                <Form.Group controlId="formBasicPassword">
                    <Form.Label style={{'color': 'white'}}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.onPasswordChange}/>
                </Form.Group>

                <div style={{'textAlign': 'right'}}>
                    <Button variant="link">Forgot Password?</Button>
                </div>

                <Button variant="primary" block style={{'marginTop': '8%'}} onClick={this.onSubmitSignIn}>Submit</Button>

                <Form.Label className="needAccount" style={{'fontSize': '100%'}}>Need an account?</Form.Label>
                <div>
                    <Button variant="link" style={{'padding': '0', 'display': 'inline'}} onClick={this.changeRouteToRegister}>Sign Up</Button>
                </div>
            </Form>
        )
    }
}

export default SignInForm;