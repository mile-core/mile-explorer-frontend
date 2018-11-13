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
      dl
        dt block-header-digest
        dd {{ block['block-header-digest'] }}
        dt block-id
        dd {{ block['block-id'] }}
        dt merkle-root
        dd {{ block['merkle-root'] }}
        dt number-of-signers
        dd {{ block['number-of-signers'] }}
        dt previous-block-digest
        dd {{ block['previous-block-digest'] }}
        dt round
        dd {{ block['round'] }}
        dt signature
        dd {{ block['signature'] }}
        dt Date
        dd {{ block['timestamp'] | localTime }}
        dt transaction-count
        dd {{ block['transaction-count'] }}
        dt version
        dd {{ block['version'] }}
</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';
import BlockTrnx from './BlockTrnx.vue';
import BlockFeeTrnx from './BlockFeeTrnx.vue';
import BlockSignature from './BlockSignature.vue';
import TransactionsTable from './TransactionsTable.vue';

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
      this.block = await api.getBlock(this.blockId);
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
