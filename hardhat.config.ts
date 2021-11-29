import dotenv from 'dotenv'

dotenv.config();

import "@nomiclabs/hardhat-truffle5";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";

require("@nomiclabs/hardhat-web3");
require('solidity-coverage');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const {
  INFURA_KEY,
  MNEMONIC,
  ETHERSCAN_API_KEY,
  PRIVATE_KEY,
  PRIVATE_KEY_TESTNET
} = process.env;

const accountsTestnet = PRIVATE_KEY_TESTNET
  ? [PRIVATE_KEY_TESTNET]
  : {mnemonic: MNEMONIC};

const accountsMainnet = PRIVATE_KEY
  ? [PRIVATE_KEY]
  : {mnemonic: MNEMONIC};

module.exports = {
  solidity: "0.8.10",

  networks: {
    hardhat: {
      forking: {
        url: `https://eth-rinkeby.alchemyapi.io/v2/4mBmmZyRCkIQzo3F5Ue9b7GfTyVfQ2g2`,
        accounts: accountsTestnet,
        blockNumber: 9722579 
      }
    },
    mainnet: {
        url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
       // accounts: accountsMainnet,
    },
    rinkeby: {
        url: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
        accounts: accountsTestnet,
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY
  },
  mocha: {
    timeout: 50000
  }

};
