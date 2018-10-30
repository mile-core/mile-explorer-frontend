<template lang="pug">
  .block-info
    mile-loader(v-if="!done")
    template(v-else)
      template(v-if="error")
        span {{error}}
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
          dt timestamp
          dd {{ block['timestamp'] }}
          dt transaction-count
          dd {{ block['transaction-count'] }}
          dt version
          dd {{ block['version'] }}
        template(v-if="block['escort-signatures'].length")
          h3 Signature
          block-signature(:signature="block['escort-signatures']")
        template(v-if="block['fee-transactions'].length")
          h3 Fee Transactions
          block-fee-trnx(:trnx="block['fee-transactions']")
        template(v-if="block['transactions'].length")
          h3 Transactions
          block-trnx(:trnx="block['transactions']")
</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';
import BlockTrnx from './BlockTrnx.vue';
import BlockFeeTrnx from './BlockFeeTrnx.vue';
import BlockSignature from './BlockSignature.vue';

export default {
  components: {
    MileLoader,
    BlockTrnx,
    BlockFeeTrnx,
    BlockSignature,
  },
  props: {
    blockId: {
      type: Number,
      required: true,
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
      this.block = await api.getBlock(this.blockId);
      this.done = true;
    }catch(error){
      this.error = true;
      this.done = true;
    }
  },
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

</style>

