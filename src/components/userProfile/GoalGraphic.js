import React, { PureComponent } from 'react';
import CaloriesGraphic from './CaloriesGraphic';

export default class GoalGraphic extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            
            this.props.type === 'CaloriesGraphic' ?
                <CaloriesGraphic 
                    data={this.props.caloriesData}
                    type={this.props.type}
                />
            : ( this.props.type === 'CarbosGraphic' ?
                    <CaloriesGraphic
                        data={this.props.carbosData}
                        type={this.props.type}
                    /> :(
                        this.props.type === 'FatsGraphic' ?
                            <CaloriesGraphic
                                data={this.props.fatsData}
                                type={this.props.type}
                            /> : (
                                this.props.type === 'ProteinsGraphic' &&
                                    <CaloriesGraphic
                                        data={this.props.proteinsData}
                                        type={this.props.type}
                                    />
                            )
                    )
            )

        );
    }
}