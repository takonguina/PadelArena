import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text as TextThemed,
View as ViewThemed } from '../../theme/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { openURL } from 'expo-linking';
import { useAuth } from '../../../context/authContext';

const mailus = () => {
  const auth = useAuth();
  const i18n = auth.i18n;
  return (
    <TouchableOpacity onPressIn={() => openURL("mailto:padelarena@mail.com")}>
    <ViewThemed style={styles.maincontainer}>
      <MaterialCommunityIcons 
        name="email"
        size={38} 
        color="#aaa"
        style={styles.icon} 
      />
      <ViewThemed style={styles.textContainer}>
        <TextThemed style={styles.title}>{i18n.t("email")}</TextThemed>
        <TextThemed>padelarena@email.com</TextThemed>
      </ViewThemed>
    </ViewThemed>
    </TouchableOpacity>
  )
}

export default mailus

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection : "row",
    marginTop: 5,
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
    marginLeft : 10
  },
  icon: {},
  title: {
    fontWeight: "bold"
  }
})