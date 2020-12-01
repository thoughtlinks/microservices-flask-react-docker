import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'
import moment from 'moment'

import UsersList from './components/UsersList'
import About from './components/About'
import NavBar from './components/NavBar'
import Form from './components/forms/Form'
import Logout from './components/Logout'
import UserStatus from './components/UserStatus'

const cookies = new Cookies()

class App extends Component {
  constructor() {
    super()
    this.state = {
      users: [],
      username: '',
      email: '',
      title: 'TestDriven.io',
      isAuthenticated: false
    }
    // this.addUser = this.addUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
    this.loginUser = this.loginUser.bind(this)
  }

  componentDidMount() {
    this.getUsers()

    if (cookies.get('authToken')) {
      this.setState({ isAuthenticated: true })
    }
  }

  getUsers() {
    axios
      .get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
      .then((res) => {
        this.setState({ users: res.data.data.users })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // addUser(event) {
  //   event.preventDefault()
  //   const data = {
  //     username: this.state.username,
  //     email: this.state.email
  //   }
  //   axios
  //     .post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
  //     .then((res) => {
  //       this.getUsers()
  //       this.setState({ username: '', email: '' })
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  logoutUser() {
    cookies.remove('authToken')
    this.setState({ isAuthenticated: false })
  }

  loginUser(token) {
    cookies.set('authToken', token, {
      path: '/',
      expires: moment(new Date()).add(1, 'hour').toDate()
    })
    this.setState({ isAuthenticated: true })
    this.getUsers()
  }

  render() {
    const { isAuthenticated } = this.state
    return (
      <div>
        <NavBar title={this.state.title} isAuthenticated={isAuthenticated} />
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-half">
                <br />
                {/* new */}
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <UsersList users={this.state.users} />}
                  />
                  <Route exact path="/about" component={About} />
                  <Route
                    exact
                    path="/register"
                    render={() => (
                      <Form
                        formType={'Register'}
                        isAuthenticated={this.state.isAuthenticated}
                        loginUser={this.loginUser}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/login"
                    render={() => (
                      <Form
                        formType={'Login'}
                        isAuthenticated={this.state.isAuthenticated}
                        loginUser={this.loginUser}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/logout"
                    render={() => (
                      <Logout
                        logoutUser={this.logoutUser}
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/status"
                    render={() => (
                      <UserStatus
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default App
