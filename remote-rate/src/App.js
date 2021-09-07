import React from 'react';
import './css/App.css';

import Profile from './components/Profile.js';
import Compare from './components/Compare.js';
import About from './components/AboutUs.js';
import Landing from './components/Landing.js';

import { withAuth0 } from '@auth0/auth0-react';
import Login from './components/Login';
import LogoutButton from './components/LogoutButton';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';

class App extends React.Component {
  render() {
    const { user, isAuthenticated } = this.props.auth0;
    return (
      <body className="body">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {
                isAuthenticated ?
                  <>
                    <LogoutButton />
                    <h3>Welcome {user.given_name}</h3>
                    <Landing />
                  </> :
                  <>
                    <Login />
                    <h2>Hello, please log in.</h2>
                    <Landing />
                  </>
              }
            </Route>
            <Route exact path="/landing">
              {
                isAuthenticated ?
                  <>
                    <LogoutButton />
                    <h3>Welcome {user.given_name}</h3>
                    <Landing />
                  </> :
                  <>
                    <Login />
                    <h2>Hello, please log in to access your offers and comparisons</h2>
                    <Landing />
                  </>
              }
            </Route>
            <Route exact path="/profile">
              {
                isAuthenticated ?
                  <>
                    <LogoutButton />

                    {/* <h3>Welcome {user.given_name}</h3>  */}
                    <Profile email={user.email} name={user.name} />
                    </> :
                  <>
                    <Login />
                    <h2>Hello, please log in to access the Profile Page</h2>
                    <Landing />
                  </>
              }

              {/* {isAuthenticated ?
                <Profile email={user.email} name={user.name} /> :
                <Profile email='youngqp3@gmail.com' />
              } */}
            </Route>

            <Route exact path="/compare">


              {
                isAuthenticated ?
                  <>
                    <LogoutButton />
                    <h3>Welcome {user.given_name}</h3> 
                    <Compare email={user.email} />
                  </> :
                  <>
                    <Login />
                    <h2>Hello, please log in to access the Comparison Page</h2>
                    <Landing />
                  </>
              }

            </Route>

            <Route exact path="/aboutUs">
              {
                isAuthenticated ?
                  <>
                    <LogoutButton />
                    <h3>Welcome {user.given_name}</h3>
                    <About />
                  </> :
                  <>
                    <Login />
                    <About />
                  </>
              }

            </Route>
          </Switch>
        </Router>
        {/* <h1>App</h1> */}
      </body>
      // Should only have components. No code is done here
    )
  }
}

export default withAuth0(App);
