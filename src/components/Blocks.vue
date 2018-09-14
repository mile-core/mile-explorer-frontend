<template lang="pug">
  api-block-history-state
    api-block-history(
      slot-scope="{ count, firstId }"
      :firstId="from(firstId, count)"
      :limit="perPage"
    )
      div(slot-scope="{ blocks }")
        blocks-table(:blocks="blocks")
        ul.pagination(v-if="pages > 1")
          li(
            v-for="n in pages"
            @click="toPage(n)"
            :class="{ current: n === page }"
            :key="n"
          ) {{ n }}
</template>

<script>
import ApiBlockHistory from './ApiBlockHistory.vue';
import ApiBlockHistoryState from './ApiBlockHistoryState.vue';
import MileLoader from './MileLoader.vue';
import BlocksTable from './BlocksTable.vue';

export default {
  components: {
    ApiBlockHistory,
    ApiBlockHistoryState,
    MileLoader,
    BlocksTable,
  },
  data() {
    return {
      page: 1,
      pages: 0,
      total: 0,
      perPage: 25,
    };
  },
  methods: {
    from(firstId, count) {
      this.total = count - firstId;
      this.pages = Math.ceil(this.total / this.perPage);
      return (this.pages - this.page) * this.perPage;
    },
    toPage(page) {
      this.page = page;
    },
  },
};
</script>

<style lang="sass" scoped>
ul.pagination
  display: flex
  > li
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
