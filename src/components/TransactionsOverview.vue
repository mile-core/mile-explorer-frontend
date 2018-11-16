<template lang="pug">
  .transaction-overview
    .headline
      .title Transactions
      button.btn(@click="$router.push({ name: 'transactions' })") View All
    ul.overview
      li.transaction(v-for="transaction in transactions" :key="transaction['serial']")
        span.profile-icon
        div.profile-post-in
          h3.main TX#
            router-link.link(
              :to="{ name: 'transaction', params: { transactionId: transaction['transaction-id'], publicKey: transaction['from'] } }"
            ) {{ transaction['from'] }}:{{ transaction['transaction-id'] }}
          p.info
            span.address-tag
              strong from:
              router-link.link.address-tag(
              :to="{ name: 'wallet', params: { publicKey: transaction['from'] } }"
              ) {{ transaction['from'] }}
            span.address-tag
              strong to:
              router-link.link.address-tag(
              :to="{ name: 'wallet', params: { publicKey: transaction['to'] } }"
              ) {{ transaction['to'] }}
          p.amount(v-for="item in transaction['asset']")
            template(v-if="Assets[item['code']]")
              span.item
                strong Amount:
                span {{item['amount']}} {{Assets[item['code']]['name']}}


</template>
<script>
import api from '@/api';
import fecha from 'fecha';
import timeago from 'timeago.js';
import MileLoader from './MileLoader.vue';

export default {
  components: {
    MileLoader,
  },
  props: {
    from: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      done: false,
      transactions: [],
      SortedTransactions: [],
      Assets:[]
    };
  },
  computed: {
    range() {
      return {
        from: this.from,
        limit: this.limit,
      };
    },
  },
  watch: {
    range: {
      handler: 'fetchRange',
      immediate: true,
    },
  },
  methods: {
      async fetchRange(range) {
          this.Assets = await api.getAssets();
          this.transactions = await api.getTransactionHistory(range.from, range.limit,['TransferAssetsTransaction', 'EmissionTransaction']);
      },
  },
};
</script>


<style lang="sass" scoped>

</style>
