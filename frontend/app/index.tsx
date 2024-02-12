import axios from 'axios';
import { 
  ActivityIndicator, 
  Appearance, 
  Dimensions, 
  View, 
  StyleSheet,
  ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/authContext';
import { router } from 'expo-router';

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const index = () => {
  const auth = useAuth();
  const apiURL = 'http://192.168.1.63:3000/users/user/';

  const getData = async () => {
    try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken === null) {
            return undefined;
        } else {
            return storedToken;
        }
        
    } catch (e){
        // saving error
    }
  };
  
  const handleUser = async (token: string) => {
    try {
        const fixed_token = token.replace(/['"]/g, '');
        const response = await axios.post(`${apiURL}?token=${fixed_token}`,{}, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
          auth.setUserData(response.data[0]);
          router.replace("/home");
        }
    } catch (e) {
        // router.replace('/login');
        // Alert.alert("Connection Failure ⛔️", "Sorry, our service is not available or you do not have an internet connection.")
    }
  };
  
  const getColorMode = async () => {
    try {
      const value = await AsyncStorage.getItem('colorMode');
      if (value !== null) {
        return value === 'dark';
      }
      return null;
    } catch (e) {
      // error reading value
      return null;
    }
  };

  useEffect(() => {
    const setInitialColorMode = async () => {
      const storedColor = await getColorMode();
      if (storedColor !== null) {
        Appearance.setColorScheme(storedColor ? 'dark' : 'light');
      }
    };

    const waitandRedirect = async () => {
      try {
        const result = await getData();
        await sleep(2000)
        if (result !== undefined) {
          handleUser(result);
        } else {
          router.replace("/login");
        }
      } catch (error) {
        console.log(error)
      }
    };
     
    waitandRedirect();
    setInitialColorMode();
    
  }, []);
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground 
        source={require('../assets/background.png')}
        resizeMode='cover'
        style={styles.image}>

      <View style={styles.activity}>
        <ActivityIndicator size="large"/>
      </View>
      
      </ImageBackground>
    </SafeAreaView>
  )
}

const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  logo:{
    width: 100
  },
  activity: {
    top: screenHeight * 0.10
  }
})

export default index;