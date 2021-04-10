import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { withRouter } from 'react-router-dom';

class NavigationBar extends Component {

    changeRouteToSignIn = () => {
        this.props.history.push('/signin');
    }

    changeRouteToAboutUs = () => {
        this.props.history.push('/about');
    }

    changeRouteToHome = () => {
        this.props.history.push('/');
    }

    render() {
        return(
            <Container fluid={true} className="p-0">
                <Row noGutters>
                    <Col sm="12">
                        <Navbar bg="dark" variant="dark">
                            <Nav className="mr-auto">
                                <Nav.Link onClick={this.changeRouteToHome}>Home</Nav.Link>
                                <Nav.Link onClick={this.changeRouteToSignIn}>Sign In</Nav.Link>
                                <Nav.Link onClick={this.changeRouteToAboutUs}>About Us</Nav.Link>
                            </Nav>
                            <Nav className="ml-auto">
                                <Nav.Link>Logo</Nav.Link>
                            </Nav>
                        </Navbar>
                    </Col>
                </Row>
            </Container>            
        )
    }
}

export default withRouter(NavigationBar);