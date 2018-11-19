<template lang="pug">
  .tabs
    .tabs__item.active Transfer assets transactions
    .tabs__item Other transactions
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
    },
  },
};
</script>

<style scoped>

</style>
