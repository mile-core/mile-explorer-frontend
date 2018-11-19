<template lang="pug">
  .search-bar
    .form-input-block
      .input-icon.input-icon_search
      input.form-input.form-input_icon_search(
        type="text"
        v-model="userInput"
        placeholder="Search by Address / Block "
        v-on:keyup.13="go"
      )
</template>

<script>
import api from '@/api';

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
    async go() {
      const blockId = parseInt(this.query, 10);
      const reg_for_keys = /(([a-z]+\d+)|(\d+[a-z]+))[a-z\d]*/;
      const reg_for_blockId = /^[0-9]+$/;

      if (String(this.query).indexOf(':') !== -1) {
        const Query = String(this.query).split(':');
        const publicKey = Query[0];
        const transactionId = Query[1];
        this.$router.push({ name: 'transaction', params: { publicKey, transactionId } });
      } else if (reg_for_blockId.test(String(this.query)) === true) {
        this.$router.push({ name: 'block', params: { blockId } });
      } else if (reg_for_keys.test(String(this.query)) === true) {
        const Query = String(this.query).split(':');
        const publicKey = Query[0];
        const isDigest = await api.getTransactionDigest(publicKey);
        if(isDigest.length > 0) {
          this.$router.push({ name: 'digest', params: { publicKey: this.query } });
        } else {
          this.$router.push({ name: 'wallet', params: { publicKey: this.query } });
        }
      } else {
        this.$router.push({ name: 'search', params: { query: this.query } });
      }
      this.userInput = '';
    },
  },
};
</script>

<style lang="sass" scoped>

</style>

