import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FaX } from 'react-icons/fa6';

const SellPopup = ({ nft, setIsSellPopupOpen }) => {
  let [isOpen, setIsOpen] = useState(true);
  const [price, setPrice] = useState(null);

  const closeModal = () => {
    setIsOpen(false);
    setIsSellPopupOpen(false);
  };

  const onPriceChange = (e) => {
    e.preventDefault();

    setPrice(e?.target?.value);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#eee] bg-transparent backdrop-filter backdrop-blur-lg" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-[80%] sm:w-full sm:max-w-md transform overflow-hidden rounded-2xl bg-[#111827] px-8 py-10 text-left align-middle shadow-lg shadow-gray-700 transition-all">
                  <div className="absolute right-4 top-3 text-white">
                    <FaX className="w-3 cursor-pointer" onClick={closeModal} />
                  </div>
                  <Dialog.Title as="h3" className="text-gray-400">
                    List the token:
                    <span className="block text-lg font-medium leading-6 text-white mt-2">
                      {nft?.name} #{nft?.tokenId} for sale
                    </span>
                  </Dialog.Title>
                  <div className="mt-4">
                    <div className="">
                      <label htmlFor="price" className="text-white">
                        Price
                      </label>
                      <div className="flex items-center justify-center mt-1">
                        <input
                          type="text"
                          placeholder="Enter the price"
                          className="w-full bg-transparent outline-none p-2 rounded-lg rounded-r-none border border-gray-500 text-white"
                          onChange={(e) => onPriceChange(e)}
                        />
                        <span className="text-white text-center border border-gray-500 p-2 rounded-lg rounded-l-none">
                          ETH
                        </span>
                      </div>
                    </div>
                    <div className="w-full mt-4 border-b border-gray-500"></div>
                    <div className="w-full mt-4">
                      <div className="flex items-center justify-between text-white border-b border-gray-500 py-2">
                        <p className="">Total price:</p>
                        <p className="">{price ? price : '--'} ETH</p>
                      </div>
                      <div className="border-b border-gray-500 py-2">
                        <div className="flex items-center justify-between text-white ">
                          <p className="">Platform fee:</p>
                          <p className="">0%</p>
                        </div>
                        <small className="text-gray-400">Yep, you read that right! 0% platform fees</small>
                      </div>
                      <div className="flex items-center justify-between text-white py-2">
                        <p className="">Potential Earnings:</p>
                        <p className="">{price ? price : '--'} ETH</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm text-white bg-[#1d4ed8] font-semibold"
                      onClick={() => {}}
                    >
                      List for sale
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SellPopup;
