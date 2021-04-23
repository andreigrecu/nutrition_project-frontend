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
import PlanList from '../components/plans/PlanList';
import ls from 'local-storage';

const initialState = {
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    firstLogin: ''
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
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        firstLogin: data.firstLogin
      }
    })

    const state = {
      user: {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        firstLogin: data.firstLogin
      }
    }
    ls.set('state', state);
  }

  render() {

    const state = ls.get('state');
    
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
          <Route path="/users" exact render={(props) => (
            <UserProfile {... props} user={state.user} />
          )} />
          <Route path="/users/plans" exact render={(props) => (
            <PlanList {... props} user={state.user} />
          )} />
          <Route path="/chooseFood" exact component={ ChooseFood } />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
  );
  }
}

export default App;
