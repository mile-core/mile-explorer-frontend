<template lang="pug">
  .transaction-info
    mile-loader(v-if="!done")
    template(v-else)
      .table-wrap
        .table-wrap__inner
          template(v-if="!error")
            template(v-if="Object.keys(info).length !== 0")
              table.table
                tbody
                  tr
                    template(v-for="item in info['asset']")
                      template(v-if="item['code'] === '1'")
                        th.transaction-asset MILE
                      template(v-if="item['code'] === '0'")
                        th.transaction-asset XDR
                      td.amount {{ item['amount'] }}
                  tr
                    th.block-id block-id
                    td.block-id
                      router-link(:to="'/blocks/' + info['block-id']") {{ info['block-id'] }}
                  tr
                    th.id id
                    td.id {{ info['id'] }}
                  tr
                    th.to to
                    td.to
                      router-link(:to="'/wallet/' + info['to']") {{ info['to'] }}
                  tr
                    th.from from
                    td.from
                      router-link(:to="'/wallet/' + info['from']") {{ info['from'] }}
                  tr
                    th.digest digest
                    td.digest {{ info['digest'] }}
                  tr
                    th.fee fee
                    td.fee {{ info['fee'] }}
                  tr
                    th.timestamp date
                    td.timestamp {{ info['timestamp'] }}
                  tr
                    th.transaction-id transaction-id
                    td.transaction-id {{ info['transaction-id'] }}
                  tr
                    th.transaction-type transaction-type
                    td.transaction-type {{ info['transaction-type'] }}
                  tr
                    th.memo memo
                    td.memo
                      .field-ellipsis(v-bind:title="info['value']") {{ info['value'] }}
                  tr
                    th.serial serial
                    td.serial {{ info['serial'] }}

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
    publicKey: {
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
      }else if (this.publicKey){
        try{
          this.done = false;
          const result = await api.getTransactionDigest(this.publicKey);
          this.done = true;
          this.info = result[0];
        }catch(error){
          this.error = true;
          this.done = true;
        }
      } else {
        this.error = true;
        this.done = true;
      }
    },
  },

};
</script>

<style lang="sass" scoped>

</style>

<i18n>
{
  "en": {
    "title": "Transaction Info"
  }
}
</i18n>
