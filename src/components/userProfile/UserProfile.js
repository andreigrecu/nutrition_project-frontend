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
            <Container fluid={true} className="userData p-0">
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
                    <DailyCaloriesCounter 
                        user={this.props.user} 
                        onRouteChange={() => this.props.history.push('/chooseFood')}
                        setMealType={this.props.setMealType}
                     />
                </Row>
            </Container>               
        );
    }
}

export default UserProfile;