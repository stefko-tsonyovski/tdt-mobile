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
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";

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
