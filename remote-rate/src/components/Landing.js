import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import '../css/Landing.css';

import { Button, Spinner, Container, Card, Row, Col } from 'react-bootstrap'

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
          <Row>
            <h1 className='h1'>Welcome to Remote Rate</h1>
          </Row>
          <Row>
            <Col>
            <Jumbotron >
              <section className="info">
                We welcome you to explore the options of working fully remote! <br />
              Here you will be able to compare your current work with your new work offer!<br />

              </section>
              <aside className="infoBox">
                <Card>
                  <Card.Header>Example Data</Card.Header>
                  <Card.Body className="m-3">
                    Home Address: 2901 3rd Ave #300, Seattle, WA 98121
              </Card.Body>
                  <Card.Footer>
                    You can save: $500 Annually in gas costs
              </Card.Footer>
                </Card>
              </aside>
            </Jumbotron>
            </Col>
          </Row>


          {this.props.auth0.isAuthenticated ?
            <Row>
              <Col>
                <Card>
                  <p>
                    If this is your first time here, head over to the profile page and enter your information!
                </p>
                  <hr />
                  <p className="mb-0">
                    You can then compare your offers on the Compare page.
                </p>
                </Card>
              </Col>
              <Col>
                <Card className="sample m-3">
                  <p className="catchWords">
                    Get the money you deserve! Say it with me! It's my Money and I want it NOW!
                  </p>
                </Card>
              </Col>
            </Row>
            : ``}
        </Container >
      )
    }
  }
}

export default withAuth0(Landing);
