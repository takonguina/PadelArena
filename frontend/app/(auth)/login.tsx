import { Button, Dimensions, ImageBackground, View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Text, TextInput, View as ViewThemed } from '../theme/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useState } from 'react';

const login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => { 
    setShowPassword(!showPassword); 
  }; 

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ImageBackground 
        source={require('../../assets/background.png')}
        resizeMode='cover'
        style={styles.image}>
    <View style={styles.maincontainer}>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder = 'Email'
          style={styles.input}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
          placeholder = 'Password'
          style={styles.input}/>

          <MaterialCommunityIcons 
                name={showPassword ? 'eye' : 'eye-off'} 
                size={24} 
                color="#aaa"
                style={styles.icon} 
                onPress={toggleShowPassword} 
              />
        </View>

      <Button title='Go' onPress={() => router.replace("/home")}/>
    </View>
    <ViewThemed style={styles.separator} lightColor="#e0e0e0" darkColor="rgba(255,255,255,0.1)" />
    <TouchableOpacity 
        onPress={() => router.push('/register')}
        style={styles.registerButton}>
        <Text>Create new account</Text>
    </TouchableOpacity>

    </ImageBackground>
    </SafeAreaView>
  )
}


export default login

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    marginTop: 0,
    marginHorizontal: 50,
    top: screenHeight * 0.55
  },
  container: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  inputContainer: {
    marginBottom: 15
  },
  input: {
    flex: 1,
    padding : 20,
    borderRadius: 10,
    marginBottom : 5
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    bottom: screenHeight * 0.10
  },
  icon: {
    position: 'absolute',
    marginLeft: 10,
    marginBottom: 0,
    right: 20,
    bottom: 13
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    alignSelf: 'center'
  },
  registerButton: {
    alignSelf: 'center',
 }
})