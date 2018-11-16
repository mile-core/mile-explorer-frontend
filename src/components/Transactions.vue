<template lang="pug">
  .transactions
    mile-loader(v-if="!done")
    transactions-table(:transactions="transactions")
    div(style="text-align: right")
      paginator(:count="count" :first="first" @input="fetchRange($event)")
</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';
import TransactionsTable from './TransactionsTable.vue';
import Paginator from './Paginator.vue';

export default {
  components: {
    MileLoader,
    TransactionsTable,
    Paginator,
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
      transactions: [],
    };
  },
  methods: {
    async fetchRange(range) {
        console.log(range.limit);
      this.done = false;
      console.log(range.from);
      this.transactions = await api.getTransactionHistory(range.from, range.limit);
      this.done = true;
    },
  },
};
</script>
