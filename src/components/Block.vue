<template lang="pug" track-by="$index">
  .block-info
    mile-loader(v-if="!done")
    template(v-else)
      template(v-if="error")
        .search
          h1.title Oops!
          p.description The block id you entered was:
          pre {{this.response}}
          p.description Sorry! This is an invalid block id.
          button.btn(@click="$router.push({ name: 'home' })") Back Home
      template(v-else)
        .table-wrap
          .table-wrap__inner
            table.table
              tbody
                tr
                  th.block-header-digest block-header-digest
                  td.block-header-digest {{ block['block-header-digest'] }}
                tr
                  th.block-id block-id
                  td.block-id {{ block['block-id'] }}
                tr
                  th.merkle-root merkle-root
                  td.merkle-root {{ block['merkle-root'] }}
                tr
                  th.number-of-signers number-of-signers
                  td.number-of-signers {{ block['number-of-signers'] }}
                tr
                  th.previous-block-digest previous-block-digest
                  td.previous-block-digest {{ block['previous-block-digest'] }}
                tr
                  th.round round
                  td.round {{ block['round'] }}
                tr
                  th.signature signature
                  td.signature {{ block['escort-signatures'][0].key }}
                tr
                  th.date date
                  td.date {{ block['timestamp'] | localTime }}
                tr
                  th.transaction-count transaction-count
                  td.transaction-count {{ block['transaction-count'] }}
                tr
                  th.version version
                  td.version {{ version }}

    template(v-if="block['transactions'].length")
      h3 Transactions
      transfer-assets-transactions-table(:transactions="block['transactions']")
</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';
import BlockTrnx from './BlockTrnx.vue';
import BlockFeeTrnx from './BlockFeeTrnx.vue';
import BlockSignature from './BlockSignature.vue';
import TransferAssetsTransactionsTable from './TransferAssetsTransactionsTable.vue';

export default {
  components: {
    MileLoader,
    BlockTrnx,
    BlockFeeTrnx,
    BlockSignature,
    TransferAssetsTransactionsTable,
  },
  props: {
    blockId: {
      type: Number,
      required: true,
    },
    response: {
      type: String,
    },
  },
  data() {
    return {
      done: false,
      error: false,
      block: {},
    };
  },
  async created() {
    try {
      const blockId = this.blockId;
      this.block = await api.getBlock(this.blockId);
      if (this.block.transactions.length > 0) {
        this.block.transactions.forEach((e) => {
          e['block-id'] = blockId;
        });
      }
      this.done = true;
    } catch (error) {
      if (isNaN(this.blockId)) {
        this.response = 'Is not a number';
      } else {
        this.response = this.blockId;
      }
      this.error = true;
      this.done = true;
    }
  },
  watch: {
    $route(to, from) {
      const that = this;
      const params_to = to.params;
      const params_from = from.params;
      if (params_from.blockId != params_to.blockId) {
        this.blockId = params_to.blockId;
        try {
          this.block = api.getBlock(this.blockId)
            .then((resp) => {
              that.block = resp;
            });
          this.done = true;
        } catch (error) {
          if (isNaN(this.blockId)) {
            this.response = 'Is not a number';
          } else {
            this.response = this.blockId;
          }
          this.error = true;
          this.done = true;
        }
      }
    },
  },
};
</script>

<style lang="sass" scoped>

</style>
