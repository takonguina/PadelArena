import { Stack } from "expo-router";
import { AuthProvider } from "../context/authContext";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from "react-native";

const _layout = () => {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
    <ThemeProvider value={colorScheme === 'light' ?  DefaultTheme : DarkTheme}>
      <Stack>
          <Stack.Screen name="index" options={{headerShown: false}}/>
          <Stack.Screen name="(auth)" options={{headerShown: false}}/>
          <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
          <Stack.Screen name="(modal)" options={{presentation : "modal",headerShown: false}}/>
      </Stack>
    </ThemeProvider>
    </AuthProvider>

  )
}

export default _layout