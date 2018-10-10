<template lang="pug">
  table.block-sign
    thead
      tr
        th.key key
        th.signature signature
    tbody
      tr(v-for="s in signature" :key="s.producerPublicKey")
        td.key(:title="s.key")
          router-link(:to="'/wallet/' + s.key") {{ s.key }}
        td.signature(:title="s.signature") {{ s.signature }}
</template>

<script>
export default {
  props: {
    signature: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="sass" scoped>
table.block-sign
  width: 100%
  tr:nth-child(2n+1)
    background-color: $color-ghost
  th,
  td
    padding: .25rem
    text-align: left
    &.key,
    &.signature
      max-width: 10rem
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
</style>
