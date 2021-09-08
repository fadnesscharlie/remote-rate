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
    let needle = this.props.userInfo.newJob.filter(job => job._id !== this.props.id);
    console.log('needle', needle);

    console.log('userInfo: ', this.props.userInfo);
    console.log('job ID', this.props.id);
    console.log('state of userinfo', this.state.userInfo);
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        newJob: needle,
      },
      buttonClicked: true,
    })
    // this.props.deleteOffer(this.state.userInfo, needle)
  }

  render() {
    console.log('after changed state', this.state.userInfo);
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
          Remote: {this.props.remote}
        </Card.Body>
        <Card.Footer>
          {this.props.location}
        </Card.Footer>
      </Card>
    )
  }
}

export default Offer;
