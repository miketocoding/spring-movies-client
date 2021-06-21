// import the apiUrl so we can make auth requests to our API
// import axios so we can make requests too
import apiUrl from '../apiConfig'
import axios from 'axios'

// Add a named export, that exports our signUp function
// in other files, we can import it with `destructuring syntax`
// ex. import { signUp } from '../../api/auth'

// signUp expects a credentials object with the email, password, and passwordConfirmation in the same format from the signUp component's state
export const signUp = credentials => {
  // make our axios request to sign up
  return axios({
    // the method and url are the same from the jquery-ajax-token-auth lesson
    method: 'POST',
    url: apiUrl + '/sign-up',
    // the data is the signUp component's state.
    // it used to be data from get form fields but now we get the data from credentials
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

export const signIn = credentials => {
  return axios({
    // the method and url are the same from the jquery-ajax-toen-auth lesson
    url: apiUrl + '/sign-in',
    method: 'POST',
    // the same data as signUp (but we don't need the passwordConfirmation)
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

export const signOut = user => {
  return axios({
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    // same url and method from jquery-ajax-token-auth
    url: apiUrl + '/change-password',
    method: 'PATCH',

    // to make an authenticated request, we need an authorization header with the user's token (so the api knows who we are)
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}
