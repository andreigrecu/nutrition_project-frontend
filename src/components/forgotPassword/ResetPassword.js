import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavigationBar from '../welcomePage/NavigationBar';

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            confirmNewPassword: '',

            alertSmallPassword: false,
            alertPasswordsDontMatch: false,
            expiredToken: false,
            passwordChanged: false
        };
    }

    onChangeNewPassword = (event) => {
        this.setState({ 
            newPassword: event.target.value, 
            alertSmallPassword: false, 
            alertPasswordsDontMatch: false 
        });
    }

    onChangeConfirmNewPassword = (event) => {
        this.setState({ 
            confirmNewPassword: event.target.value, 
            alertPasswordsDontMatch: false 
        });
    }

    onChangePassword = () => {
        
        let makeCall = true;
        if(this.state.newPassword.length < 6) {
            makeCall = false;
            this.setState({ alertSmallPassword: true });
        } 

        if(this.state.newPassword !== this.state.confirmNewPassword) {
            makeCall = false;
            this.setState({ alertPasswordsDontMatch: true });
        } 

        if(makeCall === true) {

            let token = this.props.history.location.pathname;
            token = token.substring(7, token.length);

            fetch(`http://localhost:4400/forgot-passwords/reactivate-password`, {
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    token: token,
                    new_password: this.state.newPassword,
                    confirm_password: this.state.confirmNewPassword
                })
            })
                .then(response => response.json())
                .then(response => {
                    if(response['meta'] && (parseInt(response['meta']['statusCode']) !== 200)) {
                        console.log("ERROR: expired token");
                        this.setState({ expiredToken: true });
                    }
                    else {
                        this.setState({ newPassword: '', confirmNewPassword: '', passwordChanged: true})
                    }
                })
                .catch(error => console.log(error))
        }   
    }

    render() {

        const {
            alertPasswordsDontMatch,
            alertSmallPassword,
            expiredToken,
            passwordChanged
        } = this.state;

        return (
            <Container fluid={true} className="p-0 background">
                <NavigationBar />
                <Row noGutters>
                        <Col sm="4"></Col>
                        <Col sm="4">
                            <h3 className="changePsswd">Change your password</h3>
                            <Form>
                                <Form.Group controlId="formNewPassword">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" onChange={this.onChangeNewPassword} />
                                    {
                                        alertSmallPassword === true &&
                                            <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>The chosen password is too short! Choose a longer one.</h6>
                                    }
                                </Form.Group>
                                <Form.Group controlId="formValidateNewPassword">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control type="password" onChange={this.onChangeConfirmNewPassword} />
                                    {
                                        alertPasswordsDontMatch === true &&
                                            <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>The passwords don`t match!</h6>
                                    }
                                    {
                                        expiredToken === true &&
                                            <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>Your token expired. Please ask for another!</h6>
                                    }
                                    {
                                        passwordChanged === true &&
                                            <h3>Your password was changed!</h3>
                                    }
                                </Form.Group>
                            </Form>
                            <Button variant="primary" onClick={this.onChangePassword}>Change</Button>
                        </Col>
                        <Col sm="4"></Col>
                    </Row>
                </Container>
        )
    }

}

export default ResetPassword;