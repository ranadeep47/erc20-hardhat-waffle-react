const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const Token = await hre.ethers.getContractFactory("Token");
  const YogaCoin = await Token.deploy("YogaCoin", "YOGA");

  await YogaCoin.deployed();

  console.log("Token deployed to:", YogaCoin.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });