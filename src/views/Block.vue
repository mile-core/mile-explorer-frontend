<template lang="pug">
  .block
    h1.breadcrumbs
      span
        router-link(to="/blocks") Blocks
      span # {{ blockId }}
    block(:block-id="blockIdInt")
</template>

<script>
import Block from '@/components/Block.vue';

export default {
  components: {
    Block,
  },
  props: ['blockId'],
  computed: {
    blockIdInt() {
      return parseInt(this.blockId, 10);
    },
  },
};
</script>

<style lang="sass" scoped>
.breadcrumbs
  span:not(:last-child)::after
    content: " / "
</style>

