<template lang="pug">
  .brick-list(v-if="blocks.length")
    router-link.brick-list__item(v-for="block in blocks" :key="block" :to="'/blocks/' + block") {{ block }}
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

