import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FaX } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { buyToken } from '../../../api/nft-marketplace-api';

const BuyPopup = ({ nft, setIsBuyPopupOpen, address, setIsLoading, setSuccess, handleError }) => {
  let [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
    setIsBuyPopupOpen(false);
  };

  const handleCompleteBuy = async (e) => {
    e.preventDefault();
    closeModal();
    setIsLoading(true);
    const boughtToken = await buyToken(nft?.tokenId, nft?.price?.toString(), address);
    setIsLoading(false);
    if (boughtToken?.code === 200) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/profile');
      }, 5000);
    } else {
      if (boughtToken?.code === 4001) {
        handleError('User denied transaction. Please try again');
      } else {
        handleError('Something went wrong. Please try again');
      }
    }
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
                  <Dialog.Title as="h3" className="text-white text-xl font-semibold">
                    Approve purchase
                  </Dialog.Title>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        <div className="">
                          <img src={nft?.media} alt="" className="w-20 h-20 bg-gray-500 rounded-lg outline-none" />
                        </div>
                        <div className="text-gray-400 text-sm ml-2">
                          <p className="text-white text-base font-semibold">{nft?.name}</p>
                          <p>DeKrypt Default Collection</p>
                          <p>Chain: Ethereum (Testnet)</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-white font-semibold">{nft?.price} ETH</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-400 mt-8"></div>
                  <span className="mt-2 block text-sm text-gray-300">
                    Review properly before completing the purchase
                  </span>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm text-white bg-[#1d4ed8] font-semibold"
                      onClick={handleCompleteBuy}
                    >
                      Complete buy
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

export default BuyPopup;
