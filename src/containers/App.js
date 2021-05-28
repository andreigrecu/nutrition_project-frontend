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
import ChangePassword from '../components/changePassword/ChangePassword';
import UserInfo from '../components/userInfo/UserInfo';

const initialState = {
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    firstLogin: ''
  },
  mealType: '',
  BMR: 0
}

class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  clearUserState = () => {
    ls.set('state', {
      user: {}
    })
  }

  setMealType = (meal) => {
    this.setState({ mealType: meal });
    ls.set('mealType', meal);
  }

  setUserBMR = (BMR) => {
    ls.set('userBMR', BMR);
    this.setState({ BMR: BMR });
  }

  loadUser = (data) => {

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
    this.setState({user: state.user});
  } 

  render() {

    let state = ls.get('state');
    const mealType = ls.get('mealType');
    const userBMR = ls.get('userBMR') || 0;

    console.log(state)
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={(props) => (
            <WelcomePage {... props} 
              loadUser={this.loadUser} 
              user={state.user}
              clearUserState={this.clearUserState}
            />
          )} />
          <Route path="/termsAndConditions" exact component={ TermsAndConditions } />
          <Route path="/users/changePassword" exact render={(props) => (
            <ChangePassword {... props}
              user={state.user}
            />
          )} />
          <Route path="/users/informations" exact render={(props) => (
            <UserInfo {... props}
              user={state.user}
            />
          )} />
          <Route path="/about" exact component={ About } />
          <Route path="/signin" exact render={(props) => (
            <SignInPage {... props} 
              loadUser={this.loadUser} 
              clearUserState={this.clearUserState}
              user={state.user}
            />
          )} /> 
          <Route path="/users" exact render={(props) => (
            <UserProfile {... props}
              userBMR={userBMR} 
              user={state.user} 
              loadUser={this.loadUser} 
              setMealType={this.setMealType} 
              setUserBMR={this.setUserBMR} 
            />
          )} />
          <Route path="/users/plans" exact render={(props) => (
            <PlanList {... props} user={state.user} />
          )} />
          <Route path="/chooseFood" exact render={(props) => (
            <ChooseFood {... props} 
              mealType={mealType}
              user={state.user} 
            />
          )} />         
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
  );
  }
}

export default App;
