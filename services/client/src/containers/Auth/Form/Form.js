import React from 'react';
import { connect } from 'react-redux';

import { updateObject } from '../../../shared/utility';
import * as actions from '../../../store/actions/index';

class Form extends React.Component {
  state = {
    formData: {
      username: '',
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    this.clearForm();
  }

  clearForm = () => {
    this.setState({
      formData: {username: '', email: '', password: ''}
    });
  }

  handleFormValueChange = (event) => {
    const updatedForm = updateObject(this.state.formData,
      {[event.target.name]: event.target.value});
    this.setState({formData: updatedForm});
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
            <div className="field">
              <label className="label is-large">Username</label>
              <div className="control has-icons-left">
                <input
                  name="username"
                  className="input is-large"
                  type="text"
                  placeholder="Enter a username"
                  required
                  value={this.state.formData.username}
                  onChange={this.handleFormValueChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>
          }
          <div className="field">
            <label className="label is-large">Email</label>
            <div className="control has-icons-left">
              <input
                name="email"
                className="input is-large"
                type="email"
                placeholder="Enter an email address"
                autoComplete="email"
                required
                value={this.state.formData.email}
                onChange={this.handleFormValueChange}
              />
              <span className="icon is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label is-large">Password</label>
            <div className="control has-icons-left">
              <input
                name="password"
                className="input is-large"
                type="password"
                placeholder="Enter a password"
                autoComplete="current-password"
                required
                value={this.state.formData.password}
                onChange={this.handleFormValueChange}
              />
              <span className="icon is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>
          <br/>
          <input
            type="submit"
            className="button is-primary is-large is-fullwidth"
            value="submit"
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