import React from 'react';

const CustomButton = ({ btnType, title, handleClick }) => {
  return (
    <button
      type={btnType}
      className="text-white bg-[#1d4ed8] py-2 px-6 rounded-lg font-semibold hover:scale-110 transition-all ease-in-out duration-200"
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
