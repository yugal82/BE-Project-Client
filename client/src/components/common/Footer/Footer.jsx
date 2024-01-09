import React from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { FaDiscord, FaInstagram } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-gray-800 p-16 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-3xl md:text-4xl font-bold mb-6 md:mb-0">DeKrypt</div>
        <div className="flex space-x-10 items-center">
          <FaXTwitter className="text-2xl md:text-3xl hover:text-blue-400 transition duration-300 cursor-pointer transform hover:scale-110" />
          <FaDiscord className="text-2xl md:text-3xl hover:text-blue-400 transition duration-300 cursor-pointer transform hover:scale-110" />
          <FaInstagram className="text-2xl md:text-3xl hover:text-blue-400 transition duration-300 cursor-pointer transform hover:scale-110" />
        </div>
      </div>
      <div className="mt-6 text-base md:text-lg">
        <p>&copy; 2024 All rights reserved.</p>
        <p>
          This project is fueled by{' '}
          <a href="https://ethereum.org/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <SiEthereum className="inline-block text-2xl" /> ETH
          </a>
        </p>
      </div>
      <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-base md:text-lg mt-6 justify-center">
        <li>
          <Link to="/" className="hover:text-blue-400 transition duration-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/nft-marketplace" className="hover:text-blue-400 transition duration-300">
            Explore NFTs
          </Link>
        </li>
        <li>
          <Link to="/Crowdfunding" className="hover:text-blue-400 transition duration-300">
            CrowdFunding
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
