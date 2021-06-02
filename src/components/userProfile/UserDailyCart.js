import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './UserDailyCart.css';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import FoodInfo from '../chooseFood/FoodInfo';

class UserDailyCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todayMealsModal: false,
            todayMeals: {},
            showFoodInfoModal: false,
            itemsDetails: {},

            nrCalories: 0,
            nrCarbohydrates: 0,
            nrFats: 0,
            nrProteins: 0,
            numberOfServings: 0,

            servingModal: false,
            mealType: '',
            indexDelete: ''
        }
    }

    mealsArray = ['breakfast', 'lunch', 'dinner', 'snacks'];

    openTodayMealsModal = () => {

        this.setState({ todayMealsModal: true, showFoodInfoModal: false   });
        fetch(`http://localhost:4400/users/${this.props.user.id}/todayMeals`, {
            method: 'get'
        })
        .then(response => response.json())
        .then(response => {
            if(response['meta'] && parseInt(response['meta']['statusCode']) !== 200)
                console.log("ERROR: " + response['meta']['message'] + "of status code " + response['meta']['statusCode']);
            else {
                this.setState({ todayMeals: response['data'] });
            }
        })

    }

    handleCloseTodayMealsModal = () => {
        this.setState({ todayMealsModal: false });
    }

    onMealClick = (meal, mealType, index) => {

        this.setState({ 
            itemsDetails: meal, 
            showFoodInfoModal: true, 
            numberOfServings: meal.chosen_serving_size, 
            mealType, 
            todayMealsModal: false,
            indexDelete: index
        });

        for(let i = 0; i < meal['nutrition']['nutrients'].length; i++) {
            let nutrient = meal['nutrition']['nutrients'][i];
            switch(nutrient['name']) {
                case 'Calories':
                    this.setState({ nrCalories: nutrient['amount'] });
                    break;
                case 'Carbohydrates':
                    this.setState({ nrCarbohydrates: nutrient['amount'] });
                    break;
                case 'Fat':
                    this.setState({ nrFats: nutrient['amount'] });
                    break;
                case 'Fats':
                    this.setState({ nrFats: nutrient['amount'] });
                    break;
                case 'Proteins':
                    this.setState({ nrProteins: nutrient['amount'] });
                    break;
                case 'Protein':
                    this.setState({ nrProteins: nutrient['amount'] });
                    break;
                default:
                    break;
            }
        }
    }

    handleCloseFoodInfoModal = () => {
        this.setState({ 
            showFoodInfoModal: false, 
            todayMealsModal: true 
        });
    }

    onSubstractNumberOfServings = () => {
        if(this.state.numberOfServings > 1)
            this.setState((state) => {
                return{ numberOfServings: state.numberOfServings - 1}
        });
    }

    onAddNumberOfServings = () => {
        this.setState((state) => {
            return { numberOfServings: state.numberOfServings + 1 }
        });
    }

    setNumberOfServings = (numberOfServings) => {
        this.setState({ numberOfServings: numberOfServings, servingModal: false });
    }

    showServingModal = () => {
        this.setState({ servingModal: true });
    }

    hideServingModal = () => {
        this.setState({ servingModal: false });
    }

    deleteFoodFromCart = () => {

        fetch(`http://localhost:4400/users/${this.props.user.id}/deleteFoodItem`, {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                foodId: this.state.itemsDetails['id'].toString(),
                mealType: this.state.mealType,
                nrOfServings: this.state.numberOfServings,
                indexDelete: this.state.indexDelete
            })
        })
        .then(response => response.json())
        .then(response => {
            if(parseInt(response['meta']['statusCode']) !== 200)
                console.log('ERROR: ' + response['meta']['message'] + ' of status code ' + response['statusCode']);
            else {
                this.openTodayMealsModal();
                this.props.getTodayNutrients();
                this.props.recalculateGraphics();
            }
        })
        .catch(error => console.log(error))
    }

    render() {

        const {
            todayMealsModal,
            todayMeals,
            showFoodInfoModal,
            itemsDetails,
            nrCalories,
            nrCarbohydrates,
            nrFats,
            nrProteins,
            numberOfServings,
            servingModal,
            mealType
        } = this.state;

        return (
            <Container fluid={true} className="p-0">
                <FoodInfo 
                    showFoodInfoModal={showFoodInfoModal} 
                    handleCloseFoodInfoModal={this.handleCloseFoodInfoModal}
                    itemsDetails={itemsDetails}
                    nrCalories={nrCalories}
                    nrCarbohydrates={nrCarbohydrates}
                    nrFats={nrFats}
                    nrProteins={nrProteins}
                    mealType={mealType}
                    user={this.props.user}
                    onSubstractNumberOfServings={this.onSubstractNumberOfServings}
                    onAddNumberOfServings={this.onAddNumberOfServings}
                    setNumberOfServings={this.setNumberOfServings}
                    showServingModal={this.showServingModal}
                    hideServingModal={this.hideServingModal}
                    numberOfServings={numberOfServings}
                    servingModal={servingModal}
                    buttonType={'delete'}
                    deleteFoodFromCart={this.deleteFoodFromCart}
                />
                <Modal show={todayMealsModal} onHide={this.handleCloseTodayMealsModal}>
                    <Modal.Header closeButton>
                        <h3>Your today meals</h3>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.mealsArray.map((mealType, index) => (
                                <div key={`index-${index}`}>
                                    <p className="paddingMealType">{mealType.toUpperCase()}</p>  
                                    <ListGroup>
                                        {
                                            todayMeals && todayMeals[mealType]  && (
                                                todayMeals[mealType].map((meal, index) => (
                                                    <ListGroup.Item
                                                        key={`index-${index}`}
                                                        onClick={() => this.onMealClick(meal, mealType, index)}
                                                        style={{'cursor': 'pointer'}}
                                                    >
                                                        <Container fluid={true} className="p-0">
                                                            <Row noGutters>
                                                                <Col sm="6">
                                                                    <h6>{ meal['name'] || meal['title'] }</h6>
                                                                </Col>
                                                                <Col sm="4"></Col>
                                                                <Col sm="2">
                                                                {
                                                                    meal['images'] && meal['images'][0] ?
                                                                        meal['title'] ?
                                                                            <img alt={meal['title']} src={meal['images'][0]} width="50" height="50" />
                                                                        :(
                                                                            <img alt={meal['name']} src={meal['images'][0]} width="50" height="50" />
                                                                        )
                                                                        :(
                                                                        meal['title'] ?
                                                                            <img alt={meal['title']} src="https://spoonacular.com/recipeImages/667707-312x231.jpg" width="50" height="50" />
                                                                            :(
                                                                                <img alt={meal['name']} src="https://spoonacular.com/recipeImages/667707-312x231.jpg" width="50" height="50" />
                                                                            )
                                                                        )
                                                                } 
                                                                </Col>                                                               
                                                            </Row>
                                                        </Container>
                                                    </ListGroup.Item>
                                                ))
                                            )
                                        }
                                    </ListGroup>   
                                </div>
                            ))
                        }            
                    </Modal.Body>
                </Modal>
                <Row noGutters>
                    <Col sm="12">
                        <div className="mealsContainer" onClick={this.openTodayMealsModal}>
                            <h1 className="mealsText">Your today meals</h1>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default UserDailyCart;