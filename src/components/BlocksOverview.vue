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
          .mined Signed &mdash; {{ block['escort-signatures'][0].signature }}
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
.blocks-overview
  border: 1px solid $color-gray-light
  > .headline
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between
    padding: 0.5rem 1rem
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
    height: 42rem
    overflow-y: scroll
    > li.block
      list-style: none
      display: flex
      padding: 0 0 .25rem
      margin: 0 1rem .25rem
      border-bottom: 1px solid #fafafa
      > .main
        background: $color-blue
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
        max-width: 500px
        width: 100%
        display: inline-block
        vertical-align: bottom
        text-overflow: ellipsis
        overflow: hidden

@media screen and (max-width: 650px)
  .blocks-overview
    > ul.overview
      > li.block
        flex-direction: column
        .link
        .timestamp
        > .desc
          padding: 0
          > .mined

</style>
