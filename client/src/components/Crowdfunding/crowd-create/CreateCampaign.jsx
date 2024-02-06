import React, { useState } from 'react';

import { FormField, CustomButton } from '../crowd-components';

import { ethers } from 'ethers';

import { Money, Campaign } from '../crowd-assets';

import { useNavigate } from 'react-router-dom';
import { checkIfImage } from '../../../utils';

const CreateCampaign = () => {
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = () => {};

  return (
    <div className="bg-[#1f1f34] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 my-6 mx-2 md:mx-16  md:my-12 ">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#1d1d28]  outline-[1px] outline outline-gray-400 rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>
      <form action="" onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName="Campaign Title*"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>
        <FormField
          labelName="Story*"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />
        <div className="flex bg-[#3c80da] h-[120px] rounded-[10px] p-6 w-full justify-start items-center">
          <img src={Money} alt="Bannerimage" className=" w-[40px] h-[40px] object-contain" />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px] ">
            You will get 100% of the raised amount.
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>
        <FormField
          labelName="Campaign Image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />
        <div className="flex justify-center items-center mt-[30px]">
          <CustomButton btnType="submit" title="Submit new Campaign" styles=" bg-[#3c80da] " />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
