<template lang="pug">
  .blocks
    blocks-paginator(:count="count" :first-id="firstId" @input="fetchRange($event)")
    mile-loader(v-if="!done")
    blocks-table(v-else :blocks="blocks")
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
    firstId: {
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
      this.blocks = await api.getBlockHistory(range.from, range.limit, ['signature', 'transactions']);
      this.done = true;
    },
  },
};
</script>

<style lang="sass" scoped>
</style>
