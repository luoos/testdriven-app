import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { updateObject } from '../../shared/utility';
import * as actions from '../../store/actions/index';

import Form from '../../components/Form/Form';

class Auth extends React.Component {
  state = {
    formData: {
      username: '',
      email: '',
      password: ''
    }
  }

  handleFormValueChange = (event) => {
    const updatedForm = updateObject(this.state.formData,
      {[event.target.name]: event.target.value});
    this.setState({formData: updatedForm});
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const formType = window.location.href.split('/').reverse()[0];
    let data = {...this.state.formData};
    if (formType === 'register') {
      this.props.onAuth(data.email, data.password, true, data.username);
    } else if (formType === 'login') {
      this.props.onAuth(data.email, data.password, false);
    } else {
      console.error(`No action for ${formType}`);
    }
    this.setState({formData: {username: '', email: '', password: ''}}); // TODO: may be deleted
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <Form
        formType={this.props.formType}
        formData={this.state.formData}
        handleUserFormSubmit={this.handleFormSubmit}
        handleFormValueChange={this.handleFormValueChange}
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

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup, username) => dispatch(
      actions.auth(email, password, isSignup, username)
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);