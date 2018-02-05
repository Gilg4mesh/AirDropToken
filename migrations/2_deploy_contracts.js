let FunToken = artifacts.require("./FunToken.sol");
let AirDrop = artifacts.require("./AirDrop.sol");

module.exports = function(deployer) {
  deployer.deploy(FunToken);
  deployer.deploy(AirDrop);
  deployer.link(FunToken, AirDrop);
};
