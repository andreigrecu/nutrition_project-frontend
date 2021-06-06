import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ForgotPassword.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavigationBar from '../welcomePage/NavigationBar';

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            alertUserNotFound: false,
            alertEmailSent: false
        }
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value, alertUserNotFound: false, alertEmailSent: false });
    }

    onSendEmailClick = () => {
        fetch(`http://localhost:4400/forgot-passwords/forgot-password`, {
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.email
                })
            })
                .then(response => response.json()) 
                .then(response => {
                    if(response['meta'] && parseInt(response['meta']['statusCode']) !== 200)
                        this.setState({ alertUserNotFound: true });
                    else {
                        this.setState({ alertEmailSent: true });
                    }
                })
                .catch(error => console.log(error))

    }

    render() {

        const {
            alertUserNotFound,
            alertEmailSent
        } = this.state;

        return (
            <Container fluid={true} className="p-0">
                <NavigationBar />
                <Row noGutters>
                    <Col sm="4"></Col>
                    <Col sm="4">
                        <h3 className="txtForgotPasswd" style={{'textAlign': 'center'}}>Forgot your password? No worries!</h3>
                    </Col>
                    <Col sm="4"></Col>
                </Row>
                <Row noGutters>
                    <Col sm="4"></Col>
                    <Col sm="4">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="txtForgotPasswd">Please enter you email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={this.onEmailChange} />
                                {
                                    alertUserNotFound === true &&
                                        <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>We could not find an account with this email. Please try again!</h6>
                                }
                            </Form.Group>
                        </Form>
                        <Button variant="primary" className="btnForgotPassword" onClick={this.onSendEmailClick}>Send</Button>
                    </Col>
                    <Col sm="4"></Col>
                </Row>
                <Row noGutters>
                    <Col sm="3"></Col>
                    <Col sm="6">
                    {
                        alertEmailSent === true &&
                            <h4 style={{'paddingTop': '10%', 'textAlign': 'center'}}>An email with instructions was sent to your email address!</h4>
                    }
                    </Col>
                    <Col sm="3"></Col>
                </Row>
            </Container>
        )
    }

}

export default ForgotPassword;