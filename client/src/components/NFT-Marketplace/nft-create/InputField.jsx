import React from 'react';

const InputField = ({ reference, type, name, placeholder }) => {
  return (
    <input
      ref={reference}
      className="w-full p-2 mt-2 bg-transparent outline-none text-white border border-gray-300 rounded-lg"
      type={type}
      name={name}
      placeholder={placeholder}
    />
  );
};

export default InputField;
