import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Footer.css';
import LOGO from './LOGO.png';
import { withRouter } from 'react-router-dom';


class Footer extends Component {

    onTermsClick = () => {
        this.props.history.push("/termsAndConditions");
    }

    onSignInClick = () => {
        this.props.history.push("/signin");
    }

    render() {
        return (
            <Container fluid={true} className="p-0 backgrd">
                <Row noGutters className="footer">
                    <Col sm="1">
                        <p className="padd"><img src={LOGO} alt="logo" width="75" height="75"/></p>
                    </Col>
                    <Col sm="2">
                        <p style={{'color': 'white', 'fontSize': '120%', 'textAlign': 'center'}}>Start your journey with us now!</p>
                    </Col>
                    <Col sm="1"></Col>
                    <Col sm="2" className="center padd">
                        <a className="white link" href = "mailto: proiectlicenta2021@gmail.com">Contact</a>
                    </Col>
                    <Col sm="3" className="center white padd">
                        <p className="txt" onClick={this.onTermsClick}>Terms and conditions</p>
                    </Col>
                    <Col sm="2" className="center white padd">
                        <p className="txt" onClick={this.onSignInClick}>SignIn</p>
                    </Col>
                    <Col sm="1"></Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(Footer);