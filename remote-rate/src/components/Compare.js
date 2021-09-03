import React from 'react';
import Header from './Header';
import Footer from './Footer'
import '../css/Compare.css';

// import { useHistory } from 'react-router-dom';

class Compare extends React.Component {

  // ################################################################################################################################################

  // Create a function that will return the cost of a years worth of driving 
  annualGasCost = (distance, gasAPI, carMPG) => {
    // distance = 15
    // gasAPI = 3.50;
    // carMPG = 25;

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
  
  // ###### Example: ######## 
  // 20 MPG divide 25 miles to work
  // returns 1.25 gallons to work
  // multiply by 2, returns 2.5 gallons to and from work
  // multiply gas API $3.50 x 2.5
  // return 8.75 dollars per day
  
  // annual cost with 261 days of work = 2,283.75 dollars spent on gas going to and from work 
  
  // ################################################################################################################################################

  // Create a function that will compare the two salaries
  compareOffer = (offer1, offer2) => {
    // Take in both offer prices, return the difference
    let difference = offer1 - offer2;
    return Math.abs(difference);
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

  // Trying to make it where once they click a button it will redirect them somewhere else

  // routeChange = (props) => {
  //   let history = useHistory();
  //   props.history.push("/Profile");
  // }

  render() {

    // Preset because no values when first passed in.
    let difference = this.compareOffer(parseInt(this.props.curSalary), 15)
    let annualGas = this.annualGasCost(parseInt(this.props.commuteDist), 3.50, parseInt(this.props.milesPerGal))
    let comparedRemotely = this.compareRemote(difference, annualGas)


    return (
      <>
        <Header />

        <aside>
          Information from Compare:<br/>
            `Salary: ${this.props.curSalary}`
            `Commute Distance: ${this.props.commuteDist}`
            `MPG: ${this.props.milesPerGal}`
          
        </aside>
        {/* <h1>Details and Comparison</h1> */}

        {/* If they want to compare the two offers, run this function */}
        {/* {this.compareRemote(difference, annualGas)} */}

        {/* 
        display 2 offers
        Either one remote, vs in office, or two remote/in-office 
        */}
        <section className="offer1">
          Offer Driving into work<br />

          Offer Price going into office: Offer<br/>
          Gas Price: Gas API<br/>
          Distance to work : Distance
        </section>

        <section className="offer2">
          Offer Remote<br/>

          Offer Price working remote: Offer
        </section>

        {/* Summary at the bottom */}
        <section className="summary">
          Summary<br/>

          If Driving: Cost to work {annualGas}<br/>
          Comparing 2 prices: {difference}<br/>
          Comparing price and returning cost saved or lost while driving/remote {comparedRemotely}<br/>
          StretchGoal-Driving time: Time spent/saved
        </section>


        <Footer />
      </>
      

      //###### Modals #######

      // Here we want to be able to Link a modal

      // Create our first Offer.
      // In that modal we want a possible of:
      //    Drop down of Car MPG
      //    Enter Distance from home and work
      //    Salary Offer

      // ################################################################################################################################################

      // Create a button to go back to their profile after submitting data.
      //    Maybe make them choose to go their profile or add another?

      // ################################################################################################################################################

      // Display data from both offers and make a summary from the numbers lists


    )
  }
}

export default Compare;
