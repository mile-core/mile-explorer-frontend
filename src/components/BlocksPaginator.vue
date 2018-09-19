<template lang="pug">
  .blocks-paginator
    ul.pages(v-if="pages > 1")
      li.page(
        v-for="page in pages"
        :class="{ current: page === current }"
        :key="page"
        @click="current = page"
      )
        span {{ page }}
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true,
    },
    firstId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      perPage: 25,
      current: 1,
    };
  },
  computed: {
    total() {
      return this.count;
    },
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
    range() {
      const from = this.firstId + (this.count - (this.current * this.perPage));
      const limit = this.perPage;
      const range = {
        from: from < this.firstId ? this.firstId : from,
        limit: from < this.firstId ? limit + from : limit,
      };
      return range;
    },
  },
  watch: {
    range: {
      handler(val) { this.$emit('input', val); },
      immediate: true,
    },
  },
};
</script>

<style lang="sass" scoped>
.blocks-paginator
  ul.pages
    display: flex
    > li.page
      text-align: center
      list-style: none
      padding: .5rem
      min-width: 2rem
      margin-right: .25rem
      border: 1px solid $color-blue
      &.current
        background-color: $color-blue-light
        color: $color-white
      &:hover
        background-color: $color-blue
        color: $color-white
</style>
