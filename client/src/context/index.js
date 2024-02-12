import { React, useContext, createContext, useMemo } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite, useMetadata } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

// const address = useAddress();
// const connect = useMetamask();

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x27Edf40a51A6726cd7ee742453ce8947EEB7A76d');

  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);

      console.log('contract call success', data);
    } catch (error) {
      console.log('contract call fail', error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
