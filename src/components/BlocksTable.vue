<template lang="pug">
  table.blocks-table
    thead
      tr
        th id
        th timeStamp
        th transactions
        th merkle root
        th ver
    tbody
      tr(v-for="block in sortedBlocks" :key="block.id")
        td
          router-link(:to="'/blocks/' + block['block-id']") {{ block['block-id'] }}
        td.timestamp {{ formatTimeStamp(block.timeStamp) }}
        td {{ block.transactionCount }}
        td {{ block.merkleRoot }}
        td {{ block.version }}
</template>

<script>
import fecha from 'fecha';

export default {
  props: {
    blocks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      now: Date.now(),
    };
  },
  created() {
    this.intervalHandler = setInterval(() => {
      this.now = Date.now();
    }, 500);
  },
  destroyed() {
    clearInterval(this.intervalHandler);
  },
  methods: {
    formatTimeStamp(timeStamp) {
      const date = timeStamp / 10000;
      return fecha.format(date, 'YYYY-MM-DD HH:mm:ss');
    },
  },
  computed: {
    sortedBlocks() {
      const blocks = this.blocks.slice(0);
      blocks.sort(({ 'block-id': a }, { 'block-id': b }) => {
        if (a < b) return 1;
        if (a > b) return -1;
        return 0;
      });
      return blocks;
    },
  },
};
</script>

<style lang="sass" scoped>
table.blocks-table
  width: 100%
  tr:nth-child(2n+1)
    background-color: $color-shade
  th,
  td
    padding: .25rem
    text-align: center
  .timestamp
    font-family: monospace
</style>

