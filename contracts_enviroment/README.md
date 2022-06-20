# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

Greeter contract address: 0x5FbDB2315678afecb367f032d93F642f64180aa3

localhost deploy:

module.exports = {
  solidity: "0.8.4"
};

mumbai deploy:

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {},
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [
        "c4a2178513aeda42fadba1befbd740a16ff336c4a28d14f5d8a75c8bd1fb2f39",
      ],
    },
  },
  etherscan: {
    apiKey: "7WY8391MKBTSXASWYJX6SCB97FG5C7FB1M",
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

Console commands:

- Declare contract class: 
  const Greeter = await ethers.getContractFactory("Greeter")

- Instance a contract:
  const greeter = await Greeter.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3")
