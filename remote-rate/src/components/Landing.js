import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';

// import './Home.css';
// import Login from './Login';
// import LogoutButton from './LogoutButton'

// import './Home.css';
import Header from './Header';

import axios from 'axios';



class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      working: '',
    }
  }


  componentDidMount = async () => {
    try {
      const { getIdTokenClaims } = this.props.auth0;
      let tokenClaims = await getIdTokenClaims();
      // console.log('I am here', tokenClaims)
  
      const jwt = tokenClaims.__raw;
      // console.log('jwt', jwt);
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
      }

      console.log('config', config)
      const serverResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/landing`, config);
 
      this.setState({
        working: `This is working: ${serverResponse.data.email_verified}`,
      })

    } catch (err) {
      console.log('component did mount error', err)
    }
  }
  render() {

    const {isLoading} = this.props.auth0;

    if (isLoading) {
      return <h2>Loading please wait...</h2>
    } else {
      return (
        <>
          <Header />
          <h1>Remote Rate Landing Page</h1>
 
          {/* {isAuthenticated ? 
          <> <LogoutButton /> <h3>{user.name}</h3> </>: 
          <Login />} */}

           {this.state.working ? this.state.working : 'false' }

          {
            <>
            <h2>Landing Page</h2>
            </>
            }
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
}

export default withAuth0(Landing);
