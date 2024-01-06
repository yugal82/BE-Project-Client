// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIDs;
    Counters.Counter private _itemsSold;

    uint256 mintingFee = 0.0025 ether; // this listing fee is amount of ether that the creator will be required to pay while creating an NFT.

    address payable owner;
    // payable keyword is used becuase owner can receive funds. If not used, then the owner will be unable to withdraw any balance funds.

    // the mapping is between the _tokenIds and MarketItem(i.e NFT). Since each NFT created will have a unique ID, the created NFT should be mapped with that associated tokenId
    mapping(uint256 => MarketItem) private idMarketItem;

    // the below struct defines the structure of the MarketItem(i.e NFT). What details are expected and stored.
    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    // whenever an item is created, the below event will be triggered.
    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only onwer can perform this function");
        _;
    }

    constructor() ERC721("DeKrypt", "DKPT") {
        owner == payable(msg.sender);
    }

    // the below function allows the onwer to update the minting fee in the future.
    function updateMintingFees(
        uint256 _newMintingFee
    ) public payable onlyOwner {
        mintingFee = _newMintingFee;
    }

    // view keyword is used when we "read" a state variable. As "mintingFee" is a state variable and we are "reading and returning" it, we use "view" keyword.
    function getMintingFeePrice() public view returns (uint256) {
        return mintingFee;
    }

    // Function for minting NFTs.
    function mintNFT(
        uint256 _price,
        string memory tokenURI
    ) public payable returns (uint256) {
        _tokenIDs.increment();

        uint256 newTokenId = _tokenIDs.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createNFT(newTokenId, _price);

        return newTokenId;
    }

    function createNFT(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price cannot be negative.");
        // require(
        //     msg.value == mintingFee,
        //     "Price me must be equal to minting price"
        // );

        // we push the marketItem created in the mapping defined above
        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        // we transfer the token (NFT) to the contract address. So after the transfer function is executed, the owner of the token will be address(this) i.e the contract address.
        _transfer(msg.sender, address(this), tokenId);

        // After there is transfer of NFTs, we emit the event that we have created.
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    // function for resell token. Allows the owner to sell the NFT
    function sellItem(uint256 tokenId, uint256 updatedPrice) public payable {
        require(
            idMarketItem[tokenId].owner == msg.sender,
            "Only NFT owner can perform this function."
        );
        require(
            msg.value == mintingFee,
            "Price must atleast equal to Minting Price Fee"
        );

        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price = updatedPrice;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));

        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    // function to buy listed NFT.
    function buyItem(uint256 tokenId) public payable {
        uint256 price = idMarketItem[tokenId].price;

        require(
            msg.value == price,
            "Please submit the asking price to complete the purchase."
        );

        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].sold = true;
        idMarketItem[tokenId].owner = payable(address(this));

        _itemsSold.increment();

        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(mintingFee);
        payable(idMarketItem[tokenId].seller).transfer(msg.value);
    }

    // the below function fetches the NFTs that are for sale. That means those items that are currently listed.
    function fetchListedMarketItems()
        public
        view
        returns (MarketItem[] memory)
    {
        uint256 itemCount = _tokenIDs.current();
        uint256 listedItems = itemCount - _itemsSold.current();
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
    function fetchListedItemsofUser()
        public
        view
        returns (MarketItem[] memory)
    {
        uint256 totalCount = _tokenIDs.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                itemCount++;
            }
        }

        MarketItem[] memory userListedItems = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                MarketItem storage item = idMarketItem[i + 1];
                userListedItems[currentIndex] = item;

                currentIndex++;
            }
        }

        return userListedItems;
    }
}
