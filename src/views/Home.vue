<template lang="pug">
  .home
    .row-sections(v-if="transactionsHistory")
      chart(id="mile-turnover" title="mile" subtitle="transaction history in 14 days" :data="transactionsHistory[1]")
      chart(id="xdr-turnover" title="xdr" subtitle="transaction history in 14 days" :data="transactionsHistory[0]")
    .row-sections.info-wrapper
      .section
        transactions-overview(
          v-if="transactionCount"
          :from="transactionFrom"
          :limit="transactionLimit"
        )
        mile-loader(v-else)
      .section
        blocks-overview(
          v-if="blockCount"
          :from="blockFrom"
          :limit="blockLimit"
        )
        mile-loader(v-else)
</template>

<script>
import api from '@/api';
import BlocksOverview from '@/components/BlocksOverview.vue';
import TransactionsOverview from '@/components/TransactionsOverview.vue';
import MileLoader from '@/components/MileLoader.vue';
import Chart from '@/components/Chart.vue';

export default {
  components: {
    BlocksOverview,
    TransactionsOverview,
    MileLoader,
    Chart,
  },
  data() {
    return {
      refreshRate: 20000,
      blockCount: 0,
      blockfirst: 0,
      blockLimit: 25,
      transactionCount: 0,
      transactionfirst: 0,
      transactionLimit: 25,
      transactionsHistory: null,
    };
  },
  computed: {
    blockFrom() {
      const from = this.blockCount - this.blockLimit;
      return from >= 0 ? from : 0;
    },
    transactionFrom() {
      const from = this.transactionCount - this.transactionLimit;
      return from >= 0 ? from : 0;
    },
  },
  methods: {
    async refreshBlockState() {
      try {
        const blockState = await api.getBlockHistoryState();
        this.blockCount = blockState.count;
        this.blockfirst = blockState.first;
      } finally {
        this.$_blockStateTimeoutHandler = setTimeout(
          () => this.refreshBlockState(),
          this.refreshRate,
        );
      }
    },
    async refreshTransactionState() {
      try {
        const transactionState = await api.getTransactionHistoryState();
        this.transactionCount = transactionState.count;
        this.transactionfirst = transactionState.first;
      } finally {
        this.$_transactionStateTimeoutHandler = setTimeout(
          () => this.refreshTransactionState(),
          this.refreshRate,
        );
      }
    },
    async refreshTransactionsHistory() {
      try {
        const transactionsHistory = await api.getStatistics();
        this.transactionsHistory = transactionsHistory[0].assets;
      } finally {
        this.$_historyTransactionsTimeoutHandler = setTimeout(
          () => this.refreshTransactionsHistory(),
          this.refreshRate,
        );
      }
    },
  },
  created() {
    this.refreshBlockState();
    this.refreshTransactionState();
    this.refreshTransactionsHistory();
  },
  beforeDestroy() {
    clearTimeout(this.$_blockStateTimeoutHandler);
    clearTimeout(this.$_transactionStateTimeoutHandler);
    clearTimeout(this.$_historyTransactionsTimeoutHandler);
  },
};
</script>

<style lang="sass" scoped>

</style>
