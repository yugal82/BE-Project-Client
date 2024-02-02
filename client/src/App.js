import Landing from './components/Home/Landing/Landing';
import NFTMain from './components/NFT-Marketplace/NFTMain';
import NFTCreate from './components/NFT-Marketplace/nft-create/NFTCreate';
import NFTDetails from './components/NFT-Marketplace/nft-details/NFTDetails';
import NFTExplore from './components/NFT-Marketplace/nft-explore/NFTExplore';
import NFTProfile from './components/NFT-Marketplace/nft-profile/NFTProfile';
import CrowdfundingMain from './components/Crowdfunding/CrowdfundingMain';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import CrowdCreate from './components/Crowdfunding/crowd-create/CrowdCreate';

export default function Home() {
  return (
    <div className="bg-gray-900">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/nft-marketplace" element={<NFTMain />} />
        <Route exact path="/nft-marketplace/explore" element={<NFTExplore />} />
        <Route exact path="/nft-marketplace/profile" element={<NFTProfile />} />
        <Route exact path="/nft-marketplace/create" element={<NFTCreate />} />
        <Route exact path="/crowdfunding" element={<CrowdfundingMain />} />
        <Route exact path="/crowdfunding/create-campaign" element={<CrowdCreate />} />
        <Route exact path="/token/:contractAddress/:tokenId" element={<NFTDetails />} />
      </Routes>
    </div>
  );
}
