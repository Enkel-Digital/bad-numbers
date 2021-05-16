<template>
  <div class="columns center mx-4">
    <loader v-if="loader" />

    <div v-else>
      <h2 class="column mx-4 mt-4 pb-0">Login</h2>

      <div v-if="smsNotSent" class="column">
        <label for="phoneNumber">
          <b>Enter phone number with country code</b>
        </label>

        <!-- Pattern matches for a + sign and any number of digits -->
        <input
          type="tel"
          pattern="[\+][0-9]+"
          v-model="phoneNumber"
          placeholder="Phone Number"
          required
          class="input mb-4"
          style="width: 100%"
          v-autofocus
        />

        <button class="button is-light is-fullwidth" @click="sendOtp">
          Get OTP
        </button>
      </div>

      <!-- Need to put width: 100% -->
      <div v-else class="column" style="width: 100%">
        <label for="otp">
          <b>Enter OTP</b>
        </label>

        <!-- Pattern matches for a + sign and any number of digits -->
        <input
          type="number"
          min="0"
          inputmode="numeric"
          pattern="[0-9]*"
          v-model="otp"
          placeholder="OTP"
          required
          class="input mb-4"
          style="width: 100%"
          v-autofocus
        />

        <div class="columns">
          <div class="column is-half">
            <button class="button is-light" @click="verifyOtp">Verify</button>
          </div>

          <div class="column is-half">
            <button class="button is-light" @click="sendOtp">Resend OTP</button>
          </div>
        </div>
      </div>
    </div>

    <!-- HTML element for g-recaptcha to insert their code -->
    <div id="recaptcha-container"></div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import loader from "./Loader";


export default {
  name: "login",

  components: { loader },

  data() {
    return {
      // Used to toggle loader component's visibility
      loader: false,

      // Used to toggle between showing phone number input and OTP input
      smsNotSent: true,

      confirmationResult: undefined,
      phoneNumber: undefined,
      otp: undefined,
    };
  },

  mounted() {
    // Initialise recaptcha once component is mounted
    this.initReCaptcha();
  },

  methods: {
    async sendOtp() {
      // Check if phone number starts with a +, if no, then error
      const phoneNumber = this.phoneNumber;
      const recaptchaVerifier = window.recaptchaVerifier;

      this.loader = true;

      try {
        const confirmationResult = await firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, recaptchaVerifier);

        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        this.confirmationResult = confirmationResult;

        // Show OTP input
        this.smsNotSent = false;

        alert("SMS sent");
      } catch (error) {
        // @todo Show error in console and alert box so easy for user to debug
        alert("Error! SMS not sent");
      }

      this.loader = false;
    },

    async verifyOtp() {
      try {
        if (this.otp.length != 6) return alert("Invalid OTP!");

        const vm = this;
        const otp = this.otp;

        const result = await this.confirmationResult.confirm(otp);

        // Store this into vuex
        console.log("isNewUser: ", result.additionalUserInfo.isNewUser);

        vm.$router.push({ name: "home" });
      } catch (error) {
        // User couldn't sign in (bad verification code?)
        console.log(error.message); // Show this on Screen

        if (confirm("Re-Enter phone number?")) this.smsNotSent = true;
      }
    },

    initReCaptcha() {
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
};
</script>
