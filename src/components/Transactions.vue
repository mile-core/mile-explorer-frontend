<template lang="pug">
  .transactions
    mile-loader(v-if="!done")
    .tabs
      .tabs__item(:class="{active : activeTab == 1}" @click="activeTab = 1") Transfer assets transactions
      <!--.tabs__item(:class="{active : activeTab == 2}" @click="activeTab = 2") Other transactions-->
    .tabs-content
      .tabs-content__block(:class="{active : activeTab == 1}")
        transfer-assets-transactions-table(:transactions="transferAssetsTransactions")
      <!--.tabs-content__block(:class="{active : activeTab == 2}")-->
        <!--other-transactions-table(:transactions="otherTransactions")-->
    paginator(:count="count" :first="first" @input="fetchRange($event)")
</template>

<script>
import api from '@/api';
import MileLoader from './MileLoader.vue';
import Paginator from './Paginator.vue';
import Tabs from './Tabs.vue';
import TransferAssetsTransactionsTable from './TransferAssetsTransactionsTable.vue';
import OtherTransactionsTable from './OtherTransactionsTable.vue';

export default {
  components: {
    MileLoader,
    Paginator,
    Tabs,
    TransferAssetsTransactionsTable,
    OtherTransactionsTable,
  },
  props: {
    count: {
      type: Number,
      required: true,
    },
    first: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      done: true,
      otherTransactions: [],
      transferAssetsTransactions: [],
      activeTab: 1,
    };
  },
  methods: {
    async fetchRange(range) {
      this.done = false;
      const T = await api.getTransactionHistory(range.from, range.limit);
      this.transferAssetsTransactions = T.TransferAssetsTransaction;
      this.otherTransactions = T.OtherTransaction;
      this.done = true;
    },
  },
};
</script>
