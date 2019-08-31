import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';

class PrivateRoute extends Component {
  render() {
    const { component: Component, user, ...rest } = this.props;
    
    return (
      <Route {...rest} render={(props) => (
        user.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to='/login' />
      )}
      />
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(mapStateToProps)(PrivateRoute);
