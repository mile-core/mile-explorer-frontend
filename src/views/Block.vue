<template lang="pug">
  .block
    router-link.button.button_black.button_uppercase.button_icon_arrow-left(:to="{ path: backBtnPath}") {{ backBtnPath | backButtonText }}
    h1.h1 Block \#{{ blockIdInt }}
    block(:block-id="blockIdInt")
</template>

<script>
import Block from '@/components/Block.vue';
import { routerHistory } from 'vue-router-back-button';

export default {
  components: {
    Block,
  },
  props: ['blockId'],
  computed: {
    blockIdInt() {
      return parseInt(this.blockId, 10);
    },
    backBtnPath() {
      return routerHistory.hasPrevious() ? routerHistory.previous().path : '/';
    },
  },
};
</script>

<style lang="sass" scoped>

</style>

