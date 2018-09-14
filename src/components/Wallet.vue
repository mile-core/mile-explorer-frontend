<template lang="pug">
  .wallet-info
    p publicKey: {{ publicKey }}
    mile-loader(v-if="!done")
    template(v-else)
      h3 History State
      pre {{ state }}
</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';

export default {
  components: {
    MileLoader,
  },
  props: {
    publicKey: String,
    required: true,
  },
  data() {
    return {
      state: null,
      done: false,
    };
  },
  watch: {
    state(v) {
      
    },
  },
  async created() {
    const result = await api.getWalletHistoryState(this.publicKey);
    this.done = true;
    if (!result) this.$router.replace('/wallet');
    this.state = result;
  },
};
</script>

