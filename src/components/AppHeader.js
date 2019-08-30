import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  DropdownItem
} from 'reactstrap';

class AppHeader extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { user } = this.props;
    const { firstName, lastName, isAuthenticated } = user;
    let NavList;

    if (!isAuthenticated) {
      NavList =
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/login">Sign in</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/join">Sign up</NavLink>
          </NavItem>
        </Nav>;
    } else {
      NavList =
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {`${firstName} ${lastName}`}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Profile
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                  Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>;
    }

    return (
      <div>
        <Navbar color="light" light expand="md">
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

AppHeader.propTypes = {
  user: PropTypes.object
}

export default connect(mapStateToProps)(AppHeader);
