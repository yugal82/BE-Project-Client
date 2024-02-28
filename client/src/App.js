// import './index.css';
// import { Route, Routes } from 'react-router-dom';
// import React from 'react';
// import SuspenseAnimation from './components/common/SuspenseAnimation';

// const Landing = React.lazy(() => import('./components/Home/Landing/Landing'));
// const NFTMain = React.lazy(() => import('./components/NFT-Marketplace/NFTMain'));
// const NFTExplore = React.lazy(() => import('./components/NFT-Marketplace/nft-explore/NFTExplore'));
// const Profile = React.lazy(() => import('./components/Profile/Profile'));
// const NFTCreate = React.lazy(() => import('./components/NFT-Marketplace/nft-create/NFTCreate'));
// const NFTDetails = React.lazy(() => import('./components/NFT-Marketplace/nft-details/NFTDetails'));
// const CrowdfundingMain = React.lazy(() => import('./components/Crowdfunding/CrowdfundingMain'));
// const CrowdCreate = React.lazy(() => import('./components/Crowdfunding/crowd-create/CrowdCreate'));
// const CrowdExplore = React.lazy(() => import('./components/Crowdfunding/crowd-explore/CrowdExplore'));
// const CampaignDetails = React.lazy(() => import('./components/Crowdfunding/crowd-components/CampaignDetails'));

// export default function Home() {
//   return (
//     <div className="bg-gray-900 text-white ">
//       <Routes>
//         <Route
//           exact
//           path="/"
//           element={
//             <React.Suspense fallback={<SuspenseAnimation />}>
//               <Landing />
//             </React.Suspense>
//           }
//         />
//         <Route
//           exact
//           path="/nft-marketplace"
//           element={
//             <React.Suspense fallback={<SuspenseAnimation />}>
//               <NFTMain />
//             </React.Suspense>
//           }
//         />
//         <Route
//           exact
//           path="/nft-marketplace/explore"
//           element={
//             <React.Suspense fallback={<SuspenseAnimation />}>
//               <NFTExplore />
//             </React.Suspense>
//           }
//         />
//         <Route
//           exact
//           path="/nft-marketplace/create"
//           element={
//             <React.Suspense fallback={<SuspenseAnimation />}>
//               <NFTCreate />
//             </React.Suspense>
//           }
//         />
//         <Route
//           exact
//           path="/token/:contractAddress/:tokenId"
//           element={
//             <React.Suspense fallback={<SuspenseAnimation />}>
//               <NFTDetails />
//             </React.Suspense>
//           }
//         />
//         <Route
//           exact
//           path="/crowdfunding"
//           element={
//             <React.Suspense fallback={<SuspenseAnimation />}>
//               <CrowdfundingMain />
//             </React.Suspense>
//           }
//         />
//         <Route
//           exact
//           path="/crowdfunding/create-campaign"
//           element={
//             <React.Suspense fallback={<SuspenseAnimation />}>
//               <CrowdCreate />
//             </React.Suspense>
//           }
//         />
//         <Route
//           exact
//           path="/crowdfunding/explore"
//           element={
//             <React.Suspense fallback={<SuspenseAnimation />}>
//               <CrowdExplore />
//             </React.Suspense>
//           }
//         />
//         <Route
//           exact
//           path="/crowdfunding/campaigns-details/:id"
//           element={
//             <React.Suspense fallback={<SuspenseAnimation />}>
//               <CampaignDetails />
//             </React.Suspense>
//           }
//         />
//         <Route
//           exact
//           path="/profile"
//           element={
//             <React.Suspense fallback={<SuspenseAnimation />}>
//               <Profile />
//             </React.Suspense>
//           }
//         />
//       </Routes>
//     </div>
//   );
// }

import './index.css';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
// import SuspenseAnimation from './components/common/SuspenseAnimation';

import Landing from './components/Home/Landing/Landing';
import NFTMain from './components/NFT-Marketplace/NFTMain';
import NFTExplore from './components/NFT-Marketplace/nft-explore/NFTExplore';
import Profile from './components/Profile/Profile';
import NFTCreate from './components/NFT-Marketplace/nft-create/NFTCreate';
import NFTDetails from './components/NFT-Marketplace/nft-details/NFTDetails';
import CrowdfundingMain from './components/Crowdfunding/CrowdfundingMain';
import CrowdCreate from './components/Crowdfunding/crowd-create/CrowdCreate';
import CrowdExplore from './components/Crowdfunding/crowd-explore/CrowdExplore';
import CampaignDetails from './components/Crowdfunding/crowd-components/CampaignDetails';

export default function Home() {
  return (
    <div className="bg-gray-900 text-white ">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/nft-marketplace" element={<NFTMain />} />
        <Route exact path="/nft-marketplace/explore" element={<NFTExplore />} />
        <Route exact path="/nft-marketplace/create" element={<NFTCreate />} />
        <Route exact path="/token/:contractAddress/:tokenId" element={<NFTDetails />} />
        <Route exact path="/crowdfunding" element={<CrowdfundingMain />} />
        <Route exact path="/crowdfunding/create-campaign" element={<CrowdCreate />} />
        <Route exact path="/crowdfunding/explore" element={<CrowdExplore />} />
        <Route exact path="/crowdfunding/campaigns-details/:id" element={<CampaignDetails />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
