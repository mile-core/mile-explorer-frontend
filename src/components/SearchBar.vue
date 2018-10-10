<template lang="pug">
  .search-bar
    input.input(
      type="text"
      v-model="userInput"
      placeholder="Search by Address / Txhash / Block / Token / Ens"
    )
    button.btn(@click="go") Go
</template>

<script>
export default {
  data() {
    return {
      userInput: '',
    };
  },
  computed: {
    query() {
      return this.userInput.trim();
    },
  },
  methods: {
    go() {
      const blockId = parseInt(this.query, 10);
      if (String(blockId).length === this.query.length) {
        this.$router.push({ name: 'block', params: { blockId } });
      } else {
        this.$router.push({ name: 'search', params: { query: this.query } });
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.search-bar
  display: flex
  flex-direction: row
  justify-content: center
  > .input
    display: block
    line-height: 2rem
    padding: 0 .5rem
    min-width: 24rem
  > .btn
    display: block
    color: white
    background-color: $color-blue
    text-transform: uppercase
    &:hover
      background-color: $color-blue-light
</style>

