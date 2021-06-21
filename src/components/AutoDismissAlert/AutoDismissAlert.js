import React from 'react'
// import a bootstrap Alert
import Alert from 'react-bootstrap/Alert'

// add a custom stylesheet for the AutoDismissAlert component
import './AutoDismissAlert.scss'

// class component, not destructuring
class AutoDismissAlert extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // initial state is to show alert
      // add `show` state which will show our Alert when true
      show: true
    }

    // this will be used to cancel the timer, by default start at null
    // (since the timer hasn't been started yet)
    this.timeoutId = null
  }

  // When the component first shows up (is mounted)
  // mounted - created and inserted into the DOM
  componentDidMount () {
    // Run the `this.handleClose` function after 5 seconds (5000 milliseconds)
    this.timeoutId = setTimeout(this.handleClose, 5000)
  }

  // When the component is removed from the screen (unmounted)
  // (unmount - removed from the DOM)
  componentWillUnmount () {
    // Whenever component removed from dom, we want to stop the timer
    // Stop our timer, by passing it the timer's id
    // We need to make sure `handleClose` doesn't run if our component has been unmounted. If our component has been unmounted, trying to set its state will cause a bug.
    clearTimeout(this.timeoutId)
  }

  // this method sets the show state to false
  handleClose = () => this.setState({ show: false })

  render () {
    // Destructure our props
    const { variant, heading, message, deleteAlert, id } = this.props

    // Delete this alert after the fade animation time (300 ms by default)
    if (!this.state.show) {
      setTimeout(() => {
        // need to give it ID of which alert we want it to remove
        // we must pass `deleteAlert` the id of the alert we want to remove
        deleteAlert(id)
      }, 300)
    }

    return (
      <Alert
        // this adds an `x` to dismiss (close) the alert
        dismissible
        // if the `show` state is true, show our Alert
        show={this.state.show}

        variant={variant}
        // when someone clicks on the `x`, stop showing the alert
        onClose={this.handleClose}
      >
        <div className="container">
          {/* This adds a title (heading) for our alert */}
          <Alert.Heading>
            {heading}
          </Alert.Heading>
          {/* This is the body of our alert */}
          <p className="alert-body">{message}</p>
        </div>
      </Alert>
    )
  }
}

export default AutoDismissAlert
