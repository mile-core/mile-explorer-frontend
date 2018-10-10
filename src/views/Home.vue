<template lang="pug">
  .home
    search-bar
    .wrapper
      .section
        blocks-overview(v-if="blockCount" :from="blockFrom" :limit="3")
        mile-loader(v-else)
      .section
        transactions-overview
</template>

<script>
import api from '@/api';
import SearchBar from '@/components/SearchBar.vue';
import BlocksOverview from '@/components/BlocksOverview.vue';
import TransactionsOverview from '@/components/TransactionsOverview.vue';

export default {
  components: {
    SearchBar,
    BlocksOverview,
    TransactionsOverview,
  },
  data() {
    return {
      refreshRate: 5000,
      blockCount: 0,
      blockFirstId: 0,
      blockLimit: 3,
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
        this.$_blockStateTimeoutHandler = setTimeout(() => this.refreshState(), this.refreshRate);
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
</style>
