<template lang="pug">
  header.header
    router-link.logo(to="/") {{ $t('home') }}
    .title {{ $t('title') }}
    nav
      router-link(to="/") Home
      router-link(to="/playground") API Playground
</template>

<style lang="sass" scoped>
.header
  display: flex
  flex-wrap: nowrap
  justify-content: center
  align-items: center
  padding: 1rem

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

</style>

<i18n>
{
  "en": {
    "home": "MILE Explorer",
    "title": "Explorer"
  }
}
</i18n>

