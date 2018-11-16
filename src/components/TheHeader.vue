<template lang="pug">
  header.header
    .header__inner.content-wrapper
      .header__top
        router-link.header__logo.logo(to="/")
          .logo__img
          .logo__text Explorer
        button.hamburger(@click='toggle = !toggle')
          span.hamburger-box.hamburger--squeeze
            span.hamburger-inner
        nav.header__menu.top-menu(v-show='toggle' @click='toggle = !toggle')
          router-link.top-menu__link(to="/blocks") {{ $t('blocks') }}
          router-link.top-menu__link(to="/wallet") {{ $t('wallet') }}
          router-link.top-menu__link(to="/transactions") {{ $t('transactions') }}
      .header__bottom
        .search-wrapper
          search-bar
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';

export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      toggle: false,
    };
  },
};

</script>

<style lang="sass" scoped>

</style>

<i18n>
{
  "en": {
    "title": "Explorer",
    "home": "MILE Explorer",
    "blocks": "Blocks",
    "transactions": "Transactions",
    "wallet": "Wallet"
  }
}
</i18n>

