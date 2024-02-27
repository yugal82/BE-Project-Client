import React, { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { useStateContext } from '../../context';
import ProfileComponent from './ProfileComponent';
import { getUserInfo } from '../../api/nft-marketplace-api';

const Profile = () => {
  const address = useAddress();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [success, setSuccess] = useState(false);

  const {
    getUserNfts,
    userCreatedNfts,
    isUserNFTsFetched,
    getUserListedNfts,
    userListedNfts,
    getUserCampaigns,
    isUserCampaignsFetched,
    userCampaigns,
  } = useStateContext();

  const fetchUserNfts = async () => {
    setIsLoading(true);
    await getUserNfts();
    await getUserListedNfts();
    setIsLoading(false);
  };

  const fetchUserCampaigns = async () => {
    setIsLoading(true);
    await getUserCampaigns();
    setIsLoading(false);
  };

  const getUserDetials = async (address) => {
    const res = await getUserInfo(address);
    setUserDetails(res?.data?.data);
  };

  useEffect(() => {
    if (address && !isUserNFTsFetched) fetchUserNfts();
    if (address && !isUserCampaignsFetched) fetchUserCampaigns();
    if (address) getUserDetials(address);
  }, [success, address, isUserNFTsFetched, isUserCampaignsFetched]);

  return (
    <ProfileComponent
      userCreatedNfts={userCreatedNfts}
      userListedNfts={userListedNfts}
      isLoading={isLoading}
      address={address}
      userCampaigns={userCampaigns}
      userDetails={userDetails}
      setSuccess={setSuccess}
    />
  );
};

export default Profile;
