import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './UserProfile.css';
import DailyCounter from './DailyCounter';
import NewUserData from './NewUserData';
import SignedInNavigationBar from './SignedInNavigationBar';
import UserDailyCart from './UserDailyCart';
import Footer from '../footer/Footer';
import GoalGraphic from './GoalGraphic';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caloriesStatus: 0,
            carbosStatus: 0,
            fatsStatus: 0,
            proteinsStatus: 0,
            calculatorType: 'Remaining Calories',

            caloriesGoal: [],
            carbosGoal: [],
            fatsGoal: [],
            proteinsGoal: [],
            caloriesConsumed: [],
            carbosConsumed: [],
            fatsConsumed: [],
            proteinsConsumed: [],
            workoutValues: []
        };
    }

    getGraphicData = () => {

        let caloriesGoalArray = [];
        let carbosGoalArray = [];
        let fatsGoalArray = [];
        let proteinsGoalArray = [];
        let caloriesConsumedArray = [];
        let carbosConsumedArray = [];
        let fatsConsumedArray = [];
        let proteinsConsumedArray = [];
        let workoutValuesArray = [];

        fetch(`http://localhost:4400/users/${this.props.user.id}/last7DaysMeals`, {
            method: 'get'
        })
            .then(response => response.json())
            .then(response => {

                if(response['statusCode'] && parseInt(response['statusCode']) !== 200)
                    console.log("ERROR: " + response['message'] + " of status code " + response['statusCode']);
                else {
                    for(let meal = 0; meal < response['data'].length; meal++) {
                        if(response['data'][meal]['caloriesGoal'])
                            caloriesGoalArray[meal] = response['data'][meal]['caloriesGoal'].toFixed();
                        else
                            caloriesGoalArray[meal] = 0;
                        if(response['data'][meal]['carbosGoal'])
                            carbosGoalArray[meal] = response['data'][meal]['carbosGoal'].toFixed();
                        else
                            carbosGoalArray[meal] = 0;
                        if(response['data'][meal]['fatsGoal'])
                            fatsGoalArray[meal] = response['data'][meal]['fatsGoal'].toFixed();
                        else
                            fatsGoalArray[meal] = 0;
                        if(response['data'][meal]['proteinsGoal'])
                            proteinsGoalArray[meal] = response['data'][meal]['proteinsGoal'].toFixed();
                        else
                            proteinsGoalArray[meal] = 0;
                        if(response['data'][meal]['workout'])
                            workoutValuesArray[meal] = response['data'][meal]['workout'];
                        else
                            workoutValuesArray[meal] = 0;
                    }
                    this.setState({ caloriesGoal: caloriesGoalArray });
                    this.setState({ carbosGoal: carbosGoalArray });
                    this.setState({ fatsGoal: fatsGoalArray });
                    this.setState({ proteinsGoal: proteinsGoalArray });
                    this.setState({ workoutValues: workoutValuesArray });
                }
            })
            .catch(error => console.log(error))

        fetch(`http://localhost:4400/users/${this.props.user.id}/lastWeekNutrients`, {
                method: 'get'
            })
            .then(response => response.json())
            .then(response => {
                if(response['statusCode'] && parseInt(response['statusCode']) !== 200)
                    console.log("ERROR: " + response['message'] + " of status code " + response['statusCode']);
                else {
                    for(let i = 0; i < response['data'].length; i++) {
                        caloriesConsumedArray.push(response['data'][i]['calories']['totalCalories'].toFixed());
                        carbosConsumedArray.push(response['data'][i]['carbohydrates']['totalCarbohydrates'].toFixed());
                        fatsConsumedArray.push(response['data'][i]['fats']['totalFats'].toFixed());
                        proteinsConsumedArray.push(response['data'][i]['proteins']['totalProteins'].toFixed());
                    }
                    this.setState({ caloriesConsumed: caloriesConsumedArray });
                    this.setState({ carbosConsumed: carbosConsumedArray });
                    this.setState({ fatsConsumed: fatsConsumedArray });
                    this.setState({ proteinsConsumed: proteinsConsumedArray });
                }
            })
            .catch(error => console.log(error))
    }

    componentDidMount = () => {

        if(!this.props.user.id)
            this.props.history.push('/signin');
        else {

            fetch(`http://localhost:4400/users/${this.props.user.id}/todayNutrients`, {
                method: 'get'
            })
                .then(response => response.json())
                .then(response => {
                    if(response['statusCode'] && parseInt(response['statusCode']) !== 200)
                        console.log("ERROR: " + response['message'] + " with status code " + response['statusCode']);
                    else {
                        this.setState({ 
                            caloriesStatus: response['data']['calories']['totalCalories'],
                            carbosStatus: response['data']['carbohydrates']['totalCarbohydrates'],
                            fatsStatus: response['data']['fats']['totalFats'],
                            proteinsStatus: response['data']['proteins']['totalProteins']
                        })
                        this.getGraphicData();
                    }
                })
                .catch(error => console.log(error))
        }
    }

    getTodayNutrients = () => {
        
        fetch(`http://localhost:4400/users/${this.props.user.id}/todayNutrients`, {
            method: 'get'
        })
            .then(response => response.json())
            .then(response => {
                if(response['statusCode'] && parseInt(response['statusCode']) !== 200)
                    console.log("ERROR: " + response['message'] + " with status code " + response['statusCode']);
                else {
                    this.setState({ 
                        caloriesStatus: response['data']['calories']['totalCalories'],
                        carbosStatus: response['data']['carbohydrates']['totalCarbohydrates'],
                        fatsStatus: response['data']['fats']['totalFats'],
                        proteinsStatus: response['data']['proteins']['totalProteins']
                    })
                }
            })
            .catch(error => console.log(error))
    }

    formatDate = date => {

        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        if(dd<10) {dd='0'+dd}
        if(mm<10) {mm='0'+mm}
        date = mm+'/'+dd+'/'+yyyy;
        return date
     }
    
    Last7Days = () => {
        var result = [];
        for (var i=0; i<7; i++) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            result.push( this.formatDate(d) )
        }
    
        return result;
    }

    render() {

        const {
            caloriesStatus,
            carbosStatus,
            fatsStatus,
            proteinsStatus,
            workoutValues
        } = this.state;

        const dates = this.Last7Days();
        const caloriesData = [
            {
              name: dates[6],
              caloriesGoal: this.state.caloriesGoal[6] || 0 ,
              caloriesConsumed: (this.state.caloriesConsumed[6] - workoutValues[6]) || 0
            },
            {
              name: dates[5],
              caloriesGoal: this.state.caloriesGoal[5] || 0,
              caloriesConsumed: (this.state.caloriesConsumed[5] - workoutValues[5]) || 0
            },
            {
              name: dates[4],
              caloriesGoal: this.state.caloriesGoal[4] || 0,
              caloriesConsumed: (this.state.caloriesConsumed[4] - workoutValues[4]) || 0
            },
            {
              name: dates[3],
              caloriesGoal: this.state.caloriesGoal[3] || 0,
              caloriesConsumed: (this.state.caloriesConsumed[3] - workoutValues[3]) || 0
            },
            {
              name: dates[2],
              caloriesGoal: this.state.caloriesGoal[2] || 0,
              caloriesConsumed: (this.state.caloriesConsumed[2] - workoutValues[2]) || 0
            },
            {
              name: dates[1],
              caloriesGoal: this.state.caloriesGoal[1] || 0,
              caloriesConsumed: (this.state.caloriesConsumed[1] - workoutValues[1]) || 0
            },
            {
              name: dates[0],
              caloriesGoal: this.state.caloriesGoal[0] || 0,
              caloriesConsumed: (this.state.caloriesConsumed[0] - workoutValues[0]) || 0
            },
        ];

        const carbosData = [
            {
              name: dates[6],
              carbosGoal: this.state.carbosGoal[6] || 0 ,
              carbosConsumed: this.state.carbosConsumed[6] || 0
            },
            {
              name: dates[5],
              carbosGoal: this.state.carbosGoal[5] || 0,
              carbosConsumed: this.state.carbosConsumed[5] || 0
            },
            {
              name: dates[4],
              carbosGoal: this.state.carbosGoal[4] || 0,
              carbosConsumed: this.state.carbosConsumed[4] || 0
            },
            {
              name: dates[3],
              carbosGoal: this.state.carbosGoal[3] || 0,
              carbosConsumed: this.state.carbosConsumed[3] || 0
            },
            {
              name: dates[2],
              carbosGoal: this.state.carbosGoal[2] || 0,
              carbosConsumed: this.state.carbosConsumed[2] || 0
            },
            {
              name: dates[1],
              carbosGoal: this.state.carbosGoal[1] || 0,
              carbosConsumed: this.state.carbosConsumed[1] || 0
            },
            {
              name: dates[0],
              carbosGoal: this.state.carbosGoal[0] || 0,
              carbosConsumed: this.state.carbosConsumed[0] || 0
            },
        ];

        const fatsData = [
            {
              name: dates[6],
              fatsGoal: this.state.fatsGoal[6] || 0 ,
              fatsConsumed: this.state.fatsConsumed[6] || 0
            },
            {
              name: dates[5],
              fatsGoal: this.state.fatsGoal[5] || 0,
              fatsConsumed: this.state.fatsConsumed[5] || 0
            },
            {
              name: dates[4],
              fatsGoal: this.state.fatsGoal[4] || 0,
              fatsConsumed: this.state.fatsConsumed[4] || 0
            },
            {
              name: dates[3],
              fatsGoal: this.state.fatsGoal[3] || 0,
              fatsConsumed: this.state.fatsConsumed[3] || 0
            },
            {
              name: dates[2],
              fatsGoal: this.state.fatsGoal[2] || 0,
              fatsConsumed: this.state.fatsConsumed[2] || 0
            },
            {
              name: dates[1],
              fatsGoal: this.state.fatsGoal[1] || 0,
              fatsConsumed: this.state.fatsConsumed[1] || 0
            },
            {
              name: dates[0],
              fatsGoal: this.state.fatsGoal[0] || 0,
              fatsConsumed: this.state.fatsConsumed[0] || 0
            },
        ];

        const proteinsData = [
            {
              name: dates[6],
              proteinsGoal: this.state.proteinsGoal[6] || 0 ,
              proteinsConsumed: this.state.proteinsConsumed[6] || 0
            },
            {
              name: dates[5],
              proteinsGoal: this.state.proteinsGoal[5] || 0,
              proteinsConsumed: this.state.proteinsConsumed[5] || 0
            },
            {
              name: dates[4],
              proteinsGoal: this.state.proteinsGoal[4] || 0,
              proteinsConsumed: this.state.proteinsConsumed[4] || 0
            },
            {
              name: dates[3],
              proteinsGoal: this.state.proteinsGoal[3] || 0,
              proteinsConsumed: this.state.proteinsConsumed[3] || 0
            },
            {
              name: dates[2],
              proteinsGoal: this.state.proteinsGoal[2] || 0,
              proteinsConsumed: this.state.proteinsConsumed[2] || 0
            },
            {
              name: dates[1],
              proteinsGoal: this.state.proteinsGoal[1] || 0,
              proteinsConsumed: this.state.proteinsConsumed[1] || 0
            },
            {
              name: dates[0],
              proteinsGoal: this.state.proteinsGoal[0] || 0,
              proteinsConsumed: this.state.proteinsConsumed[0] || 0
            },
        ];


        
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
                    <DailyCounter 
                        user={this.props.user}
                        userBMR={this.props.userBMR}
                        setUserBMR={this.props.setUserBMR} 
                        onRouteChange={() => this.props.history.push('/chooseFood')}
                        setMealType={this.props.setMealType}
                        caloriesStatus={caloriesStatus}
                        carbosStatus={carbosStatus}
                        fatsStatus={fatsStatus}
                        proteinsStatus={proteinsStatus}
                        getGraphicData={this.getGraphicData}
                        todayWorkout={workoutValues[0]}
                    />
                </Row>
                <Row>
                    <UserDailyCart
                        user={this.props.user} 
                        forceUpdate={this.forceUpdate}
                        getTodayNutrients={this.getTodayNutrients}
                        recalculateGraphics={this.getGraphicData}
                    />
                </Row>
                <Row noGutters style={{'paddingTop': '3%', 'paddingBottom': '2%'}}>
                    <Col sm="6">
                        <h3>Last week calories tracker</h3>
                        <GoalGraphic 
                            caloriesData={caloriesData}
                            type={"CaloriesGraphic"}
                        />
                    </Col>
                    <Col sm="6">
                        <h3>Last week carbohydrates tracker</h3>
                        <GoalGraphic 
                            carbosData={carbosData}
                            type={"CarbosGraphic"}
                        />
                    </Col>
                </Row>
                <Row noGutters style={{'paddingTop': '3%', 'paddingBottom': '2%'}}>
                    <Col sm="2"></Col>
                    <Col sm="4">
                        <h3>Last week fats tracker</h3>
                        <GoalGraphic 
                            fatsData={fatsData}
                            type={"FatsGraphic"}
                        />
                    </Col>
                    <Col sm="2"></Col>
                    <Col sm="4">
                        <h3>Last week proteins tracker</h3>
                        <GoalGraphic 
                            proteinsData={proteinsData}
                            type={"ProteinsGraphic"}
                        />
                    </Col>
                </Row>
                <Row noGutters>
                    <Footer />
                </Row>
            </Container>               
        );
    }
}

export default UserProfile;