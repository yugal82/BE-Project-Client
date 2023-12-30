import React from 'react'
import { ConnectWallet, darkTheme } from "@thirdweb-dev/react";

const customDarkTheme = darkTheme({
    fontFamily: "Inter, sans-serif",
    colors: {
        modalBg: "#111827",
        accentText: "white",
        primaryButtonBg: "#1d4ed8",
        primaryButtonText: "white",
    },
});

const ConnectWalletBtn = () => {
    return (
        <ConnectWallet
            theme={customDarkTheme}
            dropdownPosition={{
                side: "bottom",
                align: "end",
            }}
            hideTestnetFaucet={false}
        />
    )
}

export default ConnectWalletBtn;
