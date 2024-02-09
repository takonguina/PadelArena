import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text as TextThemed,
View as ViewThemed } from '../../theme/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { openURL } from 'expo-linking';
import { useAuth } from '../../../context/authContext';

const callus = () => {
    const auth = useAuth();
    const i18n = auth.i18n;

  return (
    
    <ViewThemed style={styles.maincontainer}>
    <TextThemed style={styles.title}>{i18n.t("socialMedia")}</TextThemed>
    <ViewThemed style={styles.socialContainer}>
      <MaterialCommunityIcons 
        name="facebook"
        size={40} 
        color="#4267B2"
      />
      <TouchableOpacity onPressIn={() => openURL("https://facebook.com/padelarena")}>
        <ViewThemed style={styles.textContainer}>
            <TextThemed style={styles.subTitle}>Facebook</TextThemed>
            <TextThemed>facebook.com/padelarena</TextThemed>
        </ViewThemed>
      </TouchableOpacity>
      </ViewThemed>

      <ViewThemed style={styles.socialContainer}>
      <MaterialCommunityIcons 
        name="instagram"
        size={40} 
        color="#E1306C"
      />
      <TouchableOpacity onPressIn={() => openURL("https://instagram.com/padelarena")}>
        <ViewThemed style={styles.textContainer}>
            <TextThemed style={styles.subTitle}>Instagram</TextThemed>
            <TextThemed>instagram.com/padelarena</TextThemed>
        </ViewThemed>
      </TouchableOpacity>
      </ViewThemed>

      <ViewThemed style={styles.socialContainer}>
      <MaterialCommunityIcons 
        name="linkedin"
        size={40} 
        color="#0072b1"
      />
      <TouchableOpacity onPressIn={() => openURL("https://linkedin.com/padelarena")}>
        <ViewThemed style={styles.textContainer}>
            <TextThemed style={styles.subTitle}>LinkedIn</TextThemed>
            <TextThemed>linkedin.com/padelarena</TextThemed>
        </ViewThemed>
      </TouchableOpacity>
      </ViewThemed>
    </ViewThemed>
    
  )
}

export default callus

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection : "column",
    marginTop: 15,
    marginBottom : 10,
    marginHorizontal : 20,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  socialContainer: {
    flexDirection: "row",
    marginBottom : 15
  },
  textContainer:{
    flexDirection: "column",
    marginTop : 2,
    marginLeft : 8
  },
  title: {
    marginBottom : 15,
    fontSize : 20,
    fontWeight: "bold"
  },
  subTitle: {
    fontWeight: "bold"
  }
})