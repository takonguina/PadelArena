import { ActivityIndicator, Dimensions, View, Button, SafeAreaView ,StyleSheet, ImageBackground } from 'react-native';
import { router } from 'expo-router';

const index = () => {

  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground 
        source={require('../assets/background.png')}
        resizeMode='cover'
        style={styles.image}>

      <View style={styles.buttonContainer}>
        <Button title='Go' onPress={() => router.replace("/login")}/>
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
  buttonContainer: {
    top: screenHeight * 0.15
  }
})

export default index