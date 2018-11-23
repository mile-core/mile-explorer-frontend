<template lang="pug">
  #app
    .content-wrapper.page-bg
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

  html, body
    height: 100%

  body
    font-family: $font-main
    color: $color-black
    background-color: $page-bg

  #app
    display: flex
    height: 100%
    flex-direction: column

  .content-wrapper
    margin: auto
    padding-right: 20px
    padding-left: 20px
    max-width: 1250px
    width: 100%

  .page-bg
    position: absolute
    z-index: -1
    top: 0
    bottom: 0
    right: 0
    left: 0
    background: url(assets/bg-logo.svg) right -59px top -138px no-repeat

  .main
    margin-top: 0
    padding-bottom: 50px

  hr
    height: 0
    border: 0
    border-top: 1px solid rgba(0, 0, 0, .1)
    box-sizing: content-box
    overflow: visible

  .h1
    margin: .4em 0 .8em
    font-size: 36px
    color: $color-black
    font-family: $font-title
    font-weight: bold
    text-transform: uppercase

  .h4
    text-transform: uppercase

  .table-responsive
    max-width: 100%
    overflow: auto
    table
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
    margin: 0 0 20px

  .input-icon
    position: absolute
    left: 0
    width: 56px
    height: 100%
    &_search
      background: url(assets/loupe.svg) no-repeat center/35%
    + .form-input
      padding-left: 56px

  .button
    display: inline-block
    padding: 0.7em 1.3em
    background-color: $color-green
    border: none
    border-radius: 21px
    color: #fff
    text-decoration: none
    transition: all .3s
    cursor: pointer
    &:hover, &:focus
      background-color: darken($color-green, 8%)
      text-decoration: none
    &_black
      background-color: $color-black
      &:hover, &:focus
        background-color: $color-black
    &_uppercase
      text-transform: uppercase
    &_icon_arrow-left
      &:before
        content: ''
        display: inline-block
        margin-right: 14px
        width: 7px
        height: 13px
        background: url(assets/angle-left.svg) 0 0 no-repeat

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

  .pairs-list
    margin-bottom: 1.4em
    &__item
      margin-bottom: .7em

  .pair
    &__key
      display: block
      font-weight: bold
      text-transform: uppercase
    &__value
      display: block

  .home
    > .search-wrapper
      padding: 3rem 0
    > .info-wrapper
      display: flex
      justify-content: space-between
      min-height: 550px
      > .section
        width: calc(50% - 1rem)

  .section
    position: relative
    box-shadow: 0 0 12px rgba(3,1,56,0.12)
    background-color: #fff
    .mile-loader
      position: absolute
      top: 50%
      left: 50%
      margin-top: -15px
      margin-left: -15px

  .text-overflow
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

  .nowrap
    white-space: nowrap

  .block-list
    padding: 21px 30px 24px
    &__head
      display: flex
      justify-content: space-between
      padding-bottom: 24px
    &__title
      font-size: 15px
      line-height: 21px
      color: $color-black
      font-family: $font-title
      font-weight: bold
      text-transform: uppercase
    &__list
      position: relative
      &_scrollbar
        margin-right: -18px
        padding-right: 18px

  .list-blocks
    margin: 0
    padding: 0
    list-style-type: none
    border-top: 1px solid #eaeaea
    &__item
      padding: 17px 0
      border-bottom: 1px solid #eaeaea
      font-style: 13px

  .list-item
    &__pill
      margin-bottom: 13px

  .pill
    display: flex
    justify-content: space-between
    align-items: center
    padding: 8px 18px
    height: 42px
    border-radius: 21px
    background-color: $color-green
    color: #fff
    font-size: 15px
    &__body
    &__tip
      margin-left: 20px
      padding-left: 10px
      border-left: 1px solid rgba(255,255,255,.5)
      font-size: 12px
    a
      color: #fff

  .row-info
    display: flex
    justify-content: space-between
    align-items: center
    &__col
      margin-left: 20px
      &:first-child
        margin-left: 0
      strong
        margin-right: .25em

  .brick-list
    display: flex
    margin: 0 0 .5rem
    padding: 0
    flex-wrap: wrap
    &__item
      margin: 0 10px 10px 0
      padding: .5em
      list-style: none
      text-align: center
      border: 1px solid $color-green
      &:hover, &:focus
        background: $color-green
        color: $color-white
        text-decoration: none

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
    &__panel
      display: none

  .indent-symbol
    text-indent: -1em

  .separate-list
    display: flex
    font-size: 13px
    color: #fff
    &__item
      display: flex
      margin-right: 25px
      padding-right: 25px
      align-items: center
      text-transform: uppercase
      border-right: 1px solid #fff
      &:last-child
        border-right: none
      &_no-border
        padding-right: 0
        border: none

  .bottom-menu
    a
      color: #fff

  .header
    &__panel
      padding: 7px 0
      background-color: $color-green
      .separate-list
        min-height: 21px
    &__inner
      display: flex
      flex-direction: column
      flex-wrap: nowrap
      align-items: center
      /*position: relative*/
      padding-top: 18px
      padding-bottom: 30px
    &__logo
      margin: 0
    &__top
      display: flex
      align-items: center
      justify-content: space-between
      width: 100%
    &__bottom
      margin-top: 18px
      width: 100%
    &__menu
      // margin-top: -27px
      margin-top: 18px
    &__menu-btn
      position: relative
      top: -2px
    &__close-btn
      position: absolute
      top: 24px
      right: 34px
    &__mobile-info
      margin-top: 92px
      color: #fff
      font-size: 13px
      line-height: 1.5
      a
        color: #fff
        font-size: 15px
    > .title
      padding: 0 1rem
      color: $color-gray-dark
      font-family: $font-sans
      font-weight: 100
      font-size: 2rem
      line-height: 2rem
      text-transform: uppercase

  .menu-btn
    width: 31px
    height: 24px
    border: none
    background: transparent url(assets/hamburger.svg) no-repeat
    cursor: pointer
    &:focus
      outline: none

  .close-btn
    width: 23px
    height: 23px
    border: none
    background: transparent url(assets/close.svg) no-repeat center/cover
    cursor: pointer
    &:focus
      outline: none

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
      /*width: 75px*/
      /*height: 75px*/
      width: 51px
      height: 50px
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
      /*font-size: 60px*/
      font-size: 30px
      font-weight: bold
      text-decoration: none
      text-transform: uppercase

  .search-wrapper
    width: 100%
    .form-input-block
      margin: 0

  .top-menu
    display: block
    &__link
      margin-left: 1.6em
      font-family: $font-title
      font-size: 17px
      color: $color-black
      text-transform: uppercase

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
      width: 100%
      max-width: 450px

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
    padding: 22px 28px 4px 28px
    box-shadow: 0 0 12px rgba(3,1,56,0.12)
    background-color: #fff
    &__inner
      position: relative
      overflow: hidden
      &_height_small
        height: 522px

  .table
    width: 100%
    border-collapse: collapse
    thead
      border-bottom: 1px solid #eaeaea
      th
        padding: 11px 16px 9px 2px
        text-align: left
        color: #000000
        font-size: 13px
        font-family: $font-title
        font-weight: bold
        text-transform: uppercase
    tbody
      tr
        border-bottom: 1px solid #eaeaea
        &:last-child
          border-bottom: none
      th
        text-align: left
        font-weight: bold
        text-transform: uppercase
      td
        padding: 20px 16px 18px 0
        color: $color-black
        font-size: 15px
        > *
          display: inline-block
          overflow: hidden
          text-overflow: ellipsis
    &_limit-with_small
      tbody
        td
          > *
            max-width: 140px

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

  .tabs
    display: flex
    position: relative
    z-index: 1
    &__item
      position: relative
      padding: 16px 29px
      background-color: #e8edf3
      box-shadow: 0 -9px 12px -10px rgba(3, 1, 56, 0.12) inset
      color: $color-green
      text-transform: uppercase
      cursor: pointer
      &.active
        background-color: #fff
        box-shadow: 0 0 12px rgba(3,1,56,0.12)
        color: $color-black
        &:after
          content: ""
          position: absolute
          bottom: -8px
          right: 0
          left: 0
          height: 8px
          background-color: #fff

  .tabs-content
    &__block
      display: none
      &.active
        display: block

  @media screen and (min-width: 992px)
    .header
      &__menu
        display: block !important
      &__menu-btn,
      &__close-btn,
      &__mobile-info
        display: none

  @media screen and (max-width: 991px)
    .hamburger
      display: block

    .header
      &__menu
        position: absolute
        z-index: 10
        top: 0
        right: 0
        margin: 0
        width: 288px
        height: 100%
        background: $color-black
        padding: 85px 15px 15px 55px
        .top-menu__link
          display: block
          margin: 0
          color: $color-green
          font-family: $font-title
          font-size: 20px
          line-height: 40px

    .footer
      &__inner
        display: none

    .h1
      font-size: 36px

    .tabs
      &__item
        padding: 10px 12px
        font-size: 14px
        line-height: 19px

    .table
      &_horiz-flat
        display: block
        tbody
          display: block
          tr
            display: block
            padding: 16px 0
          th, td
            display: block
            padding: 0
            word-break: break-all
          th
            margin-bottom: 7px

  @media screen and (max-width: 991px)
    .home
      > .search-wrapper
        padding: 1rem 0
      > .info-wrapper
        flex-direction: column
        > .section
          margin-bottom: 30px
          width: 100%

  @media screen and (max-width: 650px)
    .row-info
      flex-direction: column
      align-items: start
      &__col
        margin: 0 0 6px

    .logo
      &__img
        width: 33px
        height: 33px
      &__text
        top: -6px
        font-size: 20px

    .header
      /*&__inner*/
        /*padding-top: 7px*/
      /*&__bottom*/
        /*margin-top: 3px*/
      &__panel
        display: none
        padding: 10px 0
        height: auto
        .separate-list
          flex-direction: column
          font-size: 16px
          .separate-list__item
            margin-bottom: 5px
            border: none

    .footer
      &__panel
        display: block
        padding: 14px 0 10px
        background-color: $color-green
        .separate-list
          flex-direction: column
          height: 100%
          .separate-list__item
            margin: 0 0 .3em 0
            padding-right: 0
            border: none
            font-size: 14px

    .blocks-overview
      > ul.overview
        > li.block
          flex-direction: column
          .link
          .timestamp
          > .desc
            padding: 0
            > .mined
</style>

<style lang="sass" scoped>

</style>
