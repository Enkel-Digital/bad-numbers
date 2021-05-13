<template>
  <div>
    <!-- Show full screen loader while waiting for number to be reported -->
    <loader v-if="reporting" />

    <div v-else class="columns">
      <!-- Include the side nav bar component -->

      <div class="column">Number: {{ num }}</div>

      <div
        class="column dropdown"
        :class="{ 'is-active': showDropDown }"
        @click="showDropDown = !showDropDown"
        style="text-align: left"
      >
        <div class="dropdown-trigger">
          <button
            class="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>{{ reason }} </span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <div
              v-for="(defaultReason, i) in defaultReasons"
              :key="i"
              class="dropdown-item"
              @click="reason = defaultReason"
            >
              {{ defaultReason }}
            </div>

            <hr class="dropdown-divider" />
            <div class="dropdown-item" @click="reason = 'Something else'">
              Something else
            </div>
          </div>
        </div>
      </div>

      <!-- Textarea (120 characters) for user to enter a none default reason -->
      <div class="column" v-if="reason === 'Something else'">
        <textarea
          v-model="customReason"
          class="textarea"
          placeholder="Your Reason (MAX 120 characters)"
          maxlength="120"
          style="resize: none"
        />
      </div>

      <label class="column">
        <input type="checkbox" v-model="terms_and_conditions" />
        I agree to the
        <a target="_blank" href="#/ ">terms and conditions</a>
      </label>

      <!-- Column wrapper to give a bit of margin around the button -->
      <div class="column mx-4">
        <button
          class="button is-light is-danger is-outlined is-medium is-fullwidth"
          @click="report"
        >
          report
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import loader from "./Loader";
import firebase from "firebase/app";
import { ffetch, getAuthHeader } from "../utils/fetch";

export default {
  name: "report",

  components: { loader },

  props: ["num"],

  data() {
    return {
      // Variable used to track if number is being reported using the API to show the loader
      reporting: false,

      // Bool to control drop down menu for reasons
      showDropDown: false,

      reason: "--- Why is this number bad? ---",

      defaultReasons: [
        "Scam Call",
        "Scam Message",
        "Spam Call",
        "Spam Message",
        "telemarketing",
      ],

      customReason: "",

      terms_and_conditions: false,
    };
  },

  methods: {
    async report() {
      if (!this.terms_and_conditions)
        return alert("Please agree to the terms and conditions first!");

      if (this.reason === "--- Why is this number bad? ---")
        return alert("Please select a reason for reporting!");

      if (this.reason === "Something else" && this.customReason === "")
        return alert("Please enter a reason for reporting!");

      // If there is a custom reason, set it to be the reason
      if (this.reason === "Something else") this.reason = this.customReason;

      // HTML form validation will have already taken care of this
      // if (!/[+][0-9]+/.test(this.num)) return;

      // Show loader once validation is completed and before calling the API
      this.reporting = true;

      try {
        const response = await ffetch(
          "http://localhost:3000/report",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: await getAuthHeader(firebase.auth),
            },
          },
          {
            num: this.num,
            by: firebase.auth().currentUser.phoneNumber,
            reason: this.reason,
          }
        ).then((response) => response.json());

        if (!response.ok) throw new Error(response.error);

        // Update user and Return to home screen once number has been reported
        alert("Number has been reported!");
        this.$router.push({ name: "home" });
      } catch (error) {
        this.reporting = false;
        console.error(error);
        alert("Something went wrong!");
      }
    },
  },
};
</script>
