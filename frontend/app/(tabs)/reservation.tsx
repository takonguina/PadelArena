import { 
  View, 
  StyleSheet,
  Platform,
  TouchableOpacity,
  StatusBar} from 'react-native';
import { 
  Text as TextThemed, 
  View as ViewThemed } from '../theme/themed';
import CurrentReservation from '../components/reservation/currentReservation';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Header from '../components/reservation/header';
import { useAuth } from '../../context/authContext';
import { router } from 'expo-router';
import React from 'react';
import { useIsFocused } from '@react-navigation/native';

function FocusAwareStatusBar(props: any) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const reservation = () => {
  const auth = useAuth();

  return (
    
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content"/>

      <Header/>
      <TextThemed style={styles.welcomeText}>Welcome, {auth.userData.first_name}</TextThemed>
      <View style={styles.buttonContainer}>
        <TextThemed style={styles.reservation}>Add Reservation</TextThemed>
        <TouchableOpacity onPress={()=> router.push("/newReservation")}>
          <MaterialCommunityIcons 
            name={'plus-circle'}
            size={50}
            color="#aaa"
            style={styles.icon}/>
        </TouchableOpacity>
        <ViewThemed style={styles.separator} lightColor="#e0e0e0" darkColor="rgba(255,255,255,0.1)" />
        <CurrentReservation />
      </View>
      
    </View>
    
  )
}

export default reservation
const styles = StyleSheet.create({
  container : {
  },
  buttonContainer: {
    flexDirection: "column",
    paddingTop : 60
  },
  reservation:{
    fontSize: 17,
    fontWeight: 'bold',
    alignSelf: "center"
  },
  icon:{
    alignSelf: "center",
    paddingTop: 10
  },
  separator: {
    marginVertical: 30,
    height: 1.5,
    width: '80%',
    alignSelf: 'center',
  },
  welcomeText:{
    ...Platform.select({
      ios:{
        color:"#ffffff",
      },
      android:{
        color:"#ffffff"
      },
    }),
    fontSize : 17,
    fontWeight : 'bold',
    paddingTop : 15,
    alignSelf: "center"
  }
});