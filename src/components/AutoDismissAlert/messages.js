// exports an object with different messages to show the user
// This is useful because:
// 1. If we want to reuse between multiple comments, keeps DRY
// 2. It groups together our messages so we can edit them all at once
// 3. If we wanted different files for different languages (eng, spn, chi)
export default {
  signUpSuccess: 'Succesfully registered! You\'ve been signed in as well.',
  signUpFailure: 'Registration failed. Email may be taken, or passwords don\'t match.',
  signInSuccess: 'Welcome!',
  signInFailure: 'Failed to sign in. Check your email and password and try again.',
  signOutSuccess: 'Come back soon!',
  changePasswordSuccess: 'Password changed successfully!',
  changePasswordFailure: 'Failed to change passwords. Check your old password and try again.'
}
