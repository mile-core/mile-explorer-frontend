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

</style>

