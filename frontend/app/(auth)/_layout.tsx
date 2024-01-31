import { Stack } from "expo-router";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from "react-native";

const _layout = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'light' ?  DefaultTheme : DarkTheme}>
    <Stack>
        <Stack.Screen name="login" options={{ title: "Login" }}/>
        <Stack.Screen name="register" options={{ presentation: "modal", title: "Register" }}/>
    </Stack>
    </ThemeProvider>
  )
}

export default _layout