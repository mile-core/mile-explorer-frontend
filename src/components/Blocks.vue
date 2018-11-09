<template lang="pug">
  .blocks
    blocks-paginator(:count="count" :first="first" @input="fetchRange($event)")
    mile-loader(v-if="!done")
    .table-responsive
      blocks-table(:blocks="blocks")
</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';
import BlocksTable from './BlocksTable.vue';
import BlocksPaginator from './BlocksPaginator.vue';

export default {
  components: {
    MileLoader,
    BlocksTable,
    BlocksPaginator,
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
      blocks: [],
    };
  },
  methods: {
    async fetchRange(range) {
      this.done = false;
      this.blocks = await api.getBlockHistory(range.from, range.limit, ['transactions', 'escort-signatures', 'fee-transactions']);
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
