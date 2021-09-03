import React from 'react';
import './css/App.css';

import Profile from './components/Profile.js';
import Compare from './components/Compare.js';
import About from './components/AboutUs.js';
import Landing from './components/Landing.js';

import { withAuth0 } from '@auth0/auth0-react';
import Login from './components/Login';
import LogoutButton from './components/LogoutButton'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    const { user, isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/">
              {
                isAuthenticated ?
                  <> <Landing /> <LogoutButton /> <h3>{user.name}</h3> </> :
                  <> <Landing /> <Login /> </>
              }
            </Route>
            <Route exact path="/landing">
              <Landing />
            </Route>
            <Route exact path="/profile">
              {isAuthenticated ?
                <Profile email={user.email} name={user.name} /> :
                <Profile />
              }
            </Route>
            <Route exact path="/compare">
              <Compare />
            </Route>
            <Route exact path="/aboutUs">
              <About />
            </Route>
          </Switch>
        </Router>
        <h1>App</h1>
      </>
      // Should only have components. No code is done here
    )
  }
}

export default withAuth0(App);
