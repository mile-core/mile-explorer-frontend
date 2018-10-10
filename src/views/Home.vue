<template lang="pug">
  .home
    .search-wrapper
      search-bar
    .info-wrapper
      .section
        blocks-overview(v-if="blockCount" :from="blockFrom" :limit="blockLimit")
        mile-loader(v-else)
      .section
        transactions-overview
</template>

<script>
import api from '@/api';
import SearchBar from '@/components/SearchBar.vue';
import BlocksOverview from '@/components/BlocksOverview.vue';
import TransactionsOverview from '@/components/TransactionsOverview.vue';
import MileLoader from '@/components/MileLoader.vue';

export default {
  components: {
    SearchBar,
    BlocksOverview,
    TransactionsOverview,
    MileLoader,
  },
  data() {
    return {
      refreshRate: 5000,
      blockCount: 0,
      blockFirstId: 0,
      blockLimit: 10,
    };
  },
  computed: {
    blockFrom() {
      const from = this.blockCount - this.blockLimit;
      return from >= 0 ? from : 0;
    },
  },
  methods: {
    async refreshBlockState() {
      try {
        const blockState = await api.getBlockHistoryState();
        this.blockCount = blockState.count;
        this.blockFirstId = blockState['first-id'];
      } finally {
        this.$_blockStateTimeoutHandler = setTimeout(
          () => this.refreshBlockState(),
          this.refreshRate,
        );
      }
    },
  },
  created() {
    this.refreshBlockState();
  },
  beforeDestroy() {
    clearTimeout(this.$_blockStateTimeoutHandler);
  },
};
</script>

<style lang="sass" scoped>
.home
  > .search-wrapper
    padding: 5rem 0
  > .info-wrapper
    display: flex
    > .section
      width: calc(50% - 1rem)
      margin: 0 .5rem
</style>
