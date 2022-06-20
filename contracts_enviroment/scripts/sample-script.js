const hre = require("hardhat");

async function main() {
  const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");

  const helloWorld = await HelloWorld.deploy("Hello, Hardhat!");

  await helloWorld.deployed();

  console.log("Contract deployed to:", helloWorld.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
