import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './UserProfile.css';
import DailyCaloriesCounter from './DailyCaloriesCounter';
import SearchFood from '../chooseFood/SearchFood';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route : this.props.route
        };
    }

    render() {
        const { route } = this.props;
        return (
            <div>
                {
                    route === 'addFood'
                    ?
                        <SearchFood />
                    :(
                        <Container fluid={true} className="userData">
                            <Row noGutters>
                                {/*<NewUserData />
                                <p>NAVBAR</p>*/}
                                <DailyCaloriesCounter onRouteChange={this.props.onRouteChange} />
                            </Row>
                        </Container>
                    )
                }
            </div>   
        );
    }
}

export default UserProfile;