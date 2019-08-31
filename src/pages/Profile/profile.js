import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  Alert
} from 'reactstrap';
import * as P from './style';
import { map, has } from 'lodash';
import * as userActions from '../../actions/userActions';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      phoneNo: '',
      firstName: '',
      lastName: '',
      errors: {
        email: '',
        phoneNo: '',
        firstName: '',
        lastName: ''
      },
      alert: {
        color: '',
        message: '',
        visible: false
      }
    }
  }

  componentDidMount() {
    const { email, phoneNo, firstName, lastName } = this.props.user;

    this.setState({
      email,
      phoneNo,
      firstName,
      lastName
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { errors } = this.state;

    switch (name) {
      case 'email':
      case 'phoneNo':
      case 'firstName':
      case 'lastName': {
        Object.assign(errors, { [name]: '' });
        break;
      }
      default: {
        break;
      }
    }

    this.setState({
      [name]: value,
      errors
    });
  }

  validateForm(errors) {
    let valid = true;

    map(errors, (error) => error.length > 0 && (valid = false));

    return valid;
  }

  onShowAlert(alert) {
    this.setState({ alert }, () => {
      setTimeout(() => {
        this.setState({
          alert: {
            visible: false
          }
        });
      }, 5000);
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { save, update } = this.props;
    const { errors } = this.state;

    map(event.target, (node) => {
      const { name, validationMessage } = node;

      Object.assign(errors, { [name]: validationMessage });
    });

    if (this.validateForm(errors)) {
      const { email, phoneNo, firstName, lastName } = this.state;
      const { id } = this.props.user;
      const profile = { email, phoneNo, firstName, lastName };

      save(id, profile)
        .then(result => {
          const alert = {
            color: 'success',
            message: 'Your profile has been saved!',
            visible: true
          };

          this.onShowAlert(alert);

          update(profile);
        })
        .catch(error => {
          const alert = {
            color: 'danger',
            visible: true
          };

          if (has(error, 'response.data.error')) {
            const { errors } = error.response.data.error;
            console.log(error.response.data.error);

            map(errors, (field) => {
              Object.assign(alert, { message: field.message });
            });
          } else {
            Object.assign(alert, { message: error.message });
          }

          this.onShowAlert(alert);
        });
    } else {
      this.setState({ errors });
    }
  }

  render() {
    const { email, phoneNo, firstName, lastName, errors, alert } = this.state;

    return (
      <P.ProfileContainer>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Form onSubmit={this.handleSubmit} noValidate>
              <FormGroup>
                <h3>Profile</h3>
              </FormGroup>
              <FormGroup>
                <Alert color={alert.color} isOpen={alert.visible}>
                  {alert.message}
                </Alert>
              </FormGroup>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  invalid={errors.firstName.length > 0 ? true : false}
                  type="text"
                  value={firstName}
                  required
                  name="firstName"
                  onChange={this.handleChange}
                />
                <FormText color="danger">
                  {errors.firstName}
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  invalid={errors.lastName.length > 0 ? true : false}
                  type="text"
                  value={lastName}
                  required
                  name="lastName"
                  onChange={this.handleChange}
                />
                <FormText color="danger">
                  {errors.lastName}
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  invalid={errors.email.length > 0 ? true : false}
                  type="email"
                  value={email}
                  required
                  name="email"
                  onChange={this.handleChange}
                  error={errors.email} />
                <FormText color="danger">
                  {errors.email}
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label>Phone Number</Label>
                <Input
                  invalid={errors.phoneNo.length > 0 ? true : false}
                  type="phoneNo"
                  value={phoneNo}
                  required
                  pattern="^(09|\+639)\d{9}$"
                  name="phoneNo"
                  onChange={this.handleChange}
                  error={errors.phoneNo}
                />
                <FormText>
                  Format: +639xxxxxxxxx, 09xxxxxxxxx
                </FormText>
                <FormText color="danger">
                  {errors.phoneNo}
                </FormText>
              </FormGroup>
              <Button color="success" block>SAVE YOUR PROFILE</Button>
            </Form>
          </Col>
        </Row>
      </P.ProfileContainer>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
