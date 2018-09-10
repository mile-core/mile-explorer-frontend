<template lang="pug">
  .blocks
    h1 {{ $t('title') }}
    blocks
</template>

<script>
import Blocks from '@/components/Blocks.vue';

export default {
  components: {
    Blocks,
  },
};
</script>

<i18n>
{
  "en": {
    "title": "Blocks"
  }
}
</i18n>
