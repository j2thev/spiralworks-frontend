import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from 'reactstrap';
import * as userActions from '../actions/userActions';
import history from '../utils/history';

class AppHeader extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onSignUp = this.onSignUp.bind(this);

    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onLogout() {
    const { logout } = this.props;

    logout();
  }

  onSignUp() {
    history.push('/join');
  }

  render() {
    const { user } = this.props;
    const { isAuthenticated } = user;
    let NavList;

    if (!isAuthenticated) {
      NavList =
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/login">Sign in</NavLink>
          </NavItem>
          <NavItem>
            <Button color="secondary" outline={true} onClick={this.onSignUp}>Sign Up</Button>
          </NavItem>
        </Nav>;
    } else {
      NavList =
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/profile">Profile</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={this.onLogout}>
                  Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>;
    }

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="#">Spiralworks</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {NavList}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActions, dispatch);
};

AppHeader.propTypes = {
  user: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
