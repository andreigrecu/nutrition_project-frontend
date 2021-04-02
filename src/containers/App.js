import './App.css';
import React, { Component } from 'react';
import  WelcomePage  from '../components/welcomePage/WelcomePage';

const initialState = {
  input: '',
  route: 'signin',
  isSignedIn: 'false',
  user: {
    firstName: '',
    lastName: '',
    email: '',
    birthday: ''
  }
}


class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        birthday: data.birthday
      }
    })
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState);
    } else if(route === 'home') {
      this.setState({isSignedIn: true})
    }

    this.setState({route: route});
  }

  render() {

    const { route } = this.state;

    return (
      <div>
        { route === 'signin'
          ? <div>
              <WelcomePage loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            </div>
          : (
              <p>HEHE PANDURII</p>
          )
        }
      </div>
    );
  }
}

export default App;
