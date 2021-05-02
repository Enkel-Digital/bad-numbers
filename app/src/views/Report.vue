<template>
  <div>
    <!-- Include the side nav bar component -->

    <!-- Limit the length of the reported reason -->
  </div>
</template>

<script>
export default {
  name: "report",

  props: ["num"],

  methods: {
    report() {
      // HTML form validation will have already taken care of this
      // if (!/[+][0-9]+/.test(this.phoneNumber)) return;

      console.log(this.phoneNumber);
    },
  },
};
</script>
