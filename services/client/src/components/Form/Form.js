import React from 'react';

const Form = (props) => {
  return (
    <div>
      {props.formType === 'Login' &&
        <h1 className="title is-1">Log In</h1>
      }
      {props.formType === 'Register' &&
        <h1 className="title is-1">Register</h1>
      }
      <hr/><br/>
      <form onSubmit={(event) => props.handleUserFormSubmit(event)}>
        {props.formType === 'Register' &&
          <div className="field">
            <label className="label is-large">Username</label>
            <div className="control has-icons-left">
              <input
                name="username"
                className="input is-large"
                type="text"
                placeholder="Enter a username"
                required
                value={props.formData.username}
                onChange={props.handleFormValueChange}
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
              value={props.formData.email}
              onChange={props.handleFormValueChange}
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
              value={props.formData.password}
              onChange={props.handleFormValueChange}
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
};

export default Form;