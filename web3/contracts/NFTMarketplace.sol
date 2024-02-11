// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIDs;

    // this listing fee is amount of ether that the creator will be required to pay while creating an NFT.
    uint256 mintingFee = 0.0025 ether;

    // payable keyword is used becuase owner can receive funds. If not used, then the owner will be unable to withdraw any balance funds.
    address payable owner;

    // the mapping is between the _tokenIds and MarketItem(i.e NFT). Since each NFT created will have a unique ID, the created NFT should be mapped with that associated tokenId
    mapping(uint256 => MarketItem) private idMarketItem;

    // the below struct defines the structure of the MarketItem(i.e NFT). What details are expected and stored.
    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool isListed;
        string tokenURI;
    }

    // whenever an item is created, the below event will be triggered.
    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool isListed
    );

    MarketItem[] private itemsListed;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only onwer can perform this function");
        _;
    }

    constructor() ERC721("DeKrypt", "DKPT") {
        owner = payable(msg.sender);
    }

    // the below function allows the onwer to update the minting fee in the future.
    function updateMintingFees(uint256 _newMintingFee)
        public
        payable
        onlyOwner
    {
        mintingFee = _newMintingFee;
    }

    // view keyword is used when we "read" a state variable. As "mintingFee" is a state variable and we are "reading and returning" it, we use "view" keyword.
    function getMintingFeePrice() public view returns (uint256) {
        return mintingFee;
    }

    // Function for minting NFTs.
    function mintNFT(uint256 _price, string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        _tokenIDs.increment();

        uint256 newTokenId = _tokenIDs.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createNFT(newTokenId, _price, tokenURI);

        return newTokenId;
    }


    function createNFT(uint256 tokenId, uint256 price, string memory tokenUri) private {
        require(price > 0, "Price cannot be negative.");

        // we push the marketItem created in the mapping defined above
        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(msg.sender),
            price,
            false,
            tokenUri
        );

        // After there is transfer of NFTs, we emit the event that we have created.
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            msg.sender,
            price,
            false // this boolean value shows that the item is not listed for buying 
        );
    }

    // function for resell token. Allows the owner to sell the NFT. i.e this is the funtion to list NFTs for sale.
    function listItem(uint256 tokenId, uint256 updatedPrice) public payable {
        require(
            idMarketItem[tokenId].owner == msg.sender,
            "Only NFT owner can perform this function."
        );
        require(
            updatedPrice > 0,
            "Price must be atleast equal to Minting Price Fee"
        );
        require(idMarketItem[tokenId].isListed == false, "The item is already listed.");

        idMarketItem[tokenId].price = updatedPrice;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));
        idMarketItem[tokenId].isListed = true;

        // now since the item is listed, we make a new element of type MarketItem and push it in the itemsListed array
        string memory tokenUri = tokenURI(tokenId);
        MarketItem memory newItem = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            updatedPrice,
            true,
            tokenUri
        );
        itemsListed.push(newItem);

        _transfer(msg.sender, address(this), tokenId);
        // after the above line is executed, the address of the smart contract becomes the owner of the item. This lets the marketplace to dislay the items which are listed for sale.
    }

    // function to buy listed NFT.
    function buyItem(uint256 tokenId) public payable {
        // keep the track of which tokenId item is being bought as we need to pop it out of itemsListed array afterwords
        uint256 index = 0;
        for(uint i = 0; i < itemsListed.length; i++) {
            if(itemsListed[i].tokenId == tokenId){
                index = i;
                break;
            }
        }
        
        require(idMarketItem[tokenId].isListed == true, "The item is not yet listed for sale.");
        require(
            msg.value >= idMarketItem[tokenId].price,
            "Please submit the asking price to complete the purchase."
        );

        _transfer(address(this), msg.sender, tokenId);
        payable(idMarketItem[tokenId].seller).transfer(msg.value - mintingFee);

        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].isListed = false;

        // as the token is bought by the user, it is no longer listed on the marketplace. So we remove the item from the itemsListed array
        for(uint i = index; i < itemsListed.length-1; i++){
            itemsListed[i] = itemsListed[i+1];
        }
        itemsListed.pop();
    }

    // the below function fetches the NFTs that are for sale. That means those items that are currently listed.
    function fetchListedMarketItems()
        public
        view
        returns (MarketItem[] memory)
    {
        uint256 itemCount = _tokenIDs.current();
        uint256 listedItems = 0;
        for(uint256 i = 0; i < itemsListed.length; i++){
            if(itemsListed[i].isListed){
                listedItems++;
            }
        }

        uint256 currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](listedItems);
        for (uint256 i = 0; i < itemCount; i++) {
            // we check the below condition because only those NFTs will be checked that are owned by the contract address.
            // Since the listed NFTs will be owned by address(this).
            if (idMarketItem[i + 1].owner == address(this)) {
                MarketItem storage currentItem = idMarketItem[i + 1];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }

    // the below function is to fetch nfts owned by a particular user.
    function fetchUserNFTs() public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenIDs.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                itemCount++;
            }
        }

        MarketItem[] memory userNfts = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                MarketItem storage currentItem = idMarketItem[i + 1];
                userNfts[currentIndex] = currentItem;
                currentIndex++;
            }
        }

        return userNfts;
    }

    // the below functions fetches the listed items of a particular user.
    function fetchListedItemsofUser() public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenIDs.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if(idMarketItem[i+1].seller == msg.sender){
                itemCount++;
            }
        }

        MarketItem[] memory userListedItems = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalCount; i++) {
            if(idMarketItem[i+1].seller == msg.sender){
                MarketItem storage item = idMarketItem[i+1];
                userListedItems[currentIndex] = item;

                currentIndex++;
            }
        }

        return userListedItems;
    }

    // function to withdraw funds in the owner's account.
    function withdraw() public onlyOwner {
        require(address(this).balance > 0, "Balance is zero");
        payable(owner).transfer(address(this).balance);
    }
}
