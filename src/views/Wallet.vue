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
.wallet-form
  label
    font-weight: 700
    display: block
    margin-bottom: .5rem
    padding: 0
  input
    display: block
    width: 100%
    max-width: 450px
    margin-bottom: 10px

  button[type=submit]
    background-color: $color-blue
    color: $color-white
    padding: .5rem 1rem
    &:hover
      background-color: $color-blue-light
</style>


<i18n>
{
  "en": {
    "title": "Wallet"
  }
}
</i18n>
