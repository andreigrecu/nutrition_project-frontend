import './App.css';
import React, { Component } from 'react';
import  WelcomePage  from '../components/welcomePage/WelcomePage';
import SignInPage from '../components/signin/SignInPage';
import NewUserData from '../components/userProfile/NewUserData';

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
          ? 
            <WelcomePage loadUser={this.loadUser} onRouteChange={this.onRouteChange} route={this.state.route} />
          : ( 
            route === 'signin'
            ?
              <SignInPage loadUser={this.loadUser} onRouteChange={this.onRouteChange} route={this.state.route} />
            : ( 
              route === 'aboutUs'
              ? <p>AboutUs</p>
              : (
                  route === 'termsAndConditions'
                  ? <p> terms and conditions page</p>
                  : <NewUserData />
              )
            )
          )
        }
      </div>
    );
  }
}

export default App;
