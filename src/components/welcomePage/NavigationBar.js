import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class NavigationBar extends Component {
    render() {
        return(
            <Container fluid={true} className="p-0">
                <Row noGutters>
                    <Col sm="12">
                        <Navbar bg="dark" variant="dark">
                            <Nav className="mr-auto">
                                <Nav.Link>Home</Nav.Link>
                                <Nav.Link>Sign In</Nav.Link>
                                <Nav.Link>About Us</Nav.Link>
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

export default NavigationBar;