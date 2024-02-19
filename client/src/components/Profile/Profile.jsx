import React, { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { useStateContext } from '../../context';
import ProfileComponent from './ProfileComponent';

const Profile = () => {
  const address = useAddress();
  const [isLoading, setIsLoading] = useState(false);

  const { getUserNfts, userCreatedNfts, isUserNFTsFetched, getUserListedNfts, userListedNfts } = useStateContext();

  const fetchUserNfts = async () => {
    setIsLoading(true);
    await getUserNfts();
    await getUserListedNfts();
    setIsLoading(false);
  };

  useEffect(() => {
    if (address && !isUserNFTsFetched) fetchUserNfts();
  }, []);

  return (
    <ProfileComponent
      userCreatedNfts={userCreatedNfts}
      userListedNfts={userListedNfts}
      isLoading={isLoading}
      address={address}
    />
  );
};

export default Profile;
