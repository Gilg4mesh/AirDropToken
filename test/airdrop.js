var FunToken = artifacts.require("./FunToken.sol");
var AirDrop = artifacts.require("./AirDrop.sol");

contract('AirDrop', function(accounts) {
  var firstAccount = accounts[0];
  var secondAccount = accounts[1];
  var thirdAccount = accounts[2];
  var forthAccount = accounts[2];

  it("should airdrop 10 FunToken to second account and third account", function() {
    var token;
    var airdrop;

    return FunToken.new(10000, 'Fun Token', 1, 'FT', {from: firstAccount}).then(function(tokenInstance) {
      token = tokenInstance;

      return AirDrop.new({from: forthAccount});
    }).then(function (airDropInstance) {
      airdrop = airDropInstance;

      return token.approve(airdrop.address, 20, {from: firstAccount});
    }).then(function() {
      return token.allowance.call(firstAccount, airdrop.address);
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 20, "20 Fun Token wasn't approved");
    }).then(function() {
      return airdrop.airDrop(token.address, firstAccount, [
        secondAccount, thirdAccount
      ], 10, {from: forthAccount});
    }).then(function () {
      return token.balanceOf(secondAccount);
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 10, "10 Fun Token wasn't in the second account");
    }).then(function () {
      return token.balanceOf(thirdAccount);
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 10, "10 Fun Token wasn't in the third account");
    });
  });

  it("prepare for demo airdrop function", function() {
    var token;
    var airdrop;

    return FunToken.new(10000, 'Fun Token', 1, 'FT', {from: firstAccount}).then(function(tokenInstance) {
      token = tokenInstance;
      console.log('      Demo FunToken Address: ' + tokenInstance.address);

      return AirDrop.new({from: firstAccount});
    }).then(function (airDropInstance) {
      airdrop = airDropInstance;
      console.log('      Demo Airdrop Address: ' + airDropInstance.address);

      return token.approve(airdrop.address, 20, {from: firstAccount});
    }).then(function() {
      return token.allowance.call(firstAccount, airdrop.address);
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 20, "20 Fun Token wasn't approved");
    });
  });
});
