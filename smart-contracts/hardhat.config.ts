import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify"
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    dango: {
      url: "https://forno.dango.celo-testnet.org",
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
  etherscan: {
    apiKey: {
      'dango': 'empty'
    },
    customChains: [
      {
        network: "dango",
        chainId: 44787,
        urls: {
          apiURL: "https://celo-dango.blockscout.com/api",
          browserURL: "https://celo-dango.blockscout.com"
        }
      }
    ]
  }
};

export default config;
