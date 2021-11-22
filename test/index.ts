import { expect } from "chai";
import { web3 } from "hardhat";
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: ["0x364d6D0333432C3Ac016Ca832fb8594A8cE43Ca6"],
    });

    await hre.network.provider.request({
      method: "hardhat_setBalance",
      params: ["0x364d6D0333432C3Ac016Ca832fb8594A8cE43Ca6", "0x1000000000000000000000000000"],
    });

    let tx = await web3.eth.sendTransaction({from: "0x364d6D0333432C3Ac016Ca832fb8594A8cE43Ca6", to: "0x364d6D0333432C3Ac016Ca832fb8594A8cE43Ca6", value: "1"})
    console.log(tx);

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
