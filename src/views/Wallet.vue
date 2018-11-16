<template lang="pug">
  .wallet
    h1 {{ $t('title') }}
    wallet(v-if="publicKey" :public-key="publicKey")
    form.wallet-form(v-else @submit.prevent="submit")
      label(for="wallet-public-key") Enter public key:
      input(id="wallet-public-key" type="text" v-model="wallet")
      button(type="submit") Enter
</template>

<script>
import Wallet from '@/components/Wallet.vue';

export default {
  components: {
    Wallet,
  },
  props: {
    publicKey: String,
  },
  data() {
    return {
      wallet: '',
    };
  },
  methods: {
    submit() {
      this.$router.push(`/wallet/${this.wallet}`);
    },
  },
};
</script>

<style lang="sass" scoped>

</style>


<i18n>
{
  "en": {
    "title": "Wallet"
  }
}
</i18n>
