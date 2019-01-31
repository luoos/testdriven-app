import React from 'react';
import { Route, Switch } from 'react-router-dom';

import axios from './axios-users';
import './App.css';
import UsersList from './components/UsersList/UsersList';
import AddUser from './components/AddUser/AddUser';
import About from './components/About/About';
import NavBar from './components/NavBar/NavBar';
import Form from './components/Form/Form';

class App extends React.Component {
  state = {
    users: [],
    username: '',
    email: '',
    formData: {
      username: '',
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  addUser = (event) => {
    event.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email
    }
    axios.post('/api/v1/user', data)
      .then((res) => {
        this.getUsers();
        this.setState({ username: '', email: ''})
      })
      .catch((err) => { console.log(err); })
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

  render() {
    return (
      <>
        <NavBar />
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
                    />
                  )} />

                  <Route exact path='/login' render={() => (
                    <Form
                      formType={'Login'}
                      formData={this.state.formData}
                    />
                  )} />

                  <Route exact path='/' render={() => (
                    <>
                      <h1 className="title is-1">All Users</h1>
                      <hr/><br/>
                      <AddUser
                        username={this.state.username}
                        email={this.state.email}
                        submitForm={this.addUser}
                        handleChange={this.handleChange}/>
                      <br/><br/>
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

export default App;
