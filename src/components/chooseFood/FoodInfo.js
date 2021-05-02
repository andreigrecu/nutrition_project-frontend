import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button'
import { PieChart, Pie, Cell } from 'recharts';
import './FoodInfo.css';

const data = [
    { name: 'Nothing', value: 1 },
];
  
const COLORS = ['#0088FE', '#FF0000', '#00b300'];
const BLACK = ['#000000'];
  
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

class FoodInfo extends Component {
    constructor(props) {
        super(props)
        this.state={
            numberOfServings: 1
        };
    }

    onSubstractNumberOfServings = () => {
        if(this.state.numberOfServings > 1)
            this.setState({ numberOfServings: this.state.numberOfServings - 1});
    }

    onAddNumberOfServings = () => {
        this.setState({ numberOfServings:  this.state.numberOfServings + 1 });
    }

    render() {

        const {
            numberOfServings
        } = this.state;

        const dataChart = [
            { name: 'Carbohydrates', value: this.props.nrCarbohydrates },
            { name: 'Fats', value: this.props.nrFats },
            { name: 'Proteins', value: this.props.nrProteins }
        ];

        return(
            <Modal show={this.props.showFoodInfoModal} onHide={this.props.handleCloseFoodInfoModal} centered keyboard={true}> 
                <Modal.Header closeButton>
                    <h2>{this.props.itemsDetails.title}</h2>
                </Modal.Header>
                <Modal.Body>
                    <p>{this.props.itemsDetails.description}</p>
                    {
                        this.props.itemsDetails.ingredientList ?
                            <div>
                                <p style={{'fontWeight': 'bold'}}>Ingredients: </p>
                                <p>{this.props.itemsDetails.ingredientList}</p>
                            </div>
                        :(<div></div>)
                    }
                    <p style={{'fontWeight': 'bold'}}>Badges: </p>
                    {   
                        this.props.itemsDetails.badges ?
                            <ul>
                            {
                                this.props.itemsDetails.badges.map((badge, index) => (
                                    <li key={`badge-${index}`}>{badge}</li>
                                ))
                            }
                            </ul>
                        :(<div></div>)
                    }
                    <hr></hr>
                    {
                        <Container fluid={true} className="p-0">
                            <Row noGutters>
                                <Col sm="12">
                                    <h6>Number of Servings:
                                    <span style={{'float': 'right'}}>
                                        <ButtonGroup size="sm" aria-label="noServings">
                                            <Button variant="secondary" className="mr-2" onClick={this.onSubstractNumberOfServings}>-</Button>
                                            <Button variant="secondary" className="mr-2" style={{'pointerEvents': 'none'}}>{numberOfServings}</Button>
                                            <Button variant="secondary" className="mr-2" onClick={this.onAddNumberOfServings}>+</Button>
                                        </ButtonGroup>
                                    </span></h6>
                                </Col>
                            </Row>
                        </Container>
                    }
                    <hr></hr>
                    {
                        <Container fluid={true} className="p-0">
                            <Row noGutters>
                                <Col sm="6">
                                    <h6>Serving Size:</h6>
                                </Col>
                                <Col sm="4"></Col>
                                <Col sm="2">
                                    {
                                        this.props.itemsDetails.serving_size ?
                                            <div>{this.props.itemsDetails.serving_size}</div>
                                        :(<div>100 g</div>)
                                    }
                                </Col>
                            </Row>
                        </Container>
                    }
                    <br></br>
                    {
                        <Container fluid={true} className="p-0">
                            <Row noGutters>
                                <Col sm="4">
                                    {
                                        this.props.nrCarbohydrates || this.props.nrFats || this.props.nrProteins ?                                         
                                            <PieChart width={150} height={150}>
                                                <Pie
                                                    data={dataChart}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={renderCustomizedLabel}
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {dataChart.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        :(
                                            <div>
                                                <PieChart width={150} height={150}>
                                                    <Pie
                                                        data={data}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        label={renderCustomizedLabel}
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                    >
                                                        {data.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={BLACK} />
                                                        ))}
                                                    </Pie>
                                                </PieChart>
                                                <div>Everything is 0</div>
                                            </div>
                                        )
                                    }
                                </Col>
                                <Col sm="2"></Col>
                                <Col sm="5">
                                    {
                                        <div className="footer-links">
                                            <div className='box white'></div>
                                            <h6>Calories</h6>
                                            <h6 style={{'float': 'right'}}> { this.props.nrCalories } g</h6>
                                        </div>
                                    }
                                    <div className="footer-links">
                                        <div className='box blue'></div>
                                        <h6>Carbohydrates</h6>
                                        <h6 style={{'float': 'right'}}> { this.props.nrCarbohydrates } g</h6>
                                    </div>
                                    <div className="footer-links">
                                        <div className='box red'></div>
                                        <h6>Fats</h6>
                                        <h6 style={{'float': 'right'}}> { this.props.nrFats } g</h6>
                                    </div>
                                    <div className="footer-links">
                                        <div className='box green'></div>
                                        <h6>Proteins</h6>
                                        <h6 style={{'float': 'right'}}> { this.props.nrProteins } g</h6>
                                    </div>
                                </Col>
                                <Col sm="1"></Col>
                            </Row>
                        </Container>
                    }
                    <hr></hr>
                    {
                        <div>
                            <h6 style={{'paddingBottom': '3%'}}>Other nutrients:</h6>
                            {
                                this.props.itemsDetails && 
                                this.props.itemsDetails.nutrition && 
                                this.props.itemsDetails.nutrition.nutrients ?
                                    <ul> 
                                        {   
                                            this.props.itemsDetails.nutrition.nutrients.map((nutrient, index) => (
                                                nutrient['name'] !== 'Calories' &&
                                                    nutrient['name'] !== 'Carbohydrates' &&
                                                    nutrient['name'] !== 'Fat' &&
                                                    nutrient['name'] !== 'Proteins' &&
                                                    nutrient['name'] !== 'Protein' ?
                                                    <li key={`${index} + ${nutrient}`}>{nutrient['name']}: {nutrient['amount']} {nutrient['unit']}</li>
                                                    :(<div key={index}></div>)
                                            ))
                                        }   
                                    </ul>
                                :(<div></div>)
                            }
                        </div>
                    }
                    <Container fluid={true} className="p-0">
                        <Row noGutters>
                            <Col sm="8"></Col>
                            <Col sm="4">
                                <Button 
                                    variant="primary" 
                                    onClick={() => {
                                        console.log(this.props.itemsDetails)
                                        console.log(this.props.mealType)
                                    }}>
                                        Add To Your Cart
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
}

export default FoodInfo;