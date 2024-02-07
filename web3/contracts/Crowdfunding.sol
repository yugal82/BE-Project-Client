// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20; // which version of compiler to use

contract CrowdFunding {
    struct Campaign {
        // struct is basically like an object in JS
        address owner; // address is just a var type for storing eth addresses
        string title;
        string description;
        uint256 target; // unsigned integer 256 bits
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators; // declares an array which contains addresses of donators
        uint256[] donations; // declares an array which contains amount by donators
    }

    mapping(uint256 => Campaign) public campaigns; // declared a dictionary for mapping all the campaigns

    uint256 public numberOfCampaigns = 0; // initially the no. of campaigns is 0

    function createCampaign(
        // parameters of the function
        address _owner,
        string memory _title, // memory used for local storage while smart contract is in action
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        // returns total no. of campaigns
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(
            campaign.deadline < block.timestamp,
            "The deadline should be a date in the future"
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
}

