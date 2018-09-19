<template lang="pug">
  .transaction-info
    h3 {{ $t('title') }}
    mile-loader(v-if="!done")
    template(v-else)
      dl
        template(v-for="(value, key) in info")
          dt {{ key }}
          dd
            strong {{ value }}
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
    transactionId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      info: null,
      done: true,
    };
  },
  watch: {
    transactionId: {
      handler: 'fetchTransactionInfo',
      immediate: true,
    },
  },
  methods: {
    async fetchTransactionInfo() {
      this.done = false;
      const result = await api.getTransactionInfo(this.publicKey, this.transactionId);
      this.done = true;
      this.info = result;
    },
  },

};
</script>


<i18n>
{
  "en": {
    "title": "Transaction Info"
  }
}
</i18n>
