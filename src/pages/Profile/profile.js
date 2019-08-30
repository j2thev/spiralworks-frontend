import React, { Component } from 'react';
import {
  Row,
  Col
} from 'reactstrap';
import * as P from './style';

class Profile extends Component {
  render() {
    return (
      <P.ProfileContainer>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h4>Profile</h4>
          </Col>
        </Row>
      </P.ProfileContainer>
    );
  }
}

export default Profile;


