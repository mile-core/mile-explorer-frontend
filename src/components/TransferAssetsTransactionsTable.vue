<template lang="pug">
.table-wrap
  .table-wrap__inner
    table.table.table_limit-with_small(v-if="transactions.length")
      thead
        tr
          th.serial serial
          th date
          th.from from
          th.to to
          th.transaction-asset transaction-asset
          th.amount amount
          th.block-id block id
          th.transaction-id transaction id
          th.fee fee
          th.transaction-name transaction type
      tbody
        tr(v-for="transaction in transactions" :key="transaction['serial']" :unique-key="true")
          td.serial {{transaction['serial']}}
          td {{ transaction['timestamp'] | timeAgo }}
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
                td.amount <vue-numeric v-bind:value="item['amount']" read-only=True v-bind:precision="Assets[item['code']]['precision']"></vue-numeric>
          td.block-id
            router-link(:to="'/blocks/' + transaction['block-id']") {{ transaction['block-id'] }}
          td.transaction-id
            div.t-id
              router-link(:to="'/transactions/' + transaction['digest']") {{ transaction['digest'] }}
          td.fee {{transaction['fee']}}
          td.transaction-name {{transaction['transaction-type']}}
</template>

<script>
import fecha from 'fecha';
import api from '@/api';
import ps from 'perfect-scrollbar/dist/perfect-scrollbar';
import VueNumeric from 'vue-numeric';

export default {
  components: {
    VueNumeric,
  },
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
      scrollObj: null,
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
        const that = this;
        if (!this.scrollObj) {
          setTimeout(() => {
            this.scrollObj = new ps(that.$el.querySelector('.table-wrap__inner'), {
              wheelSpeed: 0.5,
            });
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

