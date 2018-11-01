<template lang="pug">
  .transaction-info
    h3 {{ $t('title') }}
    mile-loader(v-if="!done")
    template(v-else)
    span {{error}}
    template(v-if="!error")
      template(v-if="Object.keys(info).length !== 0")
        dl
          template(v-for="(value, key) in info")
            dt {{ key }}
            dd
              strong {{ value }}
      template(v-else)
        span no result
    template(v-else)
      span.error
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
      type: String,
      required: true,
    },
  },
  data() {
    return {
      info: null,
      done: true,
      error: false,
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
      console.log(this.transactionId);
      if (!isNaN(this.transactionId)){
        console.log("123")
        try{
          this.done = false;
          const result = await api.getTransactionInfo(this.publicKey, this.transactionId);
          console.log(result);
          this.done = true;
          this.info = result;
        }catch(error){
          this.error = true;
          this.done = true;
        }
      }else{
        this.error = true;
        this.done = true;
      }
      

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
