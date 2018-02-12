pragma solidity ^0.4.4;


/**
 * ERC20
 * source: https://github.com/OpenZeppelin/zeppelin-solidity/tree/master/contracts/token/ERC20
 */
contract ERC20 {
  string public standard = 'ERC20';
  string public name;
  string public symbol;
  uint8 public decimals;
  uint256 public totalSupply;

  mapping (address => uint256) public balanceOf;
  mapping (address => mapping (address => uint256)) public allowance;

  event Transfer(address indexed from, address indexed to, uint256 value);

  event Approval(address indexed _owner, address indexed _spender, uint256 _value);

  function transfer(address _to, uint256 _value) {
    if (_to == 0x0) throw;
    if (balanceOf[msg.sender] < _value) throw;
    // prevent overflow
    if (balanceOf[_to] + _value < balanceOf[_to]) throw;

    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    Transfer(msg.sender, _to, _value);
  }

  function approve(address _spender, uint256 _value) returns (bool success) {
    allowance[msg.sender][_spender] = _value;
    Approval(msg.sender, _spender, _value);
    success = true;
  }    

  function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
    if (_to == 0x0) throw;
    if (balanceOf[_from] < _value) throw;
    // prevent overflow
    if (allowance[_from][msg.sender] < _value) throw;
    if (balanceOf[_to] + _value < balanceOf[_to]) throw;

    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    allowance[_from][msg.sender] -= _value;
    Transfer(_from, _to, _value);
    success = true;
  }
}