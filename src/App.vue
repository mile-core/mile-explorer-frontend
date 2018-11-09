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

.table-responsive
  max-width: 100%
  overflow: auto
  table
    /*border: 1px solid #293891*/
    border-spacing: 0px
    border-radius: 5px
    overflow: hidden
    tr
      td, th
        padding: 0.8rem 1rem
        text-align: left
    tr:nth-child(2n+1)
      background-color: $color-ghost
    thead
      tr:first-child
          background-color: #c7cdef
.public-key-responsive
  width: 100%
  display: inline-block
  vertical-align: bottom
  text-overflow: ellipsis
  overflow: hidden

a
  color: $color-blue
  text-decoration: none
a:hover, a:active, a:focus
  text-decoration: underline

#app
  > .content-wrapper
    max-width: 1400px
    width: 100%
    margin: auto

input
    padding: 0.25rem
    border: 1px solid #28398f
    border-radius: 5px
    margin-right: .5rem

.paginator
  ul.pages
    display: flex
    padding: 0
    > li.ellipsis
      list-style: none
    > li.page
      text-align: center
      list-style: none
      padding: .25rem
      min-width: 3rem
      margin-right: .25rem
      border: 1px solid $color-blue
      cursor: pointer
      &.current
        background-color: $color-blue
        color: $color-white
      &:hover
        background-color: $color-blue-light
        color: $color-white
</style>

<style lang="sass" scoped>
#app
  display: flex
  min-height: 100vh
  flex-direction: column
  > .content-wrapper
    flex: 1
    padding: 1rem 2rem

@media screen and (max-width: 768px)
  #app
    > .content-wrapper
      padding: 1rem 0
</style>
