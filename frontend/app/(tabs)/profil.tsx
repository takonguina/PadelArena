import { View as DefaultView, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from "../theme/themed";
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ProfilScreen = () => {
  const router = useRouter();

  return (
    <DefaultView style={styles.mainContainer}>
      <TouchableOpacity 
        onPress={() => router.push('/components/profil/myInformations')}>

        <View style={styles.settingsClass}>
          <Ionicons name="information" size={24} color="#aaa" />
          <Text style={styles.textNavigation}>My informations</Text>
        </View>
      </TouchableOpacity>
    

      <TouchableOpacity 
      onPress={() => router.push('/components/profil/changePassword')}>

      <View style={styles.settingsClass}>
        <Ionicons name="lock-closed-sharp" size={24} color="#aaa" />
        <Text style={styles.textNavigation}>Change Password</Text>
      </View>
      </TouchableOpacity>
  </DefaultView>
  )
}

export default ProfilScreen

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
  },
  settingsClass: {
    display: "flex",
    flexDirection: "row",
    alignContent: 'center',
    marginHorizontal : 20,
    margin: 15,
    marginTop: 20,
    marginBottom: 0,
    padding: 15,
    borderRadius: 5,
  },
  textNavigation: {
    marginTop: 4,
    marginLeft: 10,
  }
})