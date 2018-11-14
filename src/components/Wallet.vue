<template lang="pug">
  .wallet-info
    p.public-key-responsive publicKey: {{ publicKey }}
    mile-loader(v-if="!done")
    template(v-else)
      .wallet-search(v-if="error")
        h1.title Oops!
        p.description The wallet public key you entered was:
        pre {{this.publicKey}}
        p.description Sorry! This is an invalid wallet public key.
        button.btn(@click="$router.push({ name: 'home' })") Back Home
      template(v-else)
        wallet-transactions(
          :publicKey="publicKey"
          :count="transactionCount"
          :first="transactionfirst"
        )
        wallet-blocks(
          :publicKey="publicKey"
          :count="blockCount"
          :first="blockfirst"
        )
</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';
import WalletBlocks from './WalletBlocks.vue';
import WalletTransactions from './WalletTransactions.vue';

export default {
  components: {
    MileLoader,
    WalletBlocks,
    WalletTransactions,
  },
  props: {
    publicKey: String,
    required: true,
  },
  data() {
    return {
      blockCount: 0,
      blockfirst: 0,
      transactionCount: 0,
      transactionfirst: 0,
      done: true,
      error: false,
    };
  },
  watch: {
    publicKey: {
      handler: 'fetchWalletState',
      immediate: true,
    },
  },
  methods: {
    async fetchWalletState() {
      this.done = false;
      try{
        const state = await api.getWalletHistoryState(this.publicKey);
        this.done = true;
        if (!state) {
          this.$router.replace('/wallet');
          return;
        }
        this.blockCount = state.block.count;
        this.blockfirst = state.block['first'];
        this.transactionCount = state.transaction.count;
        this.transactionfirst = state.transaction['first'];
      }catch(error){
        this.done = true;
        this.error = true;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.wallet-info
  .wallet-search
    text-align: center
    pre
      display: block
      padding: 9.5px
      width: 80%
      margin: 0 auto
      font-size: 13px
      line-height: 1.42857143
      color: #333
      word-break: break-all
      word-wrap: break-word
      background-color: #f5f5f5
      border: 1px solid #ccc
      border-radius: 4px  
  .public-key
    width: 100%
    display: inline-block
    vertical-align: bottom
    text-overflow: ellipsis 
    overflow: hidden
</style>

