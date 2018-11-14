<template lang="pug">
  .home
    .info-wrapper
      .section
        blocks-overview(v-if="blockCount" :from="blockFrom" :limit="blockLimit")
        mile-loader(v-else)
      .section
        transactions-overview(v-if="transactionCount" :from="transactionFrom" :limit="transactionLimit")
        mile-loader(v-else)
</template>

<script>
import api from '@/api';
import BlocksOverview from '@/components/BlocksOverview.vue';
import TransactionsOverview from '@/components/TransactionsOverview.vue';
import MileLoader from '@/components/MileLoader.vue';

export default {
  components: {
    BlocksOverview,
    TransactionsOverview,
    MileLoader,
  },
  data() {
    return {
      refreshRate: 20000,
      blockCount: 0,
      blockfirst: 0,
      blockLimit: 25,
      transactionCount: 0,
      transactionfirst: 0,
      transactionLimit: 25
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
        this.blockfirst = blockState['first'];
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
        this.transactionfirst = transactionState['first'];
      } finally {
        this.$_transactionStateTimeoutHandler = setTimeout(
          () => this.refreshTransactionState(),
          this.refreshRate,
        );
      }
    },
  },
  created() {
    this.refreshBlockState();
    this.refreshTransactionState();
  },
  beforeDestroy() {
    clearTimeout(this.$_blockStateTimeoutHandler);
  },
};
</script>

<style lang="sass" scoped>
.home
  > .search-wrapper
    padding: 3rem 0
  > .info-wrapper
    display: flex
    > .section
      width: calc(50% - 1rem)
      margin: 0 .5rem

@media screen and (max-width: 992px)
  .home
    > .search-wrapper
      padding: 1rem 0
    > .info-wrapper
      flex-direction: column
      > .section
        width: calc(100% - 1rem)
</style>
