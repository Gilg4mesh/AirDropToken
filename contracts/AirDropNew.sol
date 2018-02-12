pragma solidity ^0.4.4;
import "./ERC20.sol";

contract AirDropNew {
  uint public numDrops;
  uint public dropAmount;
  address owner;
  address tokenAddress;

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function AirDrop(address tokenSource) {
    owner = msg.sender;
    tokenAddress = tokenSource;
  }

  event TokenDrop( address receiver, uint amount );

  function airDrop( address   tokenRepo,
                    address[] recipients,
                    uint amount) onlyOwner {
    ERC20 token = ERC20(tokenAddress);

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