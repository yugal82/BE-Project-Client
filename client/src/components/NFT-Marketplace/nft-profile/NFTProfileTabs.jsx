import { Tab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const NFTProfileTabs = ({ categories, getSelectedTabIndex }) => {
  return (
    <div className="w-full max-w-md px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 border-b border-white bg-[#111827] p-1">
          {categories.map((category, index) => (
            <Tab
              onClick={() => getSelectedTabIndex(index)}
              key={index}
              className={({ selected }) =>
                classNames(
                  'w-1/2 rounded-lg py-2.5 text-sm font-semibold leading-5',
                  selected ? 'bg-white text-[#111827] shadow' : 'text-white hover:bg-white/[0.12]'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2"></Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default NFTProfileTabs;
