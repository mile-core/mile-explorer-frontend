<template lang="pug">
  #app
    the-header
    .main.content-wrapper
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
    font-family: $font-main
    color: $color-black
    background-color: $page-bg

  #app
    display: flex
    min-height: 100vh
    flex-direction: column

  .content-wrapper
    margin: auto
    padding-right: 20px
    padding-left: 20px
    max-width: 1250px
    width: 100%

  .main
    margin-bottom: 50px

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
        td.from, td.to, td div.t-id
          max-width: 10rem
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
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
    color: $color-green
    text-decoration: none

  a:hover, a:active, a:focus
    text-decoration: underline

  p
    margin: 0 0 1.5em 0

  input
    padding: 0.25rem
    border: 1px solid #28398f
    border-radius: 5px
    margin-right: .5rem

  .form-input
    display: block
    margin: 0
    padding: 0 .5rem
    width: 100%
    height: 44px
    background-color: #fff
    border: none
    border-radius: 0
    color: $color-black
    font-size: 15px
    line-height: 2em

  .form-input-block
    position: relative

  .input-icon
    position: absolute
    left: 0
    width: 56px
    height: 100%
    &_search
      background: url(assets/loupe.svg) no-repeat center/35%
    + .form-input
      padding-left: 56px

  .paginator
    ul.pages
      display: inline-flex
      align-items: center
      margin: 0
      padding: 0 1em
      height: 42px
      border-radius: 21px
      background-color: $color-black
      color: #fff
      > li.ellipsis
        margin-left: -.45em
        list-style: none
      > li.page
        padding: 0 .45em
        text-align: center
        list-style: none
        color: #fff
        font-size: 15px
        line-height: 22px
        cursor: pointer
        &.current
          color: $color-green
        &:hover
          color: $color-green

  .field-ellipsis
    max-width: 500px
    text-overflow: ellipsis
    overflow: hidden
    display: inline-block

  .home
    > .search-wrapper
      padding: 3rem 0
    > .info-wrapper
      display: flex
      > .section
        width: calc(50% - 1rem)
        margin: 0 .5rem

  @media screen and (max-width: 992px)
    .home
      > .search-wrapper
        padding: 1rem 0
      > .info-wrapper
        flex-direction: column
        > .section
          width: calc(100% - 1rem)

  .footer
    background-color: $footer-bg
    color: $color-white
    font-size: .875rem
    -webkit-font-smoothing: antialiased
    &__inner
      display: flex
      justify-content: space-between
      padding-top: 29px
      padding-bottom: 20px
      min-height: 172px
      font-size: 13px
      line-height: 19px
    &__copyright
      width: 275px
      text-indent: -1em
    &__text
      margin-left: auto
      width: 255px
    &__menu
      width: 140px
      text-align: right
      color: #fff
      font-family: $font-title
      font-size: 15px
      line-height: 26px

  .bottom-menu
    a
      color: #fff

  .header
    &__inner
      display: flex
      flex-direction: column
      flex-wrap: nowrap
      align-items: center
      position: relative
      padding-top: 30px
      padding-bottom: 30px
    &__logo
      margin: 0
    &__top
      display: flex
      align-items: center
      justify-content: space-between
      width: 100%
    &__bottom
      margin-top: 46px
      width: 100%
    &__menu
      margin-top: -27px
    > .title
      padding: 0 1rem
      color: $color-gray-dark
      font-family: $font-sans
      font-weight: 100
      font-size: 2rem
      line-height: 2rem
      text-transform: uppercase

  .hamburger
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

  .logo
    white-space: nowrap
    cursor: pointer
    &:hover, &:focus
      text-decoration: none
    &__img
      display: inline-block
      width: 75px
      height: 75px
      background: url(assets/logo.svg)
      background-repeat: no-repeat
      background-size: contain
    &__text
      display: inline-block
      position: relative
      top: -8px
      margin-left: 13px
      color: $color-black
      font-family: $font-title
      font-size: 60px
      font-weight: bold
      text-decoration: none
      text-transform: uppercase

  .search-wrapper
    width: 100%

  .top-menu
    display: block
    &__link
      margin-left: 1.6em
      font-family: $font-title
      font-size: 17px
      color: $color-black
      text-transform: uppercase

  @media screen and (max-width: 992px)
    .hamburger
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
    .top-menu
      display: block !important

  @media screen and (max-width: 1366px)
    .search-wrapper
      max-width: 500px

  @media screen and (max-width: 1160px)
    .search-wrapper
      max-width: 300px

  @media screen and (max-width: 650px)
    .header
      padding-bottom: 70px
    .search-wrapper
      position: absolute
      bottom: 20px

  .breadcrumbs
    span:not(:last-child)::after
      content: " / "

  .search
    text-align: center

    > pre
      display: block
      padding: 9.5px
      width: 80%
      margin: 0 auto
      font-size: 13px
      line-height: 1.42857143
      color: #333
      word-break: break-all
      word-wrap: break-word
      background-color: #f5f5f5
      border: 1px solid #ccc
      border-radius: 4px

  .wallet-form
    label
      font-weight: 700
      display: block
      margin-bottom: .5rem
      padding: 0
    input
      display: block
      width: 100%
      max-width: 450px
      margin-bottom: 10px

    button[type=submit]
      background-color: $color-blue
      color: $color-white
      padding: .5rem 1rem
      &:hover
        background-color: $color-blue-light

  .block-info
    dl
      display: grid
      grid-template-columns: 1fr 5fr

      > dt
        grid-column: 1
        font-weight: 700
        text-align: right
      > dd
        grid-column: 2
    .search
      text-align: center
      pre
        display: block
        padding: 9.5px
        width: 80%
        margin: 0 auto
        font-size: 13px
        line-height: 1.42857143
        color: #333
        word-break: break-all
        word-wrap: break-word
        background-color: #f5f5f5
        border: 1px solid #ccc
        border-radius: 4px

  table.block-fee-trnx
    width: 100%
    tr:nth-child(2n+1)
      background-color: $color-ghost
    th,
    td
      text-align: center
      &.to,
      &.from
        max-width: 10rem
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis

  .table-responsive,
  .table-wrap
    max-width: 100%
    overflow: auto

  .table-wrap
    margin-bottom: 20px
    padding: 28px 28px 4px 28px
    box-shadow: 0 0 12px rgba(3,1,56,0.12)
    background-color: #fff

  .table
    // width: 100%
    table-layout: fixed
    border-collapse: collapse
    thead
      border-bottom: 1px solid #eaeaea
      th
        padding: 11px 16px 6px 2px
        text-align: left
        color: #000000
        font-size: 13px
        font-family: $font-title
        font-weight: bold
        text-transform: uppercase
    tbody
      td
        padding: 20px 16px 18px 0
        color: $color-black
        font-size: 15px
        > *
          display: inline-block
          max-width: 140px
          overflow: hidden
          text-overflow: ellipsis

  table.block-sign
    width: 100%
    tr:nth-child(2n+1)
      background-color: $color-ghost
    th,
    td

      text-align: left
      &.key,
      &.signature
        max-width: 10rem
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis

  .blocks-overview
    border: 1px solid $color-gray-light
    > .headline
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      padding: 0.5rem 1rem
      background-color: $color-ghost
      border-bottom: 1px solid $color-gray-light
      > .title
        color: $color-gray
        height: 1rem
        line-height: 1rem
        padding-left: 1.5rem
        background: url(assets/icons/package.svg) no-repeat center left
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
      height: 42rem
      overflow-y: scroll
      > li.block
        list-style: none
        display: flex
        padding: 0 0 .25rem
        margin: 0 1rem .25rem
        border-bottom: 1px solid #fafafa
        > .main
          background: $color-blue
          color: $color-white
          padding: .5rem 1rem
          text-align: center
          width: 135px
          > .link
            color: $color-white
            text-decoration: none
            &:hover
              text-decoration: underline
          > .timestamp
            font-size: 11px
            line-height: 1rem
        > .desc
          padding: 0 0 0 1rem
          max-width: 500px
          width: 100%
          display: inline-block
          vertical-align: bottom
          text-overflow: ellipsis
          overflow: hidden
          margin-top: 8px
  @media screen and (max-width: 650px)
    .blocks-overview
      > ul.overview
        > li.block
          flex-direction: column
          .link
          .timestamp
          > .desc
            padding: 0
            > .mined

  table.blocks-table
    width: 100%
    th,
    td
      text-align: center
      &.block-header-digest,
      &.previous-block-digest,
      &.merkle-root
        max-width: 10rem
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis

  table.block-trnx
    width: 100%
    tr:nth-child(2n+1)
      background-color: $color-ghost
    th,
    td

      text-align: center
      &.wallet
        max-width: 10rem
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis

  .api-playground
    > .section
      margin-bottom: 1rem

      > .method
        color: $color-brand
        font-weight: 700
        margin-bottom: .5rem
        &::before
          content: "method :: "
          color: $color-gray
          font-weight: 200

      > .description
        padding: .5rem
        border-left: 2px solid $color-brand
        font-style: italic
        margin-bottom: .5rem

      > .params
        margin-bottom: .5rem
        > .param:not(last-child)
          margin-bottom: .25rem

      > .actions
        margin-bottom: .5rem

      > .results
        border-left: 2px dotted $color-gray-light
        padding-left: .5rem
        margin-bottom: .5rem

    ul.select
      padding: 0 .5rem
      margin: 0 0 0 8rem
      > li
        list-style: none
        > label
          text-align: left

    button
      background-color: $color-blue
      color: $color-white
      border: none
      border-radius: 5px
      margin: 0
      margin-left: 8.5rem
      padding: 0.5rem
      &:hover
        background-color: $color-blue-light

    label
      display: inline-block
      min-width: 8rem
      text-align: right
      margin-right: .5rem

    input
      padding: 0.25rem
      border: 1px solid $color-brand
      border-radius: 5px
      margin-right: .5rem
      &[type=number]
        width: 3rem
      &[type=text]
        width: 100%
        max-width: 500px

  .transaction-overview
    border: 1px solid $color-gray-light
    > .headline
      display: flex
      flex-direction: row
      align-items: center
      justify-content: space-between
      padding: 0.5rem 1rem
      background-color: $color-ghost
      border-bottom: 1px solid $color-gray-light
      > .title
        color: $color-gray
        height: 1rem
        line-height: 1rem
        padding-left: 1.5rem
        background: url(assets/icons/repeat.svg) no-repeat center left
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
      height: 42rem
      overflow-y: scroll
      > li.transaction
        float: left
        list-style: none
        display: block
        padding: 0 0 .25rem
        margin: 0 1rem .25rem
        border-bottom: 1px solid #fafafa
        background: #fff
        margin-bottom: 2px
        padding: 0
        >span.profile-icon
          float: left
          color: #999
          font-size: 20px
          font-weight: 200
          padding: 5px 12px
        >div.profile-post-in
          float: left
          a
            color: #3d4852
          > .main
            > .link
              text-decoration: none
              &:hover
                text-decoration: underline
            > .timestamp
              font-size: 11px
              line-height: 1rem
          > .desc
            padding: 0 1rem
          >p.info
            >span.address-tag
              width: 260px
              display: inline-block
              vertical-align: bottom
              text-overflow: ellipsis
              overflow: hidden
              >a.link
                margin-left: 5px
                color: $color-blue

  table.transactions-table
    width: 100%
    th,
    td
      &.block-header-digest,
      &.previous-block-digest,
      &.merkle-root
        max-width: 10rem
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
    div.t-id
      max-width: 6rem
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
    td.amount.xdr
      padding-right: 30px

  .wallet-info
    .wallet-search
      text-align: center
      pre
        display: block
        padding: 9.5px
        width: 80%
        margin: 0 auto
        font-size: 13px
        line-height: 1.42857143
        color: #333
        word-break: break-all
        word-wrap: break-word
        background-color: #f5f5f5
        border: 1px solid #ccc
        border-radius: 4px
    .public-key
      width: 100%
      display: inline-block
      vertical-align: bottom
      text-overflow: ellipsis
      overflow: hidden

  ul.blocks
    display: flex
    margin: 0
    padding: 0
    margin-bottom: .5rem
    flex-wrap: wrap
    > li.block
      margin: 0
      margin-right: .25rem
      margin-bottom: .25rem
      list-style: none
      padding: .5rem
      text-align: center
      border: 1px solid $color-blue
      &:hover
        background: $color-blue
        color: $color-white
        > a
          color: $color-white
      > a
        color: #28398f
        text-decoration: none

  table.transaction-table
    width: 100%
    max-width: 900px
    &.block-header-digest,
    &.previous-block-digest,
    &.merkle-root
      max-width: 10rem
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
    .timestamp
      font-family: monospace

  table.transactions
    width: 100%
    th,
    td
      &.block-header-digest,
      &.previous-block-digest,
      &.merkle-root
        max-width: 10rem
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
</style>

<style lang="sass" scoped>

</style>
