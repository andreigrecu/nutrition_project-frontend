import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import MiddleComponent from './MiddleComponent';

class WelcomePage extends Component {

    constructor(props) {
        super(props);
        this.state={};
    }

    componentDidMount = () => {
        this.props.clearUserState();
    }

    render() {
        return(
            <div>
                <div style={{'backgroundColor': 'rgba(0, 34, 84, 0.1)'}}>
                    <NavigationBar></NavigationBar>
                    <MiddleComponent loadUser={this.props.loadUser} ></MiddleComponent>
                </div>
            </div>
        );
    }
}

export default WelcomePage;