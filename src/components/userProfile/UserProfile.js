import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './UserProfile.css';
import DailyCaloriesCounter from './DailyCaloriesCounter';
import NewUserData from './NewUserData';
import SignedInNavigationBar from './SignedInNavigationBar';

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
                    <SignedInNavigationBar />
                </Row>
                <Row noGutters>
                    
                    {
                        this.props.user.firstLogin === true
                        ?
                        <NewUserData user={this.props.user}/>
                        :(
                            <div></div>
                        )
                    }
                    <DailyCaloriesCounter onRouteChange={() => this.props.history.push('/chooseFood')} />
                </Row>
            </Container>               
        );
    }
}

export default UserProfile;