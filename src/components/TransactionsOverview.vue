<template lang="pug">
  .transaction-overview
    .headline
      .title Transactions
      button.btn(@click="$router.push({ name: 'transactions' })") View All
    ul.overview
      li.transaction(v-for="transaction in transactions" :key="transaction")
        span.profile-icon
        div.profile-post-in
          h3.main TX# 
            router-link.link(
              :to="{ name: 'transaction', params: { transactionId: transaction['transaction-id'], publicKey: transaction['from'] } }"
            ) {{ transaction['transaction-id'] }}
          p.info 
            span.address-tag from
              router-link.link.address-tag(
              :to="{ name: 'wallet', params: { publicKey: transaction['from'] } }"
              ) {{ transaction['from'] }}
            span.address-tag to
              router-link.link.address-tag(
              :to="{ name: 'wallet', params: { publicKey: transaction['to'] } }"
              ) {{ transaction['to'] }}
          p.amount(v-for="item in transaction['asset']")
            span.item Amount {{item['amount']}} MILE

</template>
<script>
import api from '@/api';
import fecha from 'fecha';
import timeago from 'timeago.js';
import MileLoader from './MileLoader.vue';

export default {
  components: {
    MileLoader,
  },
  props: {
    from: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      done: false,
      transactions: [],
      SortedTransactions: []
    };
  },
  computed: {
    range() {
      return {
        from: this.from,
        limit: this.limit,
      };
    },
  },
  watch: {
    range: {
      handler: 'fetchRange',
      immediate: true,
    },
  },
  methods: {
      async fetchRange(range) {
          this.transactions = await api.getTransactionHistory(range.from, range.limit);
          console.log(this.transactions);
      },
  },
};
</script>


<style lang="sass" scoped>
.transaction-overview
  border: 1px solid $color-gray-light
  > .headline
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between
    padding: 1rem
    background-color: $color-ghost
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
            width: 200px
            display: inline-block
            vertical-align: bottom
            text-overflow: ellipsis
            overflow: hidden
            >a.link
              margin-left: 5px

</style>
