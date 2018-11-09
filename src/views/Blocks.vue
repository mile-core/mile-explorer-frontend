<template lang="pug">
  .blocks
    h1 {{ $t('title') }}
    blocks(
      v-if="count"
      :count="count"
      :first="first"
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
      first: 0,
      refreshRate: 5000,
    };
  },
  methods: {
    async refreshState() {
      try {
        const state = await api.getBlockHistoryState();
        this.count = state.count;
        this.first = state['first'];
      } finally {
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
