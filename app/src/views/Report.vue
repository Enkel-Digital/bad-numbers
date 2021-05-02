<template>
  <div class="columns">
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
        class="textarea"
        placeholder="Your Reason (MAX 120 characters)"
        maxlength="120"
        style="resize: none"
      />
    </div>

    <label class="column">
      <input type="checkbox" />
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
</template>

<script>
export default {
  name: "report",

  props: ["num"],

  data() {
    return {
      // Bool to control drop down menu for reasons
      showDropDown: false,

      reason: "Why is this number bad?",

      defaultReasons: [
        " Scam Call ",
        " Scam Message ",
        " Spam Call ",
        " Spam Message ",
      ],
    };
  },

  methods: {
    report() {
      // HTML form validation will have already taken care of this
      // if (!/[+][0-9]+/.test(this.num)) return;

      console.log(this.num);
    },
  },
};
</script>
