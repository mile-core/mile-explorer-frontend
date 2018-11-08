<template lang="pug">
  .wallet-transactions
    h4 Wallet Transactions
    mile-loader(v-if="!done")
    template(v-else)
      table.transactions(v-if="transactions.length")
        thead
          tr
            th.id ID
            th.key Public Key
        tbody
          tr(v-for="transaction in transactions" :key="transaction.id + transaction['public-key']")
            td.id
              router-link(
                :to="'/transactions/' + transaction['public-key'] + '/' + transaction.id"
              ) {{ transaction.id }}
            td.key
              router-link(
                :to="'/wallet/' + transaction['public-key']"
              ) {{ transaction['public-key'] }}

</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';

export default {
  components: {
    MileLoader,
  },
  props: {
    count: {
      type: Number,
      required: true,
    },
    firstId: {
      type: Number,
      required: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      transactions: [],
      done: true,
    };
  },
  computed: {
    state() {
      return {
        count: this.count,
        firstId: this.firstId,
      };
    },
  },
  watch: {
    state: {
      handler: 'fetchTransactions',
      immediate: true,
    },
  },
  methods: {
    async fetchTransactions() {
      this.done = false;
      const result = await api.getWalletHistoryTransactions(
        this.publicKey,
        this.firstId,
        this.count,
      );
      this.done = true;
      this.transactions = result.transactions;
    },
  },
};
</script>
<style lang="sass" scoped>
.table-responsive
  max-width: 100%
  overflow: auto
table.transactions
  width: 100%
  tr:nth-child(2n+1)
    background-color: $color-ghost
  th,
  td
    padding: .25rem
    text-align: center
    &.block-header-digest,
    &.previous-block-digest,
    &.merkle-root
      max-width: 10rem
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
  .timestamp
    font-family: monospace
</style>