<template lang="pug">
  table.other-transactions-table(v-if="transactions.length")
    thead
      tr
        th.serial #
        th.public-key public-key
        th.block-id block id
        th.transaction-id transaction id
        th.transaction-name transaction type
    tbody
    tr(v-for="transaction in transactions" :key="transaction['serial']" :unique-key="true")
        td.serial {{transaction['serial']}}
        td.public-key
              router-link.link.address-tag(
              :to="{ name: 'wallet', params: { publicKey: transaction['public-key'] } }"
              ) {{ transaction['public-key'] }}
        td.block-id
          router-link(:to="'/blocks/' + transaction['block-id']") {{ transaction['block-id'] }}
        td.transaction-id
          div.t-id
            router-link(:to="'/transactions/' + transaction['public-key'] +'/'+transaction['transaction-id']") {{ transaction['id'] }}
        td.transaction-name {{transaction['transaction-type']}}
</template>

<script>
import fecha from 'fecha';
import api from '@/api';

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
};
</script>

<style lang="sass" scoped>

</style>

