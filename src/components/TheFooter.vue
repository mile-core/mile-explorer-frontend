<template lang="pug">
  footer.footer
    .footer__inner.content-wrapper
      .footer__copyright
        p(v-html="$t('copyright')")
      .footer__text
        p(v-html="$t('blockTimeInfo')")
      nav.footer__menu.bottom-menu
        router-link(to="/playground") API Playground
</template>

<style lang="sass" scoped>

</style>
