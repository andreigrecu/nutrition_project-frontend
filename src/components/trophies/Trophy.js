import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import GoldenTrophy from './goldenTrophy.jpg';
import SilverTrophy from './silverTrophy.jpg';
import BronzeTrophy from './bronzeTrophy.jpg';
import Modal from 'react-bootstrap/Modal';

class ImageRender extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    imageRender = (param) => {
        switch(param) {
            case 5:
                return BronzeTrophy;
            case 14:
                return SilverTrophy;
            case 30:
                return GoldenTrophy; 
            default: 
                return;
        }
    }
}

class Trophy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showNewTrophy: false,
            finished: false
        };
    }

    imageRender = new ImageRender();

    render() {

        let program;
        for(let i = 0; i < this.props.programs.length; i++) {
            if(this.props.programs[i]['_id'] === this.props.programId)
               program = this.props.programs[i];
        }

        return(

            <Container fluid={true} className="p-0">
                {
                    program && program['name'] && 
                        <Modal show={this.props.userTrophies['newTrophy']} onHide={this.props.hideNewTrophyModal} centered keyboard={true}> 
                            <Modal.Header closeButton style={{'textAlign': 'center'}}>
                                <h3 style={{'fontFamily': 'Garamond, serif'}}>You unlocked a new trophy. We are happy for you! </h3>
                            </Modal.Header>
                            <Modal.Body style={{'textAlign': 'center'}}>
                                <img alt='trofee' height="200" width="200" src={this.imageRender.imageRender(this.props.numOfDays)} />
                                <p>Congratulations on complying with your <b>{program['name']}</b> for {this.props.numOfDays} days!</p>
                            </Modal.Body>
                        </Modal>
                }
                <Row noGutters>
                    <Col sm="4"></Col>
                    <Col sm="4">
                        {
                            program && program['name'] &&
                                <div className='tc grow bg-light-yellow br3 pa3 ma2 dib bw2 shadow-2'>
                                    <img alt='trofee' height="200" width="200" src={this.imageRender.imageRender(this.props.numOfDays)} />
                                    <h2>{ program['name'] } trophy</h2>
                                    <p>Congratulations on complying with your <b>{program['name']}</b> program for {this.props.numOfDays} days!</p>
                                </div>
                        }
                    </Col>
                    <Col sm="4"></Col>
                </Row>
            </Container>
        )
    }
}

export default Trophy;