<template lang="pug">
  .api-playground

    .section
      .method help
      .description Get all allowed methods
      .actions
        button(@click="request('help')") Fetch
      .results
        mile-loader(v-if="loading.help")
        pre(v-else) {{ results.help }}

    .section
      .method getAssets
      .description Get all allowed methods
      .actions
        button(@click="request('getAssets')") Fetch
      .results
        mile-loader(v-if="loading.getAssets")
        pre(v-else) {{ results.getAssets }}

    .section
      .method ping
      .description Ping
      .actions
        button(@click="request('Ping')") Fetch
      .results
        mile-loader(v-if="loading.Ping")
        pre(v-else) {{ results.Ping }}

    .section
      .method get-blockchain-info
      .description Get all allowed methods
      .actions
        button(@click="request('getBlockchainInfo')") Fetch
      .results
        mile-loader(v-if="loading.getBlockchainInfo")
        pre(v-else) {{ results.getBlockchainInfo }}

    h2 Explore blocks

    .section
      .method get-block-history-state
      .description Get chains history from block first with limit of history length
      .actions
        button(@click="request('getBlockHistoryState')") Fetch
      .results
        mile-loader(v-if="loading.getBlockHistoryState")
        pre(v-else) {{ results.getBlockHistoryState }}

    .section
      .method get-block-history
      .description Get chains history from block first with limit of history length
      .params
        .param
          label(for="get-block-history_first") first
          input(
            id="get-block-history_first"
            type="number"
            v-model.number="params.getBlockHistory.first"
          )
        .param
          label(for="get-block-history_limit") limit
          input(
            id="get-block-history_limit"
            type="number"
            v-model.number="params.getBlockHistory.limit"
          )
      .actions
        button(
          @click=`
            request(
              'getBlockHistory',
              params.getBlockHistory.first,
              params.getBlockHistory.limit,
              params.getBlockHistory.filter
            )`
        ) Fetch
      .results
        mile-loader(v-if="loading.getBlockHistory")
        pre(v-else) {{ results.getBlockHistory }}

    .section
      .method get-block
      .description
        | Get certain block from chain by id.
        | This is equal get-block-history with limit:1 but more efficient
      .params
        .param
          label(for="get-block_id") id
          input(
            id="get-block_id"
            type="number"
            v-model.number="params.getBlock.id"
          )
      .actions
        button(@click="request('getBlock', params.getBlock.id)") Fetch
      .results
        mile-loader(v-if="loading.getBlock")
        pre(v-else) {{ results.getBlock }}

    h2 Explore wallet and transactions

    .section
      .method get-wallet-history-state
      .description Get wallet history state for a known *public-key*
      .params
        .param
          label(for="get-wallet-history-state_public-key") public-key
          input(
            id="get-wallet-history-state_public-key"
            type="text"
            v-model="params.getWalletHistoryState.publicKey"
          )
      .actions
        button(@click=`request(
          'getWalletHistoryState',
          params.getWalletHistoryState.publicKey,
        )`) Fetch
      .results
        mile-loader(v-if="loading.getWalletHistoryState")
        pre(v-else) {{ results.getWalletHistoryState }}

    .section
      .method get-wallet-history-blocks
      .description Get wallet block ids for a known *public-key*
      .params
        .param
          label(for="get-wallet-history-blocks_public-key") public-key
          input(
            id="get-wallet-history-blocks_public-key"
            type="text"
            v-model="params.getWalletHistoryBlocks.publicKey"
          )
        .param
          label(for="get-wallet-history-blocks_first") first
          input(
            id="get-wallet-history-blocks_first"
            type="number"
            v-model.number="params.getWalletHistoryBlocks.first"
          )
        .param
          label(for="get-wallet-history-blocks_limit") limit
          input(
            id="get-wallet-history-blocks_limit"
            type="number"
            v-model.number="params.getWalletHistoryBlocks.limit"
          )
      .actions
        button(@click=`request(
          'getWalletHistoryBlocks',
          params.getWalletHistoryBlocks.publicKey,
          params.getWalletHistoryBlocks.first,
          params.getWalletHistoryBlocks.limit,
        )`) Fetch
      .results
        mile-loader(v-if="loading.getWalletHistoryBlocks")
        pre(v-else) {{ results.getWalletHistoryBlocks }}

    .section
      .method get-wallet-history-transactions
      .description
        | Get wallet transaction history
        | for the known public-key from first
        | with limit of transactions list
      .params
        .param
          label(for="get-wallet-history-transactions_public-key") public-key
          input(
            id="get-wallet-history-transactions_public-key"
            type="text"
            v-model="params.getWalletHistoryTransactions.publicKey"
          )
        .param
          label(for="get-wallet-history-transactions_first") first
          input(
            id="get-wallet-history-transactions_first"
            type="number"
            v-model.number="params.getWalletHistoryTransactions.first"
          )
        .param
          label(for="get-wallet-history-transactions_limit") limit
          input(
            id="get-wallet-history-transactions_limit"
            type="number"
            v-model.number="params.getWalletHistoryTransactions.limit"
          )
      .actions
        button(@click=`request(
          'getWalletHistoryTransactions',
          params.getWalletHistoryTransactions.publicKey,
          params.getWalletHistoryTransactions.first,
          params.getWalletHistoryTransactions.limit
        )`) Fetch
      .results
        mile-loader(v-if="loading.getWalletHistoryTransactions")
        pre(v-else) {{ results.getWalletHistoryTransactions }}

    .section
      .method get-wallet-state
      .description
        | Get wallet transaction state
        | for the known public-key from first
      .params
        .param
          label(for="get-wallet-state_public-key") public-key
          input(
            id="get-wallet-state_public-key"
            type="text"
            v-model="params.getWalletState.publicKey"
          )
      .actions
        button(@click=`request(
          'getWalletState',
          params.getWalletState.publicKey,
        )`) Fetch
      .results
        mile-loader(v-if="loading.getWalletState")
        pre(v-else) {{ results.getWalletState }}

    .section
      .method get-wallet-node
      .description
        | Get wallet transaction node
        | for the known public-key from first
      .params
        .param
          label(for="get-wallet-node_public-key") public-key
          input(
            id="get-wallet-node_public-key"
            type="text"
            v-model="params.getWalletNode.publicKey"
          )
      .actions
        button(@click=`request(
          'getWalletNode',
          params.getWalletNode.publicKey,
        )`) Fetch
      .results
        mile-loader(v-if="loading.getWalletNode")
        pre(v-else) {{ results.getWalletNode }}

    .section
      .method get-transaction-info
      .description Get certain transactions for the known wallet with public-key and *id*
      .params
        .param
          label(for="get-transaction-info_public-key") public-key
          input(
            id="get-transaction-info_public-key"
            type="text"
            v-model="params.getTransactionInfo.publicKey"
          )
        .param
          label(for="get-transaction-info_id") id
          input(
            id="get-transaction-info_id"
            type="number"
            v-model.number="params.getTransactionInfo.id"
          )
      .actions
        button(@click=`request(
          'getTransactionInfo',
          params.getTransactionInfo.publicKey,
          params.getTransactionInfo.id
        )`) Fetch
      .results
        mile-loader(v-if="loading.getTransactionInfo")
        pre(v-else) {{ results.getTransactionInfo }}

    .section
      .method get-transaction-history
      .description
        | Get transaction history
        | for the known first
        | with limit of transactions list
      .params
        .param
          label(for="get-transaction-history_first") first
          input(
            id="get-transaction-history_first"
            type="number"
            v-model.number="params.getTransactionHistory.first"
          )
        .param
          label(for="get-transaction-history_limit") limit
          input(
            id="get-transaction-history_limit"
            type="number"
            v-model.number="params.getTransactionHistory.limit"
          )
      .actions
        button(@click=`request(
          'getTransactionHistory',
          params.getTransactionHistory.first,
          params.getTransactionHistory.limit
        )`) Fetch
      .results
        mile-loader(v-if="loading.getTransactionHistory")
        pre(v-else) {{ results.getTransactionHistory }}

    .section
      .method get-transaction-history-state
      .description
      .params
      .actions
        button(@click=`request(
          'getTransactionHistoryState',
        )`) Fetch
      .results
        mile-loader(v-if="loading.getTransactionHistoryState")
        pre(v-else) {{ results.getTransactionHistoryState }}

    h2 Explore network and nodes

    .section
      .method get-nodes
      .description TODO: Add description
      .params
        .param
          label(for="get-nodes_first") first
          input(id="get-nodes_first" type="number" v-model.number="params.getNodes.first")
        .param
          label(for="get-nodes_limit") limit
          input(id="get-nodes_limit" type="number" v-model.number="params.getNodes.limit")
      .actions
        button(@click="request('getNodes', params.getNodes.first, params.getNodes.limit)") Fetch
      .results
        mile-loader(v-if="loading.getNodes")
        pre(v-else) {{ results.getNodes }}

    .section
      .method get-network-state
      .description TODO: Add description
      .actions
        button(@click="request('getNetworkState')") Fetch
      .results
        mile-loader(v-if="loading.getNetworkState")
        pre(v-else) {{ results.getNetworkState }}
</template>

<script>
import Vue from 'vue';
import api from '@/api';
import MileLoader from './MileLoader.vue';

export default {
  components: {
    MileLoader,
  },
  data() {
    return {
      loading: {},
      params: {
        getBlockHistory: {
          first: 0,
          limit: 1,
          filter: [],
        },
        getBlock: {
          id: 0,
        },
        getWalletHistoryBlocks: {
          publicKey: 'zVG4iPaggWUUaDEkyEyFBv8dNYSaFMm2C7WS8nSMKWLsSh9x',
          first: 0,
          limit: 2,
        },
        getWalletHistoryState: {
          publicKey: 'zVG4iPaggWUUaDEkyEyFBv8dNYSaFMm2C7WS8nSMKWLsSh9x',
        },
        getWalletHistoryTransactions: {
          publicKey: 'zVG4iPaggWUUaDEkyEyFBv8dNYSaFMm2C7WS8nSMKWLsSh9x',
          first: 0,
          limit: 3,
        },
        getTransactionHistory: {
          first: 0,
          limit: 3,
        },
        getTransactionInfo: {
          publicKey: 'zVG4iPaggWUUaDEkyEyFBv8dNYSaFMm2C7WS8nSMKWLsSh9x',
          id: 1,
        },
        getNodes: {
          first: 0,
          limit: 10,
        },
        getWalletNode: {
          publicKey: 'zVG4iPaggWUUaDEkyEyFBv8dNYSaFMm2C7WS8nSMKWLsSh9x',
        },
        getWalletState: {
          publicKey: 'zVG4iPaggWUUaDEkyEyFBv8dNYSaFMm2C7WS8nSMKWLsSh9x',
        },
      },
      results: {},
    };
  },
  methods: {
    async request(method, ...args) {
      Vue.set(this.loading, method, true);
      try {
        const results = await api[method](...args);
        Vue.set(this.results, method, results);
      } catch (e) {
        Vue.set(this.results, method, `${e}`);
      } finally {
        Vue.set(this.loading, method, false);
      }
    },
  },
};
</script>

<style lang="sass" scoped>

</style>
