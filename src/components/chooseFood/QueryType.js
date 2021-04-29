import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './QueryType.css';
import foodQuery from '../../common/foodQuery';
import Button from 'react-bootstrap/Button';

class QueryType extends Component {

    constructor(props) {
        super(props);
        this.state={
            clickedAll: true,
            clickedIngredients: false,
            clickedGroceries: false,
            clickedMenuItems: false,
        };
    }

    onAllClick = () => {
        this.setState({ clickedIngredients: false });
        this.setState({ clickedGroceries: false });
        this.setState({ clickedMenuItems: false });
        this.setState({ clickedAll: true });
        this.props.onChangeClickedQuery(foodQuery.ALL);
        this.props.onChoiceButtonClick();
    }

    onIngredientsClick = () => {
        this.setState({ clickedAll: false });
        this.setState({ clickedGroceries: false });
        this.setState({ clickedMenuItems: false });
        this.setState({ clickedIngredients: true });
        this.props.onChangeClickedQuery(foodQuery.INGREDIENTS);
        this.props.onChoiceButtonClick();
    }

    onGroceryClick = () => {
        this.setState({ clickedAll: false });
        this.setState({ clickedIngredients: false });
        this.setState({ clickedMenuItems: false });
        this.setState({ clickedGroceries: true });
        this.props.onChangeClickedQuery(foodQuery.GROCERY_PRODUCTS);
        this.props.onChoiceButtonClick();
    }

    onMenuItemsClick = () => {
        this.setState({ clickedAll: false });
        this.setState({ clickedIngredients: false });
        this.setState({ clickedGroceries: false });
        this.setState({ clickedMenuItems: true });
        this.props.onChangeClickedQuery(foodQuery.MENU_ITEMS);
        this.props.onChoiceButtonClick();
    }

    render() {

        const {
            clickedAll,
            clickedIngredients,
            clickedGroceries,
            clickedMenuItems,
        } = this.state;

        return (
            <Container fluid={true} className="p-0">
                <Row noGutters>
                    <Col sm="1" className="allTypes" onClick={this.onAllClick}>
                        <Button variant="outline-dark" block active={clickedAll}>{foodQuery.ALL}</Button>
                    </Col>
                    <Col sm="2" className="allTypes" onClick={this.onIngredientsClick}>
                        <Button variant="outline-dark" block active={clickedIngredients}>{foodQuery.INGREDIENTS}</Button>
                    </Col>
                    <Col sm="2" className="allTypes" onClick={this.onGroceryClick}>
                        <Button variant="outline-dark" block active={clickedGroceries}>{foodQuery.GROCERY_PRODUCTS}</Button>
                    </Col>
                    <Col sm="2" className="allTypes" onClick={this.onMenuItemsClick}>
                        <Button variant="outline-dark" block active={clickedMenuItems}>{foodQuery.MENU_ITEMS}</Button>
                    </Col>
                    <Col sm="6"></Col>
                </Row>
                <Row noGutters style={{'paddingBottom': '5%'}}></Row>
            </Container>
        )
    }
}

export default QueryType;