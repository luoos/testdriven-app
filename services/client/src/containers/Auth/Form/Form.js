import React from 'react';
import { connect } from 'react-redux';

import { updateObject } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';

import Input from '../../../components/UI/Input/Input';

class Form extends React.Component {
  state = {
    formData: {
      username: '',
      email: '',
      password: ''
    },
    valid: false
  }

  componentDidMount() {
    this.clearForm();
  }

  clearForm = () => {
    this.setState({
      formData: {username: '', email: '', password: ''}
    });
  }

  validateForm = () => {
    this.setState({valid: true});
  }

  handleFormValueChange = (event) => {
    const updatedForm = updateObject(this.state.formData,
      {[event.target.name]: event.target.value});
    this.setState({formData: updatedForm});
    this.validateForm();
  }

  handleUserFormSubmit = (event) => {
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
    this.clearForm();
  }

  render() {
    return (
      <div>
        {this.props.formType === 'Login' &&
          <h1 className="title is-1">Log In</h1>
        }
        {this.props.formType === 'Register' &&
          <h1 className="title is-1">Register</h1>
        }
        <hr/><br/>
        <form onSubmit={(event) => this.handleUserFormSubmit(event)}>
          {this.props.formType === 'Register' &&
            <Input
              label="Username"
              name="username"
              type="text"
              size="large"
              icon="user"
              placeholder="Enter a username"
              required={true}
              value={this.state.formData.username}
              handleChange={this.handleFormValueChange}
            />
          }
          <Input
            label="Email"
            name="email"
            type="email"
            size="large"
            icon="envelope"
            placeholder="Enter an email address"
            required={true}
            value={this.state.formData.email}
            handleChange={this.handleFormValueChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            size="large"
            icon="lock"
            placeholder="Enter a password"
            required={true}
            value={this.state.formData.password}
            handleChange={this.handleFormValueChange}
          />
          <br/>
          <input
            type="submit"
            className="button is-primary is-large is-fullwidth"
            value="submit"
            disabled={!this.state.valid}
          />
        </form>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup, username) => dispatch(
      actions.auth(email, password, isSignup, username)
    ),
  }
}

export { Form }; // work around

export default connect(null, mapDispatchToProps)(Form);