import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from './axios-users';
import './App.css';
import UsersList from './components/UsersList/UsersList';
import About from './components/About/About';
import NavBar from './components/NavBar/NavBar';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends React.Component {
  state = {
    users: [],
    username: '',
    email: '',
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios.get('/api/v1/users')
      .then((res) => { this.setState({ users: res.data.data.users })})
      .catch((err) => { console.log(err)})
  }

  render() {
    return (
      <>
        <NavBar isAuthenticated={this.props.isAuthenticated} />
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-half">
                <br/>
                <Switch>

                  <Route exact path='/about' component={About}/>

                  <Route exact path='/register' render={() => (
                    <Auth formType={'Register'} />
                  )} />

                  <Route exact path='/login' render={() => (
                    <Auth formType={'Login'} />
                  )} />

                  <Route exact path='/logout' component={Logout}/>

                  <Route exact path='/' render={() => (
                    <>
                      <h1 className="title is-1">All Users</h1>
                      <hr/><br/>
                      <UsersList users={this.state.users} />
                    </>
                  )} />

                </Switch>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default withRouter(connect(mapStateToProps)(App));
