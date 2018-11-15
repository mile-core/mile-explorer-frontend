<template lang="pug">
  .wallet-transactions
    mile-loader(v-if="!done")
    template(v-else)
      .table-responsive
        table.transactions(v-if="transactions.length")
          thead
            tr
              th.serial serial
              th.from from
              th.to to
              th.transaction-asset transaction asset
              th.amount amount
              th.block-id block id
              th.transaction-id transaction id
              th.fee fee
              th.description description
              th.transaction-type transaction type
          tbody
            tr(v-for="transaction in transactions" v-if="transaction")
              td.transaction-id {{ transaction['serial'] }}
              td.from
                  router-link.link.address-tag(
                  :to="{ name: 'wallet', params: { publicKey: transaction['from'] } }"
                  ) {{ transaction['from'] }}
              td.to
                  router-link.link.address-tag(
                  :to="{ name: 'wallet', params: { publicKey: transaction['to'] } }"
                  ) {{ transaction['to'] }}
              template(v-if="!transaction['asset']")
                td.transaction-asset
                td.amount
              template(v-else)
                  template(v-for="item in transaction['asset']")
                    template(v-if="Assets[item['code']]")
                        td.transaction-asset {{Assets[item['code']]['name']}}
                        td.amount {{item['amount']}}
              td.block-id
                router-link(:to="'/blocks/' + transaction['block-id']") {{ transaction['block-id'] }}
              td.transaction-id
                  div.t-id
                    router-link(:to="'/transactions/' + transaction['from'] +'/'+transaction['transaction-id']") {{ transaction.id }}
              td.fee {{transaction['fee']}}
              td.description {{transaction['description']}}
              td.transaction-type {{transaction['transaction-type']}}

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
      Assets: []
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
          function compareSerial(txsA, txsB) {
              return parseInt(txsB['serial']) - parseInt(txsA['serial']);
          }
          if (this.count){
              const result = await api.getWalletHistoryTransactions(
                  this.publicKey,
                  this.first,
                  this.count,
              );

              this.done = false;

              this.done = true;
              const resultTransactions = [];

              await result.forEach(async function(element) {
                  const resultTransaction = await api.getTransactionInfo(
                      element['public-key'],
                      element.id
                  );
                  resultTransaction.id = element.id;
                  if (resultTransaction['from'] && resultTransaction['to']) {
                      resultTransactions.push(resultTransaction);
                      resultTransactions.sort(compareSerial);
                  }
              });
              this.transactions = resultTransactions;
              this.Assets = await api.getAssets();
              this.done = true;
          }
      },
  },
};
</script>
<style lang="sass" scoped>

table.transactions
  width: 100%
  th,
  td
    &.block-header-digest,
    &.previous-block-digest,
    &.merkle-root
      max-width: 10rem
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
</style>