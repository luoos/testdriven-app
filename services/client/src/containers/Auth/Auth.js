import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Form from './Form/Form';

class Auth extends React.Component {

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <Form
        formType={this.props.formType}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  }
}



export default connect(mapStateToProps)(Auth);