import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown'
// import Nav from 'react-bootstrap';
// import './Header.css';

class Header extends React.Component {
  render() {
    return (

      <header>

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="landing">App Icon link</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">

            {/* Links on the left side */}
             <Nav className="mr-auto">
            {/*  <Nav.Link href="landing">Home</Nav.Link>
              <Nav.Link href="profile">Profile</Nav.Link>
              <Nav.Link href="compare">Comparison</Nav.Link>
              <Nav.Link href="aboutus">About Us</Nav.Link> */}

              {/* Drop down Links */}
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="landing">Home</NavDropdown.Item>
                <NavDropdown.Item href="profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="compare">Comparison</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="aboutus">About Us</NavDropdown.Item>
              </NavDropdown> */}
            </Nav> 

            {/* Links on the right side */}
            <Nav>
              <Nav.Link href="landing">Home</Nav.Link>
              <Nav.Link eventKey={2} href="profile">
                Profile
              </Nav.Link>
              <Nav.Link href="compare">Comparison</Nav.Link>
              <Nav.Link href="aboutus">About Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/* <h1>Header Section</h1> */}

      </header>

      // Nav Bar
      // Home, Profile, Compare, About
      // Drop down

      // Project Title

      // A home Icon or some sort
      // With a link to either home or profile page


    )
  }
}

export default Header;
