var FunToken = artifacts.require("./FunToken.sol");

contract('FunToken', function(accounts) {
  var firstAccount = accounts[0];
  var secondAccount = accounts[1];
  var thirdAccount = accounts[2];

  it("should put 10000 FunToken in the first account", function() {
    var token;

    return FunToken.new(10000, 'Fun Token', 1, 'FT', {from: firstAccount}).then(function(instance) {
      token = instance;

      return token.balanceOf.call(firstAccount);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 Fun Token wasn't in the first account");
    });
  });

  it("should transfer 100 FunToken to the second account using transfer", function() {
    var token;

    return FunToken.new(10000, 'Fun Token', 1, 'FT', {from: firstAccount}).then(function(instance) {
      token = instance;

      return token.transfer(secondAccount, 100, {from: firstAccount});
    }).then(function() {
      return token.balanceOf.call(secondAccount);
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 100, "100 Fun Token wasn't in the second account");
    });
  });

  it("should approve 100 FunToken to the second account", function() {
    var token;

    return FunToken.new(10000, 'Fun Token', 1, 'FT', {from: firstAccount}).then(function(instance) {
      token = instance;

      return token.approve(secondAccount, 100, {from: firstAccount});
    }).then(function() {
      return token.allowance.call(firstAccount, secondAccount);
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 100, "100 Fun Token wasn't approved");
    });
  });

  it("should transfer 100 FunToken to the second account using transferFrom", function() {
    var token;

    return FunToken.new(10000, 'Fun Token', 1, 'FT', {from: firstAccount}).then(function(instance) {
      token = instance;

      return token.approve(secondAccount, 100, {from: firstAccount});
    }).then(function() {
      return token.allowance.call(firstAccount, secondAccount);
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 100, "100 Fun Token wasn't approved");
    }).then(function () {
      return token.transferFrom(firstAccount, secondAccount, 100, {from: secondAccount});
    }).then(function() {
      return token.balanceOf.call(secondAccount);
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 100, "100 Fun Token wasn't in the second account");
    });
  });

  it("should transfer 100 FunToken to the second account from third account using transferFrom", function() {
    var token;

    return FunToken.new(10000, 'Fun Token', 1, 'FT', {from: firstAccount}).then(function(instance) {
      token = instance;

      return token.approve(thirdAccount, 100, {from: firstAccount});
    }).then(function() {
      return token.allowance.call(firstAccount, thirdAccount);
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 100, "100 Fun Token wasn't approved");
    }).then(function () {
      return token.transferFrom(firstAccount, secondAccount, 100, {from: thirdAccount});
    }).then(function() {
      return token.balanceOf.call(secondAccount);
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 100, "100 Fun Token wasn't in the second account");
    });
  });
});
