<template lang="pug">
  api-block-history-state
    api-block-history(slot-scope="{ count, firstId }" :firstId="firstId" :limit="count")
      blocks-table(slot-scope="{ blocks }" :blocks="blocks")
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
};
</script>

