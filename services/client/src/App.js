import React from 'react';

import axios from './axios-users';
import './App.css';
import UsersList from './components/UsersList/UsersList';
import AddUser from './components/AddUser/AddUser';

class App extends React.Component {
  state = {
    users: [],
    username: '',
    email: ''
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
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <br/>
              <h1 className="title is-1">All Users</h1>
              <hr/><br/>
              <AddUser
                username={this.state.username}
                email={this.state.email}
                submitForm={this.addUser}
                handleChange={this.handleChange}/>
              <br/><br/>
              <UsersList users={this.state.users} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
