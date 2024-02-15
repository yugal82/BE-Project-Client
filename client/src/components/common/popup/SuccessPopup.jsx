import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FaX } from 'react-icons/fa6';

const SuccessPopup = ({ message }) => {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

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
                  <div className="absolute right-3 top-2 text-white">
                    <FaX className="w-3 cursor-pointer" onClick={closeModal} />
                  </div>
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
                    {message}
                  </Dialog.Title>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SuccessPopup;
