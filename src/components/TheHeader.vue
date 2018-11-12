<template lang="pug">
  header.header
    router-link.logo(to="/") {{ $t('title') }}
    .search-wrapper
      search-bar
    button.hamburger(@click='toggle = !toggle')
      span.hamburger-box.hamburger--squeeze
        span.hamburger-inner
    nav.top-menu(v-show='toggle' @click='toggle = !toggle')
      router-link(to="/blocks") {{ $t('blocks') }}
      router-link(to="/wallet") {{ $t('wallet') }}
      router-link(to="/transactions") {{ $t('transactions') }}
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';

export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      toggle: false
    }
  }
};

</script>

<style lang="sass" scoped>
.header
  display: flex
  flex-wrap: nowrap
  justify-content: center
  align-items: center
  padding: 1rem
  border-bottom: 1px solid rgba(0, 0, 0, .1)
  position: relative
  > .top-menu
    display: block
    margin: 0 0 0 15px
  > .hamburger
    display: none
    outline: none
    margin: 4px 0 0 15px
    .hamburger-box
      background: $color-blue
      width: 44px
      height: 36px
      padding: 15px 5px
    .hamburger-inner, .hamburger-inner:after, .hamburger-inner:before
      position: absolute
      width: 35px
      height: 4px
      background-color: #fff
  > .logo
    width: 240px
    height: 64px
    cursor: pointer
    background: url(../assets/logo.svg)
    text-indent: 75px
    background-repeat: no-repeat
    padding-top: 12px
    background-size: 90px
    padding-top: 12px
    background-position: 3px -13px
    text-transform: uppercase
    font-size: 32px
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
    font-weight: 100
    text-decoration: none
    color: #3d4852
  > .title
    padding: 0 1rem
    color: $color-gray-dark
    font-family: $font-sans
    font-weight: 100
    font-size: 2rem
    line-height: 2rem
    text-transform: uppercase
  > .search-wrapper
    max-width: 710px
    width: 100%
  > nav
    > a
      margin-left: 1rem

@media screen and (max-width: 992px)
  .header
    > .hamburger
      display: block

    .top-menu
      display: block
      position: absolute
      top: 97px
      width: 100%
      text-align: center
      background: #283891
      padding-bottom: 15px
      padding-top: 15px
      margin: 0
      a
        display: block
        font-size: 20px
        color: #fff
        padding: 5px 0 10px 0

@media screen and (min-width: 992px)
    .header
      .top-menu
        display: block !important

@media screen and (max-width: 1366px)
  .header
    .search-wrapper
      max-width: 500px

@media screen and (max-width: 1160px)
  .header
    .search-wrapper
      max-width: 300px
@media screen and (max-width: 650px)
  .header
    padding-bottom: 70px
    .search-wrapper
      position: absolute
      bottom: 20px
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

