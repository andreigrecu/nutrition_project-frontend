import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Row from 'react-bootstrap/Row';

class CaloriesGraphic extends Component {

    render() {

        let green="caloriesGoal";
        let red="caloriesConsumed";
        if(this.props.type === "CarbosGraphic") {
            green="carbosGoal";
            red="carbosConsumed";
        }
        if(this.props.type === "FatsGraphic") {
            green="fatsGoal";
            red="fatsConsumed";
        }
        if(this.props.type === "ProteinsGraphic") {
            green="proteinsGoal";
            red="proteinsConsumed";
        }

        return(
            <ResponsiveContainer width="100%" height="100%">
                <Row noGutters style={{'paddingTop': '5%'}}>
                    <BarChart
                        width={360}
                        height={400}
                        data={this.props.data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 15,
                            bottom: 10,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={green} fill="#82ca9d" />
                        <Bar dataKey={red} fill="#ff0000" />
                    </BarChart>
                </Row>
            </ResponsiveContainer>
        )
    }

}

export default CaloriesGraphic;