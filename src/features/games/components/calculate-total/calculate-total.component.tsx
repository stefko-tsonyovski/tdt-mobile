import React, { useContext, useEffect, useState } from "react";
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";
import { Button } from "react-native-paper";
import { colors } from "../../../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../../../services/authentication/authentication.context";
import { useCalculateTotal } from "../../../../services/players/players.service";

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
});

export const CalculateTotal = () => {
  const { user } = useContext(AuthenticationContext);

  const { mutate: calculateTotal, isLoading } = useCalculateTotal();

  const [interstitialLoaded, setInterstitialLoaded] = useState(false);

  const calculateTotalHandler = () => {
    calculateTotal(user.email);
    interstitial.show();
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

  return (
    interstitialLoaded && (
      <Button
        onPress={calculateTotalHandler}
        mode="contained"
        color={colors.bg.secondary}
      >
        Update total
      </Button>
    )
  );
};
