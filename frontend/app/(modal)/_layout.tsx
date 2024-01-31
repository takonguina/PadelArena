import { Stack } from "expo-router";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from "react-native";

const _layout = () => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'light' ?  DefaultTheme : DarkTheme}>
    <Stack>
        <Stack.Screen name="appSettings" options={{ presentation: "modal", title: "Settings" }}/>
        <Stack.Screen name="newReservation" options={{ presentation: "modal", title: "New Reservation" }}/>
    </Stack>
    </ThemeProvider>
  )
}

export default _layout