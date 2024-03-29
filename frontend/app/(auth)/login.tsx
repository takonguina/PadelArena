import { Alert, Button, Dimensions, StyleSheet, ScrollView, TouchableOpacity, View, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import CustomKeyboardAvoidingView from '../components/keyboardAvoidingView';
import { TextInput, Text, View as ViewThemed  } from "../theme/themed";
import axios, { AxiosError } from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useAuth } from '../../context/authContext';
import { SafeAreaView } from 'react-native-safe-area-context';


const loginPage = () => {
  const auth = useAuth();
  const i18n = auth.i18n;
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const apiUrl = "http://192.168.1.63:3000/auth/login/";

  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email(i18n.t("invalidEmail"))
      .required(i18n.t("requiredEmail")),
    password: Yup.string()
      .required(i18n.t("requiredPassword")),
  });

    const toggleShowPassword = () => { 
      setShowPassword(!showPassword); 
    }; 

    const handleLogin = async (data: any) => {
      try {
        const response = await axios.post(`${apiUrl}`, {
          email: data.email,
          password: data.password
        }, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        if (response.status === 200) {
          auth.signIn(JSON.stringify(response.data.access_token));
          router.replace("/home");
        }
        } catch (error) {
          if ((error as AxiosError).response?.status === 404) {
            Alert.alert(i18n.t("emailNotRegistered"));
          } else if (axios.isAxiosError(error) && !error.response) {
            Alert.alert(i18n.t("connectionFailure"), i18n.t("connectionFailureDetails"));
          } else {
            Alert.alert(i18n.t("wrongInformation"));
          }
        }

    };
    
  return (
    <ImageBackground
        source={require('../../assets/background.png')}
        resizeMode='cover'
        style={styles.image}>
    <SafeAreaView style={{ flex: 1 }}>
    <CustomKeyboardAvoidingView>
    <ScrollView>
      
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values => handleLogin(values)}
        validationSchema={SignupSchema}
      >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <View style={styles.container}>
          
        <View style={styles.inputContainer}>
        <TextInput
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          placeholder={i18n.t("email")}
          style={styles.input}
          value={values.email}
          autoCapitalize='none'
          />
          {errors.email && touched.email ? (
                <Text style={styles.textError}>{errors.email}</Text>
              ) : null}
        </View>
        <View style={styles.maincontainer}> 
          <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholder={i18n.t("password")}
            secureTextEntry={!showPassword} 
            style={styles.input}
            value={values.password}/>
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

        <Button title={i18n.t("signIn")} onPress={() => handleSubmit()}/>
      </View>
      )}
      </Formik>
      
      
        <ViewThemed style={styles.separator} lightColor="#e0e0e0" darkColor="rgba(255,255,255,0.1)" />
        <TouchableOpacity 
          onPress={() => router.push('/register')}
          style={styles.registerButton}>
          <Text>{i18n.t("createAccount")}</Text>
        </TouchableOpacity>

    </ScrollView>
    </CustomKeyboardAvoidingView>
    </SafeAreaView>
    </ImageBackground>
  )
}

export default loginPage

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: screenHeight * 0.46,
    marginHorizontal: 50,
  },
  loginContainer: {
    flex: 1
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
    marginBottom : 10
  },
  text: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  icon: {
    position: 'absolute',
    marginLeft: 10,
    marginBottom: 0,
    right: 20,
    bottom: 20
  },
  image: {
    flex: 1,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    alignSelf: 'center'
  },
  textError: {
    marginHorizontal: 5,
    color: "red"
  },
  registerButton: {
     alignSelf: 'center',
  }
})