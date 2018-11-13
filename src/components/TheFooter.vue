<template lang="pug">
  footer.footer
    p.copyright(v-html="$t('copyright')")
    nav.bottom-menu
      router-link(to="/playground") API Playground
</template>

<style lang="sass" scoped>
footer.footer
  padding: 1rem
  text-align: center
  color: $color-white
  background: $color-blue
  font-size: .875rem
  -webkit-font-smoothing: antialiased
  .bottom-menu
    a
      color: #fff

</style>
