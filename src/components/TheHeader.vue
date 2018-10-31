<template lang="pug">
  header.header
    router-link.logo(to="/") {{ $t('title') }}
    button.hamburger(@click='toggle = !toggle')
      span.hamburger-box.hamburger--squeeze
        span.hamburger-inner
    nav.top-menu(v-show='toggle' @click='toggle = !toggle')
      router-link(to="/blocks") {{ $t('blocks') }}
      router-link(to="/wallet") {{ $t('wallet') }}
      router-link(to="/transactions") {{ $t('transactions') }}
      router-link(to="/playground") API Playground
</template>

<script>

export default {
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
  > .top-menu
    display: block
    margin: 0 0 0 25px
  > .hamburger
    display: none
    outline: none
    margin: 0 0 0 15px
  > .logo
    width: 200px
    height: 64px
    cursor: pointer
    background: url(../assets/logo.png)
    text-indent: 75px
    background-repeat: no-repeat
    padding-top: 12px
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

