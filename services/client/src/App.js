import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import axios from './axios-users';
import './App.css';
import UsersList from './components/UsersList/UsersList';
import About from './components/About/About';
import NavBar from './components/NavBar/NavBar';
import Form from './components/Form/Form';
import Logout from './components/Logout/Logout';

class App extends React.Component {
  state = {
    users: [],
    username: '',
    email: '',
    formData: {
      username: '',
      email: '',
      password: ''
    },
    authToken: null,
  }

  componentDidMount() {
    this.getUsers();
    const token = localStorage.getItem('authToken');
    if (token !== null) {
      this.setState({
        authToken: token
      })
    }
  }

  clearFormState = () => {
    this.setState({
      formData: { username: '', email: '', password: ''},
      username: '',
      email: ''
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  getUsers = () => {
    axios.get('/api/v1/users')
      .then((res) => { this.setState({ users: res.data.data.users })})
      .catch((err) => { console.log(err)})
  }

  handleUserFormSubmit = (event) => {
    event.preventDefault();
    const formType = window.location.href.split('/').reverse()[0];
    let data = {
      email: this.state.formData.email,
      password: this.state.formData.password
    };
    if (formType === 'register') {
      data.username = this.state.formData.username;
    }
    axios.post(`/api/v1/auth/${formType}`, data)
      .then((res => {
        console.log(res.data);
        this.clearFormState();
        localStorage.setItem('authToken', res.data.auth_token);
        this.setState({
          authToken: res.data.auth_token
        });
        this.props.history.replace('/');
        this.getUsers();
      }))
      .catch(err => console.log(err))
  };

  handleFormValueChange = (event) => {
    const obj = this.state.formData;
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  logUserOut = () => {
    localStorage.removeItem('authToken');
    this.setState({authToken: null});
  }

  render() {
    return (
      <>
        <NavBar isAuthenticated={this.state.authToken !== null} />
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-half">
                <br/>
                <Switch>

                  <Route exact path='/about' component={About}/>

                  <Route exact path='/register' render={() => (
                    <Form
                      formType={'Register'}
                      formData={this.state.formData}
                      handleUserFormSubmit={this.handleUserFormSubmit}
                      handleFormValueChange={this.handleFormValueChange}
                    />
                  )} />

                  <Route exact path='/login' render={() => (
                    <Form
                      formType={'Login'}
                      formData={this.state.formData}
                      handleUserFormSubmit={this.handleUserFormSubmit}
                      handleFormValueChange={this.handleFormValueChange}
                    />
                  )} />

                  <Route exact path='/logout' render={() => (
                    <Logout logUserOut={() => this.logUserOut()} />
                  )} />

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

export default withRouter(App);
