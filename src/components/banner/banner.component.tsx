import React from "react";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { Spacer } from "../spacer/spacer.component";
import { BannerContainer } from "./banner.styles";

export const Banner = () => {
  return (
    <Spacer position="bottom" size="large">
      <Spacer position="top" size="large">
        <BannerContainer>
          <BannerAd
            unitId="ca-app-pub-5197865720618713/8994469797"
            size={BannerAdSize.BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </BannerContainer>
      </Spacer>
    </Spacer>
  );
};
