import React, { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { useStateContext } from '../../context';
import ProfileComponent from './ProfileComponent';

const Profile = () => {
  const address = useAddress();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isUserDataFetchLoading, setIsUserDataFetchLoading] = useState(false);

  const {
    getUserNfts,
    userCreatedNfts,
    isUserNFTsFetched,
    getUserListedNfts,
    userListedNfts,
    getUserCampaigns,
    isUserCampaignsFetched,
    userCampaigns,
    getUserDetails,
    userDetails,
    isUserDetailsFetched,
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

  const fetchUserData = async (address) => {
    setIsUserDataFetchLoading(true);
    await getUserDetails(address);
    setIsUserDataFetchLoading(false);
  };

  useEffect(() => {
    if (address && !isUserNFTsFetched) fetchUserNfts();
    if (address && !isUserCampaignsFetched) fetchUserCampaigns();
    if (address && !isUserDetailsFetched) fetchUserData(address);
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
      isUserDataFetchLoading={isUserDataFetchLoading}
    />
  );
};

export default Profile;
