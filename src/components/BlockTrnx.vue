<template lang="pug">
  table.block-trnx
    thead
      tr
        th.id ID
        th.src Src
        th.dest Dest
        th.amount Amount
        th.name Name
        th.sign Sign
    tbody
      tr(v-for="trn in filteredTrnx" :key="trn.id")
        td.id {{ trn.id }}
        td.src
          router-link(:to="'/wallet/' + trn.sourceWalletPublicKey") {{ trn.sourceWalletPublicKey }}
        td.dest
          router-link(:to="'/wallet/' + trn.destinationWalletPublicKey") {{ trn.destinationWalletPublicKey }}
        td.amount {{ trn.amount }}
        td.name {{ trn.name }}
        td.sign {{ trn.signed ? '√' : 'x' }}
</template>

<script>
export default {
  props: {
    trnx: {
      type: Array,
      required: true,
    },
  },
  computed: {
    filteredTrnx() {
      return this.trnx.filter(t => t.id !== 0 && t.name !== 'DistributionFeeTransaction');
    },
  },
};
</script>

<style lang="sass" scoped>
table.block-trnx
  width: 100%
  tr:nth-child(2n+1)
    background-color: $color-shade
  th,
  td
    padding: .25rem
    text-align: center
</style>
