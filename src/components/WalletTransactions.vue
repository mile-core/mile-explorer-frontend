<template lang="pug">
  .wallet-transactions
    h4 Wallet Transactions
    mile-loader(v-if="!done")
    template(v-else)
      .table-responsive
        table.transactions(v-if="transactions.length")
          thead
            tr
              th.transaction-id transaction id
              th.from from
              th.to to
              th.transaction-asset transaction asset
              th.amount amount
              th.block-id block id
              th.fee fee
              th.description description
              th.transaction-name transaction name
          tbody
            tr(v-for="transaction in transactions" v-if="transaction")
              td.transaction-id {{ transaction.id }}
              td.from {{transaction['from']}}
              td.to {{transaction['to']}}
              template(v-for="item in transaction['asset']")
                template(v-if="item['code'] === '1'")
                  td.transaction-asset MILE
                template(v-else)
                  td.transaction-asset XDR
                td.amount {{item['amount']}}
              td.block-id
                router-link(:to="'/blocks/' + transaction['block-id']") {{ transaction['block-id'] }}
              td.fee {{transaction['fee']}}
              td.description {{transaction['description']}}
              td.transaction-name {{transaction['transaction-name']}}

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
    first: {
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
        first: this.first,
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
        this.first,
        this.count,
      );
      this.done = true;
      const resultTransactions = [];

      await result.forEach(async function(element) {
        const resultTransaction = await api.getTransactionInfo(
                element['public-key'],
                element.id
        );
        resultTransaction.id = element.id;
        if (resultTransaction['from'] && resultTransaction['to']) {
          resultTransactions.push(resultTransaction)
        }
      });
      this.transactions = resultTransactions;
    },
  },
};
</script>
<style lang="sass" scoped>

table.transactions
  width: 100%
  tr:nth-child(2n+1)
    background-color: $color-ghost
  th,
  td
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