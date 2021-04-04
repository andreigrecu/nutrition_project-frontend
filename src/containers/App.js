import './App.css';
import React, { Component } from 'react';
import  WelcomePage  from '../components/welcomePage/WelcomePage';
import SignInPage from '../components/signin/SignInPage';

const initialState = {
  route: 'signout',
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

    console.clear();
    const { route } = this.state;
    return (
      <div>
        { route === 'signout'
          ? <div>
              <WelcomePage loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            </div>
          : ( 
            route === 'signin'
            ?
              <div>
                <SignInPage loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              </div>
            :(
              <p>HOME PAGE BABY</p>
            )
          )
        }
      </div>
    );
  }
}

export default App;
