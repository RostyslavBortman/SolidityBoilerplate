/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

 //
 // const fs = require('fs');
 // const mnemonic = fs.readFileSync(".secret").toString().trim();
 
 require('dotenv').config();
 
 import HDWalletProvider from "@truffle/hdwallet-provider";
 
 module.exports = {
   /**
    * Networks define how you connect to your ethereum client and let you set the
    * defaults web3 uses to send transactions. If you don't specify one truffle
    * will spin up a development blockchain for you on port 9545 when you
    * run `develop` or `test`. You can ask a truffle command to use a specific
    * network from the command line, e.g
    *
    * $ truffle test --network <network-name>
    */
 
   networks: {
     // Useful for testing. The `development` name is special - truffle uses it by default
     // if it's defined here and no other network is specified at the command line.
     // You should run a client (like ganache-cli, geth or parity) in a separate terminal
     // tab if you use this network and you must also set the `host`, `port` and `network_id`
     // options below to some value.
     //
     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
      gas: 6021975,           // Gas sent with each transaction (default: ~6700000)
     },
     rinkeby: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY_TESTNET, `wss://rinkeby.infura.io/ws/v3/${process.env.INFURA_KEY}`),
       network_id: 4,       // Ropsten's id
       gas: 10000000,        // Ropsten has a lower block limit than mainnet   // # of confs to wait between deployments. (default: 0)
       timeoutBlocks: 200,
       gasPrice: 20000000000,
       networkCheckTimeout: 1000000,  // # of blocks before a deployment times out  (minimum/default: 50)
       skipDryRun: true,
     },
     kovan: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY_TESTNET, `wss://kovan.infura.io/ws/v3/${process.env.INFURA_KEY}`),
      network_id: 42,
      // confirmations: 1,
      gas: 5500000,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    mainnet: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_KEY}`),
      network_id: 1,
      // confirmations: 1,
      gas: 5500000,
      gasPrice: 130*1000000000,
      timeoutBlocks: 200,
      skipDryRun: true
    },
   },
 
   // Set default mocha options here, use special reporters etc.
   mocha: {
     // timeout: 100000
   },
 
   // Configure your compilers
   compilers: {
     solc: {
       version: "0.8.10",    // Fetch exact version from solc-bin (default: truffle's version)
       // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
       settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        }
       //  evmVersion: "byzantium"
       }
     }
   },
   plugins: ["truffle-plugin-verify"],
   api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
   }
 }