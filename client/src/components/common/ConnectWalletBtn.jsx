import React, { useEffect } from 'react';
import { ConnectWallet, darkTheme, useAddress, useConnectionStatus } from '@thirdweb-dev/react';
import { signup } from '../../api/nft-marketplace-api';

const customDarkTheme = darkTheme({
  fontFamily: 'Inter, sans-serif',
  colors: {
    modalBg: '#111827',
    accentText: 'white',
    primaryButtonBg: '#1d4ed8',
    primaryButtonText: 'white',
    connectedButtonBg: '#111827',
  },
});

const ConnectWalletBtn = () => {
  const address = useAddress();
  const connectionStatus = useConnectionStatus();

  const registerUser = async (address) => {
    try {
      localStorage.setItem('walletDetails', address);
      await signup(address);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const walletDetails = localStorage.getItem('walletDetails');
    if (walletDetails !== address) {
      if (
        address &&
        address !== walletDetails &&
        (connectionStatus !== 'disconnected' || connectionStatus !== 'connecting')
      ) {
        registerUser(address);
      }
    }
  }, [connectionStatus, address]);

  return (
    <ConnectWallet
      theme={customDarkTheme}
      dropdownPosition={{
        side: 'bottom',
        align: 'end',
      }}
      hideTestnetFaucet={false}
    />
  );
};

export default ConnectWalletBtn;
