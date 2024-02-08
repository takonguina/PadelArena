import axios from "axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Formik } from 'formik';
import moment from 'moment';
import { Text, TextInput } from '../../theme/themed';
import { router, Stack } from 'expo-router';
import { Alert, Button,  StyleSheet, ScrollView, View, useColorScheme } from 'react-native';
import CustomKeyboardAvoidingView from '../keyboardAvoidingView';
import { useAuth } from '../../../context/authContext';
import * as Yup from 'yup';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';


const myInformation = () => {
  const auth = useAuth();
  const i18n = auth.i18n
  const colorScheme = useColorScheme();
  const [date, setDate] = useState(auth.userData.birthday);
  var formatedDate = moment(date).format('MMM DD YYYY');
  const [show, setShow] = useState(false);
  const apiUrl = "http://192.168.1.63:3000/users/change_infos/";

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, i18n.t("tooShort"))
      .max(50, i18n.t("tooLong"))
      .required(i18n.t("requiredName")),
    lastName: Yup.string()
      .min(2, i18n.t("tooShort"))
      .max(50, i18n.t("tooLong"))
      .required(i18n.t("requiredName")),
    birth: Yup.string()
      .required(i18n.t("required")),
    email: Yup.string()
      .email(i18n.t("invalidEmail"))
      .required(i18n.t("requiredEmail")),
  });

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
        Alert.alert(i18n.t("informationUpdated"), i18n.t("informationUpdatedDetails"))
        router.back();
      } 
    } catch(e) {
      Alert.alert(i18n.t("unexpectedError"), i18n.t("tryLater"))
    };
    
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <CustomKeyboardAvoidingView>
    <ScrollView style={styles.container}>
      <Stack.Screen options={{headerTitle: i18n.t("myInformation"), headerBackTitle: i18n.t("profil")}} />
      
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
            <Text style={styles.text}>{i18n.t("firstName")}</Text>
            <TextInput
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              style={styles.input}
              placeholder={i18n.t("firstName")}
            />
            {errors.firstName && touched.firstName ? (
                <Text style={styles.textError}>{errors.firstName}</Text>
              ) : null}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>{i18n.t("lastName")}</Text>
            <TextInput
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              style={styles.input}
              placeholder={i18n.t("lastName")}
            />
            {errors.lastName && touched.lastName ? (
                <Text style={styles.textError}>{errors.lastName}</Text>
              ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.text}>{i18n.t("birthday")}</Text>
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
            <Text style={styles.text}>{i18n.t("email")}</Text>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              style={styles.input}
              placeholder={i18n.t("email")}
            />
            {errors.email && touched.email ? (
                <Text style={styles.textError}>{errors.email}</Text>
              ) : null}
          </View>


    
          <View style={styles.submitButton}>
            <Button onPress={()=> handleSubmit()} title={i18n.t("submit")}/>
          </View>        
        </View>
      )}
      </Formik>

    </ScrollView>
    </CustomKeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default myInformation

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