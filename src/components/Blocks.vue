<template lang="pug">
  .blocks
    mile-loader(v-if="!done")
    blocks-table(:blocks="blocks")
    paginator(:count="count" :first="first" @input="fetchRange($event)")
</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';
import BlocksTable from './BlocksTable.vue';
import Paginator from './Paginator.vue';

export default {
  components: {
    MileLoader,
    BlocksTable,
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

</style>
