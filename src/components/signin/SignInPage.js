import React, { Component } from 'react';
import NavigationBar from '../welcomePage/NavigationBar';
import './SignInPage.css';
import SignInForm from './SignInForm';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

class SignInPage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    changeRouteToAboutUs = () => {
        this.props.onRouteChange('aboutUs');
    }

    render() {

        return(
            <div>
                <NavigationBar onRouteChange={this.props.onRouteChange} route={this.props.route} />
                <Container fluid={true} className="p-0 background-image">
                    <Row noGutters>
                        <Col sm="3"></Col>
                        <Col sm="1">
                            <h2 className="logo">LOGO</h2>
                        </Col>
                        <Col sm="4">
                            <h2 className="title">FITNESS APP</h2>
                        </Col>
                        <Col sm="4"></Col>
                    </Row>
                    <Row>
                        <Col sm="3"></Col>
                        <Col sm="6" >
                            <h6 className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam.</h6>
                        </Col>
                        <Col sm="3"></Col>
                    </Row>
                    <Row>
                        <Col sm="4"></Col>
                        <Col sm="4" style={{'borderStyle': 'solid', 'borderColor': 'white'}}>
                            <h4 className="login">Log In to Your Account</h4>
                            <SignInForm loadUser={this.props.loadUser} onRouteChange={this.props.onRouteChange} />
                        </Col>
                        <Col sm="4"></Col>
                    </Row>
                    <Row>
                        <Col sm="5" style={{'paddingBottom': '5%'}}></Col>
                        <Col sm="2" style={{'textAlign': 'center', 'paddingBottom': '5%'}}>
                            <Button variant="link" className="btn-footer" onClick={this.changeRouteToAboutUs}>About</Button>
                            <Button variant="link" className="btn-footer">Help</Button>
                        </Col>
                        <Col sm="5" style={{'paddingBottom': '5%'}}></Col>
                    </Row>
                </Container>
            </div>
        )
    }   
}

export default SignInPage;