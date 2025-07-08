// scripts/login.js

// ReCAPTCHA setup
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const auth = getAuth();
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
  'size': 'invisible',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  }
});


// function renderCaptcha() {
//   if (!window.recaptchaVerifier) {
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
//       size: 'normal',
//       callback: response => {
//         console.log("ReCAPTCHA passed!");
//       },
//       'expired-callback': () => {
//         alert("ReCAPTCHA expired. Please try again.");
//       }
//     });
//     window.recaptchaVerifier.render();
//   }
// }

// const loginRecaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
//   size: 'normal',
//   callback: (response) => {
//     console.log("ReCAPTCHA solved:", response);
//   }
// });

// Send OTP to phone number
import { getAuth, signInWithPhoneNumber } from "firebase/auth";

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



// function loginSendOTP() {
//   const phone = document.getElementById("phone").value;
  
//   auth.signInWithPhoneNumber(phone, loginRecaptcha)
//     .then(confirmation => {
//       window.loginConfirmation = confirmation;
//       alert("OTP sent to your phone.");
//     })
//     .catch(error => {
//       console.error("OTP error:", error);
//       alert("Failed to send OTP. Try again.");
//     });
// }

// Verify OTP and log in
function loginVerifyOTP() {
  const otp = document.getElementById("otp").value;

  window.loginConfirmation.confirm(otp)
    .then(result => {
      const user = result.user;
      console.log("Logged in as:", user.uid);
      alert("Login successful!");

      // Log the login action
      logAction("Login", `User ID: ${user.uid}`);

      // Redirect to dashboard
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      console.error("OTP verification failed:", error);
      alert("Incorrect OTP.");
    });
}