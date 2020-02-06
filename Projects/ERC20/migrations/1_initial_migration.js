const ERC20 = artifacts.require("ERC20");

module.exports = async function(deployer) {
  deployer.deploy(ERC20, "ISCTE-IUL Token", "IIT", 0, 1000);
};
