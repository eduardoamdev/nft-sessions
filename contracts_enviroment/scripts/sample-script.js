const hre = require("hardhat");

async function main() {
  const SessionToken = await hre.ethers.getContractFactory("SessionToken");

  const sessionToken = await SessionToken.deploy();

  await sessionToken.deployed();

  console.log("Contract deployed to:", sessionToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
