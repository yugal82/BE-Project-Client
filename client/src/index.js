import React from 'react';
import { Sepolia } from '@thirdweb-dev/chains';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { BrowserRouter } from 'react-router-dom';

import { StateContextProvider } from './context';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={Sepolia} clientId={process.env.REACT_APP_THIRDWEB_API_KEY}>
      <BrowserRouter>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);
