<template lang="pug">
  .block-list
    .block-list__head
      .block-list__title Blocks
      a(@click="$router.push({ name: 'blocks' })" href="javascript:void(0)") VIEW ALL
    .block-list__list.block-list__list_scrollbar(style="height: 460px; overflow: hidden;")
      ul.list-blocks
        li.list-blocks__item.row-info(v-for="block in blocks " :key="block.id")
          .row-info__col.pill
            .pill__body
              router-link(
                :to="{ name: 'block', params: { blockId: block['block-id'] } }"
              ) {{ block['block-id'] }}
            .pill__tip.text-overflow {{ block.timestamp | localTime }}
          .row-info__col.text-overflow
            strong SIGNED
            span {{ block['escort-signatures'][0].key }}
          .row-info__col.nowrap {{ block['transaction-count'] }} Txns
</template>
<script>
import ps from 'perfect-scrollbar/dist/perfect-scrollbar';
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
      this.blocks = blocks.slice().reverse();
    },
  },
  filters: {
    sortArray(value) {
      if (value) {
        return value.slice().reverse();
      }
      return [];
    },
  },
  mounted() {
    const scrollObj = new ps(this.$el.querySelector('.block-list__list'));
  },
};
</script>


<style lang="sass" scoped>

</style>
