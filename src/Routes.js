import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { useEthers } from "@usedapp/core";
import Profile from "./pages/Profile";

const Routes = () => {
  const { account } = useEthers();

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        {account ? <Route path="/profile" exact component={Profile} /> : null}
      </Switch>
      {/* <Route component={Home} /> */}

      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
