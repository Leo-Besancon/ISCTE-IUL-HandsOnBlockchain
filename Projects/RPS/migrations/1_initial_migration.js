const RPS = artifacts.require("RPS");

module.exports = async function(deployer, network, accounts) {
  const account_one = accounts[0];
  const account_two = accounts[1];
  deployer.deploy(RPS, account_one, account_two, 1e15);
};
