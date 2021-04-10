<template>
  <div>
    <!-- Include the side nav bar component -->

    <form @submit.prevent="search">
      <label for="phone">
        Enter phone number (Include the country code):
      </label>

      <!-- Pattern matches for a + sign and any number of digits -->
      <input
        type="tel"
        pattern="[\+][0-9]+"
        v-model="phoneNumber"
        placeholder="Phone Number"
        required
      />

      <input type="submit" value="Search" />
    </form>
  </div>
</template>

<script>
export default {
  name: "search",

  data() {
    return {
      phoneNumber: undefined,
    };
  },

  methods: {
    search() {
      // HTML form validation will have already taken care of this
      // if (!/[+][0-9]+/.test(this.phoneNumber)) return;

      console.log(this.phoneNumber);
    },
  },
};
</script>

<style scoped>
/* Color input pink if it is invalid --> when telephone number does not match the specified pattern */
input:invalid {
  background-color: pink;
}
</style>
