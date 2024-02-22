import React, { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { useStateContext } from '../../context';
import ProfileComponent from './ProfileComponent';

const Profile = () => {
  const address = useAddress();
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (address && !isUserNFTsFetched) fetchUserNfts();
    if (address && !isUserCampaignsFetched) fetchUserCampaigns();
  }, []);

  return (
    <ProfileComponent
      userCreatedNfts={userCreatedNfts}
      userListedNfts={userListedNfts}
      isLoading={isLoading}
      address={address}
      userCampaigns={userCampaigns}
    />
  );
};

export default Profile;
