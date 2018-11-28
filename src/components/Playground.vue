<template lang="pug">
  .api-playground

    .api-playground__section.section.api-block
      .api-block__title help
      .api-block__description Get all allowed methods
      .api-block__actions
        button.button(@click="request('help')") Fetch
      .api-block__result
        mile-loader(v-if="loading.help")
        pre(v-if="results.help") {{ results.help }}

    .api-playground__section.section.api-block
      .api-block__title getAssets
      .api-block__description Get all allowed methods
      .api-block__actions
        button.button(@click="request('getAssets')") Fetch
      .api-block__result
        mile-loader(v-if="loading.getAssets")
        pre(v-if="results.getAssets") {{ results.getAssets }}

    .api-playground__section.section.api-block
      .api-block__title ping
      .api-block__description Ping
      .api-block__actions
        button.button(@click="request('Ping')") Fetch
      .api-block__result
        mile-loader(v-if="loading.Ping")
        pre(v-if="results.Ping") {{ results.Ping }}

    .api-playground__section.section.api-block
      .api-block__title get-blockchain-info
      .api-block__description Get all allowed methods
      .api-block__actions
        button.button(@click="request('getBlockchainInfo')") Fetch
      .api-block__result
        mile-loader(v-if="loading.getBlockchainInfo")
        pre(v-if="results.getBlockchainInfo") {{ results.getBlockchainInfo }}

    br
    h2.h2 Explore blocks

    .api-playground__section.section.api-block
      .api-block__title get-block-history-state
      .api-block__description Get chains history from block first with limit of history length
      .api-block__actions
        button.button(@click="request('getBlockHistoryState')") Fetch
      .api-block__result
        mile-loader(v-if="loading.getBlockHistoryState")
        pre(v-if="results.getBlockHistoryState") {{ results.getBlockHistoryState }}

    .api-playground__section.section.api-block
      .api-block__title get-block-history
      .api-block__description Get chains history from block first with limit of history length
      .api-block__params
        .form-input-block
          .form-input-label(for="get-block-history_first") first
          input.form-input.form-input_border(
            id="get-block-history_first"
            type="number"
            v-model.number="params.getBlockHistory.first"
          )
        .form-input-block
          .form-input-label(for="get-block-history_limit") limit
          input.form-input.form-input_border(
            id="get-block-history_limit"
            type="number"
            v-model.number="params.getBlockHistory.limit"
          )
      .api-block__actions
        button.button(
          @click=`
            request(
              'getBlockHistory',
              params.getBlockHistory.first,
              params.getBlockHistory.limit,
              params.getBlockHistory.filter
            )`
        ) Fetch
      .api-block__result
        mile-loader(v-if="loading.getBlockHistory")
        pre(v-if="results.getBlockHistory") {{ results.getBlockHistory }}

    .api-playground__section.section.api-block
      .api-block__title get-block
      .api-block__description
        | Get certain block from chain by id.
        | This is equal get-block-history with limit:1 but more efficient
      .api-block__params
        .form-input-block
          .form-input-label(for="get-block_id") id
          input.form-input.form-input_border(
            id="get-block_id"
            type="number"
            v-model.number="params.getBlock.id"
          )
      .api-block__actions
        button.button(@click="request('getBlock', params.getBlock.id)") Fetch
      .api-block__result
        mile-loader(v-if="loading.getBlock")
        pre(v-if="results.getBlock") {{ results.getBlock }}

    br
    h2.h2 Explore wallet and transactions

    .api-playground__section.section.api-block
      .api-block__title get-wallet-history-state
      .api-block__description Get wallet history state for a known *public-key*
      .api-block__params
        .form-input-block
          .form-input-label(for="get-wallet-history-state_public-key") public-key
          input.form-input.form-input_border(
            id="get-wallet-history-state_public-key"
            type="text"
            v-model="params.getWalletHistoryState.publicKey"
          )
      .api-block__actions
        button.button(@click=`request(
          'getWalletHistoryState',
          params.getWalletHistoryState.publicKey,
        )`) Fetch
      .api-block__result
        mile-loader(v-if="loading.getWalletHistoryState")
        pre(v-if="results.getWalletHistoryState") {{ results.getWalletHistoryState }}

    .api-playground__section.section.api-block
      .api-block__title get-wallet-history-blocks
      .api-block__description Get wallet block ids for a known *public-key*
      .api-block__params
        .form-input-block
          .form-input-label(for="get-wallet-history-blocks_public-key") public-key
          input.form-input.form-input_border(
            id="get-wallet-history-blocks_public-key"
            type="text"
            v-model="params.getWalletHistoryBlocks.publicKey"
          )
        .form-input-block
          .form-input-label(for="get-wallet-history-blocks_first") first
          input.form-input.form-input_border(
            id="get-wallet-history-blocks_first"
            type="number"
            v-model.number="params.getWalletHistoryBlocks.first"
          )
        .form-input-block
          .form-input-label(for="get-wallet-history-blocks_limit") limit
          input.form-input.form-input_border(
            id="get-wallet-history-blocks_limit"
            type="number"
            v-model.number="params.getWalletHistoryBlocks.limit"
          )
      .api-block__actions
        button.button(@click=`request(
          'getWalletHistoryBlocks',
          params.getWalletHistoryBlocks.publicKey,
          params.getWalletHistoryBlocks.first,
          params.getWalletHistoryBlocks.limit,
        )`) Fetch
      .api-block__result
        mile-loader(v-if="loading.getWalletHistoryBlocks")
        pre(v-if="results.getWalletHistoryBlocks") {{ results.getWalletHistoryBlocks }}

    .api-playground__section.section.api-block
      .api-block__title get-wallet-history-transactions
      .api-block__description
        | Get wallet transaction history
        | for the known public-key from first
        | with limit of transactions list
      .api-block__params
        .form-input-block
          .form-input-label(for="get-wallet-history-transactions_public-key") public-key
          input.form-input.form-input_border(
            id="get-wallet-history-transactions_public-key"
            type="text"
            v-model="params.getWalletHistoryTransactions.publicKey"
          )
        .form-input-block
          .form-input-label(for="get-wallet-history-transactions_first") first
          input.form-input.form-input_border(
            id="get-wallet-history-transactions_first"
            type="number"
            v-model.number="params.getWalletHistoryTransactions.first"
          )
        .form-input-block
          .form-input-label(for="get-wallet-history-transactions_limit") limit
          input.form-input.form-input_border(
            id="get-wallet-history-transactions_limit"
            type="number"
            v-model.number="params.getWalletHistoryTransactions.limit"
          )
      .api-block__actions
        button.button(@click=`request(
          'getWalletHistoryTransactions',
          params.getWalletHistoryTransactions.publicKey,
          params.getWalletHistoryTransactions.first,
          params.getWalletHistoryTransactions.limit
        )`) Fetch
      .api-block__result
        mile-loader(v-if="loading.getWalletHistoryTransactions")
        pre(v-if="results.getWalletHistoryTransactions") {{ results.getWalletHistoryTransactions }}

    .api-playground__section.section.api-block
      .api-block__title get-wallet-state
      .api-block__description
        | Get wallet transaction state
        | for the known public-key from first
      .api-block__params
        .form-input-block
          .form-input-label(for="get-wallet-state_public-key") public-key
          input.form-input.form-input_border(
            id="get-wallet-state_public-key"
            type="text"
            v-model="params.getWalletState.publicKey"
          )
      .api-block__actions
        button.button(@click=`request(
          'getWalletState',
          params.getWalletState.publicKey,
        )`) Fetch
      .api-block__result
        mile-loader(v-if="loading.getWalletState")
        pre(v-if="results.getWalletState") {{ results.getWalletState }}

    .api-playground__section.section.api-block
      .api-block__title get-wallet-node
      .api-block__description
        | Get wallet transaction node
        | for the known public-key from first
      .api-block__params
        .form-input-block
          .form-input-label(for="get-wallet-node_public-key") public-key
          input.form-input.form-input_border(
            id="get-wallet-node_public-key"
            type="text"
            v-model="params.getWalletNode.publicKey"
          )
      .api-block__actions
        button.button(@click=`request(
          'getWalletNode',
          params.getWalletNode.publicKey,
        )`) Fetch
      .api-block__result
        mile-loader(v-if="loading.getWalletNode")
        pre(v-if="results.getWalletNode") {{ results.getWalletNode }}

    .api-playground__section.section.api-block
      .api-block__title get-transaction-info
      .api-block__description Get certain transactions for the known wallet with public-key and *id*
      .api-block__params
        .form-input-block
          .form-input-label(for="get-transaction-info_public-key") public-key
          input.form-input.form-input_border(
            id="get-transaction-info_public-key"
            type="text"
            v-model="params.getTransactionInfo.publicKey"
          )
        .form-input-block
          .form-input-label(for="get-transaction-info_id") id
          input.form-input.form-input_border(
            id="get-transaction-info_id"
            type="number"
            v-model.number="params.getTransactionInfo.id"
          )
      .api-block__actions
        button.button(@click=`request(
          'getTransactionInfo',
          params.getTransactionInfo.publicKey,
          params.getTransactionInfo.id
        )`) Fetch
      .api-block__result
        mile-loader(v-if="loading.getTransactionInfo")
        pre(v-if="results.getTransactionInfo") {{ results.getTransactionInfo }}

    .api-playground__section.section.api-block
      .api-block__title get-transaction-history
      .api-block__description
        | Get transaction history
        | for the known first
        | with limit of transactions list
      .api-block__params
        .form-input-block
          .form-input-label(for="get-transaction-history_first") first
          input.form-input.form-input_border(
            id="get-transaction-history_first"
            type="number"
            v-model.number="params.getTransactionHistory.first"
          )
        .form-input-block
          .form-input-label(for="get-transaction-history_limit") limit
          input.form-input.form-input_border(
            id="get-transaction-history_limit"
            type="number"
            v-model.number="params.getTransactionHistory.limit"
          )
      .api-block__actions
        button.button(@click=`request(
          'getTransactionHistory',
          params.getTransactionHistory.first,
          params.getTransactionHistory.limit
        )`) Fetch
      .api-block__result
        mile-loader(v-if="loading.getTransactionHistory")
        pre(v-if="results.getTransactionHistory") {{ results.getTransactionHistory }}

    .api-playground__section.section.api-block
      .api-block__title get-transaction-history-state
      .api-block__description TODO: Add description
      .api-block__params
      .api-block__actions
        button.button(@click=`request(
          'getTransactionHistoryState',
        )`) Fetch
      .api-block__result
        mile-loader(v-if="loading.getTransactionHistoryState")
        pre(v-if="results.getTransactionHistoryState") {{ results.getTransactionHistoryState }}

    br
    h2.h2 Explore network and nodes

    .api-playground__section.section.api-block
      .api-block__title get-nodes
      .api-block__description TODO: Add description
      .api-block__params
        .form-input-block
          .form-input-label(for="get-nodes_first") first
          input.form-input.form-input_border(id="get-nodes_first" type="number" v-model.number="params.getNodes.first")
        .form-input-block
          .form-input-label(for="get-nodes_limit") limit
          input.form-input.form-input_border(id="get-nodes_limit" type="number" v-model.number="params.getNodes.limit")
      .api-block__actions
        button.button(@click="request('getNodes', params.getNodes.first, params.getNodes.limit)") Fetch
      .api-block__result
        mile-loader(v-if="loading.getNodes")
        pre(v-if="results.getNodes") {{ results.getNodes }}

    .api-playground__section.section.api-block
      .api-block__title get-network-state
      .api-block__description TODO: Add description
      .api-block__actions
        button.button(@click="request('getNetworkState')") Fetch
      .api-block__result
        mile-loader(v-if="loading.getNetworkState")
        pre(v-if="results.getNetworkState") {{ results.getNetworkState }}
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
  created() {
    console.log(this.results.getNetworkState)
  },
};
</script>

<style lang="sass" scoped>

</style>
