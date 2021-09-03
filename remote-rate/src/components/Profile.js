import React from 'react';
// import './Profile.css';
import Header from './Header';
import Compare from './Compare';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        email: '',
        homeAddress: '',
        homeLat: '',
        homeLon: '',
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
      console.log(this.state.addressToSearch);
      let locationData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.addressToSearch}&key=${process.env.REACT_APP_GOOGLE_GEOCODE_API}`);
      console.log(locationData);
      this.setState({
        userInfo: {
          email: this.props.email,
          homeLat: locationData.data.results[0].geometry.location.lat,
          homeLon: locationData.data.results[0].geometry.location.lng,
        }
      });
      console.log(this.state.userInfo.email);
      console.log(`Line 35: ${this.state.userInfo.homeLat}`);
      this.handleEditUser(this.state.userInfo);
      this.handleCloseForm();
    } catch (err) {

      console.log(err);
    }
  }
  handleCityInput = (e) => {
    e.preventDefault();
    this.setState({
      addressToSearch: e.target.value,
    })
  };

  handleEmployerInput = (e) => {
    e.preventDefault();
    this.setState({
      curSalary: e.target.value,
    })
  };

  handleSalaryInput = (e) => {
    e.preventDefault();
    this.setState({
      curSalary: e.target.value,
    })
  };

  handleIsRemote = (e) => {
    e.preventDefault();
    this.setState({
      curRemote: true,
    })
  };

  handleCurCommute = (e) => {
    e.preventDefault();
    this.setState({
      commuteDist: e.target.value,
    })
  };

  handleMPG = (e) => {
    e.preventDefault();
    this.setState({
      milesPerGal: e.target.value,
    })
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
      let response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/profile`, userData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <>
        <Header />
        <h1>Profile</h1>
        <Button onClick={this.handleShowForm}>Edit User Info</Button>

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
        />

        <aside>
          Information from Profile:<br />
          `Salary: ${parseInt(this.state.userInfo.curSalary)}`
          `Commute Distance: ${parseInt(this.state.userInfo.commuteDist)}`
          `MPG: ${parseInt(this.state.userInfo.milesPerGal)}`

        </aside>
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

      // Have a button to go to Details and Comparison page

    )
  }
}

export default Profile;
