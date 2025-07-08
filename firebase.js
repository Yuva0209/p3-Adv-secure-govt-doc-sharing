import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIK-_myh_h8UfO7wcoNUx5kFfr8ZQ2JHc",
  authDomain: "govopt-app-demo.firebaseapp.com",
  projectId: "govopt-app-demo",
  storageBucket: "govopt-app-demo.firebasestorage.app",
  messagingSenderId: "858684862650",
  appId: "1:858684862650:web:a498d921118d140822d283"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// invisible recaptcha setup
const auth = getAuth();
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
  'size': 'invisible',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  }
});
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});

// For use with visible reCAPTCHA
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  'size': 'normal',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    // ...
  },
  'expired-callback': () => {
    // Response expired. Ask user to solve reCAPTCHA again.
    // ...
  }
});

// Function to get phone number from user input
const phoneNumber = getPhoneNumberFromUserInput();
const appVerifier = window.recaptchaVerifier;


signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    }).catch((error) => {
      grecaptcha.reset(window.recaptchaWidgetId);

// Or, if you haven't stored the widget ID:
      window.recaptchaVerifier.render().then(function(widgetId) {
      grecaptcha.reset(widgetId);
    });
    });

    const code = getCodeFromUserInput();
confirmationResult.confirm(code).then((result) => {
  // User signed in successfully.
  const user = result.user;
  // ...
}).catch((error) => {
  // User couldn't sign in (bad verification code?)
  // ...
});

var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
firebase.auth().signInWithCredential(credential);



// Sign out the user
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
