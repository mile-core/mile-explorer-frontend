<template lang="pug">
  .blocks-overview
    .headline
      .title Blocks
      button.btn(@click="$router.push({ name: 'blocks' })") View All
    ul.overview
      li.block(v-for="block in blocks " :key="block.id")
        .main
          router-link.link(
            :to="{ name: 'block', params: { blockId: block['block-id'] } }"
          ) Block {{ block['block-id'] }}
          .timestamp {{ block.timestamp | localTime }}
        .desc
          .mined Signed: {{ block['escort-signatures'][0].key }}
          .txns {{ block['transaction-count'] }} Txns
</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';


export default {
  components: {
    MileLoader,
  },
  props: {
    from: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      done: false,
      blocks: [],
    };
  },
  computed: {
    range() {
      return {
        from: this.from,
        limit: this.limit,
      };
    },
  },
  watch: {
    range: {
      handler: 'fetchRange',
      immediate: true,
    },
  },
  methods: {
    async fetchRange(range) {
      const blocks = await api.getBlockHistory(range.from, range.limit, ['transactions', 'escort-signatures', 'fee-transactions']);
      this.blocks = blocks.slice().reverse()
    },
  },
  filters: {
    sortArray: function(value) {
      if (value) {
        return value.slice().reverse()
      } else {
        return []
      }
    }
  },
};
</script>

<style lang="sass" scoped>

</style>
