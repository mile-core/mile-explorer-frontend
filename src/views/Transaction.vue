<template lang="pug">
  .page-transaction
    router-link.button.button_black.button_uppercase.button_icon_arrow-left(:to="'/wallet/' + publicKey") Wallet
    h1.h1 Transaction \#{{ transactionIdInt }}
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
      }
      return this.publicKey;
    },
  },
};
</script>

<style lang="sass" scoped>

</style>

