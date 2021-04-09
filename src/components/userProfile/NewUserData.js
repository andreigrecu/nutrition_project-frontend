import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class NewUserData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModalUserData: true,
            showModalUserGoals: false
        };
    }
    
    handleCloseUserDataModal = () => {
        this.setState({ showModalUserData: false });
        this.setState({ showModalUserGoals: true});
    }

    handleCloseUserGoalsModal =() => {
        this.setState({ showModalUserGoals: false });
    }

    render() {

        const { 
            showModalUserData,
            showModalUserGoals
         } = this.state;

        return (
            <div>
                <Modal show={showModalUserData} centered keyboard={true}> 
                    <Modal.Header>
                        <Modal.Title>Let`s get started!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label style={{'color': 'black', 'paddingBottom': '5%'}}>
                            Please complete this in order to start our journey.
                        </Form.Label>
                        <Form>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control size="sm" />
                            </Form.Group>
                            <Form.Group controlId="formLastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control size="sm" />
                            </Form.Group>
                            <Form.Group controlId="formAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control size="sm" />
                            </Form.Group>
                            <fieldset>
                                <Form.Group as={Row}>
                                <Form.Label as="gender" column sm={5}>
                                    Choose you gender
                                </Form.Label>
                                <Col sm={7}>
                                    <Form.Check
                                    type="radio"
                                    label="male"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                    />
                                    <Form.Check
                                    type="radio"
                                    label="female"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                                    />
                                </Col>
                                </Form.Group>
                            </fieldset>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleCloseUserDataModal}>
                                    Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showModalUserGoals} centered keyboard={true}> 
                    <Modal.Header>
                        <Modal.Title>A little more about you</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label style={{'color': 'black', 'paddingBottom': '5%'}}>
                           Let`s think about your goals!
                        </Form.Label>
                        <Form>
                            <Form.Group controlId="formCurrentWeight">
                                <Form.Label>What is your current weight?</Form.Label>
                                <Form.Control size="sm" />
                            </Form.Group>
                            <Form.Group controlId="formDesiredWeight">
                                <Form.Label>What is your desired weight?</Form.Label>
                                <Form.Control size="sm" />
                            </Form.Group>
                            <Form.Group controlId="formHeight">
                                <Form.Label>Please insert you height!</Form.Label>
                                <Form.Control size="sm" />
                            </Form.Group>
                            <Form.Group controlId="formTime">
                                <Form.Label>How fast do you wish you wish to achieve your goal? [days]</Form.Label>
                                <Form.Control size="sm" />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleCloseUserGoalsModal}>
                                    Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default NewUserData;