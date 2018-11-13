<template lang="pug">
  .transaction-info
    mile-loader(v-if="!done")
    template(v-else)
    .table-responsive
      template(v-if="!error")
        template(v-if="Object.keys(info).length !== 0")
          table.transaction-table
            thead
              tr
                th Key
                th Value
            tbody
              tr(v-for="(value, key) in info")
                template(v-if="key == 'asset'")
                  template(v-for="item in value")
                    template(v-if="item['code'] === '1'")
                      td.transaction-asset MILE
                    template(v-if="item['code'] === '0'")
                      td.transaction-asset XDR
                    td.amount
                      strong {{ item['amount'] }}
                template(v-else)
                  td {{ key }}
                  td
                    strong {{ value }}
        template(v-else)
          h1.title Oops!
          p.description Sorry! This is an invalid wallet public key or transaction id.
          button.btn(@click="$router.push({ name: 'home' })") Back Home
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
      if (!isNaN(this.transactionId)){
        try{
          this.done = false;
          const result = await api.getTransactionInfo(this.publicKey, this.transactionId);
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

<style lang="sass" scoped>
table.transaction-table
  width: 100%
  max-width: 900px
  &.block-header-digest,
  &.previous-block-digest,
  &.merkle-root
    max-width: 10rem
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
  .timestamp
    font-family: monospace
</style>

<i18n>
{
  "en": {
    "title": "Transaction Info"
  }
}
</i18n>
