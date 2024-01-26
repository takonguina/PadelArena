import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name="login"/>
        <Stack.Screen name="register" options={{ presentation: "modal", title: "Register" }}/>
    </Stack>
  )
}

export default _layout