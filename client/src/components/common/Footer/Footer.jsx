import React from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { FaDiscord, FaInstagram } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-gray-800 rounded-t-2xl p-16 text-white">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-col md:justify-between md:items-center">
          <div className="text-3xl md:text-4xl font-bold md:mb-0">DeKrypt</div>
          <div className="mt-2 text-base">
            <p>&copy; 2024 All rights reserved.</p>
            <p>
              This project is fueled by{' '}
              <a href="https://ethereum.org/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <SiEthereum className="inline-block text-2xl" /> ETH
              </a>
            </p>
          </div>
        </div>
        <div className="flex-col justify-start md:justify-end mt-8 md:mt-0">
          <div className="flex space-x-8 items-center md:justify-end">
            <FaXTwitter className="text-2xl md:text-3xl hover:text-blue-400 transition duration-300 cursor-pointer transform hover:scale-110" />
            <FaDiscord className="text-2xl md:text-3xl hover:text-blue-400 transition duration-300 cursor-pointer transform hover:scale-110" />
            <FaInstagram className="text-2xl md:text-3xl hover:text-blue-400 transition duration-300 cursor-pointer transform hover:scale-110" />
          </div>
          <div className="mt-4 md:mt-2">
            <ul className="text-sm md:text-lg md:flex md:items-center md:justify-between">
              <Link to="/">
                <li className="px-1 py-2 sm:py-0 sm:px-2 cursor-pointer hover:text-blue-400 transition-all ease-in-out duration-300">
                  Home
                </li>
              </Link>
              <Link to="/nft-marketplace">
                <li className="px-1 py-2 sm:py-0 sm:px-2 cursor-pointer hover:text-blue-400 transition-all ease-in-out duration-300">
                  Explore NFTs
                </li>
              </Link>
              <Link to="/crowdfunding">
                <li className="px-1 py-2 sm:py-0 sm:px-2 cursor-pointer hover:text-blue-400 transition-all ease-in-out duration-300">
                  Crowdfunding
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
