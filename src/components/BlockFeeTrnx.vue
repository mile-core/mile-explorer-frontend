<template lang="pug">
  table.block-fee-trnx
    thead
      tr
        th.id id
        th.from from
        th.to to
        th.amount amount
        th.fee fee
        th.asset-code asset-code
        th.type type
        th.memo memo
    tbody
      tr(v-for="(trn, idx) in trnx" :key="trn['transaction-id'] + idx")
        td.id {{ trn['transaction-id'] }}
        td.from(:title="trn.from")
          router-link(:to="'/wallet/' + trn.from") {{ trn.from }}
        td.to(:title="trn.to")
          router-link(:to="'/wallet/' + trn.to") {{ trn.to }}
        td.amount {{ trn.amount }}
        td.fee {{ trn.fee }}
        td.asset-code {{ trn['asset-code'] }}
        td.type {{ trn.type }}
        td.memo {{ trn.memo }}
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

</style>
