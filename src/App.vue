<template lang="pug">
  #app
    the-header
    .content-wrapper
      router-view
    the-footer
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style lang="sass">
*,
*::after,
*::before
  box-sizing: border-box

body
  font-family: $font-sans
  color: $color-gray-dark
  background-color: $color-white

hr
  height: 0
  border: 0
  border-top: 1px solid rgba(0, 0, 0, .1)
  box-sizing: content-box
  overflow: visible
</style>

<style lang="sass" scoped>
#app
  display: flex
  min-height: 100vh
  flex-direction: column

  > .content-wrapper
    flex: 1
    border-top: 1px solid rgba(0, 0, 0, .1)
    padding: 1rem 2rem
</style>
