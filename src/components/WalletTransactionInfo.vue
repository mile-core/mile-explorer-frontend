<template lang="pug">
.transaction-info
    mile-loader(v-if="!done")
    template(v-else)
        .table-wrap
            .table-wrap__inner
              template(v-if="!error")
                template(v-if="Object.keys(info).length !== 0")
                  table.transaction-table
                    thead
                      tr
                        th Key
                        th Value
                    tbody
                      tr
                        td.digest digest
                        td.digest
                          strong {{ info['digest'] }}
                      tr
                        td.block-id block-id
                        td.block-id
                            router-link(:to="'/blocks/' + info['block-id']") {{ info['block-id'] }}
                      tr
                        template(v-for="item in info['asset']")
                          template(v-if="item['code'] === '1'")
                            td.transaction-asset MILE
                          template(v-if="item['code'] === '0'")
                            td.transaction-asset XDR
                          td.amount
                            strong {{ item['amount'] }}
                      tr
                        td.timestamp date
                        td.timestamp
                          strong {{ info['timestamp'] | localTime }}
                      tr
                        td.from from
                        td.from
                            router-link(:to="'/wallet/' + info['from']") {{ info['from'] }}
                      tr
                        td.to to
                        td.to
                            router-link(:to="'/wallet/' + info['to']") {{ info['to'] }}
                      tr
                        td.id id
                        td.id
                          strong {{ info['id'] }}
                      tr
                        td.fee fee
                        td.fee
                          strong {{ info['fee'] }}
                      tr
                        td.transaction-id transaction-id
                        td.transaction-id
                          strong {{ info['transaction-id'] }}
                      tr
                        td.transaction-type transaction-type
                        td.transaction-type
                          strong {{ info['transaction-type'] }}
                      tr
                        td.serial serial
                        td.serial
                          strong {{ info['serial'] }}

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
    digest: {
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
    digest: {
      handler: 'fetchTransactionInfo',
      immediate: true,
    },
  },
  methods: {
    async fetchTransactionInfo() {
      if (this.digest){
        try{
          this.done = false;
          const result = await api.getTransactionDigest(this.digest);
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
