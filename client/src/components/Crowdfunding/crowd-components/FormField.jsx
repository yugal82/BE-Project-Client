import React from 'react';

const FormField = ({ labelName, placeholder, inputType, isTextArea, value, handleChange }) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && <span className="font-medium text-[14px] leading-[22px] text-white mb-[10px]">{labelName}</span>}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          cols="30"
          rows={5}
          placeholder={placeholder}
          className="p-[15px] sm:px-[25px] outline-none border border-gray-300 rounded-lg bg-transparent text-white text-[14px] placeholder:text-[#4b5264] sm:min-w-[300px] resize-none"
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="p-[15px] sm:px-[25px] outline-none border border-gray-300 rounded-lg bg-transparent text-white text-[14px] placeholder:text-[#4b5264] sm:min-w-[300px]"
        />
      )}
    </label>
  );
};

export default FormField;
