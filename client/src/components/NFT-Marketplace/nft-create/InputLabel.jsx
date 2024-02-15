import React from 'react';

const InputLabel = ({ htmlFor, title, isRequired }) => {
  return (
    <label className="text-white" htmlFor={`${htmlFor}`}>
      {title} {title === 'Price' ? <small className="text-gray-400">(in ETH)</small> : <></>}
      {isRequired && <span className="text-red-700">*</span>}
    </label>
  );
};

export default InputLabel;
