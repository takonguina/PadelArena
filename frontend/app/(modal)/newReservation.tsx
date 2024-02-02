import { Text } from "../theme/themed";
import { View as DefaultView } from "react-native";
import FormReservation from "../components/reservation/formReservation";
import { SafeAreaView } from "react-native-safe-area-context";

const newReservation = () => {
  return (
    <DefaultView>
      <FormReservation />
    </DefaultView>
  )
}

export default newReservation