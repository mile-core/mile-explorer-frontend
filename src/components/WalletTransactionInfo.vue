<template lang="pug">
.transaction-info
  mile-loader(v-if="!done")
  template(v-else)
    .table-wrap
      .table-wrap__inner
        template(v-if="!error")
          template(v-if="Object.keys(info).length !== 0")
            table.table.table_horiz-flat
              tbody
                tr
                  th.digest digest
                  td.digest {{ info['digest'] }}
                tr
                  th.block-id block-id
                  td.block-id
                    router-link(:to="'/blocks/' + info['block-id']") {{ info['block-id'] }}
                tr
                  template(v-for="item in info['asset']")
                    template(v-if="assets[item['code']]")
                      td.transaction-asset {{assets[item['code']]['name']}}
                      td.amount <vue-numeric v-bind:value="item['amount']" read-only=True v-bind:precision="assets[item['code']]['precision']"></vue-numeric>
                tr
                  th.timestamp date
                  td.timestamp {{ info['timestamp'] | dateUTC }} ({{ info['timestamp'] | timeAgo }})
                tr
                  th.from from
                  td.from
                    router-link(:to="'/wallet/' + info['from']") {{ info['from'] }}
                tr
                  th.to to
                  td.to
                    router-link(:to="'/wallet/' + info['to']") {{ info['to'] }}
                tr
                  th.id id
                  td.id {{ info['id'] }}
                tr
                  th.fee fee
                  td.fee {{ info['fee'] }}
                tr
                  th.transaction-id transaction-id
                  td.transaction-id {{ info['transaction-id'] }}
                tr
                  th.transaction-type transaction-type
                  td.transaction-type {{ info['transaction-type'] }}
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
import VueNumeric from 'vue-numeric'

export default {
  components: {
    MileLoader,
    VueNumeric,
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
      assets: [],
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
      if (this.digest) {
        try {
          this.done = false;
          this.assets = await api.getAssets();
          const result = await api.getTransactionDigest(this.digest);
          this.done = true;
          this.info = result[0];
        } catch (error) {
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
