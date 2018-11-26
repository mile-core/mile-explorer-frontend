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

  // Get chains history from block first with limit of history length
  // TODO ??? ????????? ????
  getBlockHistory(first, limit = 1, filter = []) {
    return jsonRpc('get-block-history', { first, limit });
  },

  // Get certain block from chain by id.
  // This is equal get-block-history with limit:1 but more efficient
  getBlock(blockId) {
    const result = jsonRpc('get-block', { id: blockId });
    return result;
  },

  // Get wallet block ids for a known *public-key*
  getWalletHistoryBlocks(publicKey, first, limit = 2) {
    return jsonRpc('get-wallet-history-blocks', {
      'public-key': publicKey,
      first,
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
  // from first with limit of transactions list
  getWalletHistoryTransactions(publicKey, first, limit = 3) {
    return jsonRpc('get-wallet-history-transactions', {
      'public-key': publicKey,
      first,
      limit,
    });
  },

  // Get certain transactions for the known wallet with public-key and *id*
  getTransactionInfo(publicKey, id) {
    return jsonRpc('get-transaction', {
      'public-key': publicKey,
      id,
    });
  },

  getTransactionDigest(publicKey) {
    return jsonRpc('get-transaction', {
      digest: publicKey,
    });
  },

  // TODO: need description
  // {"jsonrpc":"2.0","method":"get-nodes","params": {"first":0, "count":10},"id":"12"}
  getNodes(first, count) {
    return jsonRpc('get-nodes', {
      first,
      limit: count,
    });
  },

  // TODO: need description
  getNetworkState() {
    return jsonRpc('get-network-state');
  },

  getTransactionHistory(first, limit = 3, filter = []) {
    const transactions = [];
    const other = [];

    function compareSerial(txsA, txsB) {
      return parseInt(txsB.serial) - parseInt(txsA.serial);
    }

    jsonRpc('get-transaction-history', {
      first,
      limit,
    }).then((resp) => {
      resp.forEach((item) => {
        if (item['transaction-type'] == 'TransferAssetsTransaction') {
          transactions.push(item);
          transactions.sort(compareSerial);
        } else {
          other.push(item);
          transactions.sort(compareSerial);
        }
      });
    });

    return { TransferAssetsTransaction: transactions, OtherTransaction: other };
  },

  getTransactionHistoryState() {
    return jsonRpc('get-transaction-history-state', {});
  },

  getBlockchainInfo() {
    return jsonRpc('get-blockchain-info');
  },

  getWalletNode(publicKey) {
    return jsonRpc('get-wallet-node', {
      'public-key': publicKey,
    });
  },

  Ping() {
    return jsonRpc('ping');
  },

  getWalletState(publicKey) {
    return jsonRpc('get-wallet-state', {
      'public-key': publicKey,
    });
  },

  getAssets() {
    const assets = {};
    const result = jsonRpc('get-blockchain-info').then((resp) => {
      resp.info['supported-assets'].forEach((item, i, arr) => {
        assets[item.code] = item;
      });
      return assets;
    });

    return result;
  },
  getWalletSate(publicKey, count) {
    return axios.post(
      'https://lotus000.i.mile.global/v1/api',
      {
        method: 'get-wallet-state',
        params: { 'public-key': publicKey },
        id: 1,
        jsonrpc: '2.0',
        version: '1.0',
      },
    );
  },
  // Get statistics
  getTurnovers() {
    return jsonRpc('get-turnovers');
  },
};
