import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Button } from "../../globalStyles";
import logo from "../../images/logo.jpeg";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavItemBtn,
  NavLinks,
  NavBtnLink,
} from "./NavbarElements";
import { useEthers } from "@usedapp/core";
import { notifyError } from "../../helpers";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { account, activateBrowserWallet, deactivate } = useEthers();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onError = () => {
    notifyError("Please connect to ethereum mainnet !!");
  };

  const logIn = () => {
    activateBrowserWallet(onError);
  };

  const logOut = () => {
    deactivate();
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavbarContainer>
            <NavLogo to="/" onClick={closeMobileMenu}>
              {/* <img alt="logo" width={80} src={logo} /> */}
              MEST
            </NavLogo>
            <MobileIcon style={{ color: "black" }} onClick={handleClick}>
              {click ? (
                <FaTimes style={{ color: "black" }} />
              ) : (
                <FaBars style={{ color: "black" }} />
              )}
            </MobileIcon>
            <NavMenu onClick={handleClick} click={click}>
              <NavItem>
                <NavLinks to="/" onClick={closeMobileMenu}>
                  Home
                </NavLinks>
              </NavItem>

              {account ? (
                <NavItem>
                  <NavLinks to="/profile" onClick={closeMobileMenu}>
                    Profile
                  </NavLinks>
                </NavItem>
              ) : null}

              {account ? (
                <NavItemBtn>
                  {button ? (
                    <NavBtnLink>
                      <Button onClick={logOut} primary>
                        Disconnect
                      </Button>
                    </NavBtnLink>
                  ) : (
                    <NavBtnLink>
                      <Button onClick={logOut} fontBig primary>
                        Disconnect
                      </Button>
                    </NavBtnLink>
                  )}
                </NavItemBtn>
              ) : (
                <NavItemBtn>
                  {button ? (
                    <NavBtnLink>
                      <Button onClick={() => logIn()} primary>
                        Connect
                      </Button>
                    </NavBtnLink>
                  ) : (
                    <NavBtnLink>
                      <Button onClick={() => logIn()} fontBig primary>
                        Connect
                      </Button>
                    </NavBtnLink>
                  )}
                </NavItemBtn>
              )}
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
