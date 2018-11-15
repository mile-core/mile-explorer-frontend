<template lang="pug">
  .transactions
    transactions-paginator(:count="count" :first="first" @input="fetchRange($event)")
    mile-loader(v-if="!done")
    h4 Transfer Assets Transactions
    .table-responsive
      transfer-assets-transactions-table(:transactions="transferAssetsTransactions")
    template(v-if="otherTransactions.length")
        h4(v-on:click="visible=!visible") Other Transactions
        div(v-show="visible").table-responsive
          other-transactions-table(:transactions="otherTransactions")

</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';
import TransferAssetsTransactionsTable from './TransferAssetsTransactionsTable.vue';
import OtherTransactionsTable from './OtherTransactionsTable.vue';
import TransactionsPaginator from './TransactionsPaginator.vue';

export default {
  components: {
    MileLoader,
    TransferAssetsTransactionsTable,
    OtherTransactionsTable,
    TransactionsPaginator,
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
