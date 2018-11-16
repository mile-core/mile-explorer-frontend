<template lang="pug">
  .transactions
    mile-loader(v-if="!done")
    h4 Transfer Assets Transactions
    transfer-assets-transactions-table(:transactions="transferAssetsTransactions")
    div(style="text-align: right")
      paginator(:count="count" :first="first" @input="fetchRange($event)")
    template(v-if="otherTransactions.length")
      h4(v-on:click="visible=!visible") Other Transactions
      div(v-show="visible").table-responsive
        other-transactions-table(:transactions="otherTransactions")
</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';
import Paginator from './Paginator.vue';
import TransferAssetsTransactionsTable from './TransferAssetsTransactionsTable.vue';
import OtherTransactionsTable from './OtherTransactionsTable.vue';

export default {
  components: {
    MileLoader,
    Paginator,
    TransferAssetsTransactionsTable,
    OtherTransactionsTable,
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
  },
  data() {
    return {
      done: true,
        otherTransactions: [],
        transferAssetsTransactions: [],
        visible: false
    };
  },
  methods: {
    async fetchRange(range) {
      this.done = false;
      var T = await api.getTransactionHistory(range.from, range.limit);
      this.transferAssetsTransactions = T['TransferAssetsTransaction'];
      this.otherTransactions = T['OtherTransaction'];
      this.done = true;
    },
  },
};
</script>
