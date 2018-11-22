<template lang="pug">
  .page-transaction
    router-link.button.button_black.button_uppercase.button_icon_arrow-left(:to="{ path: backBtnPath}") {{ backBtnPath | backButtonText }}
    h1.h1 Transaction
      .text-overflow(style="text-transform: none;") \#{{ transactionIdInt }}
    wallet-transaction-info(
      :digest="transactionIdInt"
    )
</template>

<script>
import WalletTransactionInfo from '@/components/WalletTransactionInfo.vue';
import { routerHistory } from 'vue-router-back-button';

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
    backBtnPath() {
      return routerHistory.hasPrevious() ? routerHistory.previous().path : '/';
    },
  },
  created() {
    document.title = this.$route.meta.title + this.digest;
  },
};
</script>

<style lang="sass" scoped>

</style>

