<template lang="pug">
  .wallet-info
    p publicKey: {{ publicKey }}
    mile-loader(v-if="!done")
    template(v-else)
      wallet-blocks(
        :publicKey="publicKey"
        :count="blockCount"
        :first-id="blockFirstId")
      wallet-transactions(
        :publicKey="publicKey"
        :count="transactionCount"
        :first-id="transactionFirstId"
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
      blockFirstId: 0,
      transactionCount: 0,
      transactionFirstId: 0,
      done: true,
    };
  },
  watch: {
    publicKey: {
      handler: 'fetchWalletState',
      immediate: true,
    }
  },
  methods: {
    async fetchWalletState() {
      this.done = false;
      const state = await api.getWalletHistoryState(this.publicKey);
      this.done = true;
      if (!state) {
        this.$router.replace('/wallet');
        return;
      }
      this.blockCount = state.block.count;
      this.blockFirstId = state.block['first-id'];
      this.transactionCount = state.transaction.count;
      this.transactionFirstId = state.transaction['first-id'];
    },
  },
};
</script>

