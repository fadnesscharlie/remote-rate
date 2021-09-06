import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import Header from './Header';
import Footer from './Footer';
import '../css/Landing.css';
import { Button, Spinner, Container, Card } from 'react-bootstrap'

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
      return (<Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
      );
    } else {
      return (
        <Container className="vh-100">
          <Header />
          <h1 className='h1'>  Remote Rate Landing Page</h1>

          {this.props.auth0.isAuthenticated ?
            <Alert variant="info" className=" col-md-5 m-auto">
              <Alert.Heading>Alert is authenticated </Alert.Heading>
              <p>
                If this is your first time here, head over to the profile page and enter your information!
              </p>
              <hr />
              <p className="mb-0">
                You can then compare your offers on the Compare page.
              </p>
            </Alert> : ''}

          <Card className="sample m-3">


          </Card>
          <Card>
            <Card.Header>User: Remote Rate</Card.Header>
            <Card.Body className="m-3">
              Home Address: 2901 3rd Ave #300, Seattle, WA 98121
              </Card.Body>
              <Card.Footer>
                You can save: $500 Annually in gas costs
              </Card.Footer>
          </Card>

          < Footer />
        </Container>
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
