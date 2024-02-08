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
        <Stack.Screen name="login" options={{ title: i18n.t("login")}}/>
        <Stack.Screen name="register" options={{ presentation: "modal", title: i18n.t("register") }}/>
    </Stack>
    </ThemeProvider>
  )
}

export default _layout