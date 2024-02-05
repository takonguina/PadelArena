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

const index = () => {

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

export default index