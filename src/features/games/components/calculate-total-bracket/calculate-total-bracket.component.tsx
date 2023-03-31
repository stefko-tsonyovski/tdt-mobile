import React, { useContext, useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { useCalculateTotal } from "../../../../services/picks/picks.service";
import Spinner from "react-native-loading-spinner-overlay";

import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";

const interstitial = InterstitialAd.createForAdRequest(
  "ca-app-pub-5197865720618713/8328502805",
  {
    requestNonPersonalizedAdsOnly: true,
  }
);

export const CalculateTotalBracket = () => {
  const { user } = useContext(AuthenticationContext);

  const [interstitialLoaded, setInterstitialLoaded] = useState(false);

  const { mutate: calculateTotal, isLoading } = useCalculateTotal();
  const calculateTotalHandler = () => {
    calculateTotal(user.email);

    if (interstitialLoaded) {
      interstitial.show();
    }
  };

  const loadInterstitial = () => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialLoaded(true);
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setInterstitialLoaded(false);
      }
    );

    interstitial.load();

    return () => {
      unsubscribeClosed();
      unsubscribeLoaded();
    };
  };

  useEffect(() => {
    const unsubscribeInterstitialEvents = loadInterstitial();

    return unsubscribeInterstitialEvents;
  }, []);

  if (isLoading) {
    return (
      <Spinner
        visible={true}
        textContent={"This may take a while..."}
        textStyle={{ color: colors.text.inverse }}
      />
    );
  }

  return (
    <Button
      onPress={calculateTotalHandler}
      mode="contained"
      color={colors.bg.secondary}
    >
      Update total bracket points
    </Button>
  );
};
