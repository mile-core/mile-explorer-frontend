<template lang="pug">
  table.block-trnx
    thead
      tr
        th.id id
        th.counter-block-id counter-block-id
        th.wallet wallet
        th.type type
        th.course course
    tbody
      tr(v-for="(trn, idx) in trnx" :key="trn['transaction-id'] + idx")
        td.id {{ trn['transaction-id'] }}
        td.counter-block-id {{ trn['counter-block-id'] }}
        td.wallet(:title="trn.wallet")
          router-link(:to="'/wallet/' + trn.wallet") {{ trn.wallet }}
        td.type {{ trn.type }}
        td.course {{ trn.course }}
</template>

<script>
export default {
  props: {
    trnx: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="sass" scoped>
table.block-trnx
  width: 100%
  tr:nth-child(2n+1)
    background-color: $color-ghost
  th,
  td

    text-align: center
    &.wallet
      max-width: 10rem
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
</style>
