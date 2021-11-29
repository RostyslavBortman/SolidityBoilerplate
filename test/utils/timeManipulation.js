const increaseTime = (web3, seconds) => {

    web3.currentProvider.send({
      jsonrpc: '2.0', method: 'evm_increaseTime', params: [parseInt(seconds, 10)], id: 1,
    }, () => {});
    web3.currentProvider.send({
      jsonrpc: '2.0', method: 'evm_mine', params: [], id: 2,
    }, () => {});
  };
  
  module.exports = { increaseTime };