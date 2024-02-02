import { Link, Tabs } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Pressable, useColorScheme } from "react-native";
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
      
        <Tabs.Screen 
          name="home" 
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <TabBarIconMaterialIcons name="home" color={color}/>}}/>
        <Tabs.Screen 
          name="reservation"
          options={{
            title: "Reservation",
            headerShown: false,
            
            tabBarIcon: ({ color }) => <TabBarIconMaterialIcons name="sports-tennis" color={color}/>}}/>
        <Tabs.Screen 
          name="profil"
          options={{
            title: "Profil",
            tabBarIcon: ({ color }) => <TabBarIconFontAwesome name="user" color={color}/>,
            headerRight: () => (
              <Link href="/appSettings" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="gear"
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            )}}/>
        <Tabs.Screen 
          name="contact" 
          options={{
            title: "Contact",
            tabBarIcon: ({ color }) => <TabBarIconMaterialIcons name="contact-phone" color={color}/>}}/>
    </Tabs>
  )
}

export default _layout