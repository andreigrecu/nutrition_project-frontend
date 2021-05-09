import React, { Component } from 'react';
import './SearchFood.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import SignedInNavigationBar from '../userProfile/SignedInNavigationBar';
import MealTypeBand from './MealTypeBand';
import QueryType from './QueryType';
import spoonacularQueries from '../../common/spoonacularQueries';
import SearchFoodPagination from './SearchFoodPagination';
import ls from 'local-storage';
import FoodInfo from './FoodInfo';

class SearchFood extends Component {

    constructor(props) {
        super(props);
        this.state = {

            //input from search bar
            searchedItem: '',

            //items found after search was clicked
            autocompletedItems: [],
            itemChosen: '',

            //the query to be done
            //it is set on All/Ingredients/Menu Items/
            //or Grocery Products click
            clickedQuery: 'All',

            //items that come from spoonacular have title/name
            //here I have the title/name state in order to have
            //the food title/name
            itemName: '',

            //the item chosen from autocompletedItems[]
            //details
            itemsDetails: '',


            itemClicked: false,
            showFoodInfoModal: false,

            nrCalories: 0,
            nrCarbohydrates: 0,
            nrFats: 0,
            nrProteins: 0,

            showHistory: true,
            nothingFound: true,
            history: [],
            historyData: false,
            historyClickedItem: '',

            numberOfServings: 1,
            servingModal: false
        };
        ls.set('offset', 0);
        ls.set('active', 1);
    }

    setOffset = (offset) => {
        ls.set('offset', offset);
        this.onSubmitSearchItem();
    }

    onChoiceButtonClick = () => {
        this.setState({ autocompletedItems: [], nothingFound: false, showHistory: true });
    }

    onSearchChange = (event) => {
        this.setState({ searchedItem: event.target.value });
    }

    extractBaseNutrients = (details) => {

        if(details && details.nutrition && details.nutrition.nutrients) {
            for(let nutrient = 0; nutrient < details.nutrition.nutrients.length; nutrient++) {
                switch(details.nutrition.nutrients[nutrient]['name']) {
                    case 'Calories':
                        this.setState((state) => {
                             return { nrCalories: state.nrCalories + details.nutrition.nutrients[nutrient]['amount'] }
                        });
                        break;
                    case 'Carbohydrates':
                        this.setState((state) => {
                            return { nrCarbohydrates: state.nrCarbohydrates + details.nutrition.nutrients[nutrient]['amount'] }
                        });
                        break;
                    case 'Fat':
                        this.setState((state) => {
                            return { nrFats: state.nrFats + details.nutrition.nutrients[nutrient]['amount'] }
                        });
                        break;
                    case 'Proteins':
                        this.setState((state) => { 
                            return { nrProteins: state.nrProteins + details.nutrition.nutrients[nutrient]['amount'] }
                        });
                        break;
                    case 'Protein':
                        this.setState((state) => {
                            return { nrProteins: this.state.nrProteins + details.nutrition.nutrients[nutrient]['amount'] }
                        });
                        break;
                    default:
                        break;
                }
            }
        }
    }

    getChosenItemData = (id, type) => {

        this.setState({ itemsDetails: '', itemClicked: true, historyData: false });
        switch(this.state.clickedQuery) {
            case 'All':
                {
                    switch(type) {
                        case 'Ingredients':
                            {
                                fetch(`https://api.spoonacular.com/food/ingredients/${id}/information?amount=1&${spoonacularQueries.apiKey}`, {
                                    method: 'get'
                                })
                                    .then(response => response.json())
                                    .then(response => {
                                        this.extractBaseNutrients(response);
                                        this.setState({ itemsDetails: response, itemName: 'name', showFoodInfoModal: true });
                                    })
                                    .catch(error => console.log(error))
                                break;
                            }
                        case 'Grocery Products':
                            {
                                fetch(`https://api.spoonacular.com/food/products/${id}?${spoonacularQueries.apiKey}`, {
                                    method: 'get'
                                })
                                    .then(response =>  response.json())
                                    .then(response => {
                                        this.extractBaseNutrients(response); 
                                        this.setState({ itemsDetails: response, itemName: 'title', showFoodInfoModal: true });
                                    })
                                    .catch(error => console.log(error))
                                break;
                            }
                        case 'Menu Items':
                            {
                                fetch(`https://api.spoonacular.com/food/menuItems/${id}?${spoonacularQueries.apiKey}`,{
                                    method: 'get'
                                })
                                    .then(response => response.json())
                                    .then(response => {
                                        this.extractBaseNutrients(response); 
                                        this.setState({ itemsDetails: response, itemName: 'title', showFoodInfoModal: true });
                                    })
                                    .catch(error => console.log(error))
                                break;
                            }
                        default :
                            console.log("ENTERED DEFAULT CASE IN ALL case");
                    }
                    break;
                }
            case 'Ingredients':
                {
                    fetch(`https://api.spoonacular.com/food/ingredients/${id}/information?amount=1&${spoonacularQueries.apiKey}`, {
                        method: 'get'
                    })
                        .then(response => response.json())
                        .then(response => {
                            this.extractBaseNutrients(response); 
                            this.setState({ itemsDetails: response, itemName: 'name', showFoodInfoModal: true });
                        })
                        .catch(error => console.log(error))
                    break;
                }
            case 'Grocery Products':
                {
                    fetch(`https://api.spoonacular.com/food/products/${id}?${spoonacularQueries.apiKey}`, {
                        method: 'get'
                    })
                        .then(response =>  response.json())
                        .then(response => {
                            this.extractBaseNutrients(response); 
                            this.setState({ itemsDetails: response, itemName: 'title', showFoodInfoModal: true });
                        })
                        .catch(error => console.log(error))
                    break;
                }
            case 'Menu Items':
                {
                    fetch(`https://api.spoonacular.com/food/menuItems/${id}?${spoonacularQueries.apiKey}`,{
                        method: 'get'
                    })
                        .then(response => response.json())
                        .then(response => {
                            this.extractBaseNutrients(response); 
                            this.setState({ itemsDetails: response, itemName: 'title', showFoodInfoModal: true })
                        })
                        .catch(error => console.log(error))
                    break;
                }
            default:
                {
                    console.log("ENTERED DEFAULT ON GETTING MORE DATA FROM A PRODUCT");
                }
        }
    }

    onSubmitSearchItem = () => {

        this.setState({ autocompletedItems: [], itemChosen: '', itemClicked: false, nothingFound: false, showHistory: false });
        let url;
        switch(this.state.clickedQuery) {
            case 'All':
                url=spoonacularQueries.ALL;
                break;
            case 'Ingredients':
                url=spoonacularQueries.INGREDIENTS;
                break;
            case 'Grocery Products':
                url=spoonacularQueries.GROCERIES;
                break;
            case 'Menu Items':
                url=spoonacularQueries.MENU_ITEMS;
                break;
            default: 
                url=spoonacularQueries.OTHER;
        }


        let number=1;
        let offset=ls.get('offset');
        let autocompleted = [];

        switch(this.state.clickedQuery) {
            case 'All':
                {
                    fetch(`${url}${this.state.searchedItem}&number=${3}&offset=${offset}&${spoonacularQueries.apiKey}`, {
                        method: 'get'
                    })
                        .then(response => response.json())
                        .then(response => {

                            if(response && response['searchResults']) {
                                for(let item = 0; item < response['searchResults'][1]['results'].length; item++) {
                                    if(response['searchResults'][1]['results'][item]['id']) {  
                                        Object.assign(response['searchResults'][1]['results'][item], {type: 'Grocery Products'});                        
                                        autocompleted.push(response['searchResults'][1]['results'][item]);
                                    }
                                }
                                
                                for(let item = 0; item < response['searchResults'][2]['results'].length; item++) {  
                                    if(response['searchResults'][2]['results'][item]['id']) { 
                                        Object.assign(response['searchResults'][2]['results'][item], {type: 'Menu Items'});     
                                        autocompleted.push(response['searchResults'][2]['results'][item]); 
                                    }                          
                                }

                                for(let item = 0; item < response['searchResults'][5]['results'].length; item++) {
                                    if(response['searchResults'][5]['results'][item]['id']) {
                                        Object.assign(response['searchResults'][5]['results'][item], {type: 'Ingredients'});
                                        autocompleted.push(response['searchResults'][5]['results'][item]);
                                    }
                                }
                            }

                            this.setState({ autocompletedItems: autocompleted, itemName: 'name', showHistory: false });
                            if(autocompleted.length === 0)
                                this.setState({ nothingFound: true });
                        })
                        .catch(error => console.log(error))
                    break;
                }
            case 'Ingredients':
                {
                    fetch(`${url}${this.state.searchedItem}&number=${number}&offset=${offset}&${spoonacularQueries.apiKey}`, {
                        method: 'get'
                    })
                        .then(response => response.json())
                        .then(response => {
                            this.setState({ autocompletedItems: response['results'], itemName: 'name', showHistory: false });
                            if(response['results'].length === 0)
                                this.setState({ nothingFound: true });
                        })
                        .catch(error => console.log(error))
                    break;
                }
            case 'Grocery Products':
                {
                    fetch(`${url}${this.state.searchedItem}&number=${number}&offset=${offset}&${spoonacularQueries.apiKey}`, {
                        method: 'get'
                    })
                        .then(response => response.json())
                        .then(response => {
                            this.setState({ autocompletedItems: response['products'], itemName: 'title', showHistory: false });
                            if(response['products'].length === 0)
                                this.setState({ nothingFound: true });
                        })
                        .catch(error => console.log(error))

                    break;
                }
            case 'Menu Items':
                {
                    fetch(`${url}${this.state.searchedItem}&number=${number}&offset=${offset}&${spoonacularQueries.apiKey}`, {
                        method: 'get'
                    })
                        .then(response => response.json())
                        .then(response => {
                            this.setState({ autocompletedItems: response['menuItems'], itemName: 'title', showHistory: false });
                            if(response['menuItems'].length === 0)
                                this.setState({ nothingFound: true });
                        })
                        .catch(error => console.log(error))
                    break;
                }
            default:
                {
                    console.log("ENTERED DEFAULT CASE");
                    this.setState({ autocompleteitems: [], itemName: '', itemsDetails: [] });
                }
        }
    }


    onChangeClickedQuery = (type) => {
        ls.set('active', 1);
        this.setState({ clickedQuery: type });
    }

    handleCloseFoodInfoModal = () => {
        this.setState({ nrCalories: 0, nrCarbohydrates: 0, nrFats: 0, nrProteins: 0, 
            showFoodInfoModal: false, showHistory: true, nothingFound: false,
            itemChosen: '', numberOfServings: 1 });
        if(this.state.clickedQuery === 'All')
            this.setState({ itemName: 'name' });
    }

    componentDidMount = () => {
        
        fetch(`http://localhost:4400/users/${this.props.user.id}/lastWeekMeals`, {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                mealType: this.props.mealType
            })
        })
            .then(response => response.json())
            .then(response => {
                if(parseInt(response['meta']['statusCode']) !== 200)
                    console.log("ERROR: " + response['meta']['message'] + " of status code " + response['meta']['statusCode']);
                else {
                    this.setState({ history: response['data'] });
                }
            })
            .catch(error => console.log(error))
    }

    onHistoryItemClick = (item) => {
        this.setState({ showFoodInfoModal: true, historyData: true, historyClickedItem: item });

        for(let i = 0; i < item['nutrition']['nutrients'].length; i++) {
            let nutrient = item['nutrition']['nutrients'][i];
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


    render() {

        let {
            autocompletedItems,
            itemChosen,
            clickedQuery,
            itemName,
            itemClicked,
            itemsDetails,
            showFoodInfoModal,
            nrCalories,
            nrCarbohydrates,
            nrFats,
            nrProteins,
            showHistory,
            nothingFound,
            history,
            historyData,
            historyClickedItem,
            numberOfServings,
            servingModal
        } = this.state;

        if(clickedQuery === "") {
            clickedQuery = 'All';
        }

        return (
            <Container fluid={true} className="p-0 backgroundImg">
                {
                    historyData === false ?
                    <FoodInfo 
                        showFoodInfoModal={showFoodInfoModal} 
                        handleCloseFoodInfoModal={this.handleCloseFoodInfoModal} 
                        itemsDetails={itemsDetails}
                        nrCalories={nrCalories}
                        nrCarbohydrates={nrCarbohydrates}
                        nrFats={nrFats}
                        nrProteins={nrProteins}
                        mealType={this.props.mealType}
                        user={this.props.user}
                        onSubstractNumberOfServings={this.onSubstractNumberOfServings}
                        onAddNumberOfServings={this.onAddNumberOfServings}
                        setNumberOfServings={this.setNumberOfServings}
                        showServingModal={this.showServingModal}
                        hideServingModal={this.hideServingModal}
                        numberOfServings={numberOfServings}
                        servingModal={servingModal}
                        buttonType={''}
                    /> :(
                        <FoodInfo 
                            showFoodInfoModal={showFoodInfoModal} 
                            handleCloseFoodInfoModal={this.handleCloseFoodInfoModal}  
                            itemsDetails={historyClickedItem}
                            nrCalories={nrCalories} 
                            nrCarbohydrates={nrCarbohydrates} 
                            nrFats={nrFats} 
                            nrProteins={nrProteins} 
                            mealType={this.props.mealType} 
                            user={this.props.user} 
                            onSubstractNumberOfServings={this.onSubstractNumberOfServings}
                            onAddNumberOfServings={this.onAddNumberOfServings}
                            setNumberOfServings={this.setNumberOfServings}
                            showServingModal={this.showServingModal}
                            hideServingModal={this.hideServingModal}
                            numberOfServings={numberOfServings}
                            servingModal={servingModal}
                            buttonType={''}
                        />
                    )
                }
                <SignedInNavigationBar />
                <MealTypeBand 
                    mealType={this.props.mealType} 
                />
                <QueryType 
                    onChangeClickedQuery={this.onChangeClickedQuery} 
                    onChoiceButtonClick={this.onChoiceButtonClick} 
                />
                <Row noGutters>
                    <Col sm="4"></Col>
                    <Col sm="4">
                        <Form>
                            <Form.Group controlId="searchFood">
                                <Form.Label><p style={{'color': 'white'}}>Search for {clickedQuery}</p></Form.Label>
                                <Form.Control onChange={this.onSearchChange} placeholder="Search"/>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm="4"></Col>
                </Row>
                <Row style={{'paddingBottom': '5%'}} noGutters>
                    <Col sm="4"></Col>
                    <Col sm="2">
                        <Button varianta="link" 
                            onClick={this.onSubmitSearchItem}>
                                Search
                        </Button>
                    </Col>
                    <Col sm="6"> </Col>
                </Row>
                    {
                        itemChosen === ''
                        ?
                        <Row noGutters>
                            <Col sm="1"></Col>
                            <Col sm="10">
                                <ListGroup>
                                {
                                    autocompletedItems && autocompletedItems.length !== 0
                                    ?
                                        autocompletedItems.map((autocompleteItem, index) => (
                                        
                                            <ListGroup.Item 
                                                key={`index-${index}`} 
                                                onClick={() => {
                                                    this.setState({ itemChosen: autocompleteItem[{itemName}] })
                                                    this.getChosenItemData(autocompleteItem['id'], autocompleteItem['type']);
                                                }
                                            }>
                                                <Container fluid={true} className="p-0">
                                                    <Row noGutters>
                                                        <Col sm="6">
                                                            <h3>{ autocompleteItem[itemName] }</h3>
                                                        </Col>
                                                        <Col sm="3"></Col>
                                                        <Col sm="3">
                                                            {
                                                                clickedQuery !== 'Ingredients' ?
                                                                <img alt={autocompleteItem[itemName]} src={autocompleteItem['image']} width="150" height="150" />
                                                                :(
                                                                    <img alt={autocompleteItem[itemName]} src="https://spoonacular.com/recipeImages/667707-312x231.jpg" width="150" height="150" />
                                                                )
                                                            } 
                                                        </Col>
                                                    </Row>      
                                                </Container>                             
                                            </ListGroup.Item>
                                                
                                        ))
                                    :(
                                         <Container fluid={true} className="p-0">
                                             <Row noGutters>
                                                 <Col sm="12">
                                                     {
                                                        showHistory === false && nothingFound === true ?
                                                        <h3 style={{'color': 'white', 'textAlign': 'center'}}>No Items Found</h3>
                                                        : (<div></div>)
                                                     }
                                                     {
                                                         showHistory === true &&
                                                         <div>
                                                            <h3 style={{'color': 'white', 'textAlign': 'center'}}>
                                                                Some of your {this.props.mealType} choices this week
                                                            </h3>
                                                            <ListGroup>
                                                                {
                                                                    history.map((item, index) => (
                                                                        <ListGroup.Item  
                                                                            key={`index-${index}`}
                                                                            onClick={() => this.onHistoryItemClick(item)} 
                                                                        >
                                                                            <Container fluid={true} className="p-0">
                                                                                <Row noGutters>
                                                                                    <Col sm="6">
                                                                                        <h3>{ item['name'] || item['title'] }</h3>
                                                                                    </Col>
                                                                                    <Col sm="3"></Col>
                                                                                    <Col sm="3">
                                                                                        {
                                                                                            item['images'] && item['images'][0] ?
                                                                                                item['title'] ?
                                                                                                    <img alt={item['title']} src={item['images'][0]} width="150" height="150" />
                                                                                                :(
                                                                                                    <img alt={item['name']} src={item['images'][0]} width="150" height="150" />
                                                                                                )
                                                                                             :(
                                                                                                item['title'] ?
                                                                                                    <img alt={item['title']} src="https://spoonacular.com/recipeImages/667707-312x231.jpg" width="150" height="150" />
                                                                                                    :(
                                                                                                        <img alt={item['name']} src="https://spoonacular.com/recipeImages/667707-312x231.jpg" width="150" height="150" />
                                                                                                    )
                                                                                             )
                                                                                        } 
                                                                                    </Col>
                                                                                </Row>      
                                                                            </Container>                             
                                                                        </ListGroup.Item>
                                                                    ))
                                                                }
                                                            </ListGroup>
                                                        </div>
                                                     }
                                                 </Col>
                                             </Row>
                                         </Container>
                                    )
                                }
                                </ListGroup>
                            </Col>
                            <Col sm="1"></Col>
                        </Row>
                        :( 
                           <div></div>
                        )
                    }
                    <Row noGutters style={{'paddingTop': '5%'}}>
                        <Col sm="4"></Col>
                        <Col sm="4" className="d-flex justify-content-center">
                        {
                            autocompletedItems && autocompletedItems.length !== 0 && itemChosen === '' &&
                            <SearchFoodPagination setOffset={this.setOffset} />
                        }
                        </Col>
                        <Col sm="4"></Col>
                    </Row>
                    {
                        (!(autocompletedItems && autocompletedItems.length !== 0) || itemClicked === true) &&
                        <Row style={{'paddingTop': '30%'}}></Row>
                    }
            </Container>
        )
    }
}

export default SearchFood;