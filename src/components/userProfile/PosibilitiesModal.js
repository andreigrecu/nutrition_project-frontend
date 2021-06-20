import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import './PosibilitiesModal.css';
import { withRouter } from 'react-router-dom';
import mealType from '../../common/mealType';

class PosibilitiesModal extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handleClose = () => {
        this.props.handlePossibilitiesModalClose()
    }

    onBreakfastTypeClick = () => {
        this.props.setMealType(mealType.BREAKFAST);
        this.props.history.push('/chooseFood');
    }

    onLunchTypeClick = () => {
        this.props.setMealType(mealType.LUNCH);
        this.props.history.push('/chooseFood');
    }

    onDinnerTypeClick = () => {
        this.props.setMealType(mealType.DINNER);
        this.props.history.push('/chooseFood');
    }

    onSnacksTypeClick = () => {
        this.props.setMealType(mealType.SNACKS);
        this.props.history.push('/chooseFood');
    }

    render() {

        return(
            <Modal show={this.props.showPosibilitiesModal} onHide={this.handleClose} centered keyboard={true}> 
                <Modal.Body>
                    <p className="meals">Meals</p>
                    <hr></hr>
                    <p className="mealType" onClick={this.onBreakfastTypeClick}>Breakfast</p>
                    <hr></hr>
                    <p className="mealType" onClick={this.onLunchTypeClick}>Lunch</p>
                    <hr></hr>
                    <p className="mealType" onClick={this.onDinnerTypeClick}>Dinner</p>
                    <hr></hr>
                    <p className="mealType" onClick={this.onSnacksTypeClick}>Snacks</p>
                    <hr></hr>
                </Modal.Body>
            </Modal>
        );
    }
}

export default withRouter(PosibilitiesModal);