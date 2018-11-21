<template lang="pug">
.table-wrap
  .table-wrap__inner.table-wrap__inner_height_small
    mile-loader(v-if="!done")
    template(v-else)
      table.table.table_limit-with_small(v-if="transactions.length")
        thead
          tr
            th.serial serial
            th.from from
            th.to to
            th.transaction-asset transaction asset
            th.amount amount
            th.block-id block id
            th.transaction-id transaction id
            th.fee fee
            th.description description
            th.transaction-type transaction type
        tbody
          tr(v-for="transaction in transactions" v-if="transaction")
            td.transaction-id {{ transaction['serial'] }}
            td.from
                router-link.link.address-tag(
                :to="{ name: 'wallet', params: { publicKey: transaction['from'] } }"
                ) {{ transaction['from'] }}
            td.to
                router-link.link.address-tag(
                :to="{ name: 'wallet', params: { publicKey: transaction['to'] } }"
                ) {{ transaction['to'] }}
            template(v-if="!transaction['asset']")
              td.transaction-asset
              td.amount
            template(v-else)
                template(v-for="item in transaction['asset']")
                  template(v-if="Assets[item['code']]")
                      td.transaction-asset {{Assets[item['code']]['name']}}
                      td.amount {{item['amount']}}
            td.block-id
              router-link(:to="'/blocks/' + transaction['block-id']") {{ transaction['block-id'] }}
            td.transaction-id
                div.t-id
                    router-link(:to="'/transactions/' + transaction['digest']") {{ transaction.digest }}
            td.fee {{transaction['fee']}}
            td.description {{transaction['description']}}
            td.transaction-type {{transaction['transaction-type']}}

</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';
import ps from 'perfect-scrollbar/dist/perfect-scrollbar';

export default {
  components: {
    MileLoader,
  },
  props: {
    count: {
      type: Number,
      required: true,
    },
    first: {
      type: Number,
      required: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      transactions: [],
      done: true,
      Assets: [],
    };
  },
  computed: {
    state() {
      return {
        count: this.count,
        first: this.first,
      };
    },
  },
  watch: {
    state: {
      handler: 'fetchTransactions',
      immediate: true,
    },
    transactions: {
      handler() {
        if (!this.scrollObj) {
          this.scrollObj = new ps(this.$el.querySelector('.table-wrap__inner'), {
            wheelSpeed: 0.5,
          });
        } else {
          this.scrollObj.update();
        }
      },
    },
  },
  methods: {
    async fetchTransactions() {
      function compareSerial(txsA, txsB) {
        return parseInt(txsB.serial) - parseInt(txsA.serial);
      }
      if (this.count) {
        const result = await api.getWalletHistoryTransactions(
          this.publicKey,
          this.first,
          this.count,
        );

        this.done = false;

        this.done = true;
        const resultTransactions = [];

        await result.forEach(async (element) => {
          const resultTransaction = await api.getTransactionInfo(
            element['public-key'],
            element.id,
          );
          resultTransaction.id = element.id;
          resultTransactions.push(resultTransaction);
          resultTransactions.sort(compareSerial);
        });
        this.transactions = resultTransactions;
        this.Assets = await api.getAssets();
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
            "title": "Blocks"
        }
    }
</i18n>
