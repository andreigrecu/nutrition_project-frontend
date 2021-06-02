import React, { PureComponent } from 'react';
import CaloriesGraphic from './CaloriesGraphic';

export default class GoalGraphic extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            caloriesGoal: [],
            carbosGoal: [],
            fatsGoal: [],
            proteinsGoal: [],
            caloriesConsumed: [],
            carbosConsumed: [],
            fatsConsumed: [],
            proteinsConsumed: []
        }
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
    
    componentDidMount = () => {
        
        let caloriesGoalArray = [];
        let carbosGoalArray = [];
        let fatsGoalArray = [];
        let proteinsGoalArray = [];
        let caloriesConsumedArray = [];
        let carbosConsumedArray = [];
        let fatsConsumedArray = [];
        let proteinsConsumedArray = [];
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
                                caloriesGoalArray[meal] = response['data'][meal]['caloriesGoal'];
                            else
                                caloriesGoalArray[meal] = 0;
                            if(response['data'][meal]['carbosGoal'])
                                carbosGoalArray[meal] = response['data'][meal]['carbosGoal'];
                            else
                                carbosGoalArray[meal] = 0;
                            if(response['data'][meal]['fatsGoal'])
                                fatsGoalArray[meal] = response['data'][meal]['fatsGoal'];
                            else
                                fatsGoalArray[meal] = 0;
                            if(response['data'][meal]['proteinsGoal'])
                                proteinsGoalArray[meal] = response['data'][meal]['proteinsGoal'];
                            else
                                proteinsGoalArray[meal] = 0;
                                 
                        }
                        this.setState({ caloriesGoal: caloriesGoalArray });
                        this.setState({ carbosGoal: carbosGoalArray });
                        this.setState({ fatsGoal: fatsGoalArray });
                        this.setState({ proteinsGoal: proteinsGoalArray });
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
                        caloriesConsumedArray.push(response['data'][i]['calories']['totalCalories']);
                        carbosConsumedArray.push(response['data'][i]['carbohydrates']['totalCarbohydrates']);
                        fatsConsumedArray.push(response['data'][i]['fats']['totalFats']);
                        proteinsConsumedArray.push(response['data'][i]['proteins']['totalProteins']);
                    }
                    this.setState({ caloriesConsumed: caloriesConsumedArray });
                    this.setState({ carbosConsumed: carbosConsumedArray });
                    this.setState({ fatsConsumed: fatsConsumedArray });
                    this.setState({ proteinsConsumed: proteinsConsumedArray });
                }
            })
            .catch(error => console.log(error))
    }

    render() {

        const dates = this.Last7Days();
        const caloriesData = [
            {
              name: dates[6],
              caloriesGoal: this.state.caloriesGoal[6] || 0 ,
              caloriesConsumed: this.state.caloriesConsumed[6] || 0
            },
            {
              name: dates[5],
              caloriesGoal: this.state.caloriesGoal[5] || 0,
              caloriesConsumed: this.state.caloriesConsumed[5] || 0
            },
            {
              name: dates[4],
              caloriesGoal: this.state.caloriesGoal[4] || 0,
              caloriesConsumed: this.state.caloriesConsumed[4] || 0
            },
            {
              name: dates[3],
              caloriesGoal: this.state.caloriesGoal[3] || 0,
              caloriesConsumed: this.state.caloriesConsumed[3] || 0
            },
            {
              name: dates[2],
              caloriesGoal: this.state.caloriesGoal[2] || 0,
              caloriesConsumed: this.state.caloriesConsumed[2] || 0
            },
            {
              name: dates[1],
              caloriesGoal: this.state.caloriesGoal[1] || 0,
              caloriesConsumed: this.state.caloriesConsumed[1] || 0
            },
            {
              name: dates[0],
              caloriesGoal: this.state.caloriesGoal[0] || 0,
              caloriesConsumed: this.state.caloriesConsumed[0] || 0
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
              fatsConsumed: this.state.carbosConsumed[6] || 0
            },
            {
              name: dates[5],
              fatsGoal: this.state.fatsGoal[5] || 0,
              fatsConsumed: this.state.carbosConsumed[5] || 0
            },
            {
              name: dates[4],
              fatsGoal: this.state.fatsGoal[4] || 0,
              fatsConsumed: this.state.carbosConsumed[4] || 0
            },
            {
              name: dates[3],
              fatsGoal: this.state.fatsGoal[3] || 0,
              fatsConsumed: this.state.carbosConsumed[3] || 0
            },
            {
              name: dates[2],
              fatsGoal: this.state.fatsGoal[2] || 0,
              fatsConsumed: this.state.carbosConsumed[2] || 0
            },
            {
              name: dates[1],
              fatsGoal: this.state.fatsGoal[1] || 0,
              fatsConsumed: this.state.carbosConsumed[1] || 0
            },
            {
              name: dates[0],
              fatsGoal: this.state.fatsGoal[0] || 0,
              fatsConsumed: this.state.carbosConsumed[0] || 0
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
            
            this.props.type === 'CaloriesGraphic' ?
                <CaloriesGraphic 
                    data={caloriesData}
                    type={this.props.type}
                />
            : ( this.props.type === 'CarbosGraphic' ?
                    <CaloriesGraphic
                        data={carbosData}
                        type={this.props.type}
                    /> :(
                        this.props.type === 'FatsGraphic' ?
                            <CaloriesGraphic
                                data={fatsData}
                                type={this.props.type}
                            /> : (
                                this.props.type === 'ProteinsGraphic' &&
                                    <CaloriesGraphic
                                        data={proteinsData}
                                        type={this.props.type}
                                    />
                            )
                    )
            )

        );
    }
}