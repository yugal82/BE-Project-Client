import Landing from './components/Home/Landing/Landing';
import NFTMain from './components/NFT-Marketplace/NFTMain';
import NFTCreate from './components/NFT-Marketplace/nft-create/NFTCreate';
import NFTExplore from './components/NFT-Marketplace/nft-explore/NFTExplore';
import NFTProfile from './components/NFT-Marketplace/nft-profile/NFTProfile';
import './index.css';
import { Route, Routes } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-gray-900">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/nft-marketplace" element={<NFTMain />} />
        <Route exact path="/nft-marketplace/explore" element={<NFTExplore />} />
        <Route exact path="/nft-marketplace/profile" element={<NFTProfile />} />
        <Route exact path="/nft-marketplace/create" element={<NFTCreate />} />
      </Routes>
    </div>
  );
}
