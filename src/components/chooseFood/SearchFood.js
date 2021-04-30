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
            searchedItem: '',
            autocompletedItems: [],
            itemChosen: '',
            clickedQuery: 'All',
            itemName: 'title',
            itemsDetails: '',
            itemClicked: false
        };
        ls.set('offset', 0);
        ls.set('active', 1);
    }


    setOffset = (offset) => {
        ls.set('offset', offset);
        this.onSubmitSearchItem();
    }

    onChoiceButtonClick = () => {
        this.setState({ autocompletedItems: [] });
    }

    onSearchChange = (event) => {
        this.setState({ searchedItem: event.target.value });
    }

    getChosenItemData = (id, type) => {

        console.log("TYPE", type)
        this.setState({ itemsDetails: '', itemClicked: true });
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
                                    .then(response => this.setState({ itemsDetails: response, itemName: 'title' }))
                                    .catch(error => console.log(error))
                                break;
                            }
                        case 'Grocery Products':
                            {
                                fetch(`https://api.spoonacular.com/food/products/${id}?${spoonacularQueries.apiKey}`, {
                                    method: 'get'
                                })
                                    .then(response =>  response.json())
                                    .then(response => { this.setState({ itemsDetails: response, itemName: 'title' })})
                                    .catch(error => console.log(error))
                                break;
                            }
                        case 'Menu Items':
                            {
                                fetch(`https://api.spoonacular.com/food/menuItems/${id}?${spoonacularQueries.apiKey}`,{
                                    method: 'get'
                                })
                                    .then(response => response.json())
                                    .then(response => this.setState({ itemsDetails: response, itemName: 'name' }))
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
                        .then(response => this.setState({ itemsDetails: response, itemName: 'title' }))
                        .catch(error => console.log(error))
                    break;
                }
            case 'Grocery Products':
                {
                    fetch(`https://api.spoonacular.com/food/products/${id}?${spoonacularQueries.apiKey}`, {
                        method: 'get'
                    })
                        .then(response =>  response.json())
                        .then(response => {this.setState({ itemsDetails: response, itemName: 'title' })})
                        .catch(error => console.log(error))
                    break;
                }
            case 'Menu Items':
                {
                    fetch(`https://api.spoonacular.com/food/menuItems/${id}?${spoonacularQueries.apiKey}`,{
                        method: 'get'
                    })
                        .then(response => response.json())
                        .then(response => this.setState({ itemsDetails: response, itemName: 'name' }))
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

        this.setState({ autocompletedItems: [], itemChosen: '', itemClicked: false });
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


        let number=4;
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
                            console.log(response)

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

                            this.setState({ autocompletedItems: autocompleted, itemName: 'name' });
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
                            this.setState({ autocompletedItems: response['results'], itemName: 'name' });
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
                            this.setState({ autocompletedItems: response['products'], itemName: 'title' });
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
                            this.setState({ autocompletedItems: response['menuItems'], itemName: 'title' });
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
        this.setState({ clickedQuery: type });
    }

    render() {

        let {
            autocompletedItems,
            itemChosen,
            clickedQuery,
            itemName,
            itemsDetails,
            itemClicked
        } = this.state;

        console.log("ITEMS", autocompletedItems);
        console.log("details", itemsDetails)
        
        if(clickedQuery === "") {
            clickedQuery = 'All';
        }

        return (
            <Container fluid={true} className="p-0 backgroundImg">
                <SignedInNavigationBar />
                <MealTypeBand mealType={this.props.mealType} />
                <QueryType onChangeClickedQuery={this.onChangeClickedQuery} onChoiceButtonClick={this.onChoiceButtonClick} />
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
                        <Button varianta="link" onClick={this.onSubmitSearchItem}>Search</Button>
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
                                        autocompletedItems.map(autocompleteItem => (
                                        
                                            <ListGroup.Item key={'0' + autocompleteItem.id} onClick={() => {
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
                                        <div></div>
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
                            autocompletedItems && autocompletedItems.length !== 0 && itemClicked === false ?
                            <SearchFoodPagination setOffset={this.setOffset} />
                            : (<div></div>)
                        }
                        </Col>
                        <Col sm="4"></Col>
                    </Row>
                    {
                        !(autocompletedItems && autocompletedItems.length !== 0) || itemClicked === true ?
                        <Row style={{'paddingTop': '30%'}}></Row> :(<div></div>)
                    }
            </Container>
        )
    }
}

export default SearchFood;