import React from 'react';
// import './Profile.css';
import Header from './Header';
import Offer from './Offer';
import { Form, Button, Modal, Card, Container, CardColumns } from 'react-bootstrap';
import Compare from './Compare';

import axios from 'axios';
import Footer from './Footer'

import getDistance from 'geolib/es/getDistance';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        email: '',
        homeAddress: '',
        homeLat: 51.5103, // preset numbers
        homeLon: 7.49347,
        workLat: 47.6062,
        workLon: 122.3321,
        curEmployer: '',
        curSalary: 0,
        curRemote: false,
        commuteDist: 0,
        milesPerGal: 0,
      },
      addressToSearch: '',
      showEditModal: false,
    }
  }

  getLocation = async (e) => {
    //  function will use city stored in state to search api with axios
    e.preventDefault();
    try {
      this.handleCloseForm();
      console.log('address to search:', this.state.addressToSearch);
      let locationData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.addressToSearch}&key=${process.env.REACT_APP_GOOGLE_GEOCODE_API}`);

      this.setState(prevState => ({
        userInfo: {
          ...prevState.userInfo,
          email: this.props.email,
          homeLat: locationData.data.results[0].geometry.location.lat,
          homeLon: locationData.data.results[0].geometry.location.lng,
        },
        addressToSearch: prevState.addressToSearch,
        showEditModal: prevState.showEditModal,
      }));
      console.log('user info before sending to server:', this.state.userInfo);
      this.handleEditUser(this.state.userInfo);

    } catch (err) {

      console.log(err);
    }
  }
  handleCityInput = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      userInfo: {
        ...prevState.userInfo,
      },
      addressToSearch: e.target.value,
      showEditModal: prevState.showEditModal,
    }));
    console.log(this.state);
  };

  handleEmployerInput = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      userInfo: {
        ...prevState.userInfo,
        curEmployer: e.target.value,
      },
      addressToSearch: prevState.addressToSearch,
      showEditModal: prevState.showEditModal,
    }));
  }


  handleSalaryInput = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      userInfo: {
        ...prevState.userInfo,
        curSalary: e.target.value,
      },
      addressToSearch: prevState.addressToSearch,
      showEditModal: prevState.showEditModal,
    }));
  };


  handleIsRemote = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      userInfo: {
        ...prevState.userInfo,
        curRemote: true,
      },
      addressToSearch: prevState.addressToSearch,
      showEditModal: prevState.showEditModal,
    }));
  };

  handleCurCommute = (e) => {
    e.preventDefault();

    // ############################################ 
    // Changed set state!!!!


    let distanceToWork = getDistance(
      { latitude: this.state.userInfo.homeLat, longitude: this.state.userInfo.homeLon },
      { latitude: this.state.userInfo.workLat, longitude: this.state.userInfo.workLon }
    )
    this.setState(prevState => ({
      userInfo: {
        ...prevState.userInfo,
        commuteDist: distanceToWork,
      },
      addressToSearch: prevState.addressToSearch,
      showEditModal: prevState.showEditModal,
    }));
  };

  handleMPG = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      userInfo: {
        ...prevState.userInfo,
        milesPerGal: e.target.value,
      },
      addressToSearch: prevState.addressToSearch,
      showEditModal: prevState.showEditModal,
    }));
  };

  handleShowForm = () => {
    this.setState({
      showEditModal: true,
    })
  }
  handleCloseForm = () => {
    this.setState({
      showEditModal: false,
    })
  }
  handleEditUser = async (userData) => {
    try {
      console.log('handle edit user state:', this.state.userInfo);
      let response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/profile`, userData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(this.props);
    
    return (
      <>
        <Header />
        <h1>Profile</h1>
        <Container>

          <Card className="shadow-lg p-3 mb-5 bg-white rounded">
            <Card.Header>
              Current Information for {this.props.name}
            </Card.Header>
            <Card.Body>
              Employer: {this.state.userInfo.curEmployer}
              Salary: {this.state.userInfo.curSalary}
              Remote?: {this.state.userInfo.curRemote ? 'yes' : 'no'}
              Commute: {this.state.userInfo.commuteDist}
            </Card.Body>
            <Card.Footer>
              {this.props.email}
            </Card.Footer>
          </Card>
        </Container>

        <Button className="m-3" onClick={this.handleShowForm}>Edit User Info</Button>
        <Button className="m-3" variant='success' onClick={console.log('new offer clicked')}>New Offer</Button>
        <Container className="m-3">
          <CardColumns>
            <Offer />
            <Offer />
            <Offer />
            <Offer />

          </CardColumns>
        </Container>

        {this.state.showEditModal ? <Modal show={this.state.showEditModal}><Modal.Header>
          <h2>Create New Profile</h2>
        </Modal.Header>
          <Modal.Body>
            <Form className='form'>
              <Form.Group>
                <Form.Control onChange={this.handleCityInput} type="text" placeholder="Enter Home Address" />
              </Form.Group>
              <Form.Group>
                <Form.Control onChange={this.handleEmployerInput} type="text" placeholder="Current Employer" />
              </Form.Group>
              <Form.Group>
                <Form.Control onChange={this.handleSalaryInput} type="text" placeholder="Current Salary" />
              </Form.Group>
              <Form.Group>
                <Form.Check onChange={this.handleIsRemote} label="Currently Working Remote?" />
              </Form.Group>
              <Form.Group>
                <Form.Control onChange={this.handleCurCommute} type="text" placeholder="Current Commute in Miles" />
              </Form.Group>
              <Form.Group>
                <Form.Control onChange={this.handleMPG} as="select" >
                  <option value='0' >Average Fuel Economy</option>
                  <option value='15' >Less than 15</option>
                  <option value='17.5'>15-20</option>
                  <option value='22.5'>20-25</option>
                  <option value='27.5'>25-30</option>
                  <option value='32.5'>30-35</option>
                  <option value='35'>35+</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={this.getLocation}>Submit</Button>
              <Button variant="outline-danger" className="m-1" onClick={this.handleCloseForm}>
                Close
              </Button>
            </Form>
          </Modal.Body></Modal> : ''
        }

        <Compare
          curSalary={this.state.userInfo.curSalary}
          commuteDist={this.state.userInfo.commuteDist}
          milesPerGal={this.state.userInfo.milesPerGal}
          curRemote={this.state.userInfo.curRemote}

        />
        <Footer />
      </>

      // if user is logged in, show information
      // If user logs out, take them back to the home page?
      //    Or not show information

      // Show their saved data.
      //    If no saved data, create a sample?

      // Saved Data includes
      //    Offer: int,
      //    MPG: int,
      //    Remote or not: boolean,
      //    Commute Distance: int,
      //    email: string,
      //    data from past offers: object,

      // Show most recently selected Data from State
      // Display thier savings from their selected offer


    )
  }
}

export default Profile;
