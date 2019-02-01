import React from 'react';
import { Link } from 'react-router-dom';

class Logout extends React.Component {

  componentDidMount() {
    this.props.logUserOut();
  }

  render() {
    return (
      <>
        <p>You are now logged out. Click <Link to="/login">here</Link> to log back in.</p>
      </>
    )
  }
}

export default Logout;