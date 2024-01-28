import { Text, TextInput } from '../../theme/themed';
import React from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import CustomKeyboardAvoidingView from '../keyboardAvoidingView';
import { useAuth } from '../../../context/authContext';

const myInformations = () => {
  const auth = useAuth();

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <CustomKeyboardAvoidingView>
    <ScrollView style={styles.container}>

      <View>
      <Stack.Screen options={{headerTitle: "My informations", headerBackTitle: "Profil"}} />
      
        <View style={styles.inputContainer}>
          <Text style={styles.text}>First Name</Text>
          <TextInput 
            style={styles.input}
            value={auth.userData.first_name}
            />
        </View>

      </View>

    </ScrollView>
    </CustomKeyboardAvoidingView>
    </ SafeAreaView>
  )
}

export default myInformations

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 35,
  },
  inputContainer: {
    marginBottom: 15
  },
  input: {
    flex: 1,
    padding : 15,
    borderRadius: 10,
    marginBottom : 5
  },
  text: {
    marginHorizontal: 5,
    marginBottom: 5
  },
})