<template lang="pug">
  .blocks
    h1 {{ $t('title') }}
    blocks(
      v-if="state.count"
      :count="state.count"
      :first-id="state.firstId"
    )
</template>

<script>
import api from '@/api';
import Blocks from '@/components/Blocks.vue';

export default {
  components: {
    Blocks,
  },
  data() {
    return {
      state: {
        count: 0,
        firstId: 0,
      },
      refreshRate: 5000,
    };
  },
  methods: {
    async refreshState() {
      try {
        const state = await api.getBlockHistoryState();
        this.state.count = state.count;
        this.state.firstId = state['first-id'];
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
