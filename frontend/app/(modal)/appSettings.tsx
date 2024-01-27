import { View } from '../theme/themed';
import React from 'react'
import { Button, Platform, StyleSheet } from 'react-native';
import SwitchMode from '../components/profil/switchMode';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../context/authContext';

const appSettings = () => {
    const auth = useAuth();


  return (
    <View style={style.container}>
      <SwitchMode />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Button title="Logout" onPress={()=> auth.signOut()}/>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    padding: 10,
  }
})

export default appSettings