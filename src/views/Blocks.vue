<template lang="pug">
  .blocks
    h1 {{ $t('title') }}
    blocks(
      v-if="count"
      :count="count"
      :first-id="firstId"
    )
    mile-loader(v-else)
</template>

<script>
import api from '@/api';
import Blocks from '@/components/Blocks.vue';
import MileLoader from '@/components/MileLoader.vue';

export default {
  components: {
    Blocks,
    MileLoader,
  },
  data() {
    return {
      count: 0,
      firstId: 0,
      refreshRate: 5000,
    };
  },
  methods: {
    async refreshState() {
      try {
        const state = await api.getBlockHistoryState();
        this.count = state.count;
        this.firstId = state['first-id'];
      } finally {
        console.log('get-block-history-state', Date.now());
        this.$_timeoutHandler = setTimeout(() => this.refreshState(), this.refreshRate);
      }
    },
  },
  created() {
    this.refreshState();
  },
  beforeDestroy() {
    clearTimeout(this.$_timeoutHandler);
  },
};
</script>

<i18n>
{
  "en": {
    "title": "Blocks"
  }
}
</i18n>
