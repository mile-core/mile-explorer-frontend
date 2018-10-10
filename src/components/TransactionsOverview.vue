<template lang="pug">
  .transaction-overview
    .headline
      .title Transactions
      button.btn View All
    ul.overview
</template>

<style lang="sass" scoped>
.transaction-overview
  border: 1px solid $color-gray-light
  > .headline
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between
    padding: 1rem
    background-color: #fafafa
    border-bottom: 1px solid $color-gray-light
    > .title
      color: $color-gray
      height: 1rem
      line-height: 1rem
      padding-left: 1.5rem
      background: url(../assets/icons/repeat.svg) no-repeat center left
      background-size: contain
    > .btn
        display: inline-block
        border: 1px solid $color-gray
        padding: .5rem 1rem
        margin: 0
        text-decoration: none
        background: $color-white
        color: $color-gray
        font-family: sans-serif
        font-size: 1rem
        cursor: pointer
        text-align: center
        transition: background 250ms ease-in-out, transform 150ms ease
        -webkit-appearance: none
        -moz-appearance: none
        &:hover
          color: $color-blue
          border-color: $color-blue

  > ul.overview
    padding: 0
    font-size: 14px
    height: 17.5rem
    overflow-y: scroll
</style>
