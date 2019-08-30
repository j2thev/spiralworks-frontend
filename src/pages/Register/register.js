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
import * as R from './style';
import { map, has } from 'lodash';
import * as userActions from '../../actions/userActions';

class Register extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      phoneNo: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      errors: {
        email: '',
        phoneNo: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: ''
      },
      alert: {
        color: '',
        message: '',
        visible: false
      }
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { errors, password } = this.state;

    switch (name) {
      case 'email':
      case 'phoneNo': 
      case 'firstName':
      case 'lastName':
      case 'password': {
        Object.assign(errors, { [name]: '' });
        break;
      }
      case 'confirmPassword': {
        Object.assign(errors, {
          confirmPassword: (password === value) ? '' : `Password doesn't match`
        });
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

    const { create } = this.props;
    const { errors } = this.state;

    map(event.target, (node) => {
      const { name, validationMessage } = node;
      const value = (name === 'confirmPassword') ? (errors.confirmPassword || validationMessage) : validationMessage;

      Object.assign(errors, { [name]: value });
    });

    if (this.validateForm(errors)) {
      const { email, phoneNo, firstName, lastName, password } = this.state;
      const user = { email, phoneNo, firstName, lastName, password };

      create(user)
        .then(result => {
          const alert = {
            color: 'success',
            message: 'Your account has been successfully created!',
            visible: true
          };

          this.onShowAlert(alert);
        })
        .catch(error => {
          const alert = {
            color: 'danger',
            visible: true
          };

          if (has(error, 'response.data.error')) {
            const { errors } = error.response.data.error;
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
    const { email, phoneNo, firstName, lastName, password, confirmPassword, errors, alert } = this.state;

    return (
      <R.RegisterContainer>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Form onSubmit={this.handleSubmit} noValidate>
              <FormGroup>
                <h4>Create your personal account</h4>
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
                <Label>Phone Number (Format: +639 or 09 xxxxxxxxx)</Label>
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
                <FormText color="danger">
                  {errors.phoneNo}
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  invalid={errors.password.length > 0 ? true : false}
                  type="password"
                  value={password}
                  required
                  name="password"
                  onChange={this.handleChange}
                />
                <FormText color="danger">
                  {errors.password}
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label>Confirm Password</Label>
                <Input
                  invalid={errors.confirmPassword.length > 0 ? true : false}
                  type="password"
                  value={confirmPassword}
                  required
                  name="confirmPassword"
                  onChange={this.handleChange}
                />
                <FormText color="danger">
                  {errors.confirmPassword}
                </FormText>
              </FormGroup>
              <Button color="success" block>Create an account</Button>
            </Form>
          </Col>
        </Row>
      </R.RegisterContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActions, dispatch);
};

export default connect(null, mapDispatchToProps)(Register);
