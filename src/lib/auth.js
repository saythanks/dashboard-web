import firebase from 'firebase/app'
import 'firebase/auth'
import jwtDecode from 'jwt-decode'

const actionCodeSettings = () => ({
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: `${window.location.protocol}//${window.location.hostname}${window
    .location.port !== 80 && `:${window.location.port}`}/login/verify`,
  // This must be true.
  handleCodeInApp: true,
})

export default {
  requestEmailLink: email => {
    console.log(actionCodeSettings())
    return firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings())
  },

  login: (email, password) =>
    firebase.auth().signInWithEmailAndPassword(email, password),

  verifyEmail: (email, currentUrl) => {
    // Confirm the link is a sign-in with email link.
    if (!firebase.auth().isSignInWithEmailLink(currentUrl)) return

    // The client SDK will parse the code from the link for you.
    firebase.auth().signInWithEmailLink(email, currentUrl)
  },

  // Returns unsubscribe object
  listen: callback => firebase.auth().onAuthStateChanged(callback),
  logout: () => firebase.auth().signOut(),

  getToken: async (refresh = false) => {
    const token = await firebase.auth().currentUser.getIdToken(refresh)
    return token
  },
}
