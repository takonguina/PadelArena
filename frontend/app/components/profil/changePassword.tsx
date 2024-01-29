import axios from 'axios';
import { Alert, Button, View, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Stack } from 'expo-router';
import { TextInput } from '../../theme/themed';
import * as Yup from 'yup';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '../../../context/authContext';

const changePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .required('Please enter valid password')
        .min(6),
    confirmedPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password")], "Passwords does not match"),
});

const changePassword = () => {
    const auth = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const apiUrl = "http://192.168.1.63:3000/users/change_password/";

    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
      }; 

    const onSubmit = async (data: any) => {
        const fixed_token = auth.token.replace(/['"]/g, '');
        try {
            const response = await axios.post(`${apiUrl}`,``,
              {
                params: {
                  'access_token': fixed_token,
                  'new_password': data.password
                },
                headers: {
                  'accept': 'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (response.status === 200) {
              Alert.alert("Password have been successfully updated! ✅")
              router.back();
            } 
          } catch(e) {
            Alert.alert("Unexpected error", "Try later.")
          };
    };


  return (
    <View style={styles.container}>
        <Stack.Screen options={{headerTitle: "Change Password", headerBackTitle: "Profil"}} />

        <Formik
        initialValues={{
          password: '',
          confirmedPassword: '',
        }}
        onSubmit={values => onSubmit(values)}
        validationSchema={changePasswordSchema}
      >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <View>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Password</Text>
                <View style={styles.maincontainer}> 
                <TextInput
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={!showPassword} 
                    style={styles.input} 
                    placeholder="Password"
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

            <View style={styles.inputContainer}>
                <Text style={styles.text}>Confirm Password</Text>
                <View style={styles.maincontainer}> 
                <TextInput
                    onChangeText={handleChange('confirmedPassword')}
                    onBlur={handleBlur('confirmedPassword')}
                    value={values.confirmedPassword}
                    secureTextEntry={!showPassword} 
                    style={styles.input} 
                    placeholder="Confirm Password"
                /> 
                <MaterialCommunityIcons 
                    name={showPassword ? 'eye' : 'eye-off'} 
                    size={24} 
                    color="#aaa"
                    style={styles.icon} 
                    onPress={toggleShowPassword} 
                />
                </View>
                {errors.confirmedPassword && touched.confirmedPassword ? (
                    <Text style={styles.textError}>{errors.confirmedPassword}</Text>
                    ) : null}
            </View>

            <View style={styles.submitButton}>
                <Button onPress={()=> handleSubmit()} title="Submit" />
            </View>        
        </View>
      )}
      </Formik>
    </View>
  )
}

export default changePassword

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