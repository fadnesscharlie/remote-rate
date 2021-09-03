import React from 'react';
import { Card} from 'react-bootstrap';


class Offer extends React.Component {

  render() {
    return (
      <Card>
        <Card.Header>
          Job Offer title here
        </Card.Header>
        <Card.Body>
          Offer details here
        </Card.Body>
        <Card.Footer>
          Closing footer here. Address? Contact info?
        </Card.Footer>
      </Card>
    )
  }
}

export default Offer;
