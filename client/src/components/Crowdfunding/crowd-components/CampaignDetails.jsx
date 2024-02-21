import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../../../context';
import { CountBox, CustomButton } from '../crowd-components';
import { daysLeft, calculateBarPercentage } from '../../../utils';
import { thirdweb } from '../crowd-assets';
import CrowdNavbar from '../crowd-home/CrowdNavbar';
import Footer from '../../common/Footer/Footer';

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state.pId, amount);
    navigate('/crowdfunding/explore');
    setIsLoading(false);
  };

  return (
    <>
      <CrowdNavbar />
      <div className="p-2">
        {isLoading && (
          <div className="w-full flex items-center justify-center">
            <div className="animate-spin flex items-center justify-center w-10 h-10 border-b-2 border-white rounded-full"></div>
          </div>
        )}
        <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
          <div className="flex justify-center p-4 items-center flex-col">
            <img
              src={state.image}
              alt=""
              className="scale-75 md:scale-50 border-2 border-solid border-black object-cover rounded-xl "
            />
            <div className="relative w-full rounded-md h-[5px] bg-[#3a3a43] mt-2">
              <div
                className="absolute rounded-md h-full bg-[#34b8f0]"
                style={{
                  width: `${calculateBarPercentage(state.target, state.amountCollected)}%`,
                  maxWidth: '100',
                }}
              ></div>
            </div>
          </div>
          <div className="flex md:w-[150px] px-6 w-full flex-wrap justify-around md:justify-center md:items-center gap-[30px] md:gap-[0px]">
            <CountBox title="Days left" value={remainingDays} />
            <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
            <CountBox title="Total Backers" value={donators.length} />
          </div>
        </div>
        <div className="mt-[60px] flex lg:flex-row px-4 flex-col gap-5 pb-12">
          <div className="flex-[2] flex flex-col gap-[40px]  ">
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase ">Creator</h4>
              <div className=" mt-[20px] flex-grow flex items-center gap-[14px] flex-wrap ">
                <div
                  className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer
          "
                >
                  <img src={thirdweb} alt="User" className="w-[60%] h-[60%] object-contain " />
                </div>
                <div>
                  <h4 className=" font-semibold text-[14px] text-white break-all ">{state.owner}</h4>
                  <p className="mt-[4px]  font-normal text-[12px] text-[#808191] ">Support For a Cause</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className=" font-semibold text-[18px] text-white  uppercase ">Donators</h4>
              <div className="mt-[20px] flex flex-col gap-4  ">
                {donators.length > 0 ? (
                  donators.map((item, index) => (
                    <div
                      key={`${item.donator}-${index}`}
                      className="flex justify-between md:justify-start md:gap-8 items-center gap-4"
                    >
                      <p className="  font-normal text-[14px] text-[#b2b3bd] leading-[26px] break-all ">
                        {index + 1}. {item.donator}
                      </p>
                      <p className="  font-normal text-[16px] text-[#808191] leading-[26px] break-all ">
                        {item.donation}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className=" font-normal text-[16px] leading-[26px] text-justify text-[#808191] ">
                    No donators yet, be the first one!
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h4 className=" font-semibold text-[18px] text-white  uppercase ">Fund</h4>
            <div className="mt-[20px] flex flex-col py-6 px-4 bg-[#1c1c24] border-2 border-gray-600 rounded-[10px]">
              <p className=" font-medium text-[20px] leading-[30px] text-center text-[#aaadca]  ">Fund the Campaign</p>
              <div className="mt-[30px]">
                <input
                  type="number"
                  placeholder="ETH 0.1"
                  step="0.01"
                  className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading[30px] placeholder:text-[#4b5264] rounded-[10px] "
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px] ">
                  <h4 className=" font-semibold text-[15px] leading-[22px] text-white">Back it because you believe</h4>
                  <p className=" font-normal mt-[20px[ leading-[22px] text-[#808191]">Support the project</p>
                </div>
                <CustomButton
                  btnType="button"
                  title="Fund Campaign"
                  styles="w-full bg-[#8c6dfd]"
                  handleClick={handleDonate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CampaignDetails;
