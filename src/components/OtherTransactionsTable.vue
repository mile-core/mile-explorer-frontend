<template lang="pug">
.table-wrap
  .table-wrap__inner.table-wrap__inner_height_small
    table.table(v-if="transactions.length")
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
    transactions: {
      handler() {
        if (!this.scrollObj) {
          this.scrollObj = new ps(this.$el.querySelector('.table-wrap__inner'), {
            wheelSpeed: 0.5,
          });
        } else {
          this.scrollObj.update();
        }
      },
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

