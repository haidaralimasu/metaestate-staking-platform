import React from "react";
import Routes from "./Routes";
import { ChainId, DAppProvider } from "@usedapp/core";
import GlobalStyle from "./globalStyles";

const config = {
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    [ChainId.Mainnet]:
      "https://mainnet.infura.io/v3/d014af161a4b4ffbaa358366e232e2c8",
  },
  supportedChains: [ChainId.Mainnet],
};
const App = (props) => {
  return (
    <DAppProvider config={config}>
      <GlobalStyle />
      <Routes />
    </DAppProvider>
  );
};

export default App;
