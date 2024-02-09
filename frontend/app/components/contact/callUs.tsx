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
    <TouchableOpacity onPressIn={() => openURL("tel:+33100000000")}>
    <ViewThemed style={styles.maincontainer}>
      <MaterialCommunityIcons 
        name="cellphone"
        size={40} 
        color="#aaa"
        style={styles.icon} 
      />
      <ViewThemed style={styles.textContainer}>
        <TextThemed style={styles.title}>{i18n.t("phoneNumber")}</TextThemed>
        <TextThemed>+331 00 00 00 00</TextThemed>
      </ViewThemed>
    </ViewThemed>
    </TouchableOpacity>
  )
}

export default callus

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection : "row",
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
  textContainer:{
    flexDirection: "column",
    marginTop : 2,
    marginLeft : 8
  },
  icon: {},
  title: {
    fontWeight: "bold"
  }
})