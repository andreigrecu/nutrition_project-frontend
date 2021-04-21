import React, { Component } from 'react';
import Plan from './Plan';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SignedInNavigationBar from '../userProfile/SignedInNavigationBar';
import Modal from 'react-bootstrap/Modal';
import './PlanList.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import nutritionalValue from '../../common/nutritionConstants';

class PlanList extends Component {

    constructor() {
        super();
        this.state = {
            planList : [],
            showPlanDetails: false,
            programChosen: '',
            proteinPercent: nutritionalValue.PROTEINS,
            fatsPercent: nutritionalValue.FATS,
            carbosPercent: nutritionalValue.CARBOHYDRATES,
            wrongPercents: false
        };
    }

    componentDidMount() {
        fetch('http://localhost:4400/programs', {
                method: 'get'
            })
            .then(response => response.json())
            .then(response => this.setState({ planList: response }));
    }

    handleHide = () => {
        this.setState({ showPlanDetails: false })
    }

    handleShow = () => {
        this.setState({ showPlanDetails: true })
    }

    setStateProgramChosen = (id) => {
        this.setState({ programChosen: id });
    }

    getProgramDetails = (planList, id) => {
        if(planList) {
            for(let i = 0; i < planList.length; i++)
                if(planList[i]._id === id)
                    return planList[i];
        }

        return -1;
    }

    checkPercentsToAdd = () => {
        if(this.state.proteinPercent + this.state.fatsPercent + this.state.carbosPercent !== 100)
            this.setState({ wrongPercents: true })
        else
            this.setState({ wrongPercents: false });
    }
    
    onAddCarbos = () => {
        if(this.state.carbosPercent < 65)
            this.setState({ carbosPercent: this.state.carbosPercent + 1 });
    }

    onSubstractCarbos = () => {
        if(this.state.carbosPercent > 45)
            this.setState({ carbosPercent: this.state.carbosPercent - 1});
    }

    onAddFats = () => {
        if(this.state.fatsPercent < 35)
            this.setState({ fatsPercent: this.state.fatsPercent + 1 });
    }

    onSubstractFats = () => {
        if(this.state.fatsPercent > 20)
            this.setState({ fatsPercent: this.state.fatsPercent - 1});
    }

    onAddProteins = () => {
        if(this.state.proteinsPercent < 35)
            this.setState({ proteinPercent: this.state.proteinPercent + 1});
    }

    onSubstractProteins = () => {
        if(this.state.proteinPercent > 10)
            this.setState({ proteinPercent: this.state.proteinPercent - 1});
    }

    render() {
        
        const { 
            planList,
            programChosen,
            proteinPercent,
            fatsPercent,
            carbosPercent,
            wrongPercents
        } = this.state;

        return (
            <div>
                <Container fluid={true} className="p-0">
                    <Row noGutters>
                        <SignedInNavigationBar />
                    </Row>
                    <Row noGutters>
                        <Col sm="3"></Col>
                        <Col sm="6">
                            <h1 style={{'textAlign': 'center'}}>
                                These are our programs, 
                                specially designed for you. 
                                Choose the one that suits you the best!
                            </h1>
                        </Col>
                        <Col sm="3"></Col>
                    </Row>
                    <Row noGutters>
                        <Modal show={this.state.showPlanDetails} onHide={this.handleHide} centered keyboard={true}> 
                            <Modal.Header closeButton>
                                <h3>{(this.getProgramDetails(planList, programChosen)).name}</h3>
                            </Modal.Header>
                            <Modal.Body>
                                <Container fluid={true} className="p-0">
                                    <Row noGutters>
                                        <Col sm="12">
                                            <h6 style={{'paddingBottom': '5%'}}>{(this.getProgramDetails(planList, programChosen)).description}</h6>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col sm="12">
                                            <div><div className='box blue'></div>Carbohydrates
                                            <span style={{'float': 'right'}}>
                                                <ButtonGroup size="sm" aria-label="Carbohydrates group">
                                                <Button variant="secondary" className="mr-2" onClick={this.onSubstractCarbos}>-</Button>
                                                <Button variant="secondary" className="mr-2" style={{'pointerEvents': 'none'}}>{carbosPercent}%</Button>
                                                <Button variant="secondary" className="mr-2" onClick={this.onAddCarbos}>+</Button>
                                                </ButtonGroup>
                                            </span></div>
                                            <br></br>
                                            <div><div className='box red'></div>Fat
                                            <span style={{'float': 'right'}}>
                                                <ButtonGroup size="sm" aria-label="Fats group">
                                                <Button variant="secondary" className="mr-2" onClick={this.onSubstractFats}>-</Button>
                                                <Button variant="secondary" className="mr-2" style={{'pointerEvents': 'none'}}>{fatsPercent}%</Button>
                                                <Button variant="secondary" className="mr-2" onClick={this.onAddFats}>+</Button>
                                                </ButtonGroup>
                                            </span></div>
                                            <br></br>
                                            <div><div className='box green'></div>Protein
                                            <span style={{'float': 'right'}}>
                                                <ButtonGroup size="sm" aria-label="Proteins group">
                                                <Button variant="secondary" className="mr-2" onClick={this.onSubstractProteins}>-</Button>
                                                <Button variant="secondary" className="mr-2" style={{'pointerEvents': 'none'}}>{proteinPercent}%</Button>
                                                <Button variant="secondary" className="mr-2" onClick={this.onAddProteins}>+</Button>
                                                </ButtonGroup>
                                            </span></div>
                                        </Col>                                       
                                    </Row>
                                    <Row>
                                        <Col sm="10"></Col>
                                        <Col sm="2" style={{'textAlign': 'center', 'paddingTop': '3%'}}>
                                            <Button variant="outline-dark" size="sm" onClick={this.checkPercentsToAdd}>Save</Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {
                                            wrongPercents === true ? <h6 style={{'color': 'red'}}>The proteins, carbohydrates and fats must add to 100!</h6>
                                            : (<div></div>)
                                        }
                                    </Row>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                                <p>o sa apara doar un buton - daca e activat il pot dezactiva (buton dezactivare), altfel buton de activare</p>
                                <p>il activeaza pe asta, dar daca mai e altceva activ o sa se dezactiveze cand asta se activeaza (pun si un warrning)</p>
                                <p>button de cancel working plan</p>
                                <p>button de create new plan</p>
                            </Modal.Footer>
                        </Modal>
                    </Row>
                </Container>
                
                {
                    planList.length === 0 ?
                    <h1>Loading</h1> :
                    (
                        <div>
                            {    
                                planList.map((value, i) => {
                                    return(
                                        <Plan 
                                            key={i}
                                            id={planList[i]._id}
                                            name={planList[i].name}
                                            description={planList[i].description}
                                            imageName={planList[i].imageName}
                                            handleShow={this.handleShow}     
                                            setStateProgramChosen={this.setStateProgramChosen}                                              
                                        />
                                    )
                                })
                            } 
                        </div>
                    )
                }
            </div>
        )
    }
}

export default PlanList;