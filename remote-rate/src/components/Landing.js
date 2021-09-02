import React from 'react';

import './Home.css';
import LoginButton from './components/LoginButton';

// import './Home.css';
import Header from './Header';


class Home extends React.Component {
  render() {
    return (
      <>
      <h1>Remote Rate</h1>
      <LoginButton/>
      <LogoutButton/>
      <Header />
      <h1>Landing Page</h1>
      </>
      // Header goes here
      
      // Log in button
      // Once user is logged in, take them to their profile page

      // Catchy Phrase here

      // Create it visually appealing



      // Footer goes here

    )
  }
}

export default Home;
