<template>
  <div>
    <!-- Include the side nav bar component -->

    <!-- Search results -->
    <div class="cloumns">
      <div class="column">Number: {{ num }}</div>

      <div v-if="search.reported">
        <div class="column">Reported: {{ search.reported }}</div>

        <div class="column content">
          Reasons:
          <ol>
            <li class="content" v-for="(reason, i) in search.reasons" :key="i">
              {{ reason }}
            </li>
          </ol>
        </div>
      </div>
      <div v-else>Great news, this number has not been reported before!</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",

  props: ["num"],

  data() {
    return {
      search: {
        // 0 because, this will be the number of times it has been reported, and 0 represents not reported before which will be the default
        // Actually change to something to else to show a loading screen? With CSS preferably
        reported: 0,
      },
    };
  },

  // Run the search on component creation
  created() {
    // If have additional validation, make it into a utils module and import to reuse since report view will also need
    // HTML form validation will have already taken care of this
    // if (!/[+][0-9]+/.test(this.num)) return;

    // Simulate an API call to get search results
    this.search = {
      reported: 2,
      reasons: ["Scam call", "Spam"],
    };
  },
};
</script>
