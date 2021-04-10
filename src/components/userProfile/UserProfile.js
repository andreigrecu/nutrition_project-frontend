import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './UserProfile.css';
import DailyCaloriesCounter from './DailyCaloriesCounter';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (       
            <Container fluid={true} className="userData">
                <Row noGutters>
                    {/*<NewUserData />
                    <p>NAVBAR</p>*/}
                    <DailyCaloriesCounter onRouteChange={() => this.props.history.push('/chooseFood')} />
                </Row>
            </Container>               
        );
    }
}

export default UserProfile;