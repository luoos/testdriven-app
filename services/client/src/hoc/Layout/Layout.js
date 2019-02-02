import React from 'react';
import { connect } from 'react-redux';

import NavBar from '../../components/NavBar/NavBar';

class Layout extends React.Component {

  render() {
    return (
      <>
        <NavBar isAuthenticated={this.props.isAuthenticated} />
        {this.props.children}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);