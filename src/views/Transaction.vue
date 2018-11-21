<template lang="pug">
  .page-transaction
    h1.breadcrumbs
      span
        router-link(:to="'/wallet/' + digest") Wallet
      span Transaction # {{ transactionIdInt }}
    wallet-transaction-info(
      :digest="transactionIdInt"
    )
</template>

<script>
import WalletTransactionInfo from '@/components/WalletTransactionInfo.vue';

export default {
  components: {
    WalletTransactionInfo,
  },
  props: {
    digest: {
      type: String,
      required: true,
    },
  },
  computed: {
    transactionIdInt() {
        return this.digest;
    },
  },
  created: function () {
    document.title = this.$route.meta.title + this.digest
  }
};
</script>

<style lang="sass" scoped>

</style>
