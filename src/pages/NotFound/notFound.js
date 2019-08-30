import React from 'react';
import {
  Row,
  Col
} from 'reactstrap';
import * as R from './style';

function NotFound() {
  return (
    <R.NotFoundContainer>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h5>Oops!</h5>
          Page not found.
        </Col>
      </Row>
    </R.NotFoundContainer>
  );
}

export default NotFound;

