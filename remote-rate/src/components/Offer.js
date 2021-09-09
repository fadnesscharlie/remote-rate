import React from 'react';
import { Button, Card } from 'react-bootstrap';


class Offer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        ...this.props.userInfo,
      },
      buttonClicked: false,
    }
  }

  handleClick = () => {
    // Filter through new Jobs and returns back state after newJob is deleted
    let needle = this.props.userInfo.newJob.filter(job => job._id !== this.props.id);
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        newJob: needle,
      },
      buttonClicked: true,
    })
  }

  render() {
    if (this.state.buttonClicked) {
      this.props.deleteOffer(this.state.userInfo);
      this.setState({
        buttonClicked: false,
      });
    };
    return (
      <Card>

        <Button onClick={this.handleClick} >Delete Offer </Button>

        <Card.Header>
          {this.props.employer}
        </Card.Header>
        <Card.Body>
          Salary: {this.props.salary}
          <br />
          Remote: {this.props.remote ? 'Yes' : 'No'}
        </Card.Body>
        <Card.Footer>
          Current Location: {this.props.location}
        </Card.Footer>
      </Card>
    )
  }
}

export default Offer;
