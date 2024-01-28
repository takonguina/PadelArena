import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from "../theme/themed";
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ProfilScreen = () => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      onPress={() => router.push('/components/profil/myInformations')}>

      <View style={styles.settingsClass}>
        <Ionicons name="information" size={24} color="#aaa" />
        <Text style={styles.textNavigation}>My informations</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProfilScreen

const styles = StyleSheet.create({
  settingsClass: {
    display: "flex",
    flexDirection: "row",
    alignContent: 'center',
    marginHorizontal : 15,
    margin: 10,
    padding: 10,
    borderRadius: 5
  },
  textNavigation: {
    marginTop: 4,
    marginLeft: 10,
  }
})