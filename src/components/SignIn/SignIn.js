import React, { Component } from 'react'
// Route props are props passed to components rendered by react router.
// they are:
// 1. Match - allows us to get route parameters
// 2. History = allows us to change the current url (like redirect)
// 3. Location - allows us to get info about the current page

// we import withRouter, to give signIn access to the `route props`
import { withRouter } from 'react-router-dom'

// import the signIn Acios functions
import { signIn } from '../../api/auth'

// import our messages to use with our msgAlert
import messages from '../AutoDismissAlert/messages'

// import a Form and Button from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignIn extends Component {
  constructor (props) {
    super(props)

    // Like signUp but we don't sign up
    this.state = {
      // keep track of the email and password in state
      // start these pieces of state as empty strings so we can type into these inputs
      email: '',
      password: ''
    }
  }

  // function in charge of updating our state, when we type into inputs
  handleChange = event => this.setState({
    // event.target is the element that caused the `change` event, which is the `input`
    [event.target.name]: event.target.value
  })

  // this is run whenever our form is submitted
  onSignIn = event => {
    event.preventDefault()

    // desctructure our props
    // msgAlert & setUser are passed down from out App.js
    // while history comes from withRouter
    const { msgAlert, history, setUser } = this.props

    // Make a signUp axios call, pass it our credentials (this.state)
    signIn(this.state)
      // if we signed up successfully, set user to response data
      .then(res => setUser(res.data.user))
      // call msgAlert to show a message that we signed up successfully
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          // add the actual error message to the end of the title (for more tech savy users)
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign In</h3>
          <Form onSubmit={this.onSignIn}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
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

export default withRouter(SignIn)
