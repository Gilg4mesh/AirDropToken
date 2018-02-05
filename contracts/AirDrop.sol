pragma solidity ^0.4.4;
import "./FunToken.sol";

contract AirDrop {
  uint public numDrops;
  uint public dropAmount;
  address owner;

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function AirDrop() {
    owner = msg.sender;
  }

  event TokenDrop( address receiver, uint amount );

  function airDrop( FunToken token,
                    address   tokenRepo,
                    address[] recipients,
                    uint amount) onlyOwner {

    if( amount > 0 ) {
      for( uint i = 0 ; i < recipients.length ; i++ ) {
          assert(token.transferFrom(tokenRepo, recipients[i], amount));
          TokenDrop(recipients[i], amount);
      }
    }

    numDrops += recipients.length;
    dropAmount += recipients.length * amount;
  }
}