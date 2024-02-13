import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const LoadingAnimation = () => {
  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#111827] p-6 text-left align-middle shadow-lg shadow-gray-700 transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
                    <div className="animate-spin mx-auto w-20 h-20 rounded-full border-b-2 border-[#eee]"></div>
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-center text-lg text-white">Please wait... We are creating your NFT!</p>
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

export default LoadingAnimation;
