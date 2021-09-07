import React from 'react';
import '../css/Compare.css';
import axios from 'axios';
import { Accordion, Card, Button, Container } from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Footer from './Footer';



class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      renderData: false,
    }
  }

  componentDidMount = async () => {
    try {
      await this.getUserData().then(console.log('State', this.state));
    } catch (err) {
      console.log(err);
    }
  }


  getUserData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/profile`);
    const allData = response.data;
    // console.log('All data from server:', allData);
    allData.map(user => {
      if (user.email === this.state.email) {
        console.log(user);
        this.setState({
          userInfo: user,
          renderData: true,
        }, () => {
          console.log('state has been set');
        });
        return user;
      }
    })
  }

  // ################################################################################################################################################

  // Create a function that will return the cost of a years worth of driving 
  annualGasCost = (distance, gasAPI, carMPG) => {
    distance = 15
    gasAPI = 3.50;
    carMPG = 25;

    // 25 / 15
    // divide MPG with miles to work
    // That will tell us the amount of gallons of gas needed to drive to work
    let gallonsPerTrip = carMPG / distance;

    // Multiply that by 2 for to and from work
    // then get gas API, multiply gas API to gallons needed to drive
    // returned number will be cost of gas per day
    let costPerDay = gallonsPerTrip * 2 * gasAPI;

    // Days driving in a year 52 weeks x 5 days + 1 is 261 days working days a year
    // multiple gas cost by 261 to return annual cost of driving per year to work and home
    let annualCost = costPerDay * 261;
    return annualCost;
  }

  // ################################################################################################################################################

  // Create a function that will compare the two salaries
  compareOffer = (offer1, offer2) => {
    offer1 = 1000
    offer2 = 2000
    // Take in both offer prices, return the difference
    let difference = offer1 - offer2;
    return difference;
  }

  // Comparing a remote vs non remote job
  // This takes in two offers to compare, then the price of gas to drive to work
  // ############# ---- Must have gas cost ------ ###############
  compareRemote = (compare, annualCost) => {
    // take in the difference and minus the gas cost per year
    // returns the difference in cost
    let comparedCost = compare - annualCost;

    // Math.sign returns a 1 or 0 if posstive or negative
    if (Math.sign(comparedCost) === 1) {
      return `You will save ${comparedCost} yearly by taking not driving into work`
    } else {
      return `You will have to spend ${comparedCost} more each year driving if your driving into work`
    }
  }

  render() {
    // console.log('Compare state:', this.state);
    // Preset because no values when first passed in.

    // compare offer takes in offer 1 and offer 2
    let difference = this.compareOffer(parseInt(this.props.userInfo.curSalary), 
    // parseInt(this.props.userInfo.newJob.newSalary)
    99999999
      )

    // annualGasCost takes in commute, gas, MPG
    let annualGas = this.annualGasCost(parseInt(this.props.userInfo.commuteDist), 3.50, parseInt(this.props.userInfo.milesPerGal))

    // CompareRemote takes in results from above functions
    let comparedRemotely = this.compareRemote(difference, annualGas)



    return (
      //   <aside>
      //   Information from Compare:<br />
      //   `Salary: ${this.state.userInfo.curSalary}`
      //   `Commute Distance: ${this.state.userInfo.commuteDist}`
      //   `MPG: ${this.state.userInfo.milesPerGal}`
      //   `Remote: {this.state.userInfo.curRemote ? 'true' : 'false'}`
      //   {console.log('remote?: ', this.state.userInfo.curRemote)}
      // </aside>
      <>

          <Jumbotron className="p-3 mb-2 m-3 bg-secondary text-white" fluid>
            <h1>Hello!</h1>
            <p>
              Select your Offers below to compare them!
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
          {this.state.renderData ?
            <Container >
              <Accordion className="m-4">
                {this.state.userInfo.newJob.map((job, indx) => {
                  return (
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey={String(indx)}>
                        {job.newEmployer}
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={String(indx)}>
                        <Card.Body>
                          Net Gain from taking this position: {this.compareOffer(job.newSalary, this.state.userInfo.curSalary)}
                          <br />
                          New Salary: {job.newSalary}
                          <br />
                          New Job Location: {job.newLocation}
                          <br />
                          Remote? {job.remote ? 'Yes' : "No"}
                          <br />
                          Annual gas cost: {this.annualGasCost(job.newCommuteDist, 3.50, this.state.userInfo.milesPerGal)}
                        </Card.Body>

                      </Accordion.Collapse>

                    </Card>
                  )
                })}
              </Accordion>
            </Container>

            : ''}
        <Footer />

      </>
    )
  }
}

export default Compare;
