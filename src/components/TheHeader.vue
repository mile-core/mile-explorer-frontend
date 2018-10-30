<template lang="pug">
  header.header
    router-link.logo(to="/") {{ $t('home') }}
    .title {{ $t('title') }}
    button.hamburger(@click='toggle = !toggle')
      span.hamburger-box.hamburger--squeeze
        span.hamburger-inner
    nav.top-menu(v-show='toggle' @click='toggle = !toggle')
      router-link(to="/blocks") {{ $t('blocks') }}
      router-link(to="/wallet") {{ $t('wallet') }}
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

  > .hamburger
    display: none
    outline: none
    margin-top: 4px
  > .logo
    width: 64px
    height: 64px
    cursor: pointer
    background: url(../assets/logo.png)
    background-size: cover
    text-indent: -9999px

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
    "wallet": "Wallet"
  }
}
</i18n>

