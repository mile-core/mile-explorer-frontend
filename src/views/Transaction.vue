<template lang="pug">
  .page-transaction
    router-link.button.button_black.button_uppercase.button_icon_arrow-left(:to="'/wallet/' + digest") Wallet
    h1.h1 Transaction
      .text-overflow(style="text-transform: none;") \#{{ transactionIdInt }}
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
  created() {
    document.title = this.$route.meta.title + this.digest;
  },
};
</script>

<style lang="sass" scoped>

</style>

