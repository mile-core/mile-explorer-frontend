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
        h3 Info
        .table-responsive
            table
                thead
                    tr
                        th Key
                        th Value
                tbody
                    tr
                        td.block-header-digest block-header-digest
                        td.block-header-digest {{ block['block-header-digest'] }}
                    tr
                        td.block-id block-id
                        td.block-id {{ block['block-id'] }}
                    tr
                        td.merkle-root merkle-root
                        td.merkle-root {{ block['merkle-root'] }}
                    tr
                        td.number-of-signers number-of-signers
                        td.number-of-signers {{ block['number-of-signers'] }}
                    tr
                        td.previous-block-digest previous-block-digest
                        td.previous-block-digest {{ block['previous-block-digest'] }}
                    tr
                        td.round round
                        td.round {{ block['round'] }}
                    tr
                        td.signature signature
                        td.signature {{ block['escort-signatures'][0].key }}
                    tr
                        td.date date
                        td.date {{ block['timestamp'] | localTime }}
                    tr
                        td.transaction-count transaction-count
                        td.transaction-count {{ block['transaction-count'] }}
                    tr
                        td.version version
                        td.version {{ version }}
    template(v-if="block['transactions'].length")
        h3 Transactions
        .table-responsive
            transactions-table(:transactions="block['transactions']")
</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';
import BlockTrnx from './BlockTrnx.vue';
import BlockFeeTrnx from './BlockFeeTrnx.vue';
import BlockSignature from './BlockSignature.vue';
import TransactionsTable from './TransferAssetsTransactionsTable.vue';

export default {
  components: {
    MileLoader,
    BlockTrnx,
    BlockFeeTrnx,
    BlockSignature,
    TransactionsTable,
  },
  props: {
    blockId: {
      type: Number,
      required: true,
    },
    response: {
      type: String
    }
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
      const blockId = this.blockId
      this.block = await api.getBlock(this.blockId);
      if (this.block['transactions'].length > 0) {
          this.block['transactions'].forEach(function(e) {
              e['block-id'] = blockId
          })
      }
      this.done = true;
    }catch(error){
      if (isNaN(this.blockId)){
          this.response = "Is not a number";
      }else{
          this.response = this.blockId;
      }
      this.error = true;
      this.done = true;
    }
  },
    watch: {
        '$route' (to, from) {
            var that = this;
            var params_to = to.params;
            var params_from = from.params;
            if (params_from['blockId'] != params_to['blockId']){

                this.blockId = params_to['blockId'];
                try {
                    this.block = api.getBlock(this.blockId).then((resp)=>{
                        that.block = resp;
                    });
                    this.done = true;
                }catch(error){
                    if (isNaN(this.blockId)){
                        this.response = "Is not a number";
                    }else{
                        this.response = this.blockId;
                    }
                    this.error = true;
                    this.done = true;
                }
            }
        }
    }
};
</script>

<style lang="sass" scoped>
.block-info
  dl
    display: grid
    grid-template-columns: 1fr 5fr

    > dt
      grid-column: 1
      font-weight: 700
      text-align: right
    > dd
      grid-column: 2
  .search
    text-align: center
    pre
      display: block
      padding: 9.5px
      width: 80%
      margin: 0 auto
      font-size: 13px
      line-height: 1.42857143
      color: #333
      word-break: break-all
      word-wrap: break-word
      background-color: #f5f5f5
      border: 1px solid #ccc
      border-radius: 4px

</style>
