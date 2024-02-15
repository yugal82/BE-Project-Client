import React, { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { useStateContext } from '../../context';
import ProfileComponent from './ProfileComponent';

const Profile = () => {
  const address = useAddress();
  const [isLoading, setIsLoading] = useState(false);

  const { getUserNfts, userCreatedNfts, isUserNFTsFetched } = useStateContext();

  const fetchUserNfts = async () => {
    setIsLoading(true);
    await getUserNfts();
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isUserNFTsFetched) fetchUserNfts();
  }, []);

  return <ProfileComponent userCreatedNfts={userCreatedNfts} isLoading={isLoading} address={address} />;
};

export default Profile;
