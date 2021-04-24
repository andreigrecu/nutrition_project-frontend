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

class SearchFood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedItem: '',
            autocompletedItems: [],
            itemChosen: '',
            itemChosenNutrients: {},
            clickedQuery: ''
        };
    }

    onSearchChange = (event) => {
        this.setState({ searchedItem: event.target.value });
    }

    onSubmitSearchItem = () => {
        fetch(` https://api.spoonacular.com/food/search?query=${this.state.searchedItem}&number=10&apiKey=edc51a73fafe413298abeccb540eb9f0`, {
            method: 'get'
        })
        .then(response => response.json())
        .then(response => {
            this.setState({autocompletedItems: response});
        });
    }

    getChosenItemData = (id) => {
        fetch(`https://api.spoonacular.com/food/menuItems/${id}?apiKey=edc51a73fafe413298abeccb540eb9f0`, {
            method: 'get'
        })
        .then(response => response.json())
        .then(response => {
            this.setState({ itemChosenNutrients: response['nutrition']['nutrients'] })
        })
    }

    onChangeClickedQuery = (type) => {
        this.setState({ clickedQuery: type });
    }

    render() {

        let {
            autocompletedItems,
            itemChosen,
            itemChosenNutrients,
            clickedQuery
        } = this.state;

        if(clickedQuery === "")
            clickedQuery = 'All';

        let test = '';
        if(itemChosenNutrients && itemChosenNutrients[0] && itemChosenNutrients[0]['name'])
            test = itemChosenNutrients[0]['name'];
       
        return (
            <Container fluid={true} className="p-0 backgroundImg">
                <SignedInNavigationBar />
                <MealTypeBand mealType={this.props.mealType} />
                <QueryType onChangeClickedQuery={this.onChangeClickedQuery} />
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
                <Row>
                    <Col sm="7"></Col>
                    <Col sm="3">
                        <Button varianta="link" onClick={this.onSubmitSearchItem}>Search</Button>
                    </Col>
                    <Col sm="2"> </Col>
                </Row>
                    {
                        itemChosen === ''
                        ?
                        <Row>
                            <Col sm="3"></Col>
                            <Col sm="6">
                                <ListGroup>
                                {
                                    autocompletedItems.length !== 0
                                    ?
                                    autocompletedItems['searchResults'][2]['results'].map(autocompleteItem => (
                                        <ListGroup.Item key={'0' + autocompleteItem.id} onClick={() => {
                                            this.setState({ itemChosen: autocompleteItem['title']})
                                            this.getChosenItemData(autocompleteItem['id']);
                                        }
                                        }>
                                            {autocompleteItem['name']}
                                        </ListGroup.Item>
                                    ))
                                    :(
                                        <div></div>
                                    )
                                }
                                </ListGroup>
                            </Col>
                            <Col sm="3"></Col>
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
            </Container>
        )
    }
}

export default SearchFood;