<template lang="pug">
  footer.footer
    p.copyright(v-html="$t('copyright')")
</template>

<style lang="sass" scoped>
footer.footer
  padding: 1rem
  text-align: center
  color: $color-white
  background: $color-gray-dark
  font-size: .875rem
  -webkit-font-smoothing: antialiased
</style>
