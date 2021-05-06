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
            caloriesStatus: ''
        };
    }

    componentDidMount = () => {
        
        fetch(`http://localhost:4400/users/${this.props.user.id}/todayNutrients`, {
            method: 'get'
        })
            .then(response => response.json())
            .then(response => {
                if(response['statusCode'] && parseInt(response['statusCode']) !== 200)
                    console.log("ERROR: " + response['message'] + " with status code " + response['statusCode']);
                else 
                    this.setState({ caloriesStatus: response['data']['calories']['totalCalories']})
            })
            .catch(error => console.log(error))
    }

    render() {

        const {
            caloriesStatus
        } = this.state;
        
        return (       
            <Container fluid={true} className="userData p-0">
                <Row noGutters>
                    <SignedInNavigationBar />
                </Row>
                <Row noGutters>
                    
                    {
                        this.props.user.firstLogin === true
                        ?
                        <NewUserData 
                            user={this.props.user} 
                            loadUser={this.props.loadUser} 
                            setUserBMR={this.props.setUserBMR} 
                        />
                        :(
                            <div></div>
                        )
                    }
                    <DailyCaloriesCounter 
                        user={this.props.user}
                        userBMR={this.props.userBMR}
                        setUserBMR={this.props.setUserBMR} 
                        onRouteChange={() => this.props.history.push('/chooseFood')}
                        setMealType={this.props.setMealType}
                        caloriesStatus={caloriesStatus}
                     />
                </Row>
            </Container>               
        );
    }
}

export default UserProfile;