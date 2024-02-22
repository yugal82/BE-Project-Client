import React, { useState } from 'react';
import { FormField, CustomButton } from '../crowd-components';
import { ethers } from 'ethers';
import { Money } from '../crowd-assets';
import { useNavigate } from 'react-router-dom';
import { checkIfImage } from '../../../utils';
import { useStateContext } from '../../../context';
import { useAddress } from '@thirdweb-dev/react';
import LoadingAnimation from '../../common/LoadingAnimation';
import ConnectWalletPopup from '../../common/popup/ConnectWalletPopup';
import SuccessPopup from '../../common/popup/SuccessPopup';
import ErrorPopup from '../../common/popup/ErrorPopup';

const CreateCampaign = () => {
  const address = useAddress();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [txnError, setTxnError] = useState(false);
  const [txnErrorMsg, setTxnErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const { createCampaign } = useStateContext();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        const tx = await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        if (tx?.status === 'success') {
          setSuccess(true);
          setTimeout(() => {
            navigate('/crowdfunding/explore');
          }, 5000);
        } else {
          if (tx?.code === 4001) {
            setTxnError(true);
            setTxnErrorMsg('You denied transaction. Please approve the transaction in your wallet when you try again.');
          }
        }
      } else {
        setTxnError(true);
        setTxnErrorMsg('Please provide a valid image URL');
        setForm({ ...form, image: '' });
      }
    });
    resetForm();
  };

  const resetForm = () => {
    setForm({
      name: '',
      title: '',
      description: '',
      target: '',
      deadline: '',
      image: '',
    });
  };

  return (
    <div className=" flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 my-6 mx-2 md:mx-16  md:my-12 ">
      {!address && <ConnectWalletPopup />}
      {isLoading && <LoadingAnimation message={'Please wait while we are creating your crowdfunding campaign.'} />}
      {txnError && <ErrorPopup message={txnErrorMsg} setTxnError={setTxnError} />}
      {success && (
        <SuccessPopup message={'Your campaign was created successfully! Visit profile to view your campaign.'} />
      )}
      <div className="w-full text-white">
        <h2 className="text-3xl font-semibold">Start a Campaign</h2>
        <span>
          <span className="text-red-700">*</span> Required fields
        </span>
      </div>
      <form action="" onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
            isRequired={true}
          />
          <FormField
            labelName="Campaign Title"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
            isRequired={true}
          />
        </div>
        <FormField
          labelName="Story"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
          isRequired={true}
        />
        <div className="flex bg-[#1d4ed8] h-[120px] rounded-[10px] p-6 w-full justify-start items-center">
          <img src={Money} alt="Bannerimage" className=" w-[40px] h-[40px] object-contain" />
          <h4 className="font-bold text-xl sm:text-2xl text-white ml-[20px] ">
            You will get 100% of the raised amount.
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
            isRequired={true}
          />
          <FormField
            labelName="End Date"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
            isRequired={true}
          />
        </div>
        <FormField
          labelName="Campaign Image"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
          isRequired={false}
        />
        <div className="mt-8">
          <CustomButton btnType="submit" title="Submit new Campaign" />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
