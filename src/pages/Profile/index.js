import React, { useState } from "react";
import Created from "../../components/Dashboard/Created";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import YourWallet from "../../YourWallet";
import BuyItem from "../../components/BuyItem";
import { useEthers } from "@usedapp/core";
import { ServicesContainer } from "../../components/BuyItem/BuyItemElements";
function TabPanel(props) {
  const { children, value, index } = props;
  return <>{value === index && <>{children}</>}</>;
}

const Profile = (props) => {
  const [value, setValue] = useState(0);
  const { account } = useEthers();
  const handleTabs = (e, val) => {
    setValue(val);
  };
  return (
    <>
      {account ? (
        <>
          <YourWallet />
        </>
      ) : (
        <></>
      )}

      <ServicesContainer>
        <Tabs value={value} onChange={handleTabs}>
          <Tab style={{ borderColor: "black" }} label="Stake" />
          <Tab label="UnStake" />
        </Tabs>
      </ServicesContainer>
      <TabPanel value={value} index={0}>
        <BuyItem />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Created />
      </TabPanel>
    </>
  );
};

export default Profile;
