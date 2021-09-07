import React from 'react';
import { Card} from 'react-bootstrap';


class Offer extends React.Component {

  render() {
    return (
      <Card>
        <Card.Header>
          {this.props.employer}
        </Card.Header>
        <Card.Body>
          Salary: {this.props.salary}
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
