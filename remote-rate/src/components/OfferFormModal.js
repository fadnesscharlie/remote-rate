import React from 'react';
import axios from 'axios';

import { Form, Button, Modal } from 'react-bootstrap';
// import LogoutButton from './LogoutButton';

class OfferFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.userInfo,
      offer: {
        newSalary: 150000,
        newEmployer: 'Best Place of Work',
        newRemote: false,
        newCommuteDist: '',
        newLocation: '',
        workLat: '',
        workLon: '',
        newJob: this.props.newJob,
        id: this.props.id,
      },
      email: '',
    }
  }

  getNewLocation = async () => {
    //  function will use city stored in state to search api with axios
    try {
      // console.log('address to search:', this.state.offer.newLocation);
      let newLocationData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.offer.newLocation}&key=${process.env.REACT_APP_GOOGLE_GEOCODE_API}`)
      let lat = newLocationData.data.results[0].geometry.location.lat
      let lon = newLocationData.data.results[0].geometry.location.lng
      this.props.getWorkLocation2(lat, lon)
      return { lat, lon };
    } catch (err) {

      console.log(err);
    }
  }

  

  handleSubmitOffer = async (e) => {
    this.props.handleCloseOfferForm();
    e.preventDefault();
    // console.log('This.state.offer before data push',this.state.offer);
    try {
      let lat;
      let lon;
      let dataObject = this.getNewLocation();
      // console.log('data object', dataObject);
      Promise.resolve(dataObject).then(res => {
        lat = res.lat;
        lon = res.lon;

        // console.log('Lat and Lon', lat, lon);
        let data = {
          newSalary: this.state.offer.newSalary,
          newEmployer: this.state.offer.newEmployer,
          newRemote: this.state.offer.newRemote,
          newLocation: this.state.offer.newLocation,
          newCommuteDist: this.state.offer.newCommuteDist,
          workLat: lat,
          workLon: lon,
        }

        console.log('you mother', data)
        console.log('ID :',this.props.id)
        let sendMe = this.state.userInfo.newJob
        sendMe.push(data);
        console.log('SEND ME BUDDY', this.state.userInfo);
        axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/newoffer/${this.state.offer.id}`, this.state.userInfo);

        // this.props.handleEditUser(this.props.userInfo)

      }).then(res => {
        this.getUserData();
        console.log(`Success`, res);
      })
      // console.log('handle edit user state' ,this.state.offer);
    } catch (error) {
      console.log(error);
    }
  }
  getUserData = async (e) => {
    await this.props.getUserData();
  }
  handleNewEmployerInput = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      offer: {
        ...prevState.offer,
        newEmployer: e.target.value,
      },
      email: prevState.email,
    }));
  }


  handleNewSalaryInput = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      offer: {
        ...prevState.offer,
        newSalary: e.target.value,
      },
      email: prevState.email,
    }));
  };


  handleIsNewRemote = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      offer: {
        ...prevState.offer,
        newRemote: true,
      },
      email: prevState.email,
    }));
  };

  handleNewLocation = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      offer: {
        ...prevState.offer,
        newLocation: e.target.value,
      },
      email: prevState.email,
    }));
  };

  handleCommuteDist = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      offer: {
        ...prevState.offer,
        newCommuteDist: e.target.value,
      },
      email: prevState.email,
    }));
  }

  render() {
    // console.log(this.state);
    return (
      <Modal show={this.props.showOfferModal}>
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
          <Form className='form' onSubmit={this.handleSubmitOffer}>
            <Form.Group>
              <Form.Control 
              onChange={this.handleNewEmployerInput} 
              type="text" 
              placeholder="New Company Name" 
              required
              />
            </Form.Group>
            <Form.Group >
              <Form.Control 
              onChange={this.handleNewSalaryInput} 
              type="text" 
              placeholder="Offered Salary" 
              required
              />
            </Form.Group>
            <Form.Group>
              <Form.Check 
              onChange={this.handleIsNewRemote} 
              label="Remote Offer?" />
            </Form.Group>
            <Form.Group>

                <Form.Control onChange={this.handleCommuteDist} type="text" placeholder="Commute in Miles">
                  
                </Form.Control>
              </Form.Group>
            <Form.Group>
              <Form.Control onChange={this.handleNewLocation} type="text" placeholder="New Offer Address" />

            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
            <Button variant="outline-danger" className="m-1" onClick={this.props.handleCloseOfferForm}>
              Close
            </Button>
          </Form>
        </Modal.Body></Modal>
    )
  }
}
export default OfferFormModal;
