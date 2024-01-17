import React from 'react';
import NFTNavbar from '../nft-home/NFTNavbar';
import Footer from '../../common/Footer/Footer';
import { IoShareOutline } from 'react-icons/io5';
import NFTPropertiesDisclosure from './NFTPropertiesDisclosure';
import NFTDetailsDisclosure from './NFTDetailsDisclosure';

const NFTDetails = () => {
  return (
    <div>
      <NFTNavbar />
      <div className="w-full px-8 py-12 sm:py-16 text-white">
        <div className="w-full sm:px-10 md:px-16 md:flex">
          <div className="md:w-8/12 rounded-lg">
            <img
              className="rounded-lg border-2 border-gray-800"
              src="https://images.unsplash.com/photo-1640340434868-6877662a809f?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="w-full p-4">
            <div className="w-full flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">DeKrypt Default Collection</p>
                <span className="text-gray-500 text-sm block">Floor price(temporary)</span>
              </div>
              <button className="flex items-center justify-center p-2 bg-gray-800 rounded-lg cursor-pointer">
                <IoShareOutline className="w-6 h-6" />
                <span className="ml-1">Share</span>
              </button>
            </div>
            <div className="mt-4 border-b-2 border-gray-800">
              <h2 className="py-2 text-3xl font-bold">Bored Ape Yatch Club #2124</h2>
              <p className="text-medium text-gray-500">
                Owned by: <span className="text-[#1d4ed8] cursor-pointer">0xasfa.....45av</span>
              </p>
              <p className="py-2">
                Description - Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero mollitia rem ratione
                excepturi facere doloribus, optio soluta assumenda doloremque nihil officiis dolorum, blanditiis itaque
                placeat explicabo
              </p>
            </div>
            <div className="py-8 px-4 flex items-center justify-between border-b-2 border-gray-800">
              <div className="">
                <span className="text-medium text-gray-400">Price</span>
                <p className="text-3xl font-semibold">10 ETH</p>
              </div>
              <div className="">
                <button className="py-3 px-4 md:px-20 bg-[#1d4ed8] font-semibold text-lg rounded-lg">Buy Now</button>
              </div>
            </div>
            <div className="py-4">
              <NFTPropertiesDisclosure />
            </div>
            <div className="">
              <NFTDetailsDisclosure />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NFTDetails;
