import React from 'react';
import { Link } from 'react-router-dom';

import axios from '../../axios-users';

class UserProfile extends React.Component {
  state = {
    email: '',
    id: '',
    username: '',
    active: '',
  }

  componentDidMount() {
    if (localStorage.authToken) { // TODO: this is a work around
      this.getUserStatus();
    }
  }

  getUserStatus = () => {
    const options = {
      url: '/auth/status',
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.authToken}`
      }
    }
    axios(options)
      .then(res => {
        console.log(res.data.data);
        this.setState({
          email: res.data.data.email,
          id: res.data.data.id,
          username: res.data.data.username,
          active: String(res.data.data.active)
        })
      })
      .catch(error => { console.log(error) })
  }

  render() {
    if (!this.props.isAuthenticated) {
      return (
        <p>You must be logged in to view this. Click <Link to="/login">here</Link> to log back in.</p>
      )
    }
    return (
      <>
        <ul>
          <li><strong>User ID:</strong> {this.state.id}</li>
          <li><strong>Email:</strong> {this.state.email}</li>
          <li><strong>Username:</strong> {this.state.username}</li>
          <li><strong>Active:</strong> {this.state.active}</li>
        </ul>
      </>
    )
  }
}

export default UserProfile;