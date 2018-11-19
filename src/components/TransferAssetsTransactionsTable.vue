<template lang="pug">
.table-wrap.js-ps-cont
  table.table(v-if="sortedTransactions.length")
    thead
      tr
        th.serial serial
        th.from from
        th.to to
        th.transaction-asset transaction-asset
        th.amount amount
        th.block-id block id
        th.transaction-id transaction id
        th.fee fee
        th.description memo
        th.transaction-name transaction type
    tbody
      tr(v-for="transaction in sortedTransactions" :key="transaction['serial']" :unique-key="true")
        td.serial {{transaction['serial']}}
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
            router-link(:to="'/transactions/' + transaction['from'] +'/'+transaction['transaction-id']") {{ transaction['id'] }}
        td.fee {{transaction['fee']}}
        td.description.field-ellipsis(v-bind:title="transaction['description']") {{transaction['description']}}
        td.transaction-name {{transaction['transaction-type']}}
</template>

<script>
import fecha from 'fecha';
import api from '@/api';
import ps from 'perfect-scrollbar/dist/perfect-scrollbar';

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
      Assets: [],
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
  watch: {
    range: {
      handler: 'GetAsset',
      immediate: true,
    },
  },
  methods: {
    formatTimeStamp(timeStamp) {
      const date = timeStamp / 10000;
      return fecha.format(date, 'YYYY-MM-DD HH:mm:ss');
    },
    async GetAsset() {
      this.Assets = await api.getAssets();
    },
  },
  computed: {
    sortedTransactions() {
      function compareSerial(txsA, txsB) {
        return parseInt(txsB.serial) - parseInt(txsA.serial);
      }

      this.transactions.sort(compareSerial);
      return this.transactions;
    },
  },
};
</script>

<style lang="sass" scoped>

</style>

