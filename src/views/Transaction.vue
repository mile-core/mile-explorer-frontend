<template lang="pug">
  .page-transaction
    h1.breadcrumbs
      span
        router-link(:to="'/wallet/' + publicKey") Wallet
      span Transaction # {{ transactionIdInt }}
    wallet-transaction-info(
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
    },
  },
  computed: {
    transactionIdInt() {
      if (this.transactionId) {
        return this.transactionId;
      } else {
        return this.publicKey;
      }
    },
  },
};
</script>

<style lang="sass" scoped>

</style>

