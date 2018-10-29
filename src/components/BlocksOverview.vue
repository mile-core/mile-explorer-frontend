<template lang="pug">
  .blocks-overview
    .headline
      .title Blocks
      button.btn(@click="$router.push({ name: 'blocks' })") View All
    ul.overview
      li.block(v-for="block in blocks" :key="block.id")
        .main
          router-link.link(
            :to="{ name: 'block', params: { blockId: block['block-id'] } }"
          ) Block {{ block['block-id'] }}
          .timestamp {{ ago(block.timestamp) }}
        .desc
          .mined Hash &mdash; {{ block['block-header-digest'] }}
          .txns {{ block['transaction-count'] }} Txns
</template>

<script>
import api from '@/api';
import fecha from 'fecha';
import timeago from 'timeago.js';
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
      this.blocks = await api.getBlockHistory(range.from, range.limit, ['transactions', 'escort-signatures', 'fee-transactions']);
    },
    ago(timestamp) {
      const date = fecha.parse(timestamp, 'YYYY-MMM-DD HH:mm:ss');
      return timeago().format(date);
    },
  },
};
</script>

<style lang="sass" scoped>
.blocks-overview
  border: 1px solid $color-gray-light
  > .headline
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between
    padding: 1rem
    background-color: $color-ghost
    border-bottom: 1px solid $color-gray-light
    > .title
      color: $color-gray
      height: 1rem
      line-height: 1rem
      padding-left: 1.5rem
      background: url(../assets/icons/package.svg) no-repeat center left
      background-size: contain
    > .btn
        display: inline-block
        border: 1px solid $color-gray
        padding: .5rem 1rem
        margin: 0
        text-decoration: none
        background: $color-white
        color: $color-gray
        font-family: sans-serif
        font-size: 1rem
        cursor: pointer
        text-align: center
        transition: background 250ms ease-in-out, transform 150ms ease
        -webkit-appearance: none
        -moz-appearance: none
        &:hover
          color: $color-blue
          border-color: $color-blue

  > ul.overview
    padding: 0
    font-size: 14px
    height: 17.5rem
    overflow-y: scroll
    > li.block
      list-style: none
      display: flex
      padding: 0 0 .25rem
      margin: 0 1rem .25rem
      border-bottom: 1px solid #fafafa
      > .main
        background: $color-gray
        color: $color-white
        padding: .5rem 1rem
        text-align: center
        > .link
          color: $color-white
          text-decoration: none
          &:hover
            text-decoration: underline
        > .timestamp
          font-size: 11px
          line-height: 1rem
      > .desc
        padding: 0 1rem

</style>
