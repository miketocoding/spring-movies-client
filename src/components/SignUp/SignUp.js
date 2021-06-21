import React, { Component } from 'react'
// the route props are props passed to components rendered by react router. They are:
// 1. match - allows us to get route parameters
// 2. history - allows us to change the current url (like redirect)
// 3. location - allows us to get info about the current page

// We import withRouter, to give signUp access to the `route props`
import { withRouter } from 'react-router-dom'

// import the signUp and signIn axios functions
import { signUp, signIn } from '../../api/auth'

// import our messages to use with our msgAlert
import messages from '../AutoDismissAlert/messages'

// import a Form and Button from `react-bootstrap`
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // keep track of the email, password, and passwordConfirmation in state
      // Start these pieces of state as empty strings so we can type into these inputs
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  // handleChange = event => this.setState({
  //   [event.target.name]: event.target.value
  // })

  // this function, is in charge of updating our state, when we type into our inputs
  handleChange = event => {
    // event.target is the element that caused the `change` event, which is the `input`
    // set the state with the input's name (event.target.name). Refers to name="email" on form control (email/password)
    // set name to the input's new value (event.target.value, ex ff@f)
    console.log('event.target is', event.target)
    console.log('event.target.name is', event.target.name)
    console.log('event.target.value is', event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })

    // // this is the longhand of the above
    // // this creates an object and sets a property in 2 lines as opposed to 1
    // const stateChange = {}
    // stateChange[event.target.name] = event.target.value
    //
    // // then updates our state
    // this.setState(stateChange)
  }

  // this is run whenever our form is submitted
  onSignUp = event => {
    event.preventDefault()

    // destructure our props, so it is easier to see our intent
    // msgAlert & setUser are passed down from out App.js
    // while history comes from withRouter
    const { msgAlert, history, setUser } = this.props

    // Make a signUp axios call, pass it our credentials (this.state)
    signUp(this.state)
      // if we signed up successfully, then sign in
      .then(() => signIn(this.state))
      // if we signed in successfully, set the user to the one in ourresponse's data (res.data.user)
      .then(res => setUser(res.data.user))
      // call msgAlert to show a message that we signed up successfully
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success'
      }))
      // .push is similar to <redirect to='/' />
      // only difference is back button
      // then send the user to the home page ('/')
      .then(() => history.push('/'))
      .catch(error => {
        // sets email. password, pconf to it's original value
        // if an error occured, clear our credentials by setting them to their original values
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        // show an error message
        msgAlert({
          // add the actual error message to the end of the title (for more tech savy users)
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    // desctructure the state, so we can show our intent more easily
    const { email, password, passwordConfirmation } = this.state

    return (
      // use the bootstrap grid by adding a row class inside of a container (in App.js)
      <div className="row">
        {/* Make the form responsive.
          on xs screens, take up all the columns.
          on small screens, take up 10/12 columns.
          on medium screens and up, take up 8/12 columns.

          mx-auto sets the x asix (left and right) margin automatically
              (this sets them to be the same which centers the form)
          mt-5 means set the top margin to a lot (5 is a lot, 0 is none) */}
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign Up</h3>
          {/* This is like a normal, `form`, but prettier. It still has onSubmit */}
          <Form onSubmit={this.onSignUp}>
            {/* A form group wraps a form control (input), its label, and help (or validation) text */}
            <Form.Group controlId="email">
              {/* This is our form control (input)'s label. needed for accessibility' */}
              <Form.Label>Email address</Form.Label>
              {/* A form control allows us to enter data into a form. Such an `input`, `select`, or `textarea`. */}
              <Form.Control
                // the following properties are the same from `react-crud` for inputs
                required
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                // anytime a change occurs, call `this.handleChange` to update our email's state
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            {/* Submit our form with a pretty bootstrap button. Use our primary color */}
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

// call withRouter so SignUp has access to the `route props`
export default withRouter(SignUp)
