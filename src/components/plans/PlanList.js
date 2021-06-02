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
import Footer from '../footer/Footer';

class PlanList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            planList : [],
            showPlanDetails: false,
            programChosen: '',
            proteinPercent: '',
            fatsPercent: '',
            carbosPercent: '',
            wrongPercents: false,
            activeProgram: false,
            modifiedNutrients: false,
            programName: ''
        };
    }

    getUsedProgramName = () => {
        fetch(`http://localhost:4400/users/${this.props.user.id}/userInfo`, {
            method: 'get'
        })
            .then(response => response.json())
            .then(response => {
                if(response['statusCode'] && parseInt(response['statusCode']) !== 200)
                    console.log("ERROR: " + response['message'] + "of status code " + response['statusCode']);
                else if(response['data']['programId'])
                    this.setState({ programName: response['data']['program']['name'] });
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        if(!this.props.user.id)
            this.props.history.push('/signin');
        else {

           this.getUsedProgramName();

            fetch('http://localhost:4400/programs', {
                    method: 'get'
            })
                .then(response => response.json())
                .then(response => {
                    this.setState({ planList: response }); 
                })
                .catch(error => console.log(error));
        }
    }

    handleHide = () => {
        this.setState({ showPlanDetails: false });
        this.setState({ modifiedNutrients: false });
    }

    handleShow = (userProgramId) => {
        this.setState({ showPlanDetails: true })
        fetch(`http://localhost:4400/users/${this.props.user.id}/userInfo`, {
            method: 'get'
        })
            .then(response => response.json())
            .then(response => {
                if(response['data'] && (response['data']['programId'] === userProgramId)) {
                    this.setState({ activeProgram: true });
                    this.setState({ proteinPercent: response['data']['proteinsPercent'] });
                    this.setState({ fatsPercent: response['data']['fatsPercent'] });
                    this.setState({ carbosPercent: response['data']['carbohydratesPercent'] });
                } else {
                    //aici ar trb sa iau de la fiecare program in parte numarul de nutrienti
                    //pentru ca nu toate programele o sa aibe 50,20,30
                    this.setState({ activeProgram: false });
                    this.setState({ proteinPercent: nutritionalValue.PROTEINS });
                    this.setState({ fatsPercent: nutritionalValue.FATS });
                    this.setState({ carbosPercent: nutritionalValue.CARBOHYDRATES });
                }
            })
            .catch(error => console.log(error))

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

    checkSumAndActivate = () => {
        if(this.state.proteinPercent + this.state.fatsPercent + this.state.carbosPercent !== 100)
            this.setState({ wrongPercents: true })
        else {
            this.setState({ wrongPercents: false });
            fetch(`http://localhost:4400/usersInfo`, {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    userId: this.props.user.id,
                    programId: this.state.programChosen,
                    carbohydratesPercent: parseInt(this.state.carbosPercent),
                    fatsPercent: parseInt(this.state.fatsPercent),
                    proteinsPercent: parseInt(this.state.proteinPercent)
                })
            })
                .then(response => response.json())
                .then(response => {
                    if(response && response['statusCode'] && parseInt(response['statusCode']) !== 200)
                        console.log("ERROR statusCode " + response['statusCode'] + "; errorMessage: " + response['message']);
                    else {
                        this.getUsedProgramName();
                    }
                })
                .catch(error => console.log(error))
            this.handleHide();
        }
    }

    modifyNutrients = () => {

        this.setState({ modifiedNutrients: false });
        if(this.state.proteinPercent + this.state.fatsPercent + this.state.carbosPercent !== 100) {
            this.setState({ modifiedNutrients: false });
            this.setState({ wrongPercents: true });
        } else {
            this.setState({ wrongPercents: false });
            fetch(`http://localhost:4400/usersInfo`, {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    userId: this.props.user.id,
                    carbohydratesPercent: parseInt(this.state.carbosPercent),
                    fatsPercent: parseInt(this.state.fatsPercent),
                    proteinsPercent: parseInt(this.state.proteinPercent)
                })
            })
                .then(response => response.json())
                .then(response => {
                    this.setState({ modifiedNutrients: true });
                    if(response && response['statusCode'] && parseInt(response['statusCode']) !== 200) 
                        console.log("ERROR statusCode " + response['statusCode'] + "; errorMessage: " + response['message']);              
                })
                .catch(error => console.log(error))
        }
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
        if(this.state.proteinPercent < 35)
            this.setState({ proteinPercent: this.state.proteinPercent + 1});
    }

    onSubstractProteins = () => {
        if(this.state.proteinPercent > 10)
            this.setState({ proteinPercent: this.state.proteinPercent - 1});
    }

    disableProgram = () => {
        fetch(`http://localhost:4400/usersInfo`, {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                userId: this.props.user.id,
                programId: " ",
                carbohydratesPercent: -1,
                fatsPercent: -1,
                proteinsPercent: -1
            })
        })
            .then(response => response.json())
            .then(response => {
                if(response && response['statusCode'] && parseInt(response['statusCode']) !== 200) 
                    console.log("ERROR statusCode " + response['statusCode'] + "; errorMessage: " + response['message']); 
                else 
                    this.setState({ programName: ' ' });
            })
        .catch(error => console.log(error))
        this.handleHide();
        this.setState({ activeProgram: false });
    }

    render() {
        
        const { 
            planList,
            programChosen,
            proteinPercent,
            fatsPercent,
            carbosPercent,
            wrongPercents,
            activeProgram,
            modifiedNutrients,
            programName
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
                                <Container fluid={true} className="p-0">
                                    <Row noGutters>
                                        <Col sm="6">
                                            <h3>{(this.getProgramDetails(planList, programChosen)).name}</h3>
                                        </Col>
                                        <Col sm="6"></Col>
                                    </Row>
                                    <Row>
                                        <Col sm="2" style={{'paddingTop': '3%'}}>
                                            {   
                                                activeProgram === true ?
                                                <h6 style={{'color': 'blue'}}>active</h6>
                                                : (<div></div>)
                                            }
                                        </Col>
                                    </Row>
                                </Container>
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
                                        <Col sm="7"></Col>
                                        <Col sm="5" className="modifyNutrientsBtn">
                                            {
                                                activeProgram === true ? 
                                                    <Button variant="outline-dark" size="sm" onClick={this.modifyNutrients}>Modify your nutrients</Button>                                                    
                                                :(<div></div>)
                                            }
                                            {
                                                modifiedNutrients === true ?
                                                    <h6 style={{'color': 'blue', 'paddingTop': '3%'}}>Modified!</h6>
                                                :(<div></div>)
                                            }
                                        </Col>                                                 
                                        {
                                            wrongPercents === true ? <h6 style={{'color': 'red'}}>The proteins, carbohydrates and fats must add to 100!</h6>
                                            : (<div></div>)
                                        }
                                    </Row>
                                </Container>
                            </Modal.Body>
                            <Modal.Footer>
                                    <Container fluid={true} className="p-0">
                                        <Row noGutters>
                                            <Col sm="2" className="btn">
                                                <Button variant="outline-dark" size="sm" onClick={this.checkSumAndActivate}>
                                                    {
                                                        activeProgram === true ?
                                                            'Reactivate'
                                                        :(
                                                            'Activate'
                                                        )
                                                    }
                                                </Button>
                                            </Col>
                                            <Col sm="2" className="btn">
                                                <Button variant="outline-dark" size="sm" onClick={this.handleHide}>
                                                    Close
                                                </Button>
                                            </Col>
                                            <Col sm="5"></Col>
                                            <Col sm="3">
                                                {
                                                    activeProgram === true ?
                                                        <Button variant="outline-dark" size="sm" onClick={this.disableProgram}>
                                                            Disable program
                                                        </Button> 
                                                    : (
                                                        <div></div>
                                                    )
                                                }
                                            </Col>
                                        </Row>
                                    </Container>                       
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
                                        planList[i].name === programName ?
                                            <Plan 
                                                key={i}
                                                id={planList[i]._id}
                                                name={planList[i].name}
                                                description={planList[i].description}
                                                imageName={planList[i].imageName}
                                                handleShow={this.handleShow}     
                                                setStateProgramChosen={this.setStateProgramChosen}  
                                                active={true}                                          
                                            /> 
                                            : (
                                                <Plan 
                                                    key={i}
                                                    id={planList[i]._id}
                                                    name={planList[i].name}
                                                    description={planList[i].description}
                                                    imageName={planList[i].imageName}
                                                    handleShow={this.handleShow}     
                                                    setStateProgramChosen={this.setStateProgramChosen}  
                                                    active={false}                                          
                                                /> 
                                            )
                                    )
                                })
                            } 
                        </div>
                    )
                }
                <div style={{'paddingTop': '18%'}}>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default PlanList;