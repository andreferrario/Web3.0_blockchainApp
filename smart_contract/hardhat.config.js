 // https://eth-ropsten.alchemyapi.io/v2/gOpkpQBRR30K635-YdJyI6q6PUAT2PQH

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/gOpkpQBRR30K635-YdJyI6q6PUAT2PQH',
      accounts: ['34d2bd384d54c7987e3060902f4cb91b2636f57ffd8dca14ce75216b302930cf']
    }
  }
}