import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './SignedInNavigationBar.css';
import ProfilePicture from './profilePicture.png';
import Dropdown from 'react-bootstrap/Dropdown';

class SignedInNavigationBar extends Component {

    changeRouteToPlans = () => {
        this.props.history.push('/users/plans');
    }

    changeRouteToUserProfile = () => {
        this.props.history.push('/users');
    }

    onDisconnetClick = () => {
        this.props.history.push('/');
    }

    onChangePasswordClick = () => {
        this.props.history.push('/users/changePassword');
    }

    userInformations = () => {
        this.props.history.push('/users/informations');
    }

    profileDropdown = 
        <Dropdown>
            <Dropdown.Toggle variant="light" id="profileDropdown">
                <img 
                    src={ProfilePicture} 
                    alt="profile" 
                    width="25" 
                    height="25" 
                    className="profile"
                />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item>
                    <h6 onClick={this.userInformations}>User Informations</h6>
                </Dropdown.Item>
                <Dropdown.Item>
                    <h6 onClick={this.onChangePasswordClick}>Change password</h6>
                </Dropdown.Item>
                <Dropdown.Item>
                    <h6 onClick={this.onDisconnetClick}>Disconnect</h6>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

    render() {
        return(
            <Container fluid={true} className="p-0">
                <Row noGutters>
                    <Col sm="12">
                        <Navbar bg="dark" variant="dark">
                            <Col sm="9">
                                <Nav className="mr-auto">
                                    <Nav.Link onClick={this.changeRouteToPlans}>Plans</Nav.Link>
                                    <Nav.Link onClick={this.changeRouteToUserProfile}>Profile</Nav.Link>
                                </Nav>     
                            </Col>      
                            <Col sm="2">                   
                                <Nav className="justify-content-end">
                                    {this.profileDropdown}
                                </Nav>
                            </Col>
                            <Col sm="1"></Col>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(SignedInNavigationBar);