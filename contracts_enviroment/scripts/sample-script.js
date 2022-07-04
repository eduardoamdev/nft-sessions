const hre = require("hardhat");

async function main() {
  const Session = await hre.ethers.getContractFactory("Session");

  const session = await Session.deploy();

  await session.deployed();

  console.log("Contract deployed to:", session.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
