import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { BrowserRouter } from "react-router-dom";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "ethereum";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.REACT_APP_THIRDWEB_CLIENT_ID}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThirdwebProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
