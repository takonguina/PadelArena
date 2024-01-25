import { Button, View, Text } from 'react-native';
import { router } from 'expo-router';

const login = () => {
  return (
    <View>
      <Text>login</Text>
      <Button title='Go' onPress={() => router.replace("/home")}/>
    </View>
  )
}

export default login