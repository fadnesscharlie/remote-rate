import React from 'react';
// import './Profile.css';
import Header from './Header';
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
      this.setState({
        userInfo:{
          homeLat: locationData.data.results[0].geometry.location.lat,
          homeLon: locationData.data.results[0].geometry.location.lng,
        }
      });
      console.log(this.state.userInfo);
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
  render() {
    return (
      <>
        <Header />
        <h1>Profile</h1>
        <Button onClick={this.handleShowForm}>Edit User Info</Button>

        {this.state.showEditModal ? <Modal show={this.state.showEditModal}><Modal.Header>
          <h2>Your Home</h2>
        </Modal.Header>
          <Modal.Body>
            <Form className='form'>
              <Form.Group>
                <Form.Control onChange={this.handleCityInput} type="text" placeholder="Enter Home Address" />
                <Button variant="primary" type="submit" onClick={this.getLocation}>Submit</Button>
              </Form.Group>
            <Button variant="outline-danger" className="m-1" onClick={this.handleCloseForm}>
              Close
            </Button>
            </Form>
          </Modal.Body></Modal> : ''
  }
        
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
