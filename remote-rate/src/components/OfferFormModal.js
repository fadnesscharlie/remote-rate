import React from 'react';
import axios from 'axios';

import { Form, Button, Modal } from 'react-bootstrap';

class OfferFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: {
        newSalary: 150000,
        newEmployer: 'Your Mom',
        newRemote: false,
        newCommute: 12,
      },
      email: 'phillipdeanmurphy@gmail.com',
    }
  }

  handleSubmitOffer = async (e) => {
    this.props.handleCloseOfferForm();
    e.preventDefault();
    try {
      console.log('handle edit user state:');
      let response = await axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/newoffer`, this.state.offer);
      console.log(response);
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

  handleNewCommute = (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      offer: {
        ...prevState.offer,
        newCommute: e.target.value,
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
          <Form className='form'>
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
              <Form.Control onChange={this.handleNewCommute} type="text" placeholder="New Commute in Miles" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleSubmitOffer} >Submit</Button>
            <Button variant="outline-danger" className="m-1" onClick={this.props.handleCloseOfferForm}>
              Close
            </Button>
          </Form>
        </Modal.Body></Modal>
    )
  }
}
export default OfferFormModal;
