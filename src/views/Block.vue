<template lang="pug">
  .block
    router-link.button.button_black.button_uppercase.button_icon_arrow-left(to="/blocks") Blocks
    h1.h1 Block \#{{ blockIdInt }}
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

</style>

