import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SignedInNavigationBar from '../userProfile/SignedInNavigationBar';
import './ChangePassword.css';

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',

            newPasswordShort: false,
            passwordsMatch: true,
            oldPasswordWrong: false,
        }
    }

    componentDidMount = () => {
        if(!this.props.user.id)
            this.props.history.push('/signin');
    }

    onChangeOldPassword = (event) => {
        this.setState({ oldPassword: event.target.value });
    }

    onChangeNewPassword = (event) => {
        this.setState({ newPassword: event.target.value });
    }

    onChangeConfirmNewPassword = (event) => {
        this.setState({ confirmNewPassword: event.target.value });
    }

    onSubmitChangePassword = () => {

        this.setState({ passwordsChanged: false });

        let makeCall = true;
        if(this.state.newPassword.length < 6) {
            this.setState({ newPasswordShort: true });
            makeCall = false;
        }
        else 
            this.setState({ newPasswordShort: false });

        if(this.state.newPassword !== this.state.confirmNewPassword) {
            this.setState({ passwordsMatch: false });
            makeCall = false;
        } else 
            this.setState({ passwordsMatch: true });

        if(makeCall === true) {
            fetch(`http://localhost:4400/users/${this.props.user.id}/changePassword`, {
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    current_password: this.state.oldPassword,
                    new_password: this.state.newPassword,
                    confirm_password: this.state.confirmNewPassword
                })
            })
                .then(response => response.json()) 
                .then(response => {
                    if(parseInt(response['meta']['statusCode']) !== 200 && response['message']['_general'] === 'users.old_password_is_wrong') 
                        this.setState({ oldPasswordWrong: true });
                    else {
                        this.props.history.push('/users');
                    }
                })
                .catch(error => console.log(error))
        }
    }

    render() {

        const {
            newPasswordShort,
            passwordsMatch,
            oldPasswordWrong
        } = this.state;

        return(
            <Container fluid={true} className="p-0 background">
                <SignedInNavigationBar />
                <Row noGutters>
                    <Col sm="3"></Col>
                    <Col sm="6">
                        <h3 className="changePsswd">Change your password</h3>
                        <Form>
                            <Form.Group controlId="formOldPassword">
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control type="password" onChange={this.onChangeOldPassword} />
                                {
                                    oldPasswordWrong === true &&
                                    <h6 className="warning">Old password is wrong</h6>
                                }
                            </Form.Group>
                            <Form.Group controlId="formNewPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" onChange={this.onChangeNewPassword} />
                                {
                                    newPasswordShort === true &&
                                    <h6 className="warning">New password too short.</h6>
                                }
                            </Form.Group>
                            <Form.Group controlId="formValidateNewPassword">
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control type="password" onChange={this.onChangeConfirmNewPassword} />
                                {
                                    passwordsMatch === false &&
                                    <h6 className="warning">Passwords don`t match.</h6>
                                }
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm="3"></Col>
                </Row>
                <Row noGutters>
                    <Col sm="8"></Col>
                    <Col sm="1" style={{'textAlign': 'right'}}>
                        <Button variant="primary" onClick={this.onSubmitChangePassword}>Submit</Button>
                    </Col>
                    <Col sm="3"></Col>
                </Row>
            </Container>
        )
    }
}

export default ChangePassword;