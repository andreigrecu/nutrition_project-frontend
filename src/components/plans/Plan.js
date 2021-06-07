import React, { Component } from 'react';
import Bulking from './plansImages/bulking.jpg';
import Easy from './plansImages/easy.png';
import Mentaining from './plansImages/mentaining.jpg';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class RenderSwitch extends Component {

  constrctor() {}

  renderSwitch = (param) => {
    switch(param) {
      case 'Bulking':
        return Bulking;
      case 'Easy':
        return Easy;
      default:
        return Mentaining;
    }
  }
}

class Plan extends Component {

  constructor(props) {
    super(props);
    this.state={};
  }

  handleClick = () => {
    this.props.setStateProgramChosen(this.props.id)
    this.props.handleShow(this.props.id)
  }

  renderSwitch = new RenderSwitch();

  render() {

    return(

      <Container className="p-0" fluid={true}>
        <Row noGutters>
          <Col sm="4"></Col>
          <Col sm="4">
            {
              this.props.active === false ?
                <div className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5' onClick={this.handleClick} >
                    <img alt='robots' height="200" width="200" src={this.renderSwitch.renderSwitch(this.props.imageName)} />
                    <h2>{this.props.name}</h2>
                    <p>{this.props.description}</p>
                </div>
                    : (
                      <div className='tc grow bg-light-red br3 pa3 ma2 dib bw2 shadow-5' onClick={this.handleClick} >
                        <img alt='robots' height="200" width="200" src={this.renderSwitch.renderSwitch(this.props.imageName)} />
                        <h2>{this.props.name}</h2>
                        <p>{this.props.description}</p>
                      </div>
                    )
              }
          </Col>
          <Col sm="4"></Col>
        </Row>
      </Container>
      )
  }
}

export default withRouter(Plan);
