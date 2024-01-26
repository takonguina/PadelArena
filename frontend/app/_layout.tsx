import { Stack } from "expo-router";
import { AuthProvider } from "../context/authContext";

const _layout = () => {
  return (
    <AuthProvider>
    <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="(auth)" options={{headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
    </Stack>
    </AuthProvider>
  )
}

export default _layout