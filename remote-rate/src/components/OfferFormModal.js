import React from 'react';
import axios from 'axios';

import { Form, Button, Modal } from 'react-bootstrap';
import LogoutButton from './LogoutButton';

class OfferFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: {
        newSalary: 150000,
        newEmployer: 'Best Place of Work',
        newRemote: false,
        newLocation: '',
        workLat: '',
        workLon: '',
      },
      email: '',
    }
  }

  getNewLocation = async () => {
    //  function will use city stored in state to search api with axios
    try {
      console.log('address to search:', this.state.offer.newLocation);
      let newLocationData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.offer.newLocation}&key=${process.env.REACT_APP_GOOGLE_GEOCODE_API}`)
      let lat = newLocationData.data.results[0].geometry.location.lat
      let lon = newLocationData.data.results[0].geometry.location.lng
      return { lat, lon };
      // console.log(`Lat ${lat} and lon ${lon}`);
      // console.log('The lat from google api', newLocationData.data.results[0].geometry.location.lat);
      // this.setState({
      //   offer: {
      //     workLat: newLocationData.data.results[0].geometry.location.lat,
      //     workLon: newLocationData.data.results[0].geometry.location.lng,
      //   },
      //   banana: true,
      //   email: this.state.email,
      // }, () => console.log('state of offer' , this.state));
      // console.log('user info before sending to server:', this.state)
    } catch (err) {

      console.log(err);
    }
  }

  handleSubmitOffer = async (e) => {
    this.props.handleCloseOfferForm();
    e.preventDefault();
    console.log(this.state.offer);
    try {
      let lat;
      let lon;
      let dataObject = this.getNewLocation();
      console.log('data object', dataObject);
      Promise.resolve(dataObject).then(res => {
        lat = res.lat;
        lon = res.lon;

        console.log('my mom', lat, lon);
        let data = {
          newSalary: this.state.offer.newSalary,
          newEmployer: this.state.offer.newEmployer,
          newRemote: this.state.offer.newRemote,
          newLocation: this.state.offer.newLocation,
          workLat: lat,
          workLon: lon,
        }
        console.log('you mother', data)
        console.log('ID :',this.props.id)
        axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/newoffer/${this.props.id}`, data);
      }).then(res => {
        console.log(`Success`);
      })
      // console.log('handle edit user state' ,this.state.offer);
    } catch (error) {
      console.log(error);
    }
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

  render() {
    console.log(this.state);
    return (
      <Modal show={this.props.showOfferModal}>
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>
          <Form className='form' onSubmit={this.handleSubmitOffer}>
            <Form.Group>
              <Form.Control onChange={this.handleNewEmployerInput} type="text" placeholder="Company of Offer" />
            </Form.Group>
            <Form.Group>
              <Form.Control onChange={this.handleNewSalaryInput} type="text" placeholder="Offered Salary" />
            </Form.Group>
            <Form.Group>
              <Form.Check onChange={this.handleIsNewRemote} label="Remote Offer?" />
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
