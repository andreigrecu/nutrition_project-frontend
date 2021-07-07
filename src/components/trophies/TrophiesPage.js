import React, { Component } from 'react';
import Trophy from './Trophy';
import Container from 'react-bootstrap/Container';
import SignedInNavigationBar from '../userProfile/SignedInNavigationBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './TrophiesPage.css';
import Footer from '../footer/Footer';
import NoTrophies from './noTrophies.png';

class TrophiesPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userTrophies: [],
            programs: [],
            user: ''
        };
    }

    componentDidMount = () => {
        fetch(`http://localhost:4400/users/${this.props.user.id}/trophies`, {
            method: 'get'
        })
            .then(response => response.json())
            .then(response => {
                if(response && response['meta']['statusCode'] && parseInt(response['meta']['statusCode']) !== 200)
                    console.log("ERROR: " + response['meta']['message'] + " of status code " + response['statusCode']);
                else
                    this.setState({ userTrophies: response['data']['trophies'], user: response['data'] });
            })
            .then(() => {
                fetch('http://localhost:4400/programs', {
                    method: 'get'
                })
                    .then(response => response.json())
                    .then(response => {
                        this.setState({ programs: response });
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }

    hideNewTrophyModal = () => {
        fetch(`http://localhost:4400/users/${this.props.user.id}/setNoTrophies`, {
            method: 'put',
            headers: {'Content-type': 'application/json'}
        })
            .then(response => response.json())
            .then(response => {
                if(response['meta'] && parseInt(response['meta']['statusCode']) !== 200)
                    console.log("ERROR: " + response['meta']['message'] + " of status code " + response['meta']['statusCode']);
                else {
                    fetch(`http://localhost:4400/users/${this.props.user.id}/trophies`, {
                        method: 'get'
                    })
                        .then(response => response.json())
                        .then(response => {
                            if(response && response['meta']['statusCode'] && parseInt(response['meta']['statusCode']) !== 200)
                                console.log("ERROR: " + response['meta']['message'] + " of status code " + response['statusCode']);
                            else
                                this.setState({ user: response['data'] });
                        })
                        .catch(error => console.log(error))
                }
            })
            .catch(error => console.log(error))
    }


    render() {

        const {
            userTrophies,
            programs,
            user
        } = this.state;


        return (
            <div>
                <Container fluid={true} className="p-0">
                    <SignedInNavigationBar />
                    <Row noGutters>
                        <Col sm="4"></Col>
                        <Col sm="4" style={{'textAlign': 'center'}}>
                            {
                                userTrophies.length > 0 ? 
                                <h1 className="trophiesHeader">Your achievements!</h1>
                                : (
                                    <div>
                                        <h1 style={{'paddingBottom': '10%', 'paddingTop': '10%'}}>Work harder in order to collect some trophies!</h1>
                                        <img alt='noTrophies' height="600" width="400" src={NoTrophies} />
                                    </div>
                                )
                            }
                        </Col>
                        <Col sm="4"></Col>
                    </Row>
                </Container>

                {
                    userTrophies.map((value, i) => {
                        return(
                            <Trophy 
                                key={i}
                                id={userTrophies[i].id}
                                title={userTrophies[i].title}
                                numOfDays={userTrophies[i].daysForAchieving}
                                programs={programs}
                                programId={userTrophies[i]['programId']}
                                userTrophies={user}
                                user={this.props.user}
                                hideNewTrophyModal={this.hideNewTrophyModal}
                            />
                        )
                    })
                }
                {
                    userTrophies.length ?
                        <div style={{'paddingTop': '25%', 'textAlign': 'center'}}>
                            <Footer />
                        </div> : (
                            <div style={{'paddingTop': '15%', 'textAlign': 'center'}}>
                                <Footer />
                            </div>
                        )
                }
            </div>
        )
    }
}
export default TrophiesPage;