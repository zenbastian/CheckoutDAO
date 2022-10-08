// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "./CheckoutHub.sol";

contract CheckoutDao is ERC20, ERC20Burnable, Ownable, ERC20Permit {

  CheckoutHub public checkoutHub;
  address public stableCoin;

  // events
  event CheckoutHubChanged(CheckoutHub indexed previousCheckoutHub, CheckoutHub indexed newCheckoutHub );

  constructor(address _stableCoin ) ERC20("CheckoutDAO", "CDAO") ERC20Permit("CheckoutDAO") {
    _mint(msg.sender, 1000000 * 10 ** decimals());
    stableCoin = _stableCoin;
  }

  modifier onlyCheckoutHub {
    require(address(checkoutHub) == msg.sender, "not checkout hub");
    _;
  }

  function mint(address to, uint256 amount) public onlyCheckoutHub {
    _mint(to, amount);
  }

  function changeCheckoutHub(CheckoutHub newCheckoutHub) public onlyOwner {
    require(address(newCheckoutHub) != address(0), "new checkout hub is the zero address");
    CheckoutHub oldCheckoutHub = checkoutHub;
    checkoutHub = newCheckoutHub;
    emit CheckoutHubChanged(oldCheckoutHub, newCheckoutHub);
  }
}