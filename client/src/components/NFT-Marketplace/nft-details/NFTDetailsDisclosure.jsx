import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa6';
import { IoInformationCircle } from 'react-icons/io5';

const NFTDetailsDisclosure = ({ tokenId, NFTMarketplaceContractAddress }) => {
  return (
    <div className="w-full">
      <div className="w-full rounded-2xl bg-gray-800 p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring">
                <div className="flex items-center">
                  <IoInformationCircle className="w-5 h-5" />
                  <span className="font-semibold ml-2">Token Details</span>
                </div>
                <FaChevronDown className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-white`} />
              </Disclosure.Button>
              <Transition
                enter="transition duration-200 ease-linear"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-200 ease-linear"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-400">
                  <div>
                    <div className="flex items-center justify-between py-1">
                      <p className="text-medium font-semibold text-white">Token Id</p>
                      <p>{tokenId}</p>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <p className="text-medium font-semibold text-white">Blockchain</p>
                      <p>Ethereum</p>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <p className="text-medium font-semibold text-white">Token Standard</p>
                      <p>ERC721</p>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <p className="text-medium font-semibold text-white">Contract Address</p>
                      <p>
                        {NFTMarketplaceContractAddress.substr(0, 5)}...{NFTMarketplaceContractAddress.substr(-5)}
                      </p>
                    </div>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default NFTDetailsDisclosure;
