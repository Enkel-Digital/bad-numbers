<template>
  <div>
    <h2>Login</h2>

    Include ur country code please
    <input
      type="tel"
      pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
      v-model="phoneNumber"
      placeholder="Phone Number"
    />
    <button id="sign-in-button" @click="sendOtp">Get OTP</button>

    <div id="recaptcha-container"></div>
    <br />

    <input type="number" v-model="otp" placeholder="OTP" />
    <button @click="verifyOtp">Verify</button><br />
    <button @click="sendOtp">Resend OTP</button>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      confirmationResult: undefined,
      phoneNumber: undefined,
      otp: undefined,
    };
  },

  methods: {
    async sendOtp() {
      let phoneNumber = this.phoneNumber;
      let recaptchaVerifier = window.recaptchaVerifier;

      try {
        const confirmationResult = await firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, recaptchaVerifier);

        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        this.confirmationResult = confirmationResult;
        alert("SMS sent");
      } catch (error) {
        // Error; SMS not sent
        // ...
        alert("Error ! SMS not sent");
      }
    },

    async verifyOtp() {
      try {
        if (this.otp.length != 6) return alert("Invalid OTP!");

        let vm = this;
        let otp = this.otp;

        const result = await this.confirmationResult.confirm(otp);

        // Store this into vuex
        console.log("isNewUser: ", result.additionalUserInfo.isNewUser);

        //route to set password !
        vm.$router.push({ name: "home" });
      } catch (error) {
        // User couldn't sign in (bad verification code?)
        console.log(error.message); // Show this on Screen
      }
    },

    initReCaptcha() {
      // let vm = this;
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: function (response) {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
          "expired-callback": function () {
            // Response expired. Ask user to solve reCAPTCHA again.
          },
        }
      );
    },
  },
  mounted() {
    this.initReCaptcha();
  },
};
</script>
