import React from 'react';

const FormField = ({ labelName, placeholder, inputType, isTextArea, value, handleChange, isRequired }) => {
  return (
    <label className="w-full flex-1 flex flex-col">
      {labelName && (
        <span className="font-medium text-[14px] leading-[22px] text-white mb-[10px]">
          {labelName} <span className="text-red-700">{isRequired ? '*' : ''}</span>
        </span>
      )}
      {isTextArea ? (
        <textarea
          required={isRequired}
          value={value}
          onChange={handleChange}
          cols="30"
          rows={5}
          placeholder={placeholder}
          className="p-4 sm:px-6 outline-none border border-gray-300 rounded-lg bg-transparent text-white text-base placeholder:text-[#4b5264] sm:min-w-[300px] resize-none"
        />
      ) : (
        <input
          required={isRequired}
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="p-4 sm:px-6 outline-none border border-gray-300 rounded-lg bg-transparent text-white text-base placeholder:text-[#4b5264] sm:min-w-[300px]"
        />
      )}
    </label>
  );
};

export default FormField;
