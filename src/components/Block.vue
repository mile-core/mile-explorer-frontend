<template lang="pug">
  .block-info
    mile-loader(v-if="!done")
    template(v-else)
      h3 info
      dl
        dt block-id
        dd {{ block['block-id'] }}
        dt merkleRoot
        dd {{ block.merkleRoot }}
        dt previousBlockDigest
        dd {{ block.previousBlockDigest }}
        dt producerPublicKeySize
        dd {{ block.producerPublicKeySize }}
        dt timeStamp
        dd {{ block.timeStamp }}
        dt transactionCount
        dd {{ block.transactionCount }}
      h3 Signature
      block-signature(:signature="block.signature")
      h3 Transactions
      block-trnx(:trnx="block.transactions")
</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';
import BlockTrnx from './BlockTrnx.vue';
import BlockSignature from './BlockSignature.vue';

export default {
  components: {
    MileLoader,
    BlockTrnx,
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
      block: {},
    };
  },
  async created() {
    this.block = await api.getBlock(this.blockId);
    this.done = true;
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

