import { React, useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

// const address = useAddress();
// const connect = useMetamask();
