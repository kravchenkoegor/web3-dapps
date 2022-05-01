// @ts-nocheck
const SimpleStorage = artifacts.require("./SimpleStorage.sol");
const AdvancedStorage = artifacts.require("./AdvancedStorage.sol");

module.exports = async function (deployer) {
  await Promise.all([
    deployer.deploy(SimpleStorage),
    deployer.deploy(AdvancedStorage)
  ])
};
