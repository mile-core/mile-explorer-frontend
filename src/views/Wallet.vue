<template lang="pug">
  .wallet
    h1.h1 {{ $t('title') }}
    wallet(v-if="publicKey" :public-key="publicKey")
    form.wallet-form(v-else @submit.prevent="submit")
      label(for="wallet-public-key") Enter public key:
      .form-input-block
        input.form-input(id="wallet-public-key" type="text" v-model="wallet")
      button.button(type="submit") Enter
</template>

<script>
import api from '@/api';
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
      count: 0,
      first: 0,
    };
  },
  methods: {
    async submit() {
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
