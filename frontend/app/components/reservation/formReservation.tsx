import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Formik } from "formik";
import moment from "moment";
import {
  Alert, 
  Button,
  StyleSheet,
  useColorScheme,
  View as DefaultView, 
  } from 'react-native';
import { Text, TextInput } from '../../theme/themed';
import * as Yup from 'yup';
import { useState } from "react";
import { router } from "expo-router";


const ReservationSchema = Yup.object().shape({
  reservationDate: Yup.string()
    .required('Required'),
  startTime: Yup.string()
    .required('Required'),
  endTime: Yup.string()
    .required('Required')
    .test('is-greater', 'Minimum 1 hour', function (endTime) {
      const { startParent } = this.parent;

      // Convert times to moment objects for easy comparison
      const startMoment = moment(startParent, 'HH:mm');
      const endMoment = moment(endTime, 'HH:mm');

      // Check if endTime is after startParent with at least 1 hour difference
      return  endMoment.isSameOrAfter(startMoment) && endMoment.diff(startMoment, 'hours') >= 1;
    }),
});

const inputReservation = () => {
  const colorScheme = useColorScheme();
  const [date, setDate] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const formatedTime = (time: Date, delay: number) => {
    time.setHours(time.getHours() + delay)
    time.setMinutes(0)
    return time
  };

  // Initialize with the next hour and 0 minutes
  const [startTime, setStartTime] = useState(formatedTime(new Date(), 1));
  const [endTime, setEndTime] = useState(formatedTime(new Date(), 2));


  const onSubmit = (data: any) => {
    console.log(data)
    // router.back();
  };

  const onConfirm = (data: any) => { 
    Alert.alert('Confirm Reservation', 'Please check the date and times', [
      {
        text: 'Cancel',
        style: 'destructive',
      },
      {text: 'OK', onPress: () => onSubmit(data)},
    ]);
  };
  
  return (
    <DefaultView style={styles.container}>
      <Formik
        initialValues={{
          reservationDate: moment(date).format('DD/MM/YYYY'),
          startTime: moment(startTime).format('HH:mm'),
          endTime: moment(endTime).format('HH:mm'),
        }}
        onSubmit={values => onConfirm(values)}
        validationSchema={ReservationSchema}
      >
      {({ handleSubmit, setFieldValue, errors, touched }) => (
        <DefaultView>

          <DefaultView style={styles.inputContainer}>
            <Text style={styles.text}>Date</Text>

              <TextInput
              onPressIn={() => setShowDatePicker(true)}
                style={styles.input}
                value={moment(date).format("dddd DD MMMM YYYY")}
                editable={false}
              />
            {errors.reservationDate && touched.reservationDate ? (
                <Text style={styles.textError}>{errors.reservationDate}</Text>
              ) : null}
          </DefaultView>
          <DateTimePickerModal
            isVisible={showDatePicker}
            mode="date"
            display="inline"
            minimumDate={new Date()}
            onConfirm={(date) => {
              setDate(date);
              setShowDatePicker(false);
              setFieldValue('reservationDate', moment(date).format('DD/MM/YYYY'));
            }}
            onCancel={() => setShowDatePicker(false)}
          />

          <DefaultView style={styles.inputContainer}>
            <Text style={styles.text}>Start</Text>
            <TextInput
              onPressIn={()=> setShowStartTimePicker(true)}
              value={moment(startTime).format('HH:mm')}
              style={styles.input}
              placeholderTextColor= {colorScheme === 'dark' ? '#FFF' : '#000'}
              editable={false}
            />
            {errors.startTime && touched.startTime ? (
                <Text style={styles.textError}>{errors.startTime}</Text>
              ) : null}
          </DefaultView>
          <DateTimePickerModal
          isVisible={showStartTimePicker}
          mode="time"
          minuteInterval={30}
          date={startTime}
          onConfirm={(selectedStartTime) => {
            setStartTime(selectedStartTime);
            setShowStartTimePicker(false);
            setFieldValue('startTime', moment(selectedStartTime).format("HH:mm"));
          }}
          onCancel={() => setShowStartTimePicker(false)}
          />

          <DefaultView style={styles.inputContainer}>
            <Text style={styles.text}>End</Text>
            <TextInput
              onPressIn={()=> setShowEndTimePicker(true)}
              value={moment(endTime).format('HH:mm')}
              style={styles.input}
              placeholderTextColor= {colorScheme === 'dark' ? '#FFF' : '#000'}
              editable={false}
            />
            {errors.endTime && touched.endTime ? (
                <Text style={styles.textError}>{errors.endTime}</Text>
              ) : null}
          </DefaultView>
          <DateTimePickerModal
          isVisible={showEndTimePicker}
          mode="time"
          date={endTime}
          minuteInterval={30}
          onConfirm={(selectedEndTime) => {
            setEndTime(selectedEndTime);
            setShowEndTimePicker(false);
            setFieldValue('endTime', moment(selectedEndTime).format("HH:mm"));
          }}
          onCancel={() => setShowEndTimePicker(false)}
          />
          
          <DefaultView style={styles.submitButton}>
            <Button onPress={()=> handleSubmit()} title="Submit" />
          </DefaultView>        
        </DefaultView>
      )}
      </Formik>
    </DefaultView>
  )
}

export default inputReservation
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 35,
  },
  maincontainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  inputContainer: {
    marginBottom: 15
  },
  input: {
    flex: 1,
    padding : 20,
    borderRadius: 10,
    marginBottom : 5
  },
  text: {
    marginHorizontal: 5,
    marginBottom: 5
  },
  datePicker: {
    alignSelf: 'flex-start',
    marginBottom : 15
  },
  icon: {
    position: 'absolute',
    marginLeft: 10,
    marginBottom: 0,
    right: 20,
    bottom: 15
},
textError: {
  marginHorizontal: 5,
  color: "red"
},
submitButton: {
  paddingTop: 15
}
})