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
      this.block = await api.getBlock(this.blockId);
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
