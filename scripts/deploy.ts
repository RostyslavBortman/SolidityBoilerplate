// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, run } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const token = await ethers.getContractFactory("Olegka311");
  const tokenName = "VikaTokenn";
  const tokenSymbol = "vttt";
  const deployer = await token.deploy(tokenName, tokenSymbol);
  console.log('ad');

  await deployer.deployed();
  console.log('ad2');

  await new Promise(resolve => setTimeout(resolve, 600)); // pause 3-4 blocks for etherscan update
  console.log('deployed');
  console.log(deployer.address);
  // Verifying contract
  //await run("verify:verify", {address: deployer.address, constructorArguments: [tokenName, tokenSymbol], contract: "contracts/Olegka311.sol"});

  //console.log("Vt token is deployed and verified", deployer.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
