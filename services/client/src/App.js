import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from './axios-users';
import './App.css';
import About from './components/About/About';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/index';
import UserProfile from './containers/UserProfile/UserProfile';
import Posts from './containers/Posts/Posts';

class App extends React.Component {
  state = {
    users: [],
  }

  componentWillMount() {
    this.props.onTryAutoLogin();
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios.get('/users')
      .then((res) => { this.setState({ users: res.data.data.users })})
      .catch((err) => { console.log(err)})
  }

  render() {
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column">
                <Switch>

                  <Route exact path='/about' component={About}/>

                  <Route exact path='/register' render={() => (
                    <Auth formType={'Register'} />
                  )} />

                  <Route exact path='/login' render={() => (
                    <Auth formType={'Login'} />
                  )} />

                  <Route exact path='/logout' component={Logout}/>

                  <Route exact path='/profile' render={() => (
                    <UserProfile isAuthenticated={this.props.isAuthenticated} />
                  )}/>

                  <Route path='/posts' component={Posts} />

                  <Route exact path='/' render={() => (<Redirect to="/posts?page=1" />)}/>

                </Switch>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
