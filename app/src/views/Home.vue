<template>
  <div id="center" class="section">
    <div class="columns is-vcentered is-centered is-multiline">
      <div class="column">
        <label for="phoneNumber">
          <b>Enter phone number with country code</b>
        </label>

        <!-- Pattern matches for a + sign and any number of digits -->
        <input
          id="phoneNumber"
          type="tel"
          pattern="[\+][0-9]+"
          v-model="phoneNumber"
          placeholder="Phone Number"
          required
          class="input"
          style="width: 100%"
          v-autofocus
        />
      </div>

      <div class="column">
        <router-link
          :to="{ name: 'search', params: { num: this.phoneNumber } }"
          class="button is-light is-fullwidth"
        >
          Search
        </router-link>
      </div>

      <div class="column">
        <router-link
          :to="{ name: 'report', params: { num: this.phoneNumber } }"
          class="button is-light is-fullwidth"
        >
          Report
        </router-link>
      </div>

      <div class="column">
        <button @click="logout" class="button is-light is-fullwidth">
          logout
        </button>
      </div>
    </div>

    <div
      style="
        font-size: 0.7em;
        position: fixed;
        left: 50%;
        bottom: 0.5em;
        width: 80%;
        transform: translate(-50%, -50%);
      "
    >
      Version: {{ gitBranch + " " + commitHash.slice(0, 6).toString() }}
      <br />
      Build Time: {{ buildTime }}
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

#center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  min-height: 100vh;
}
</style>
