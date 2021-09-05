import React from 'react';
import '../css/Compare.css';



class Compare extends React.Component {




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
      <>
        <aside>
          Information from Compare:<br />
          `Salary: ${this.props.userInfo.curSalary}`
          `Commute Distance: ${this.props.userInfo.commuteDist}`
          `MPG: ${this.props.userInfo.milesPerGal}`
          `Remote: {this.props.userInfo.curRemote ? 'true' : 'false'}`

        </aside>

        {/* 
        display 2 offers
        Either one remote, vs in office, or two remote/in-office 
        */}
        <p className="offer1">
          <p className="offer10">
            Offer Driving into work<br />

            Offer Price going into office: Offer<br />
            Gas Price: Gas API<br />
            Distance to work : Distance

          </p>
        </p>

        <p className="offer2">
          Offer Remote<br />
          {this.props.userInfo.curRemote ? 'Currently Remote' : 'Currently Not Remote'}<br />
          Offer Price working remote: Offer
        </p>

        {/* Summary at the bottom */}
        <p className="summary">
          Summary<br />

          {
            this.props.userInfo.curRemote ?
              // If working Remote
              <p>If you had to Drive: Cost to drive to work would be: {annualGas} annually <br />
                The difference between your two offers is:  {difference} <br />
                {comparedRemotely}<br />
                StretchGoal-Driving time: Time spent/saved'</p> :

              // If not working Remote
              <p>Driving to work will cost you {annualGas} annually <br />
                The difference inbetween your offers is {difference} <br />
                {comparedRemotely} <br />
                Distance from two locations: {this.props.userInfo.commuteDist}<br />
                StretchGoal-Driving time: Time spent/saved'</p>
          }
        </p>
      </>
    )
  }
}

export default Compare;
