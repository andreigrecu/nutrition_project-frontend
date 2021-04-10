import './App.css';
import React, { Component } from 'react';
import WelcomePage  from '../components/welcomePage/WelcomePage';
import SignInPage from '../components/signin/SignInPage';
import UserProfile from '../components/userProfile/UserProfile';
import { 
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import About from '../components/about/About';
import TermsAndConditions from '../components/terms/TermsAndConditions';
import ChooseFood from '../components/chooseFood/SearchFood';

const initialState = {
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

  render() {

     return (
       <BrowserRouter>
          <Switch>
            <Route path="/" exact render={(props) => (
              <WelcomePage {... props} loadUser={this.loadUser} />
            )} />
            <Route path="/termsAndConditions" exact component={ TermsAndConditions } />
            <Route path="/about" exact component={ About } />
            <Route path="/signin" exact render={(props) => (
              <SignInPage {... props} loadUser={this.loadUser} />
            )} /> 
            <Route path="/users" exact component={ UserProfile } />
            <Route path="/chooseFood" exact component={ ChooseFood } />
            <Route path="/" render={() => <div>404</div>} />
          </Switch>
       </BrowserRouter>
    );
  }
}

export default App;
