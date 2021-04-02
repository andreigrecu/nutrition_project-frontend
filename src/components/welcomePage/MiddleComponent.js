import React, { Component } from 'react';
import Gym from './gym.jpeg';
import Barbell from './barbell.jpg';
import Poster from './poster.jpg';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './MiddleComponent.css';
import RegisterForm from '../register/RegisterForm';

class MiddleComponent extends Component {

    render() {
        return(
            <Container fluid={true} className="p-0">
                <Row noGutters>
                    <Col sm = "3" className="motto"></Col>
                    <Col sm = "6" className="motto">
                        <h1 style={{'textAlign': 'center'}}>The number one app for sport and nutrition</h1>
                    </Col>
                    <Col sm = "3" className="motto"></Col>
                </Row>
                <Row>
                    <Col sm="6">
                        <Carousel fade={false}>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={Gym}
                                height="600"
                                text="First slide"
                                alt="Gym"
                                />
                                <Carousel.Caption>
                                <h3>Be healthy</h3>
                                <p>Register for a free month of our full nutrition program.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={Barbell}
                                height="600"
                                text="Second slide"
                                alt="Barbell"
                                />

                                <Carousel.Caption>
                                <h3>Start your transformation now</h3>
                                <p>Start your physique and mental transformation with a little help from us.</p>
                                </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={Poster}
                                height="600"
                                text="Third slide"
                                alt="Poster"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col sm = "1"></Col>
                    <Col sm = "4" className="form-spacing">
                        <h1 className="form-spacing" style={{'color': 'black'}}>Sign Up</h1>
                        <RegisterForm loadUser={this.props.loadUser} onRouteChange={this.props.onRouteChange} />
                    </Col>
                    <Col sm = "1"></Col>
                </Row>
                <Row>
                    <Col sm="12" style={{'paddingBottom': '5%'}}></Col>
                </Row>
            </Container>
        );
    }
}

export default MiddleComponent;