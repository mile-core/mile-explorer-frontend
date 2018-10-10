<template lang="pug">
  table.blocks-table(v-if="sortedBlocks.length")
    thead
      tr
        th.block-id block id
        th.block-header-digest block header digest
        th.previous-block-digest previous block digest
        th.merkle-root merkle root
        th.number-of-signers number of signers
        th.round round
        th.timestamp timestamp
        th.transaction-count transaction count
        th.version version
    tbody
      tr(v-for="block in sortedBlocks" :key="block.id")
        td.block-id
          router-link(:to="'/blocks/' + block['block-id']") {{ block['block-id'] }}
        td.block-header-digest {{ block['block-header-digest'] }}
        td.previous-block-digest {{ block['previous-block-digest'] }}
        td.merkle-root {{ block['merkle-root'] }}
        td.number-of-signers {{ block['number-of-signers'] }}
        td.round {{ block.round }}
        td.timestamp {{ block.timestamp }}
        td.transaction-count {{ block['transaction-count'] }}
        td.version {{ block.version }}
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
    background-color: $color-ghost
  th,
  td
    padding: .25rem
    text-align: center
    &.block-header-digest,
    &.previous-block-digest,
    &.merkle-root
      max-width: 10rem
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
  .timestamp
    font-family: monospace
</style>

