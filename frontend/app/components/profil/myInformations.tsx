import axios from "axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Formik } from 'formik';
import moment from 'moment';
import { Text, TextInput } from '../../theme/themed';
import { router, Stack } from 'expo-router';
import { Alert, Button,  StyleSheet, SafeAreaView, ScrollView, View, useColorScheme } from 'react-native';
import CustomKeyboardAvoidingView from '../keyboardAvoidingView';
import { useAuth } from '../../../context/authContext';
import * as Yup from 'yup';
import { useState } from 'react';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter full name'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter full name'),
  birth: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter email adress'),
});

const myInformations = () => {
  const auth = useAuth();
  const colorScheme = useColorScheme();
  const [date, setDate] = useState(auth.userData.birthday);
  var formatedDate = moment(date).format('MMM DD YYYY');
  const [show, setShow] = useState(false);
  const apiUrl = "http://192.168.1.63:3000/users/change_infos/";

  const handleConfirm = (selectedDate : any) => {
    setDate(selectedDate);
    setShow(false);
  }
  const onSubmit = async (data: any) => {
    const fixed_token = auth.token.replace(/['"]/g, '');
    try {
      const response = await axios.post(`${apiUrl}`,{
          first_name: data.firstName,
          last_name: data.lastName,
          birthday: data.birth,
          email: data.email,
        },
        {
          params: {
            'access_token': fixed_token
          },
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          }
      });
      if (response.status === 200) {
        Alert.alert("Informations have been successfully updated! ✅", "Don't forget to check your email address if you have updated it.")
        router.back();
      } 
    } catch(e) {
      Alert.alert("Unexpected error", "Try later.")
    };
    
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <CustomKeyboardAvoidingView>
    <ScrollView style={styles.container}>
      <Stack.Screen options={{headerTitle: "My informations", headerBackTitle: "Profil"}} />
      
      <Formik
        initialValues={{
          firstName: `${auth.userData.first_name}`,
          lastName: `${auth.userData.last_name}`,
          birth: `${auth.userData.birthday}`,
          email: `${auth.userData.email}`,
        }}
        onSubmit={values => onSubmit(values)}
        validationSchema={SignupSchema}
      >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>First Name</Text>
            <TextInput
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              style={styles.input}
              placeholder='First Name'
            />
            {errors.firstName && touched.firstName ? (
                <Text style={styles.textError}>{errors.firstName}</Text>
              ) : null}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Last Name</Text>
            <TextInput
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              style={styles.input}
              placeholder='Last Name'
            />
            {errors.lastName && touched.lastName ? (
                <Text style={styles.textError}>{errors.lastName}</Text>
              ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.text}>Date of Birth</Text>
            <TextInput
              onPressIn={()=> setShow(true)}
              onChangeText={handleChange('birth')}
              onBlur={handleBlur('birth')}
              value={formatedDate}
              style={styles.input}
              placeholder={formatedDate}
              placeholderTextColor= {colorScheme === 'dark' ? '#FFF' : '#000'}
              editable={false}
            />
            {errors.birth && touched.birth ? (
                <Text style={styles.textError}>{errors.birth}</Text>
              ) : null}
          </View>
          <DateTimePickerModal
          isVisible={show}
          mode="date"
          date={new Date(values.birth)}
          onConfirm={(selectedDate) => {
            handleConfirm(selectedDate);
            setFieldValue('birth', selectedDate);
          }}
          onCancel={() => setShow(false)}
          />


          <View style={styles.inputContainer}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              style={styles.input}
              placeholder='Email'
            />
            {errors.email && touched.email ? (
                <Text style={styles.textError}>{errors.email}</Text>
              ) : null}
          </View>


    
          <View style={styles.submitButton}>
            <Button onPress={()=> handleSubmit()} title="Submit" />
          </View>        
        </View>
      )}
      </Formik>

    </ScrollView>
    </CustomKeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default myInformations

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 35,
  },
  inputContainer: {
    marginBottom: 15
  },
  input: {
    flex: 1,
    padding : 15,
    borderRadius: 10,
    marginBottom : 5
  },
  text: {
    marginHorizontal: 5,
    marginBottom: 5
  },
  textError: {
    marginHorizontal: 5,
    color: "red"
  },
  submitButton: {
    paddingTop: 15
  }
})