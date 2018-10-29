import axios from 'axios';
import uuidv4 from 'uuid/v4';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
  method: 'POST',
});

function JsonRpcError(error) {
  this.code = error.code;
  this.data = error.data;
  this.message = error.message;
  this.toString = () => `${this.message} (code: ${this.code})`;
}

function jsonRpc(method, params = {}, id = uuidv4()) {
  if (process.env.VUE_APP_USE_MOCKS === 'true') return import(`@/mocks/${method}.json`).then(json => json.default);
  return api({
    data: {
      jsonrpc: '2.0', method, params, id,
    },
  }).then(({ data: { result, error } }) => {
    if (error) throw new JsonRpcError(error);
    return result;
  });
}

export default {
  // Get all allowed methods
  help() {
    return jsonRpc('help');
  },

  /* Explore blocks */

  // Get chains history state
  getBlockHistoryState() {
    return jsonRpc('get-block-history-state');
  },

  // Get chains history from block first-id with limit of history length
  getBlockHistory(firstId, limit = 1, filter = []) {
    return jsonRpc('get-block-history', { 'first-id': 80, limit, 'filter-field': filter });
  },

  // Get certain block from chain by id.
  // This is equal get-block-history with limit:1 but more efficient
  getBlock(blockId) {
    return jsonRpc('get-block', { id: blockId });
  },

  // Get wallet block ids for a known *public-key*
  getWalletHistoryBlocks(publicKey, firstId, limit = 2) {
    return jsonRpc('get-wallet-history-blocks', {
      'public-key': publicKey,
      'first-id': firstId,
      limit,
    });
  },

  /* Explore wallet and transactions */

  // Get wallet history state for a known *public-key*
  getWalletHistoryState(publicKey) {
    return jsonRpc('get-wallet-history-state', {
      'public-key': publicKey,
    });
  },

  // Get wallet transaction history for the known public-key
  // from first-id with limit of transactions list
  getWalletHistoryTransactions(publicKey, firstId, limit = 3) {
    return jsonRpc('get-wallet-history-transactions', {
      'public-key': publicKey,
      'first-id': firstId,
      limit,
    });
  },

  // Get certain transactions for the known wallet with public-key and *id*
  getTransactionInfo(publicKey, id) {
    return jsonRpc('get-transaction-info', {
      'public-key': publicKey,
      id,
    });
  },

  // TODO: need description
  // {"jsonrpc":"2.0","method":"get-nodes","params": {"first-id":0, "count":10},"id":"12"}
  getNodes(firstId, count) {
    return jsonRpc('get-nodes', {
      'first-id': firstId,
      count,
    });
  },

  // TODO: need description
  getNetworkState() {
    return jsonRpc('get-network-state');
  },

  getTransactionHistory(firstId, limit = 3) {
    return jsonRpc('get-transaction-history', {
      'first-id': firstId,
      limit,
    });
  },
    getTransactionHistoryState() {
    return jsonRpc('get-transaction-history-state', {
    });
  },
};
