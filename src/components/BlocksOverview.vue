<template lang="pug">
  .blocks-overview
    p Blocks
</template>

<script>
export default {
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
};
</script>

