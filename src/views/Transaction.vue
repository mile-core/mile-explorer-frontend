<template lang="pug">
  .page-transaction
    h1.breadcrumbs
      span
        router-link(:to="'/wallet/' + publicKey") Wallet
      span Transaction # {{ transactionIdInt }}
    p.publicKey publicKey: {{ publicKey }}
    wallet-transaction-info(
      v-if="transactionId"
      :publicKey="publicKey"
      :transactionId="transactionIdInt"
    )
</template>

<script>
import WalletTransactionInfo from '@/components/WalletTransactionInfo.vue';

export default {
  components: {
    WalletTransactionInfo,
  },
  props: {
    publicKey: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  computed: {
    transactionIdInt() {
      return this.transactionId;
    },
  },
};
</script>

<style lang="sass" scoped>
.publicKey
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
.breadcrumbs
  span:not(:last-child)::after
    content: " / "
</style>

