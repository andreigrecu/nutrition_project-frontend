import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import MiddleComponent from './MiddleComponent';

class WelcomePage extends Component {
    render() {
        return(
            <div>
                <div style={{'backgroundColor': 'rgba(0, 34, 84, 0.1)'}}>
                    <NavigationBar></NavigationBar>
                    <MiddleComponent loadUser={this.props.loadUser} onRouteChange={this.props.onRouteChange}></MiddleComponent>
                </div>
            </div>
        );
    }
}

export default WelcomePage;