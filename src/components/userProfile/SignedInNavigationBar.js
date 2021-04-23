import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class SignedInNavigationBar extends Component {

    changeRouteToPlans = () => {
        this.props.history.push('/users/plans');
    }

    changeRouteToUserProfile = () => {
        this.props.history.push('/users');
    }

    render() {
        return(
            <Container fluid={true} className="p-0">
                <Row noGutters>
                    <Col sm="12">
                        <Navbar bg="dark" variant="dark">
                            <Nav className="mr-auto">
                                <Nav.Link onClick={this.changeRouteToPlans}>Plans</Nav.Link>
                                <Nav.Link onClick={this.changeRouteToUserProfile}>Profile</Nav.Link>
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

export default withRouter(SignedInNavigationBar);