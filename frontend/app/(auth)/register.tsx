import axios from 'axios';
import { Alert ,StyleSheet, ScrollView, useColorScheme, View, Button } from 'react-native';
import { Text, TextInput } from '../theme/themed';
import React, {useState} from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CustomKeyboardAvoidingView from '../components/keyboardAvoidingView'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/authContext';



const Register = () => {
  const colorScheme = useColorScheme();
  const [date, setDate] = useState(new Date());
  var formatedDate = moment(date).format('MMM DD YYYY');
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const apiUrl = "http://192.168.1.63:3000/auth/register/";
  const auth = useAuth();
  const i18n = auth.i18n

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(1, i18n.t("tooShort"))
      .max(50, i18n.t("tooLong"))
      .required(i18n.t("requiredName")),
    lastName: Yup.string()
      .min(1, i18n.t("tooShort"))
      .max(50, i18n.t("tooLong"))
      .required(i18n.t("requiredName")),
    birth: Yup.string()
      .required(i18n.t("required")),
    email: Yup.string()
      .email(i18n.t("invalidEmail"))
      .required(i18n.t("requiredEmail")),
    password: Yup.string()
      .required(i18n.t("required")),
  });


  const toggleShowPassword = () => { 
    setShowPassword(!showPassword); 
  }; 

  const handleConfirm = (selectedDate : any) => {
    setDate(selectedDate);
    setShow(false);
  }

  const onSubmit = async (data: any) => {
    
    try {
      const response = await axios.post(`${apiUrl}`, {
        first_name: data.firstName,
        last_name: data.lastName,
        birthday: data.birth,
        email: data.email,
        password: data.password
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 201) {
        Alert.alert(i18n.t("registrationComplete"), i18n.t("registrationCompleteDetails"))
        router.back();
      } 
    } catch (error) {
      if ((error as any).response?.status === 302) {
        Alert.alert(i18n.t("emailRegistered"))
      } else {
        Alert.alert(i18n.t("unexpectedError"))
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <CustomKeyboardAvoidingView>
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          firstName: '',
          lastName:'',
          birth:'',
          email: '',
          password: '',
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
              autoCapitalize='none'
            />
            {errors.email && touched.email ? (
                <Text style={styles.textError}>{errors.email}</Text>
              ) : null}
          </View>


          <View style={styles.inputContainer}>
            <Text style={styles.text}>{i18n.t("password")}</Text>
            <View style={styles.maincontainer}> 
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={!showPassword} 
                style={styles.input} 
                placeholder={i18n.t("password")}
              /> 
              <MaterialCommunityIcons 
                name={showPassword ? 'eye' : 'eye-off'} 
                size={24} 
                color="#aaa"
                style={styles.icon} 
                onPress={toggleShowPassword} 
              />
          </View>
          {errors.password && touched.password ? (
              <Text style={styles.textError}>{errors.password}</Text>
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

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
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
    padding : 15,
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