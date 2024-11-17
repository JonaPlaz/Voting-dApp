require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

const { INFURA_API_KEY, HOLESKY_PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    holesky: {
      url: `https://rpc.holesky.ethpandaops.io/${INFURA_API_KEY}`,
      accounts: [`0x${HOLESKY_PRIVATE_KEY}`],
      chainId: 17000,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
};