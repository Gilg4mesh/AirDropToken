let ERC20 = artifacts.require("./ERC20.sol");
let AirDropNew = artifacts.require("./AirDropNew.sol");

module.exports = function(deployer) {
  deployer.deploy(ERC20);
  deployer.deploy(AirDropNew, {gas: '0x47EB48'});
  deployer.link(ERC20, AirDropNew);
};
