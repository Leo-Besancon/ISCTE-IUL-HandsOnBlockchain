const RPS = artifacts.require("RPS");
const RPS_Proxy = artifacts.require("RPS_Proxy");
const RPSCommitReveal = artifacts.require("RPSCommitReveal");

module.exports = async function(deployer, network, accounts) {
  const account_one = accounts[0];
  const account_two = accounts[1];
  deployer.deploy(RPS, account_one, account_two, 1e15).then(
  function () {
	deployer.deploy(RPSCommitReveal, account_one, account_two, 1e15).then(
	function () {
	    return deployer.deploy(RPS_Proxy, RPS.address);
	  });
  });
};
