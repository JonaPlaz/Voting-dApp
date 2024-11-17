require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

const { INFURA_API_KEY, METAMASK_PRIVATE_KEY, METAMASK_PRIVATE_KEY_2, ETHERSCAN_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  ignition: {
    requiredConfirmations: 1
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    holesky: {
      url: `https://rpc.holesky.ethpandaops.io/${INFURA_API_KEY}`,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`],
      chainId: 17000,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`],
      chainId: 11155111,
    },
    holesky2: {
      url: `https://rpc.holesky.ethpandaops.io/${INFURA_API_KEY}`,
      accounts: [`0x${METAMASK_PRIVATE_KEY_2}`],
      chainId: 17000,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
};