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

class SearchFood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedItem: '',
            autocompletedItems: [],
            itemChosen: '',
            itemChosenNutrients: {},
            clickedQuery: 'All',
            itemName: 'title',
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

    onSubmitSearchItem = () => {

        this.setState({ autocompletedItems: [] });
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


        let number=10;
        let offset=ls.get('offset');

        switch(this.state.clickedQuery) {
            case 'All':
                {
                    console.log(`${url}${this.state.searchedItem}&number=${number}&offset=${offset}&${spoonacularQueries.apiKey}`);
                    fetch(`${url}${this.state.searchedItem}&number=${number}&offset=${offset}&${spoonacularQueries.apiKey}`, {
                        method: 'get'
                    })
                    .then(response => response.json())
                    .then(response => {
                        this.setState({ autocompletedItems: response['searchResults'][0]['results'] });
                        this.setState({ itemName: 'name' });
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
                        this.setState({ autocompletedItems: response['results'] });
                        this.setState({ itemName: 'name' });
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
                        this.setState({ autocompletedItems: response['products'] });
                        this.setState({ itemName: 'title' });
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
                        this.setState({ autocompletedItems: response['menuItems'] });
                        this.setState({ itemName: 'title' });
                    })
                    .catch(error => console.log(error))
                    break;
                }
            default:
                console.log("ENTERED DEFAULT CASE");
        }

    }

    getChosenItemData = (id) => {
        console.log(id)
        // fetch(`https://api.spoonacular.com/food/menuItems/${id}?apiKey=edc51a73fafe413298abeccb540eb9f0`, {
        //     method: 'get'
        // })
        // .then(response => response.json())
        // .then(response => {
        //     console.log(response)
        //     this.setState({ itemChosenNutrients: response })
        // })
    }

    onChangeClickedQuery = (type) => {
        this.setState({ clickedQuery: type });
    }

    render() {

        let {
            autocompletedItems,
            itemChosen,
            itemChosenNutrients,
            clickedQuery,
            itemName
        } = this.state;

        console.log(autocompletedItems)

        if(clickedQuery === "") {
            clickedQuery = 'All';
        }

        let test = '';
        if(itemChosenNutrients && itemChosenNutrients[0] && itemChosenNutrients[0]['name'])
            test = itemChosenNutrients[0]['name'];
       
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
                                                this.getChosenItemData(autocompleteItem['id']);
                                            }
                                            }>
                                                <Container fluid={true} className="p-0">
                                                    <Row noGutters>
                                                        <Col sm="4">
                                                            { autocompleteItem[itemName] }  
                                                        </Col>
                                                        <Col sm="5"></Col>
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
                            test
                            ?
                           <div>{test}</div>
                           :(
                               <div></div>
                           )
                        )
                    }
                    <Row noGutters style={{'paddingTop': '5%'}}>
                        <Col sm="4"></Col>
                        <Col sm="4" className="d-flex justify-content-center">
                        {
                            autocompletedItems && autocompletedItems.length !== 0 ?
                            <SearchFoodPagination setOffset={this.setOffset} />
                            : (<div></div>)
                        }
                        </Col>
                        <Col sm="4"></Col>
                    </Row>
                    {
                        !(autocompletedItems && autocompletedItems.length !== 0) ?
                        <Row style={{'paddingTop': '30%'}}></Row> :(<div></div>)
                    }
            </Container>
        )
    }
}

export default SearchFood;