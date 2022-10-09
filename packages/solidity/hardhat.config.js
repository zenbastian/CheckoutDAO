require("dotenv").config();

require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

function getMnemonic(networkName) {
  if (networkName) {
    const mnemonic = process.env['MNEMONIC_' + networkName.toUpperCase()];
    if (mnemonic && mnemonic !== '') {
      return mnemonic;
    }
  }

  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic || mnemonic === '') {
    return 'test test test test test test test test test test test junk';
  }
  return mnemonic;
}

function accounts(networkName){
  return {mnemonic: getMnemonic(networkName)};
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY || '',
      goerli: process.env.ETHERSCAN_API_KEY || '',
      // optimism
      optimisticEthereum: process.env.OPTIMISTIC_ETHERSCAN_API_KEY || '',
      optimisticGoerli: process.env.OPTIMISTIC_ETHERSCAN_API_KEY || '',
      // polygon
      polygon: process.env.POLYGONSCAN_API_KEY || '',
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || '',
    }
  },
  defaultNetwork: "hardhat",
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: accounts("mainnet"),
      //gasPrice: 120 * 1000000000,
      chainId: 1,
    },
    localhost: {
      live: false,
      saveDeployments: true,
      tags: ["local"],
      
    },
    /*hardhat: {
      initialBaseFeePerGas: 0,
      accounts: accounts(),
      forking: {
        enabled: process.env.FORKING === "true",
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
        blockNumber: 13191833,
      },
      live: false,
      saveDeployments: true,
      chainId: 31337, // the default chain ID used by Hardhat Network's blockchain
      tags: ["test", "local"]
    },*/
    hardhat: {
      initialBaseFeePerGas: 0,
      accounts: accounts(),
      forking: {
        enabled: process.env.FORKING === "true",
        url: `https://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_OPTIMISM}`,
        blockNumber: 4180042, //optimism transaction index
      },
      live: false,
      saveDeployments: true,
      chainId: 31337, // the default chain ID used by Hardhat Network's blockchain
      //chainId: 1, // 1 for forking mainnet test
      tags: ["test", "local"],
      deploy: ['deploy_optimism']
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: accounts("goerli"),
      chainId: 5,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 5000000000,
      gasMultiplier: 2,
    },
    goerliOptimism: {
      url: 'https://goerli.optimism.io',
      accounts: accounts("optimism_goerli"),
      chainId: 420,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      deploy: ['deploy_optimism']
    },
    optimism: {
        //url: `https://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_OPTIMISM}`,
        url: "https://mainnet.optimism.io",
        accounts: accounts("optimism"),
        //chainId: 10,
        live: true,
        saveDeployments: true,
        deploy: ['deploy_optimism']
    },
    polygon: {
      url: 'https://rpc-mainnet.maticvigil.com',
      accounts: accounts("polygon"),
      chainId: 137,
      live: true,
      saveDeployments: true,
    },
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com/',
      accounts: accounts("mumbai"),
      chainId: 80001,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
      gasMultiplier: 2,
    },

  },
  namedAccounts: {
    deployer: {
      default: 0,
      3: 1,
      4: 1,
      5: 1,
      42: 1,
      69: 1,
      420: 1
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  }
};
