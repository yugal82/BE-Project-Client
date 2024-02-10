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
    <div className=" flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 my-6 mx-2 md:mx-16  md:my-12 ">
      <div className="w-full text-white">
        <h2 className="text-3xl font-semibold">Start a Campaign</h2>
        <span>
          <span className="text-red-700">*</span> Required fields
        </span>
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
        <div className="flex bg-[#1d4ed8] h-[120px] rounded-[10px] p-6 w-full justify-start items-center">
          <img src={Money} alt="Bannerimage" className=" w-[40px] h-[40px] object-contain" />
          <h4 className="font-bold text-xl sm:text-2xl text-white ml-[20px] ">
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
          labelName="Campaign Image"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />
        <div className="flex justify-center items-center mt-[30px]">
          <CustomButton btnType="submit" title="Submit new Campaign" />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
