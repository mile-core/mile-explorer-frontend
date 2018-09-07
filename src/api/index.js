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
  help() {
    return jsonRpc('help');
  },
  getBlock(blockId) {
    return jsonRpc('get-block', { id: blockId });
  },
  getBlockHistory() {
    return Promise.resolve({}); // TODO: implement
  },
  getBlockHistoryState() {
    return Promise.resolve({}); // TODO: implement
  },
  getTransactionInfo() {
    return Promise.resolve({}); // TODO: implement
  },
  getWalletHistoryBlocks() {
    return Promise.resolve({}); // TODO: implement
  },
  getWalletHistoryState() {
    return Promise.resolve({}); // TODO: implement
  },
  getWalletHistoryTransactions() {
    return Promise.resolve({}); // TODO: implement
  },
};
