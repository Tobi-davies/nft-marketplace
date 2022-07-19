//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Marketplace is ReentrancyGuard {
   AggregatorV3Interface internal priceFeed;
//state variables
address payable public immutable feeAccount; //the account that receives the fees
uint public immutable feePercent; //the fee percentage on sales
uint public itemCount;


struct Item {
  uint itemId;
  IERC721 nft;
  uint tokenId;
  uint price;
  address payable seller;
  bool sold;
}

event Offered (
  uint itemId,
  address indexed nft, uint tokenId, uint price, address indexed seller
);

event Bought (
  uint itemId,
  address indexed nft, uint tokenId, uint price, address indexed seller, address indexed buyer
);

mapping(uint => Item)  public items;

constructor(uint _feePercent) {
  feeAccount = payable(msg.sender);
  feePercent = _feePercent;
   priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
}

function makeItem (IERC721 _nft, uint _tokenId, uint _price) external nonReentrant {
require(_price > 0, "Price must be greater than zero");
//increment item count
itemCount++;
//transfer nft
_nft.transferFrom(msg.sender, address(this), _tokenId);
//add new items to items mapping
items[itemCount] = Item (itemCount, _nft, _tokenId, _price, payable(msg.sender), false);

//emit Offered event
emit Offered (
  itemCount, address(_nft), _tokenId, _price, msg.sender
);
}

function purchaseItem(uint _itemId)  external payable nonReentrant {
uint _totalPrice = getTotalPrice(_itemId);
Item storage item = items[_itemId];
require(_itemId > 0 && _itemId <= itemCount, "Item doesn't exist");
require(msg.value>= _totalPrice, "not enough ether to cover item price and market fee" );
require(!item.sold, "item already sold");
//pay seller and feeAccount
item.seller.transfer(item.price);
feeAccount.transfer(_totalPrice - item.price);
//update item to sold
item.sold = true;
//transfer nft to buyer
item.nft.transferFrom(address(this), msg.sender, item.tokenId);

//emit Bought event
emit Bought (_itemId, address(item.nft), item.tokenId, item.price, item.seller, msg.sender);
}

function getTotalPrice(uint _itemId) view public returns (uint) {
return (items[_itemId].price*(100+feePercent)/100);
}

/**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return price;
    }
}