<template lang="pug">
  header.header
    .header__panel
      .header__stats.separate-list.content-wrapper
        Stats
    .header__inner.content-wrapper
      .header__top
        router-link.header__logo.logo(to="/")
          .logo__img
          .logo__text Explorer
        button.header__menu-btn.menu-btn(@click='toggleMobileMenu()')
        nav.header__menu.top-menu(v-show='mobileMenuIsOpen')
          router-link.top-menu__link(to="/blocks") {{ $t('blocks') }}
          router-link.top-menu__link(to="/wallet") {{ $t('wallet') }}
          router-link.top-menu__link(to="/transactions") {{ $t('transactions') }}
          button.header__close-btn.close-btn(@click='toggleMobileMenu()')
          .header__mobile-info
            p.indent-symbol(v-html="$t('copyright')")
            p(v-html="$t('blockTimeInfo')")
            router-link(to="/playground") API Playground
      .header__bottom
        .search-wrapper
          search-bar
</template>

<script>
import api from '@/api';
import SearchBar from '@/components/SearchBar.vue';
import ps from 'perfect-scrollbar/dist/perfect-scrollbar';
import VueNumeric from 'vue-numeric'
import Stats from '@/components/Stats.vue';

export default {
  components: {
    SearchBar,
    VueNumeric,
    Stats,
  },
  data() {
    return {
      mobileMenuIsOpen: false,
    };
  },
  methods: {
    toggleMobileMenu() {
      const appCont = document.getElementById('app');

      if (this.mobileMenuIsOpen) {
        this.mobileMenuIsOpen = false;
        appCont.style.overflow = '';
      } else {
        this.mobileMenuIsOpen = true;
        appCont.style.overflow = 'hidden';
        const scrollObj = new ps(appCont.querySelector('.header__menu'), {
          wheelSpeed: 0.5,
        });
      }
    },
  },
  watch: {
    $route(to, from) {
      if (from.path !== to.path) {
        if (this.mobileMenuIsOpen) {
          this.toggleMobileMenu();
        }
      }
    },
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

