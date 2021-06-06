import React, { Component } from 'react';
import NavigationBar from '../welcomePage/NavigationBar';
import './SignInPage.css';
import SignInForm from './SignInForm';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import LOGO from './LOGO.png';
import Footer from '../footer/Footer';

class SignInPage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => {
        this.props.clearUserState();
    }

    render() {

        return(
            <div>
                <NavigationBar onRouteChange={this.props.onRouteChange} route={this.props.route} />
                <Container fluid={true} className="p-0 background-image">
                    <Row noGutters>
                        <Col sm="3"></Col>
                        <Col sm="1">
                            <img src={LOGO} alt="logo" />
                        </Col>
                        <Col sm="4">
                            <h2 className="logo">FITNESS APP</h2>
                        </Col>
                        <Col sm="4"></Col>
                    </Row>
                    <Row>
                        <Col sm="3"></Col>
                        <Col sm="6" >
                            <h6 className="text">Until you get your nutrition right, nothing is going to change.</h6>
                        </Col>
                        <Col sm="3"></Col>
                    </Row>
                    <Row>
                        <Col sm="4"></Col>
                        <Col sm="4" style={{'borderStyle': 'solid', 'borderColor': 'white'}}>
                            <h4 className="login">Log In to Your Account</h4>
                            <SignInForm loadUser={this.props.loadUser} />
                        </Col>
                        <Col sm="4"></Col>
                    </Row>
                    <Row>
                        <Col sm="5" style={{'paddingBottom': '5%'}}></Col>
                        <Col sm="2" style={{'textAlign': 'center', 'paddingBottom': '5%'}}>
                            <Button variant="link" className="btn-footer">
                                <a style={{'color': 'white'}} href = "mailto: proiectlicenta2021@gmail.com">Help</a>
                            </Button>
                        </Col>
                        <Col sm="5" style={{'paddingBottom': '5%'}}></Col>
                    </Row>
                    <Row noGutters>
                        <Footer />
                    </Row>
                </Container>
            </div>
        )
    }   
}

export default SignInPage;