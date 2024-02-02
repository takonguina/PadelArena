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


const ReservationSchema = Yup.object().shape({
  date: Yup.string()
    .required('Required'),
  startTime: Yup.string()
    .required('Required'),
  endTime: Yup.string()
    .required('Required'),
});

const inputReservation = () => {
  const colorScheme = useColorScheme();
  const [date, setDate] = useState(new Date());
  var formatedDate = moment(date).format('MMM DD YYYY');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);


  // Initialize with the next hour and 0 minutes for START
  const initialStartTime = new Date();
  const nextHourStartTime = new Date(initialStartTime);
  nextHourStartTime.setHours(initialStartTime.getHours() + 1);
  nextHourStartTime.setMinutes(0);
  const [startTime, setStartTime] = useState(nextHourStartTime);
  var formatedStartTime = moment(startTime).format("HH:mm");

  // Initialize with the current time and 0 minutes for END
  const initialEndTime = new Date();
  const nextHourEndTime = new Date(initialEndTime);
  nextHourEndTime.setHours(initialEndTime.getHours() + 2);
  nextHourEndTime.setMinutes(0);
  const [endTime, setEndTime] = useState(nextHourEndTime);
  var formatedEndTime = moment(endTime).format("HH:mm");

  const today = new Date()

  const handleDateConfirm = (selectedDate : any) => {
    setDate(selectedDate);
    setShowDatePicker(false);
  };

  const handleStartTimeConfirm = (selectedDate : any) => {
    setStartTime(selectedDate);
    setShowStartTimePicker(false);
  };
  const handleEndTimeConfirm = (selectedDate : any) => {
    setEndTime(selectedDate);
    setShowEndTimePicker(false);
    console.log(formatedDate, formatedStartTime, formatedEndTime)
  };

  const onSubmit = (data: any) => { 
    Alert.alert('Confirm Reservation', 'Please check the date and times', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'destructive',
        
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  return (
    <DefaultView style={styles.container}>
      <Formik
        initialValues={{
          date: formatedDate,
          startTime: formatedStartTime,
          endTime: formatedEndTime,
        }}
        onSubmit={values => onSubmit(values)}
        validationSchema={ReservationSchema}
      >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <DefaultView>

          <DefaultView style={styles.inputContainer}>
            <Text style={styles.text}>Date</Text>
            <TextInput
              onPressIn={()=> setShowDatePicker(true)}
              onChangeText={handleChange('date')}
              onBlur={handleBlur('date')}
              value={formatedDate}
              style={styles.input}
              placeholder={formatedDate}
              placeholderTextColor= {colorScheme === 'dark' ? '#FFF' : '#000'}
              editable={false}
            />
            {errors.date && touched.date ? (
                <Text style={styles.textError}>{errors.date}</Text>
              ) : null}
          </DefaultView>
          <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          minimumDate = {today}
          onConfirm={(selectedDate) => {
            handleDateConfirm(selectedDate);
            setFieldValue('date', selectedDate);
          }}
          onCancel={() => setShowDatePicker(false)}
          />

          <DefaultView style={styles.inputContainer}>
            <Text style={styles.text}>Start</Text>
            <TextInput
              onPressIn={()=> setShowStartTimePicker(true)}
              onChangeText={handleChange('startTime')}
              onBlur={handleBlur('startTime')}
              value={formatedStartTime}
              style={styles.input}
              placeholder={formatedStartTime}
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
          onConfirm={(selectedStartTime) => {
            handleStartTimeConfirm(selectedStartTime);
            setFieldValue('startTime', selectedStartTime);
          }}
          onCancel={() => setShowStartTimePicker(false)}
          />

          <DefaultView style={styles.inputContainer}>
            <Text style={styles.text}>End</Text>
            <TextInput
              onPressIn={()=> setShowEndTimePicker(true)}
              onChangeText={handleChange('endTime')}
              onBlur={handleBlur('endTime')}
              value={formatedEndTime}
              style={styles.input}
              placeholder={formatedEndTime}
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
          minuteInterval={30}
          onConfirm={(selectedStartTime) => {
            handleEndTimeConfirm(selectedStartTime);
            setFieldValue('startTime', selectedStartTime);
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