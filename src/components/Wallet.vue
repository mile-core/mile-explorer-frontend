<template lang="pug">
  .wallet-info
    p.public-key-responsive publicKey: {{ publicKey }}
    p.count-transaction-responsive Total transaction count: {{ totalTransactionCount }}
    p.count-transaction-responsive Total block count: {{ totalBlockCount }}
    mile-loader(v-if="!done")
    template(v-else)
      .wallet-search(v-if="error")
        h1.title Oops!
        p.description The wallet public key you entered was:
        pre {{this.publicKey}}
        p.description Sorry! This is an invalid wallet public key.
        button.btn(@click="$router.push({ name: 'home' })") Back Home
      template(v-else)
        h4 Wallet balance
        div.balance
          template(v-for="asset in balance")
            template(v-if="assets[asset['code']]")
              div.balance-value {{ assets[asset['code']]['name'] }}: {{ asset.amount }}
        h4 Wallet Transactions
        wallet-transactions(
          v-if="transactionCount"
          :publicKey="publicKey"
          :count="transactionCount"
          :first="transactionfirst"
        )
        paginator(:count="paginatorCount" :first="paginatorfirst" @input="fetchWalletState($event)")
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
import Paginator from './Paginator.vue';

export default {
  components: {
    MileLoader,
    WalletBlocks,
    WalletTransactions,
    Paginator,
  },
  props: {
    publicKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      blockCount: 0,
      blockfirst: 0,
      transactionCount: 0,
      transactionfirst: 0,
      paginatorCount: 0,
      paginatorfirst: 0,
      done: true,
      error: false,
            totalTransactionCount:0,
            totalBlockCount:0,
      balance: [],
      assets: [],
    };
  },
  watch: {
    publicKey: {
      handler: 'fetchWalletState',
      immediate: true,
    },
    balance: {
      handler: 'getBalance',
      immediate: true,
    },
  },
  methods: {
    async fetchWalletState(range) {
      this.done = false;
        this.done = true;
      try{
        const state = await api.getWalletHistoryState(this.publicKey);
        this.done = true;
        if (!state) {
          this.$router.replace('/wallet');
          return;
        }
          this.blockCount = state.block.count;
          this.totalBlockCount = state.block.count;
          this.totalTransactionCount = state.transaction.count;
          this.blockfirst = state.block.first;
          this.transactionCount = range.limit;
          this.transactionfirst = range.from;
          this.paginatorCount = state.transaction.count;
          this.paginatorfirst = state.transaction.first;
      }catch(error){
        this.done = true;
        this.error = true;
      }
    },
    async getBalance() {
      if (this.balance.length == 0) {
        this.assets = await api.getAssets();
        const state = await api.getWalletSate(this.publicKey);
        this.balance = state.data.result.balance
      }
    },
  },
};
</script>

<style lang="sass" scoped>

</style>

