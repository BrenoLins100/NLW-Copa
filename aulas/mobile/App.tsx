//import native base
import { NativeBaseProvider, StatusBar } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

//importando loading e sigin
import { SignIn } from "./src/screens/SignIn";
import { Loading } from "./src/components/Loading";

//importando tema custom
import { THEME } from "./src/styles/theme";
//import contexto de auth
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { Pools } from "./src/screens/Pools";
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
