import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import Header from './Header';
import Footer from './Footer';
import '../css/Landing.css';
import Jumbotron from 'react-bootstrap/Jumbotron'

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

      // console.log('config', config)
      const serverResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/landing`, config);

      this.setState({
        working: `This is working: ${serverResponse.data.email_verified}`,
      })

    } catch (err) {
      console.log('component did mount error', err)
    }
  }
  render() {
    console.log(this.props.auth0);

    const { isLoading } = this.props.auth0;

    if (isLoading) {
      return <h2>Loading please wait...</h2>
    } else {
      return (
        <>
          <Header />
          <h1 className='h1'>Welcome to Remote Rate</h1>

          <Jumbotron fluid>
            <section className="info">
              We welcome you to explore the options of working fully remote! <br />
              Here you will be able to compare your current work with your new work offer!<br />

            </section>
            <aside className="infoBox">
              Things to look forward to:<br /> <br />

              <p>You will be able to see the total miles you drive a year!</p>
              <p>How much would you spend a year on gas</p>
              <p>The difference between your offers</p>
              <p>And the distance between your home and work</p>
            </aside>
          </Jumbotron>


          {this.props.auth0.isAuthenticated ?
            <Alert variant="info" className="m-4 col-md-5">
              <Alert.Heading>Alert is authenticated </Alert.Heading>
              <p>
                If this is your first time here, head over to the profile page and enter your information!
              </p>
              <hr />
              <p className="mb-0">
                You can then compare your offers on the Compare page.
              </p>
            </Alert> : ''}

          <section className="catchPhrase">
            <p className="catchWords">

              Get the money you deserve! Say it with me! It's my Money and I want it NOW!
            </p>
          </section>

          <section className="sample">
            User: Remote Rate
            Home Address: 2901 3rd Ave #300, Seattle, WA 98121
            Sample User and Savings

          </section>

          < Footer />
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
