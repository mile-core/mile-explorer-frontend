<template lang="pug">
  .search-bar
    input.input(
      type="text"
      v-model="userInput"
      placeholder="Search by Address / Txhash / Block "
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
      let reg_for_keys = /(([a-z]+\d+)|(\d+[a-z]+))[a-z\d]*/;
      let reg_for_blockId = /^[0-9]+$/;
      if (String(this.query).indexOf("-") !== -1){
        let Query = String(this.query).split('-');
        let publicKey = Query[0];
        let transactionId = Query[1];
          this.$router.push({ name: 'transaction', params: { publicKey, transactionId } });
      }else if (reg_for_blockId.test(String(this.query)) === true){
        this.$router.push({ name: 'block', params: { blockId } });
      }else if (reg_for_keys.test(String(this.query)) === true){
          this.$router.push({ name: 'wallet', params: { publicKey: this.query } });
      }else{
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
@media screen and (max-width: 576px)
  .search-bar
    > .input
      min-width: 10rem

</style>

