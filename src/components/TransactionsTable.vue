<template lang="pug">
  table.transactions-table(v-if="sortedTransactions.length")
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
      tr(v-for="transaction in sortedTransactions" :key="transaction['transaction-id']" :unique-key="true")
        td.transaction-id
          router-link(:to="'/transactions/' + transaction['from'] +'/'+transaction['transaction-id']") {{ transaction['transaction-id'] }}
        td.from {{transaction['from']}}
        td.to {{transaction['to']}}
        template(v-for="item in transaction['asset']")
          template(v-if="item['code'] === '1'")
            td.transaction-asset MILE
            td.amount {{item['amount']}}
          template(v-else)
            td.transaction-asset XDR
            td.amount.xdr {{item['amount']}}
        td.block-id
          router-link(:to="'/blocks/' + transaction['block-id']") {{ transaction['block-id'] }}
        td.fee {{transaction['fee']}}
        td.description {{transaction['description']}}
        td.transaction-name {{transaction['transaction-name']}}
</template>

<script>
import fecha from 'fecha';

export default {
  props: {
    transactions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      now: Date.now(),
    };
  },
  created() {
    this.intervalHandler = setInterval(() => {
      this.now = Date.now();
    }, 500);
  },
  destroyed() {
    clearInterval(this.intervalHandler);
  },
  methods: {
    formatTimeStamp(timeStamp) {
      const date = timeStamp / 10000;
      return fecha.format(date, 'YYYY-MM-DD HH:mm:ss');
    },
  },
  computed: {
    sortedTransactions() {
      var uniq = [];
      var T = [];
      var search = 0;
      this.transactions.forEach(function(item,i,arr){
          search = uniq.indexOf(item['transaction-id']);
          if (search == -1){
              T.push(item);
              uniq.push(item['transaction-id']);
          }
      });
      return T;
    },
  },
};
</script>

<style lang="sass" scoped>
table.transactions-table
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
  td.amount.xdr
    padding-right:30px,
  .timestamp
    font-family: monospace
</style>

