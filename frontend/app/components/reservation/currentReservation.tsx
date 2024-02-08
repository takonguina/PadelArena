import axios from 'axios';
import { 
    Alert,
    FlatList,
    StyleSheet,
    View as DefaultView,
    useColorScheme, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Text as TextThemed } from '../../theme/themed';
import { useAuth } from '../../../context/authContext';
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';



interface Reservation {
    id_court: number;
    id_user: number;
    start_time: string;
    id_reservation: number;
    reservation_date: string;
    end_time: string;
  }

interface TimeComponentProps {
  startTimeString: string;
  endTimeString: string;
}

const DateComponent: React.FC<{ dateString: string }> = ({ dateString }) => {
  const auth = useAuth();
  const i18n = auth.i18n;
  const dateObject = new Date(dateString);
  const month = dateObject.toLocaleString(i18n.locale, { month: 'short' });
  const dayOfMonth = dateObject.getDate();
  const dayOfWeek = dateObject.toLocaleString(i18n.locale, { weekday: 'short' });

    return (
      <DefaultView style={styles.dateContainer}>
        <TextThemed style={{fontWeight : "bold"}}>{month}</TextThemed>
        <TextThemed style={styles.textDayofMonth}>{dayOfMonth}</TextThemed>
        <TextThemed>{dayOfWeek}</TextThemed>
      </DefaultView>
    );
  };

const TimeComponent: React.FC<TimeComponentProps> = ({ startTimeString, endTimeString }) => {
  const formattedStart = formatTime(startTimeString);
  const formattedEnd = formatTime(endTimeString);

  return (
    <DefaultView style={{flexDirection : "row"}}>
      <MaterialCommunityIcons 
        name={'clock-time-eight-outline'} 
        size={20} 
        color="#aaa"
      />
      <TextThemed style={[styles.text, {fontWeight: "bold"}]}>{formattedStart} - {formattedEnd}</TextThemed>
    </DefaultView>
  );
};
  
  const formatTime = (timeString: string): string => {
    const dateObject = new Date(`2000-01-01T${timeString}`);
    const hour = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

const CourtComponent: React.FC<{ id_court: number }> = ({ id_court }) => {
  const auth = useAuth();
  const i18n = auth.i18n;
    return (
      <DefaultView style={{flexDirection : "row"}}>
        <MaterialCommunityIcons 
          name={'soccer-field'} 
          size={20} 
          color="#008000"
        />
        <TextThemed style={styles.text}>{i18n.t("court")} {id_court}</TextThemed>
      </DefaultView>
    );
  };

const currentReservation = () => {
  const auth = useAuth();
  const i18n = auth.i18n;
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === 'dark' ? '#333' : 'white';
  const apiUrl = "http://192.168.1.63:3000/reservation/get_reservation/";
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const onSubmit = async () => {
      const fixed_token = auth.token.replace(/['"]/g, '');
      try{ 
        const response = await axios.post(`${apiUrl}`,'',
          {
              params: {
              'access_token': fixed_token
              },
              headers: {
              'accept': 'application/json',
              'content-type': 'application/x-www-form-urlencoded'
              }
          });
        if (response.status === 200){
          setReservations(response.data.reservations)
        }
      } catch(error) {
          if ((error as any).response?.status === 409) {
            Alert.alert(i18n.t("unexpectedError"))
          }
      }
  };

  useFocusEffect(
    useCallback(() => {
    onSubmit();
    }, [])
  );
    

  return (
    <DefaultView style={{height: 470}}>
        <TextThemed style={styles.reservation}>{i18n.t("reserved")}</TextThemed>
        {reservations.length === 0 ? (
            <TextThemed style={styles.none}>{i18n.t("noReservation")}</TextThemed>
        ) : (
            <FlatList
              style={styles.flatList}
              data={reservations}
              keyExtractor={(item) => item.id_reservation.toString()}
              renderItem={({ item }) => (
                <DefaultView style={[styles.itemContainer, { backgroundColor }]}>
                  <DateComponent dateString={item.reservation_date} />
                  <DefaultView style={styles.detailsContainer}>
                    <DefaultView style={styles.infoContainer}>
                      <TimeComponent startTimeString={item.start_time} endTimeString={item.end_time}/>
                      <CourtComponent id_court={item.id_court} />
                    </DefaultView>
                  </DefaultView>
                </DefaultView>
              )}
            />
        )}
    </DefaultView>
  )
}

export default currentReservation

const styles = StyleSheet.create({
    itemContainer: {
      marginBottom: 10,
      marginHorizontal: 35,
      padding : 10,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    dateContainer: {
        flexDirection: "column",
        alignItems: "center",
        marginLeft : 10
    },
    detailsContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 50
    },
    flatList:{
      paddingTop: 5
    },
    infoContainer: {
      flexDirection: "column",
      marginLeft: 5
    },
    none: {
      fontSize: 14,
      alignSelf: "center",
      color: "#aaa",
      paddingTop: 50,
  },
    reservation: {
        fontSize: 17,
        fontWeight: 'bold',
        alignSelf: "center",
        marginBottom: 19
    },
    text : {
      marginLeft : 10,
      fontSize: 15,
    },
    textDayofMonth : {
      fontSize : 25,
      fontWeight : "bold",
      color: "#cc0000"
    }
})