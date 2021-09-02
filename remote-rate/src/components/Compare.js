import React from 'react';
// import './Compare.css';
import Header from './Header';

class Compare extends React.Component {
  render() {
    return (
      <>
      <Header />
      <h1>Details and Comparison</h1>
      </>
      // Here we will do most of the math and functions

      // display 2 offers
      // Either one remote, vs in office, or two remote/in-office

      // Summary at the bottom


      //###### Modals #######

      // Here we want to be able to Link a modal

      // Create our first Offer.
      // In that modal we want a possible of:
      //    Drop down of Car MPG
      //    Enter Distance from home and work
      //    Salary Offer

      // ################################################################################################################################################

      // Create a function that will return the cost of a years worth of driving 

      // divide MPG with miles to work
      // That will tell us the amount of gallons of gas needed to drive to work
      // Multiply that by 2 for to and from work
      // then get gas API, multiply gas API to gallons needed to drive
      // returned number will be cost of gas per day

      // Days driving in a year 52 weeks x 5 days + 1 is 261 days working days a year

      // multiple gas cost by 261 to return annual cost of driving per year to work and home

      // ###### Example: ######## 
      // 20 MPG divide 25 miles to work
      // returns 1.25 gallons to work
      // multiply by 2, returns 2.5 gallons to and from work
      // multiply gas API $3.50 x 2.5
      // return 8.75 dollars per day

      // annual cost with 261 days of work = 2,283.75 dollars spent on gas going to and from work 

      // ################################################################################################################################################

      // Create a function that will compare the two salaries

      // Depending on wether they enter remote vs non remote or non remote vs non remote
      // Take in both offer prices, return the difference
      // Minus gas price to divided offer to return either postive or negative number

      
      // ################################################################################################################################################
      
      // Create a button to go back to their profile after submitting data.
      //    Maybe make them choose to go their profile or add another?
      
      // ################################################################################################################################################

      // Display data from both offers and make a summary from the numbers lists


    )
  }
}

export default Compare;
