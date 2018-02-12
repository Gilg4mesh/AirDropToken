let ERC20 = artifacts.require('./ERC20.sol');
let FunToken = artifacts.require("./FunToken.sol");
let AirDrop = artifacts.require("./AirDrop.sol");

module.exports = function(deployer) {
  deployer.deploy(ERC20);
  deployer.deploy(FunToken);
  deployer.link(ERC20, FunToken);
  deployer.deploy(AirDrop);
  deployer.link(FunToken, AirDrop);
};
