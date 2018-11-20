<template lang="pug">
.table-wrap
  .table-wrap__inner.table-wrap__inner_height_small
    table.table(v-if="sortedBlocks.length")
      thead
        tr
          th.block-id block id
          th.block-header-digest block header digest
          th.previous-block-digest previous block digest
          th.merkle-root merkle root
          th.number-of-signers number of signers
          th.round round
          th.timestamp Date
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
          td.timestamp {{ block.timestamp | localTime }}
          td.transaction-count {{ block['transaction-count'] }}
          td.version {{ block.version }}
</template>

<script>
import ps from 'perfect-scrollbar/dist/perfect-scrollbar';

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
  watch: {
    sortedBlocks: {
      handler() {
        if (!this.scrollObj) {
          this.scrollObj = new ps(this.$el.querySelector('.table-wrap__inner'), {
            wheelSpeed: 0.5,
          });
        } else {
          this.scrollObj.update();
        }
      },
    },
  },
};
</script>

<style lang="sass" scoped>

</style>

