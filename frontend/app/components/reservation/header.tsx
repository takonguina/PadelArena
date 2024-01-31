import { 
  Dimensions, 
  Image, 
  SafeAreaView, 
  StatusBar,
  StyleSheet,
  View } from 'react-native';

const header = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <StatusBar barStyle={"light-content"}/>
    <View style={styles.container}>
      <Image 
        source={require('/home/tommy/prog/padelarena/frontend/assets/reservationheader.png')}
        style={styles.image}
        resizeMode='cover'/>
    </View>
    </SafeAreaView>
  )
}

export default header
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container : {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: screenWidth,
    height : screenWidth * 0.4,
    borderBottomLeftRadius : 25,
    borderBottomRightRadius : 25
}
});