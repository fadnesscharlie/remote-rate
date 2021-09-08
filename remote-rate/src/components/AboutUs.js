import React from 'react';
import '../css/AboutUs.css';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

import charlieProfile from '../img/Profile-Pic.JPG'
import zachProfile from '../img/Zachary Final.jpg'
// import philProfile from '../img/Profile-Pic.JPG'
// import quenProfile from '../img/Profile-Pic.JPG'


class AboutUs extends React.Component {
  render() {
    return (
      <>
        <h1>Remote Rate Stars</h1>

        <CardDeck className="imageRow">


          {/* Added CSS to Zach's Do we like it, and do we want to keep it?

          If we want to keep it:
          Add div around Card.Text
          Add className="container" to Card
          Add className="overlay" to Div
          Add className="text" to Card.Text 
          Finally Pick color for Overlay */}

          <Card className="containerAbout">
            <Card.Img className="profImg"  variant="top" src={zachProfile} />
            <Card.Body >
              <Card.Title>Zach Winterton</Card.Title>
            <div className="overlay">
              <Card.Text className="text">
                Veteran, software developer, stock trader. Jack of all trades master of none. I love living out in the boonies of Idaho. Hate dog and pony shows. Love to restore my house when I have the time.
              </Card.Text>
            </div>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Something Random?</small>
            </Card.Footer>
          </Card>


          <Card>
            <Card.Img className="profImg" variant="top" src={charlieProfile} />
            <Card.Body>
              <Card.Title>Charlie Fadness</Card.Title>
              <Card.Text>
                I love hiking, playing games, and watching anime, shows, and movies are some of my favorite things to do when I'm not working. <br/>
                Problem Solver, debugger, helper, motivated by peoples growth.
              </Card.Text>
              <Card.Text>
                Massage Therapist to Software Developer <br/>

                Helping people has always been a thing I love to do! Seeing the joy you can bring to someone is always a wonderful thing. Knowing that I can do that with coding and help/teaching those around me to push ourselves will be something I look forward to!

              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Something Random?</small>
            </Card.Footer>
          </Card>


          {/* Makes them into two rows but can not get the size right */}

          {/* </CardDeck>

          <CardDeck className="imageRow"> */}

          <Card>
            <Card.Img className="profImg" variant="top" src={zachProfile} />
            <Card.Body>
              <Card.Title>Quentin Young</Card.Title>
              <Card.Text>
                Insert Elevator Pitch Summary
              </Card.Text>
              <Card.Text>
                Insert Bio here
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Something Random?</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img className="profImg" variant="top" src={zachProfile} />
            <Card.Body>
              <Card.Title>Phil Murphy</Card.Title>
              <Card.Text>
                Insert Elevator Pitch Summary
              </Card.Text>
              <Card.Text>
                Insert Bio here
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Something Random?</small>
            </Card.Footer>
          </Card>
        </CardDeck>
      </>
    );
  }
}

export default AboutUs;
