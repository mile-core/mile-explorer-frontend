<template lang="pug">
  .transactions
    h1 {{ $t('title') }}
    transactions(
      v-if="count"
      :count="count"
      :first="first"
    )
    mile-loader(v-else)
</template>

<script>
import api from '@/api';
import Transactions from '@/components/Transactions.vue';
import MileLoader from '@/components/MileLoader.vue';

export default {
  components: {
    Transactions,
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
        const state = await api.getTransactionHistoryState();
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
    "title": "Transactions"
  }
}
</i18n>
