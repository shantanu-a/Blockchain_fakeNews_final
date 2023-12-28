require("@nomicfoundation/hardhat-toolbox");

// require("dotenv").config();
// /** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/-js8ixUjsxxz_wK3FAf735QZ7ZQTrpYt",
      accounts: ["ad4ad9b2f02d99f7f06945ab9a7f4a0e881fc8273101305eefab0807555e8a07"],
    },
  },
};