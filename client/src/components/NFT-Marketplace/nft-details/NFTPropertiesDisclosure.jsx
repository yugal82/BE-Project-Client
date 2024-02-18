import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa6';
import { FaList } from 'react-icons/fa';

const NFTPropertiesDisclosure = ({ metadata }) => {
  return (
    <div className="w-full">
      <div className="w-full rounded-2xl bg-gray-800 p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring">
                <div className="flex items-center">
                  <FaList />
                  <span className="font-semibold ml-2">Properties</span>
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
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-white">
                  {metadata?.length === 0 ? (
                    <span>No attribute to show</span>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {metadata?.map((attribute) => (
                        <div key={attribute?.trait} className="border-2 border-gray-600 rounded-lg p-2">
                          <p className="">{attribute?.trait}</p>
                          <p className="text-lg leading-tight">{attribute?.value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default NFTPropertiesDisclosure;
