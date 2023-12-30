import Landing from "./components/Home/Landing/Landing";
import NFTHome from "./components/NFT-Marketplace/nft-home/NFTHome";
import "./index.css";
import {
  Route,
  Routes
} from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-900">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/nft-marketplace" element={<NFTHome />} />
      </Routes>
    </div>
  );
}
