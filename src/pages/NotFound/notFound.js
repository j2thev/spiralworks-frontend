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
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h3>Oops!</h3>
          Page not found.
        </Col>
      </Row>
    </R.NotFoundContainer>
  );
}

export default NotFound;

