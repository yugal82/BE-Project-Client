import React from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { FaDiscord, FaInstagram } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-gray-800 rounded-t-2xl p-16 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-3xl md:text-4xl font-bold mb-6 md:mb-0">DeKrypt</div>
        <div className="flex space-x-10 items-center">
          <FaXTwitter className="text-2xl md:text-3xl hover:text-blue-400 transition duration-300 cursor-pointer transform hover:scale-110" />
          <FaDiscord className="text-2xl md:text-3xl hover:text-blue-400 transition duration-300 cursor-pointer transform hover:scale-110" />
          <FaInstagram className="text-2xl md:text-3xl hover:text-blue-400 transition duration-300 cursor-pointer transform hover:scale-110" />
        </div>
      </div>
      <div className="mt-6 text-base md:text-lg text-center md:text-left">
        <p>&copy; 2024 All rights reserved.</p>
        <p>
          This project is fueled by{' '}
          <a href="https://ethereum.org/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <SiEthereum className="inline-block text-2xl" /> ETH
          </a>
        </p>
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-base md:text-lg mt-6 justify-center md:justify-end">
        <div className="md:text-right">
          <Link to="/" className="hover:text-blue-400 transition duration-300">
            Home
          </Link>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-base md:text-lg mt-6 justify-center md:justify-end">
          <div className="md:text-right">
            <Link to="/nft-marketplace" className="hover:text-blue-400 transition duration-300">
              Explore NFTs
            </Link>
          </div>
          <div className="md:text-right">
            <Link to="/Crowdfunding" className="hover:text-blue-400 transition duration-300">
              CrowdFunding
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
