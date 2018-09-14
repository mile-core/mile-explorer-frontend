<template lang="pug">
  table.block-sign
    thead
      tr
        th.key Producer public key
        th.sign Producer signature
    tbody
      tr(v-for="s in signature" :key="s.producerPublicKey")
        td.key
          router-link(:to="'/wallet/' + s.producerPublicKey") {{ s.producerPublicKey }}
        td.sign {{ s.producerSignature }}
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
    background-color: $color-shade
  th,
  td
    padding: .25rem
    text-align: left
</style>
