<template lang="pug">
  .transactions
    transactions-paginator(:count="count" :first-id="firstId" @input="fetchRange($event)")
    mile-loader(v-if="!done")
    .table-responsive
      transactions-table(:transactions="transactions")
</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';
import TransactionsTable from './TransactionsTable.vue';
import TransactionsPaginator from './TransactionsPaginator.vue';

export default {
  components: {
    MileLoader,
    TransactionsTable,
    TransactionsPaginator,
  },
  props: {
    count: {
      type: Number,
      required: true,
    },
    firstId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      done: true,
      transactions: [],
    };
  },
  methods: {
    async fetchRange(range) {
      this.done = false;
      this.transactions = await api.getTransactionHistory(range.from, range.limit);
      this.done = true;
    },
  },
};
</script>

<style lang="sass" scoped>
.table-responsive
  max-width: 100%
  overflow: auto
</style>
