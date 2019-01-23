import React from 'react';

const AddUser = (props) => {
  return (
    <form onSubmit={(event) => props.submitForm(event)}>
      <div className="field">
        <label className="label is-large">Username</label>
        <div className="control has-icons-left">
          <input 
            name="username"
            className="input is-large"
            type="text"
            placeholder="Enter a username"
            required
            value={props.username}
            onChange={props.handleChange}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label is-large">Email</label>
        <div className="control has-icons-left">
          <input 
            name="email"
            className="input is-large"
            type="email"
            placeholder="Enter an email address"
            required
            value={props.email}
            onChange={props.handleChange}
          />
          <span className="icon is-left">
            <i className="fas fa-envelope"></i>
          </span>
        </div>
      </div>
      <input 
        type="submit"
        name="submit"
        className="button is-primary is-large is-fullwidth"
        value="Submit"
      />
    </form>
  );
};

export default AddUser;