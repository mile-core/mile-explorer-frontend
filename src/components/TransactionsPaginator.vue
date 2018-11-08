<template lang="pug">
  .transactions-paginator
    ul.pages(v-if="pages > 1")
      template(v-if="showFirst")
        li.page(
          :class="{ current: current === 1}"
          @click="current = 1"
        )
          span 1
        li.ellipsis ...
      li.page(
        v-for="page in currentRange"
        :class="{ current: page === current }"
        :key="page"
        @click="current = page"
      )
        span {{ page }}
      template(v-if="showLast")
        li.ellipsis ...
        li.page(
          v-if="showLast"
          :class="{ current: current === pages }"
          @click="current = pages"
        )
          span {{ pages }}
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
    currentRange() {
      const first = (this.current - 3) > 1 ? (this.current - 3) : 1;
      const last = (this.current + 3) < this.pages ? (this.current + 3) : this.pages;
      return [...Array(1 + (last - first)).keys()].map(v => v + first);
    },
    showFirst() {
      return (this.current - 3) > 1;
    },
    showLast() {
      return (this.current + 3) < this.pages;
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
.transactions-paginator
  ul.pages
    display: flex
    padding: 0
    > li.ellipsis
      list-style: none
    > li.page
      text-align: center
      list-style: none
      padding: .25rem
      min-width: 3rem
      margin-right: .25rem
      border: 1px solid $color-blue
      &.current
        background-color: $color-blue-light
        color: $color-white
      &:hover
        background-color: $color-blue
        color: $color-white
</style>
