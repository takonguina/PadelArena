import { View as DefaultView, StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from "../theme/themed";
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/authContext';

const ProfilScreen = () => {
  const router = useRouter();
  const auth = useAuth();
  const i18n = auth.i18n;

  return (
    <DefaultView style={styles.mainContainer}>
      <TouchableOpacity 
        onPress={() => router.push('/components/profil/myInformation')}>

        <View style={styles.settingsClass}>
          <Ionicons name="information" size={24} color="#aaa" />
          <Text style={styles.textNavigation}>{i18n.t("myInformation")}</Text>
        </View>
      </TouchableOpacity>
    

      <TouchableOpacity 
      onPress={() => router.push('/components/profil/changePassword')}>

      <View style={styles.settingsClass}>
        <Ionicons name="lock-closed-sharp" size={24} color="#aaa" />
        <Text style={styles.textNavigation}>{i18n.t("changePassword")}</Text>
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