import axios from 'axios';
import uuidv4 from 'uuid/v4';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
  method: 'POST',
});

function jsonRpc(method, params = {}, id = uuidv4()) {
  return api({
    data: {
      jsonrpc: '2.0', method, params, id,
    },
  }).then(({ data: { result } }) => result);
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
  getBlockHistory(firstId, limit = 1) {
    if (limit === 1) return this.getBlock(firstId);
    return jsonRpc('get-block-history', { 'first-id': firstId, limit });
  },

  // Get certain block from chain by id.
  // This is equal get-block-history with limit:1 but more efficient
  getBlock(blockId) {
    return jsonRpc('get-block', { id: blockId });
  },

  // Get wallet block ids for a known *public-key*
  getWalletHistoryBlocks(publicKey, blockId, limit = 2) {
    return jsonRpc('get-wallet-history-blocks', {
      'public-key': publicKey,
      'block-id': blockId,
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
};
