import React, { Component } from 'react';
import './SearchFood.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

class SearchFood extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedItem: '',
            autocompletedItems: [],
            itemChosen: '',
            itemChosenNutrients: {}
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
            console.log(response)
            this.setState({ itemChosenNutrients: response['nutrition']['nutrients'] })
        })
    }


    render() {
        const {
            autocompletedItems,
            itemChosen,
            itemChosenNutrients
        } = this.state;

        let test = '';
        if(itemChosenNutrients && itemChosenNutrients[0] && itemChosenNutrients[0]['name'])
            test = itemChosenNutrients[0]['name'];

        console.log(test)
        
        return (
            <Container fluid={true}>
                <Row noGutters>
                    <Col sm="4"></Col>
                    <Col sm="4">
                        <Form>
                            <Form.Group controlId="searchFood">
                                <Form.Label>Search for any food or ingredient</Form.Label>
                                <Form.Control onChange={this.onSearchChange} />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col sm="4"></Col>
                </Row>
                <Row>
                    <Col sm="3"></Col>
                    <Col sm="3">
                        <Button varianta="link" onClick={this.onSubmitSearchItem}>ceva</Button>
                    </Col>
                    <Col sm="6"> </Col>
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