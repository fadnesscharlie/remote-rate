import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton.js';
import Login from './Login.js';
import { Container, Row, Col } from 'react-bootstrap';


// import NavDropdown from 'react-bootstrap/NavDropdown'
// import Nav from 'react-bootstrap';


// import './Header.css';

class Header extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <Container>
        {
          isAuthenticated ?
            <>
              <Row>
                <Col>
                  <LogoutButton />
                </Col>
              </Row>
            </> :
            <>
              <Login />
            </>
        }
      </Container>
    );
  }
}
// Nav Bar
// Home, Profile, Compare, About
// Drop down

// Project Title

// A home Icon or some sort
// With a link to either home or profile page
export default withAuth0(Header);
