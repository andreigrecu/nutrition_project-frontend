import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class ServingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nrServings: 1
        }
    }

    setServings = (event) => {
        this.setState({ nrServings: event.target.value });
        if(this.props.comingFrom && this.props.comingFrom === "delete")
            this.props.stopAlertingServings();

        if(this.props.from && this.props.from === "add")
            this.props.stopAlertingTheNumberOfServingsFormat();
    }

    render() {
        return(
            <Modal show={this.props.servingModal} onHide={this.props.hideServingModal} centered keyboard={true}> 
                <Modal.Header>
                    <h4>How Much?</h4>
                </Modal.Header>
                <Modal.Body>
                    <Container fluid={true} className="p-0">
                        <Row noGutters>
                            <Col sm="1"></Col>
                            <Col sm="4">
                                <Form.Control size="sm" type="text" onChange={this.setServings} />
                            </Col>
                            <Col sm="1"></Col>
                            <Col sm="3">
                                <h6>Serving(s) of this product</h6>
                            </Col>
                            <Col sm="3"></Col>
                        </Row>
                        <Row noGutters style={{'paddingTop': '2%'}}>
                            <Col sm="1"></Col>
                            <Col sm="2">
                            </Col>
                        </Row>
                        {
                            this.props.alertWrongServingsNumberFormat === true &&
                                <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>You introduced a wrong value! Please try again.</h6>
                        }
                        {
                            this.props.alertNumberOfServingsFormat === true &&
                                <h6 style={{'color': 'red', 'fontSize': 'x-small'}}>You introduced a wrong value! Please try again.</h6>
                        }
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Container fluid={true} className="p-0">
                        <Row noGutters>
                            <Col sm="7"></Col>
                            <Col sm="2">
                                <Button 
                                    variant="primary" 
                                    onClick={this.props.hideServingModal}>
                                Cancel
                                </Button>
                            </Col>
                            <Col sm="1"></Col>
                            <Col sm="2">
                                <Button 
                                    variant="primary" 
                                    onClick={() => this.props.setNumberOfServings(this.state.nrServings)}>
                                Save
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ServingModal;