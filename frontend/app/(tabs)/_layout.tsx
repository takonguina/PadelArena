import { Tabs } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useColorScheme } from "react-native";
import Colors from '../theme/color';

// Explore icon families and icons at https://icons.expo.fyi/

function TabBarIconMaterialIcons(props: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  return <MaterialIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconFontAwesome(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const _layout = () => {
  const colorScheme = useColorScheme();

  return (

    <Tabs
    screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,}}>
        <Tabs.Screen name="home" options={{tabBarIcon: ({ color }) => <TabBarIconMaterialIcons name="home" color={color}/>}}/>
        <Tabs.Screen name="reservation" options={{tabBarIcon: ({ color }) => <TabBarIconMaterialIcons name="sports-tennis" color={color}/>}}/>
        <Tabs.Screen name="profil" options={{tabBarIcon: ({ color }) => <TabBarIconFontAwesome name="user" color={color}/>}}/>
        <Tabs.Screen name="contact" options={{tabBarIcon: ({ color }) => <TabBarIconMaterialIcons name="contact-phone" color={color}/>}}/>
    </Tabs>
  )
}

export default _layout