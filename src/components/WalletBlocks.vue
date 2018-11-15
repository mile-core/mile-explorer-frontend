<template lang="pug">
  .wallet-blocks
    h4 Wallet Blocks
    mile-loader(v-if="!done")
    template(v-else)
      ul.blocks(v-if="blocks.length")
        li.block(v-for="block in blocks" :key="block")
          router-link(:to="'/blocks/' + block") {{ block }}
</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';

export default {
  components: {
    MileLoader,
  },
  props: {
    publicKey: {
      type: String,
      required: true,
    },
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
      blocks: [],
      done: true,
    };
  },
  computed: {
    state() {
      return {
        count: this.count,
        first: this.first,
      };
    },
  },
  watch: {
    state: {
      handler: 'fetchWalletBlocks',
      immediate: true,
    },
  },
  methods: {
    async fetchWalletBlocks() {
      this.done = false;
      const result = await api.getWalletHistoryBlocks(this.publicKey, this.first, this.count);
      this.done = true;
      this.blocks = result;
    },
  },
};
</script>

<style lang="sass" scoped>
ul.blocks
  display: flex
  margin: 0
  padding: 0
  margin-bottom: .5rem
  flex-wrap: wrap
  > li.block
    margin: 0
    margin-right: .25rem
    margin-bottom: .25rem
    list-style: none
    padding: .5rem
    text-align: center
    border: 1px solid $color-blue
    &:hover
      background: $color-blue
      color: $color-white
      > a
        color: $color-white
    > a
      text-decoration: none
</style>

