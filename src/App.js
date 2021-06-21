import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

// uuid - Universally Unique ID
// This imports the fourth version of the universally unique id package
// 'v4 as uuid' means that in App.js, we'll refer to 'v4' as uuid
// this is the same as:
// const uuid = require('uuid').v4
// instead of having to write uuid everytime, the as makes it so you can just state v4 and that will represent uuid
import { v4 as uuid } from 'uuid'

// Import all of our components
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // keep track of the signed in user we get back from the API
      // the user state initially be null (since we aren't signed in)
      user: null,
      // These are the messages we want to show our user. Initially, we don't have any messages hence the empty array
      msgAlerts: []
    }
  }

  // This function accepts a user and then sets the user's state to that parameter. (used in signIn/signUp)
  // set user state as the value of user. same as {user: user}
  // takes user parameter
  setUser = user => this.setState({ user })

  // clearUser will reset the user state back to it's inital value of null
  // (used in SignOut)
  // SignOut sets user back to null
  clearUser = () => this.setState({ user: null })

  // Accepts an id, so we know which msgAlert to delete
  deleteAlert = (id) => {
    // set the `msgAlerts` state
    // set the `msgAlerts` to what it used to be (state.msgAlerts)
    // but filter for the messages which don't have the id we are trying to delete
    // filter out the one for the id we're trying to get rid of
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  // function called anytime we see a message on the screen
  // accepts 3 different things
  // heading - title of the alert (what we see at the top)
  // message - body of alert
  // variant - bootstrap varient (color) to use (success, danger, primary, secondary)
  msgAlert = ({ heading, message, variant }) => {
    // create a unique id for this message alert
    // 1. used for the `key` attribute in a loop
    // 2. used in `deleteAlert` so we know which message to delete
    const id = uuid()
    // set the `msgAlerts` state
    // to be the existing `msgAlerts` (...state.msgAlerts)
    // similar to a push but instead of modifying, creating new array
    // and a new `msgAlerts` ({heading, message, variant, id})

    // We have to use setState and a new array when updating `msgAlerts`
    // because the first rule of using state correctly, is to never modify state directly. which adding an element to the end with `push` would do.
    // https://reactjs.org/docs/state-and-lifecycle.html#do-not-modify-state-directly
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    // destructure our state, so we can show our intent more easily
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {/* msgAlerts is an array to later be filled with object */}
        {/* Map each msgAlert into an AutoDissmissAlert component */}
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            // the key attribute will be the msgAlert's unique id
            key={msgAlert.id}

            // pass down these props to show the allert
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}

            // pass down these props, to eventually remove the alert
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}

        {/* Notice how we can use a regular bootstrap class. to center our content */}
        <main className="container">

          {/* Similar routes to the react-router lesson.
            We ahve to use `render props` instead of `component` prop
            to pass down the `msgAlert` and `setUser` props */}
          <Route path='/sign-up' render={() => (
            // we pass the signUp component msgAlert to show success/failure messages and setUser to keep track of the user (for their token & email)
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          {/* Same as sign up, but using signIn component and /sign-in path */}
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          {/* An authenticatedRoute is like a Route, but it redirects you to the homepage if you aren't signed in.
          you *must* pass it a `user` (so it knows if you're signed in) */}
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            // since changePassword needs to make authenticatedrequests, pass down the `user` as a prop
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
