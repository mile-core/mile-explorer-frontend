<template lang="pug">
  .block-list
    .block-list__head
      .block-list__title Transactions
      a(@click="$router.push({ name: 'transactions' })" href="javascript:void(0)") VIEW ALL
    .block-list__list.block-list__list_scrollbar(style="height: 460px; overflow: hidden;")
      ul.list-blocks
        li.list-blocks__item.list-item(v-for="transaction in transactions['TransferAssetsTransaction']" :key="transaction['serial']")
          .list-item__pill.pill
            .pill__body.text-overflow
              router-link(
                :to="{ name: 'transaction', params: { digest: transaction['digest'] } }"
              ) {{ transaction['digest'] }}
            .pill__tip.nowrap {{ transaction.timestamp | localTime }}
          .row-info
            .row-info__col.text-overflow
              strong FROM
              router-link(
              :to="{ name: 'wallet', params: { publicKey: transaction['from'] } }"
              ) {{ transaction['from'] }}
            .row-info__col.text-overflow
              strong TO
              router-link(
              :to="{ name: 'wallet', params: { publicKey: transaction['to'] } }"
              ) {{ transaction['to'] }}
            .row-info__col.nowrap(v-for="item in transaction['asset']")
              template(v-if="Assets[item['code']]")
                span.item
                  strong AMOUNT
                  span <vue-numeric v-bind:value="item['amount']" read-only=True v-bind:precision="Assets[item['code']]['precision']"></vue-numeric> {{Assets[item['code']]['name']}}
</template>
<script>
import ps from 'perfect-scrollbar/dist/perfect-scrollbar';
import fecha from 'fecha';
import timeago from 'timeago.js';
import api from '@/api';
import MileLoader from './MileLoader.vue';
import VueNumeric from 'vue-numeric'

export default {
  components: {
    MileLoader,
    VueNumeric,
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
      Assets: [],
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
      this.transactions = await api.getTransactionHistory(range.from, range.limit, ['TransferAssetsTransaction', 'EmissionTransaction']);
    },
  },
  mounted() {
    const scrollObj = new ps(this.$el.querySelector('.block-list__list'));
  },
};
</script>


<style lang="sass" scoped>

</style>
