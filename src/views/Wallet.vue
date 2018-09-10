<template lang="pug">
  .wallet
    h1 {{ $t('title') }}
    wallet(:public-key="publicKey")
</template>

<script>
import Wallet from '@/components/Wallet.vue';

export default {
  components: {
    Wallet,
  },
  props: {
    publicKey: String,
    required: true,
  },
};
</script>

<i18n>
{
  "en": {
    "title": "Wallet"
  }
}
</i18n>
