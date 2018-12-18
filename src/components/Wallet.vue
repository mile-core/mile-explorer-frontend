<template lang="pug">
  div
    template
      .wallet-search(v-if="error")
        h1.title Oops!
        p.description The wallet public key you entered was:
        pre {{this.publicKey}}
        p.description Sorry! This is an invalid wallet public key.
        button.btn(@click="$router.push({ name: 'home' })") Back Home
      template(v-else)
        .pairs-list
          .pairs-list__item.pair
            .pair__key public key
            .pair__value.text-overflow {{ publicKey }}
          .pairs-list__item.pair
            .pair__key transaction count
            mile-loader(v-if="!done")
            .pair__value(v-else) {{ totalTransactionCount }}
          .pairs-list__item.pair
            .pair__key block count
            mile-loader(v-if="!done")
            .pair__value(v-else) {{ totalBlockCount }}
          .pairs-list__item.pair(v-for="asset in balance")
            .pair__key {{ assets[asset['code']]['name'] }} balance
            .pair__value {{ asset.amount }}

        h4.h4 Wallet Transactions
        mile-loader(v-if="!done")
        wallet-transactions(v-else)(
          v-if="transactionCount"
          :publicKey="publicKey"
          :count="transactionCount"
          :first="transactionfirst"
        )
        paginator(:count="paginatorCount" :first="paginatorfirst" @input="fetchWalletState($event)")
        .wallet-blocks
          h4.h4 Wallet Blocks
        mile-loader(v-if="!done")
        wallet-blocks(v-else)(
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
      done: false,
      error: false,
      totalTransactionCount: 0,
      totalBlockCount: 0,
      balance: [],
      assets: [],
    };
  },
  watch: {
    publicKey: {
      handler: 'fetchWalletState',
      immediate: true,
    },
  },
  methods: {
    async fetchWalletState(range) {
      try {
        const state = await api.getWalletHistoryState(this.publicKey);
        this.assets = await api.getAssets();
        const balance = await api.getWalletSate(this.publicKey);
        this.balance = balance.data.result.balance;
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
        this.done = true;
      } catch (error) {
        this.done = true;
        this.error = true;
      }
    },

  },
};
</script>

<style lang="sass" scoped>

</style>

