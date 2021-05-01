<template>
  <div class="section">
    <div id="welcome" class="columns is-vcentered is-centered is-multiline">
      <!-- Is the eager tag preventing the splash from loading? maybe not, since when logged in alr, it still does not load -->
      <!-- <img
      eager
      alt="ClassExpress logo"
      src="../assets/logo.png"
      max-height="calc(100% - 1em)"
      max-width="calc(100% - 1em)"
      style="margin-top: calc(20%)"
    /> -->

      <div class="column">
        <label for="phoneNumber">
          Enter phone number (Include the country code):
        </label>

        <!-- Pattern matches for a + sign and any number of digits -->
        <input
          id="phoneNumber"
          type="tel"
          pattern="[\+][0-9]+"
          v-model="phoneNumber"
          placeholder="Phone Number"
          required
          v-autofocus
        />
      </div>

      <div class="column">
        <router-link
          :to="{ name: 'search' }"
          class="button is-light is-fullwidth"
        >
          Search a number
        </router-link>
      </div>

      <div class="column">
        <router-link
          :to="{ name: 'report' }"
          class="button is-light is-fullwidth"
        >
          Report a number
        </router-link>
      </div>

      <div class="column">
        <button @click="logout" class="button is-light is-fullwidth">
          logout
        </button>
      </div>

      <div
        style="
          font-size: 0.7em;
          position: fixed;
          left: 50%;
          transform: translate(-50%, -50%);
          bottom: 0.5em;
        "
      >
        Version: {{ gitBranch + " " + commitHash.slice(0, 6).toString() }}
        <br />
        Build Time: {{ buildTime }}
      </div>
    </div>
  </div>
</template>

<script>
import logout from "../utils/logout";

export default {
  name: "home",

  data() {
    return {
      // Environment variables injected in by webpack, configured in vue.config.js
      buildTime: process.env.buildTime,
      commitHash: process.env.commitHash,
      gitBranch: process.env.gitBranch,

      phoneNumber: "+",
    };
  },

  methods: {
    logout,
  },
};
</script>

<style scoped>
/* Color input pink if it is invalid --> when telephone number does not match the specified pattern */
input:invalid {
  background-color: pink;
}
</style>
