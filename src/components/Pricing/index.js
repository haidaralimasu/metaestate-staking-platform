import React from 'react';
import { Button } from '../../globalStyles';

import { GiCrystalBars } from 'react-icons/gi';
import { GiCutDiamond, GiRock } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';
import {
  PricingSection,
  PricingWrapper,
  PricingHeading,
  PricingContainer,
  PricingCard,
  PricingCardInfo,
  PricingCardIcon,
  PricingCardPlan,
  PricingCardCost,
  PricingCardLength,
  PricingCardFeatures,
  PricingCardFeature
} from './PricingElements';

function Pricing() {
  return (
    <IconContext.Provider value={{ color: 'white', size: 64 }}>
      <PricingSection>
        <PricingWrapper>
          <PricingHeading>Our Services</PricingHeading>
          <PricingContainer>
            <PricingCard to='/create-items'>
              <PricingCardInfo>
                <PricingCardIcon>
                  <GiRock />
                </PricingCardIcon>
                <PricingCardPlan>List Items</PricingCardPlan>
                <PricingCardCost>$5</PricingCardCost>
                <PricingCardLength>worth of eth/matic *</PricingCardLength>
                <PricingCardFeatures>
                  <PricingCardFeature>Excluding gas fees</PricingCardFeature>
                  <PricingCardFeature>List your Item quickly</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>List Items</Button>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/buy-items'>
              <PricingCardInfo>
                <PricingCardIcon>
                  <GiCrystalBars />
                </PricingCardIcon>
                <PricingCardPlan>Buy Items</PricingCardPlan>
                <PricingCardCost>$0</PricingCardCost>
                <PricingCardLength>worth of eth/matic *</PricingCardLength>
                <PricingCardFeatures>
                  <PricingCardFeature>No fees for buying</PricingCardFeature>
                  <PricingCardFeature>Gas fees will be there</PricingCardFeature>
                  
                </PricingCardFeatures>
                <Button primary>Buy Items</Button>
              </PricingCardInfo>
            </PricingCard>
            <PricingCard to='/create-items'>
              <PricingCardInfo>
                <PricingCardIcon>
                  <GiCutDiamond />
                </PricingCardIcon>
                <PricingCardPlan>Earn Crypto</PricingCardPlan>
                <PricingCardCost>$10</PricingCardCost>
                <PricingCardLength>per item *</PricingCardLength>
                <PricingCardFeatures>
                  <PricingCardFeature>Items are set to minimum $10</PricingCardFeature>
                  <PricingCardFeature>Unlimited Maximun price</PricingCardFeature>
                </PricingCardFeatures>
                <Button primary>Sell Items</Button>
              </PricingCardInfo>
            </PricingCard>
          </PricingContainer>
        </PricingWrapper>
      </PricingSection>
    </IconContext.Provider>
  );
}
export default Pricing;