import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgClose } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import ConnectWalletBtn from '../../common/ConnectWalletBtn';

const CrowdNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative w-full sm:w-[85%] flex mx-auto">
      <div className="w-full sm:py-1 sm:px-6 sm:flex sm:items-center sm:justify-between bg-white text-gray-900 sm:mt-10 sm:rounded-3xl">
        <div className="font-semibold py-4 sm:py-0 flex items-center justify-between">
          <Link to="/">
            <span className="text-3xl font-bold sm:text-xl p-4 sm:px-0 sm:py-0 cursor-pointer">DeKrypt</span>
          </Link>
          {menuOpen ? (
            <div className="sm:hidden text-gray-900 font-bold text-3xl px-4 cursor-pointer">
              <CgClose onClick={handleMenuClick} />
            </div>
          ) : (
            <div className="sm:hidden text-gray-900 font-bold text-3xl px-4 cursor-pointer">
              <GiHamburgerMenu onClick={handleMenuClick} />
            </div>
          )}
        </div>
        {menuOpen && (
          <div className="absolute h-screen w-full bg-transparent backdrop-filter backdrop-blur-3xl sm:hidden">
            <div className="w-full flex text-center justify-center pt-6">
              <ul className="w-full text-white">
                <Link to="/crowdfunding/explore">
                  <li className="w-full text-3xl font-semibold cursor-pointer py-6 border-b border-white">
                    Explore Campaigns
                  </li>
                </Link>
                <Link to="/crowdfunding/create-campaign">
                  <li className="w-full text-3xl font-semibold cursor-pointer py-6 border-b border-white">
                    Create Campaign
                  </li>
                </Link>
                <Link to="/crowdfunding/profile">
                  <li className="w-full text-3xl font-semibold cursor-pointer py-6 border-b border-white">Profile</li>
                </Link>
              </ul>
            </div>
            <div className="w-full flex items-center justify-center mx-auto mt-12">
              <ConnectWalletBtn />
            </div>
          </div>
        )}
        <div className="hidden sm:block">
          <ul className="w-full flex items-center justify-between">
            <div className="flex items-center justify-center">
              <Link to="/crowdfunding/explore">
                <li className="text-base py-4 px-2 font-semibold cursor-pointer hover:scale-110 transition-all ease-in-out duration-200">
                  Explore Campaigns
                </li>
              </Link>
              <Link to="/crowdfunding/create-campaign">
                <li className="text-base py-4 px-2 font-semibold cursor-pointer hover:scale-110 transition-all ease-in-out duration-200">
                  Create Campaign
                </li>
              </Link>
              <Link to="/crowdfunding/profile">
                <li className="text-base py-4 px-2 font-semibold cursor-pointer hover:scale-110 transition-all ease-in-out duration-200">
                  Profile
                </li>
              </Link>
            </div>
            <div className="ml-8">
              <ConnectWalletBtn />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CrowdNavbar;
