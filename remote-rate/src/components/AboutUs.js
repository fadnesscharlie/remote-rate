import React from 'react';
import '../css/AboutUs.css';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import { Carousel, Container, Jumbotron } from 'react-bootstrap'
import charlieProfile from '../img/Profile-Pic.JPG'
import zachProfile from '../img/Zachary Final.jpg'
import quenProfile from '../img/Quen.JPG'
import philProfile from '../img/phil-pic.jpg'
// import quenProfile from '../img/Profile-Pic.JPG'


class AboutUs extends React.Component {
  render() {
    return (
      <>
        <Jumbotron className="mt-3 shadow-lg p-3 mb-5 rounded aboutUsJumbotron border">
          <h1>Remote Rate, Starring:</h1>

        </Jumbotron>
        <Container>
          <Carousel className=" m-auto w-50">
            <Carousel.Item>
              <img
                className="d-block w-100 min-vh-50"
                src={zachProfile}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Zach Winterton</h3>
                <p>Veteran, software developer, stock trader. Jack of all trades master of none. I love living out in the boonies of Idaho. Hate dog and pony shows. Love to restore my house when I have the time.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={charlieProfile}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Charlie Fadness</h3>
                <p>Problem Solver, debugger, helper, motivated by peoples growth

                  Massage Therapist to Software Developer


                  Cat Lover, problem solver, debugger
                  I love to help others by teaching and seeing their growth</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={philProfile}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Phil Murphy</h3>
                <p>Veteran, software developer, father of two daughters and a son on the way! I'm love golf, basketball, and playing soccer with my daughters. In my spare time I like to... nevermind, between CodeFellows and work I don't have spare time 🤪</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={quenProfile}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Quentin Young</h3>
                <p>I grew up on a dairy farm in the hills of  Vermont. In 2013, I enlisted in the Navy directly after graduating from the University of New Hampshire. I\'ve always enjoyed math and logic. I decided to pursue software and not only start a career in development, but to pursue my masters in engineering. Outside of writing software I\'m a marathoner (Boston Marathon qualifier), mountaineer (Mt. Whitney, highest in lower 48), and skier! I\'m currently training for an Ultra Marathon in the Olympic mountains this fall.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>
      </>
    );
  }
}

export default AboutUs;
