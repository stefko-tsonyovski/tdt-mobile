import { StatusBar } from "expo-status-bar";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { initializeApp } from "firebase/app";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";
import {
  AuthenticationContext,
  AuthenticationContextProvider,
} from "./src/services/authentication/authentication.context";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import React, { useState, useEffect, useRef, useContext } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { Subscription } from "expo-modules-core";
import { Banner } from "./src/components/banner/banner.component";

const firebaseConfig = {
  apiKey: "AIzaSyDGLt0aZcnRCCbaJhbPbB8GBfICzfl9Lq4",
  authDomain: "tennisdreamteam-e535e.firebaseapp.com",
  projectId: "tennisdreamteam-e535e",
  storageBucket: "tennisdreamteam-e535e.appspot.com",
  messagingSenderId: "725913731439",
  appId: "1:725913731439:web:bf999a736249ffdae0689a",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const queryClient = new QueryClient();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "cae3193c-efb0-4b3e-94ed-7a0db52e90bf",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <PaperProvider>
            <Navigation />
          </PaperProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
      <StatusBar style="auto" />
      <Toast />
    </QueryClientProvider>
  );
}
