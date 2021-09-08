import React from 'react';
import { Button, Card} from 'react-bootstrap';


class Offer extends React.Component {

  render() {
    return (
      <Card>

        {/* <Button onClick={() => this.props.deleteOffer(this.props.id)} >Delete Offer </Button> */}
        <Card.Header>
          {this.props.employer}
        </Card.Header>
        <Card.Body>
          Salary: {this.props.salary}
          <br />
          Remote: {this.props.remote ? 'Yes' : 'No'}
        </Card.Body>
        <Card.Footer>
          {this.props.location}
        </Card.Footer>
      </Card>
    )
  }
}

export default Offer;
