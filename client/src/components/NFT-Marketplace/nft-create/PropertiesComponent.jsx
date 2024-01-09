import React from 'react';

const PropertiesComponent = ({ property, index, handlePropertyChange }) => {
  return (
    <div className="flex gap-x-4 mt-3">
      <div className="flex">
        <div className="block text-xs font-medium text-white border border-gray-300 p-2.5 rounded-tl-md rounded-bl-md">
          Trait
        </div>
        <input
          onChange={(e) => handlePropertyChange(e, index)}
          value={property?.trait}
          className="block w-full sm:p-2 text-white bg-transparent rounded-lg rounded-l-none border border-gray-300 outline-none"
          type="text"
          name="trait"
        />
      </div>
      <div className="flex">
        <div className="block text-xs font-medium text-white border border-gray-300 p-2.5 rounded-tl-md rounded-bl-md">
          Value
        </div>
        <input
          onChange={(e) => handlePropertyChange(e, index)}
          value={property?.value}
          className="block w-full sm:p-2 text-white bg-transparent rounded-lg rounded-l-none border border-gray-300 outline-none"
          type="text"
          name="value"
        />
      </div>
    </div>
  );
};

export default PropertiesComponent;
