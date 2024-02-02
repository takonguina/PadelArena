import { 
    StyleSheet,
    View as DefaultView, 
    ScrollView} from 'react-native';
import { Text as TextThemed } from '../../theme/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

const currentReservation = () => {
  return (
    <SafeAreaView>
        <TextThemed style={styles.reservation}>Reserved</TextThemed>
        <ScrollView>
            <DefaultView>
            <TextThemed style={styles.none}>No reservations.</TextThemed>
            </DefaultView>
        </ScrollView>
    </SafeAreaView>
  )
}

export default currentReservation

const styles = StyleSheet.create({
    reservation: {
        fontSize: 17,
        fontWeight: 'bold',
        alignSelf: "center"
    },
    none: {
        fontSize: 14,
        alignSelf: "center",
        color: "#aaa",
        paddingTop: 50,
    },
})