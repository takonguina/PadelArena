import { Stack } from "expo-router";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from "react-native";
import { useAuth } from "../../context/authContext";

const _layout = () => {
  const colorScheme = useColorScheme();
  const auth = useAuth();
  const i18n = auth.i18n;

  return (
    <ThemeProvider value={colorScheme === 'light' ?  DefaultTheme : DarkTheme}>
    <Stack>
        <Stack.Screen name="appSettings" options={{ presentation: "modal", title: i18n.t("settings") }}/>
        <Stack.Screen name="newReservation" options={{ presentation: "modal", title: i18n.t("newReservation")}}/>
    </Stack>
    </ThemeProvider>
  )
}

export default _layout