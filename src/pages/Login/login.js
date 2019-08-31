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
import * as L from './style';
import * as userActions from '../../actions/userActions';
import { map, isEmpty } from 'lodash';
import history from '../../utils/history';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: '',
      password: '',
      errors: {
        username: '',
        password: ''
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
    const { errors } = this.state;

    switch(name) {
      case 'username':
      case 'password': {
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
    }, () => console.log(this.state));
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

  validateForm(errors) {
    let valid = true;

    map(errors, (error) => error.length > 0 && (valid = false));

    return valid;
  }

  handleSubmit(event) {
    event.preventDefault();

    const { login, update } = this.props;
    const { username, password, errors } = this.state;
    const user = { username, password };

    map(event.target, (node) => {
      const { name, validationMessage } = node;

      Object.assign(errors, { [name]: validationMessage });
    });

    if (this.validateForm(errors)) {
      login(user)
        .then(result => {
          const { data } = result.data;

          if (!isEmpty(data)) {
            const { _id: id, email, phoneNo, firstName, lastName } = data;
            const user = {
              id,
              email,
              phoneNo,
              firstName,
              lastName,
              isAuthenticated: true
            };

            update(user);

            history.push('/profile');
          } else {
            const alert = {
              color: 'danger',
              message: 'Incorrect username or password',
              visible: true
            };

            this.onShowAlert(alert);
          }
        })
        .catch(error => {
          const { message } = error;
          const alert = {
            color: 'danger',
            message,
            visible: true
          };

          this.onShowAlert(alert);
        });
    } else {
      this.setState({ errors });
    }

  }

  render() {
    const { username, password, errors, alert } = this.state;

    return (
      <L.LoginContainer>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <Form onSubmit={this.handleSubmit} noValidate>
              <FormGroup>
                <h3>Sign in</h3>
              </FormGroup>
              <FormGroup>
                <Alert color={alert.color} isOpen={alert.visible}>
                  {alert.message}
                </Alert>
              </FormGroup>
              <FormGroup>
                <Label>Email or Phone Number</Label>
                <Input
                  invalid={errors.username.length > 0 ? true : false}
                  type="text"
                  required
                  name="username"
                  value={username}
                  autoFocus
                  onChange={this.handleChange}
                />
                <FormText color="danger">
                  {errors.username}
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  invalid={errors.password.length > 0 ? true : false}
                  type="password"
                  required
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <FormText color="danger">
                  {errors.password}
                </FormText>
              </FormGroup>
              <Button block color="primary">SIGN IN</Button>
            </Form>
          </Col>
        </Row>
      </L.LoginContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActions, dispatch);
};

export default connect(null, mapDispatchToProps)(Login);
