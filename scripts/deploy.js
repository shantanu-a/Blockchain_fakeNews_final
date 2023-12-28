const hre = require("hardhat");

async function main() {
  const fakeNews = await hre.ethers.deployContract("FakeNews");
  await fakeNews.waitForDeployment();

  const deployedAddress = await fakeNews.getAddress(); // Resolve the promise
  console.log("Deployed contract address:", deployedAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});