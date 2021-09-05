import React from 'react';
// import './Profile.css';
import Header from './Header';
import Offer from './Offer';
import OfferFormModal from './OfferFormModal';
import { Form, Button, Modal, Card, Container, CardColumns } from 'react-bootstrap';
import Compare from './Compare';

import axios from 'axios';
// import Footer from './Footer'

import getDistance from 'geolib/es/getDistance';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [{
        email: '',
        homeAddress: '',
        homeLat: '', // preset numbers
        homeLon: '',
        workLat: '',
        workLon: '',
        curEmployer: '',
        curSalary: 0,
        curRemote: false,
        commuteDist: 0,
        milesPerGal: 0,
        id: '',
        newJob: [],
      }],
      addressToSearch: '',
      showEditModal: false,
      showOfferModal: false,
    }
  }

  componentDidMount = async () => {
    try {
      await this.getWorkLocation()
      // console.log('Mount has ran')
    } catch (error) {
      console.log('component did mount error', error)
    }
  }

  getWorkLocation = async () => {
    try {
      let workData = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/profile`)

      console.log('work Data whole', workData.data);
      // console.log('work Data', workData.data[0]._id);

      workData.data.map(element => {
        if (element.email === this.props.email) {
          console.log('workData email', element.email)
          // console.log('workData id',element._id)
          return (

            this.setState({

              userInfo: [...this.state.userInfo, element],
              // userInfo: element.newJob,
              // userInfo: {
              //   newJob: {
              //     id: element._id,
              //     workLat: element.newJob.workLat,
              //     workLon: element.newJob.workLon,
              //   }

              // }
            })
          )
        }

      })
      console.log('Inside Get Function: State: ', this.state.userInfo)

    } catch (error) {
      console.log('something went wrong with getting work locations from backend', error)
    }
  }

  // postNewOffer = async (offer) => {
  //   try {
  //     let response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/post-offers`, offer);
  //     const newOffer = response.data;

  //     this.setState({
  //       userInfo: newJob = {
  //         workLat: offer.lat,
  //         workLon: offer.Lon
  //       }
  //     })


  //   } catch (error) {
  //     console.log('error in post', error)
  //   }
  // }

  getWorkLocation2 = (lat, lon) => {

    // ############################################ 
    // Changed set state!!!!


    let distanceToWork = getDistance(
      { latitude: this.state.userInfo.homeLat, longitude: this.state.userInfo.homeLon },
      { latitude: lat, longitude: lon }
    )
    let distanceInMiles = distanceToWork / 1609

    this.setState(prevState => ({
      userInfo: {
        ...prevState.userInfo,
        commuteDist: distanceInMiles,
        workLat: lat,
        workLon: lon,
      },
    }));
  }



  getLocation = async (e) => {
    //  function will use city stored in state to search api with axios
    e.preventDefault();
    try {
      this.handleCloseForm();
      // console.log('address to search:', this.state.addressToSearch);
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
      console.log('user info after sending to server:', this.state.userInfo);

      // this.getWorkLocation();
    } catch (err) {

      console.log(err);
    }
  }


  // handleUpdate = async (book) => {
  //   console.log('updated books:', book);
  //   await axios.put(`http://localhost:3001/books/${book._id}`, book);

  //   const updateBooks = this.state.books.map(stateBook => {
  //     if (stateBook._id === book._id) {
  //       return book;
  //     } else {
  //       return stateBook;
  //     }
  //   });
  //   this.setState({
  //     books: updateBooks,
  //   })
  // }


  handleCityInput = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      userInfo: {
        ...prevState.userInfo,
      },
      addressToSearch: e.target.value,
      showEditModal: prevState.showEditModal,
    }));
    // console.log(this.state);
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


    this.setState(prevState => ({
      userInfo: {
        ...prevState.userInfo,
        commuteDist: e.target.value,
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

  handleShowOfferForm = () => {
    // console.log('testing here');
    this.setState({
      showOfferModal: true,
    })
  }

  handleCloseOfferForm = () => {
    this.setState({
      showOfferModal: false,
    })
  }

  handleCloseForm = () => {
    this.setState({
      showEditModal: false,
    })
  }

  // #################### POST ###########################
  handleEditUser = async (userData) => {
    try {
      console.log('Post to Update DB:', this.state.userInfo);
      // let response = 
      await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/profile`, userData);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    // console.log('State function for lat and lon', this.state.userInfo.workLat, this.state.userInfo.workLon)
    return (
      <>
        <Header />
        <h1>Profile</h1>
        <h2>
          email {this.props.email}, 
          id {this.state.userInfo.id}
        </h2>
        <Container>

          <Card className="shadow-lg p-3 mb-5 bg-white rounded">
            <Card.Header>
              Current Information for {this.props.name}
            </Card.Header>
            <Card.Body>
              Employer: {this.state.userInfo.curEmployer}<br />
              Salary: {this.state.userInfo.curSalary}<br />
              Remote?: {this.state.userInfo.curRemote ? 'yes' : 'no'}<br />
              Commute: {this.state.userInfo.commuteDist}<br />
              Home Lat: {this.state.userInfo.homeLat} <br />
              Home Lon: {this.state.userInfo.homeLon} <br />
              Work Lat: {this.state.userInfo.workLat} <br />
              Work Lon: {this.state.userInfo.workLon}
            </Card.Body>
            <Card.Footer>
              {this.props.email}
            </Card.Footer>
          </Card>
        </Container>

        <Button className="m-3" onClick={this.handleShowForm}>Edit User Info</Button>
        <Button className="m-3" variant='success' onClick={this.handleShowOfferForm}>New Offer</Button>
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
                <Form.Control
                  onChange={this.handleCityInput}
                  type="text"
                  placeholder="Enter Home Address"
                  required />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  onChange={this.handleEmployerInput}
                  type="text"
                  placeholder="Current Employer" />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  onChange={this.handleSalaryInput}
                  type="text"
                  placeholder="Current Salary"
                  required />
              </Form.Group>
              <Form.Group>
                <Form.Check
                  onChange={this.handleIsRemote}
                  label="Currently Working Remote?" />
              </Form.Group>
              {/* <Form.Group>
                <Form.Control 
                onChange={this.handleCurCommute} 
                type="text" 
                placeholder="Current Commute in Miles" />
              </Form.Group> */}
              <Form.Group>
                <Form.Control
                  onChange={this.handleMPG} as="select" >
                  <option value='0' >Average Fuel Economy</option>
                  <option value='15' >Less than 15</option>
                  <option value='17.5'>15-20</option>
                  <option value='22.5'>20-25</option>
                  <option value='27.5'>25-30</option>
                  <option value='32.5'>30-35</option>
                  <option value='35'>35+</option>
                  required
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={this.getLocation}
              >Submit</Button>
              <Button
                variant="outline-danger" className="m-1"
                onClick={this.handleCloseForm}
              >
                Close
              </Button>
            </Form>
          </Modal.Body></Modal> : ''
        }

        <Compare
          userInfo={this.state.userInfo}

        />

        {this.state.showOfferModal ?
          <OfferFormModal
            newJob={this.state.userInfo.newJob}
            showOfferModal={this.state.showOfferModal}
            handleCloseOfferForm={this.handleCloseOfferForm}
            id={this.state.userInfo._id}
            getWorkLocation2={this.getWorkLocation2}
            userInfo={this.state.userInfo}
            handleEditUser={this.handleEditUser}
          /> : ''}


        {/* <Footer /> */}
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
