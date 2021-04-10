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

      <!-- <div>
      <p>version: {{ buildTime + " " + commitHash.slice(0, 6).toString() }}</p>
    </div> -->
    </div>
  </div>
</template>

<script>
import logout from "../utils/logout";

export default {
  name: "home",

  data() {
    return {
      buildTime: process.env.buildTime,
      commitHash: process.env.commitHash,
    };
  },

  methods: {
    logout,
  },
};
</script>
