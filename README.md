# AirDropToken
Fun token and airdrop smart contracts.

# contracts
* FunToken
A basic ERC 20 token contract.

* AirDrop
AirDrop contract to give away FunToken.

usage:
```
airdrop.airDrop(FunToken.address, transferFromAddress, toAddresses, value, {from: airDropContractOwner});
```

> Remember to approve allowance to airdrop contract address(transferFrom msg.sender is airdrop contract address)

# license
MIT