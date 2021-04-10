<template>
  <div class="section">
    <div id="welcome" class="columns is-vcentered is-centered is-multiline">
      <div class="column">
        <button :to="{ name: 'search' }" class="button is-light is-fullwidth">
          Search a number
        </button>
      </div>

      <div class="column">
        <button :to="{ name: 'report' }" class="button is-light is-fullwidth">
          Report a number
        </button>
      </div>

      <div class="column">
        <button @click="logout" class="button is-light is-fullwidth">
          logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import logout from "../utils/logout";

export default {
  name: "home",

  methods: {
    logout,
  },
};
</script>
