// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol"; 
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./CheckoutDao.sol";

contract CheckoutHub is Ownable{
  
  CheckoutDao public checkoutDao;
  address public checkoutAllianceTreasury;
  uint public constant baseFeeBPS = 100;
  uint public constant allianceFeeBPS = 3000;
  uint public constant FEE_MULTIPlIER = 10000;

  event Booking(address indexed customer, address indexed merchant, uint indexed listingId, uint fromDate, uint toDate, uint paymentAmount, IERC20 paymentCurrency);
  
  constructor(CheckoutDao _checkoutDao) Ownable(){
    checkoutDao = _checkoutDao;
  }
  
  function checkout(address merchant, uint listingId, uint fromDate, uint toDate, uint amount, IERC20 currency) public {
    // send 1% (maybe modifiable later)
    uint feeAmount = amount * baseFeeBPS / FEE_MULTIPlIER;
    currency.transferFrom(msg.sender, address(checkoutDao), feeAmount);
    // mint cdao token
    checkoutDao.mint(address(this), feeAmount);
    // send cut to alliance
    uint allianceFeeAmount = feeAmount * allianceFeeBPS / FEE_MULTIPlIER;
    checkoutDao.transfer(checkoutAllianceTreasury, allianceFeeAmount);
    // send rest to merchant
    checkoutDao.transfer(merchant, feeAmount - allianceFeeAmount);
    // event to be picked up by back-end
    emit Booking(msg.sender, merchant, listingId, fromDate, toDate, amount, currency);
  }
}