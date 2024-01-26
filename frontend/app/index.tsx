import { ActivityIndicator, Dimensions, View, Button, SafeAreaView ,StyleSheet, ImageBackground } from 'react-native';
import { router } from 'expo-router';

const index = () => {

  

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