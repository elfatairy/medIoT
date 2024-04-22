import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { saveData } from '../storage';
import { useState } from 'react';
import { router } from 'expo-router';
import { Link } from "expo-router";
import { Pressable } from 'react-native';

export default function SignupScreen({ goToPage }) {
   const initialValues = { email: '', password: '', confirmPassword: '' };

   const [error, setError] = useState('');

   const validationSchema = yup.object().shape({
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: yup
         .string()
         .oneOf([yup.ref('password'), null], 'Passwords must match') // Ensure confirmPassword matches password
         .required('Confirm Password is required'),
   });

   const handleSubmit = async (values) => {
      
      saveData('email', values.email);
      saveData('password', values.password);
      
      goToPage(0);
   };
   
   return (  
      <View style={styles.container}>
         <Text style={styles.title}>Sign Up </Text>
         <View style={styles.inputs}>
            <Formik
               initialValues={initialValues}
               validationSchema={validationSchema}
               onSubmit={handleSubmit}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
               <>
                  <View>
                     <TextInput
                     onChangeText={handleChange('email')}
                     onBlur={handleBlur('email')}
                     value={values.email}
                     placeholder="Email"
                     style={styles.input}
                     />
                     {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                  </View>

                  <View>
                     <TextInput
                     onChangeText={handleChange('password')}
                     onBlur={handleBlur('password')}
                     value={values.password}
                     placeholder="Password"
                     secureTextEntry
                     style={styles.input}
                     />
                     {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                  </View>

                  <View>
                     <TextInput
                     onChangeText={handleChange('confirmPassword')}
                     onBlur={handleBlur('confirmPassword')}
                     value={values.confirmPassword}
                     placeholder="Confirm Password"
                     secureTextEntry
                     style={styles.input}
                     />
                     {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
                  </View>

                  {error && <Text style={styles.error}>{error}</Text>}

                  <Pressable onPress={handleSubmit}>
                     <Text style={styles.button}>Sign Up</Text>
                  </Pressable>
               </>
            )}
            </Formik>
         </View>
         <View style={styles.bottom}>
            <Text style={styles.bottomText}>Already have an account?</Text>
            <Pressable onPress={() => {goToPage(0)}}>
               <Text style={styles.bottomLink}>Log In</Text>
            </Pressable>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      paddingVertical: 100,
      paddingHorizontal: 15,
      flexDirection: "column",
      justifyContent: "space-between",
      flex: 1
   },
   title: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: "center"
   },
   inputs: {
      gap: 15,
   }, 
   input: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      fontSize: 18,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: "#3498db",
      borderStyle: "solid"
   },
   error: {
      marginTop: 5,
      marginLeft: 7,
      fontWeight: "bold",
      color: "#c0392b"
   },
   button: {
      borderRadius: 15,
      backgroundColor: "#3498db",
      padding: 10,
      color: "#fff",
      fontSize: 18,
      textAlign: "center"
   },
   bottom: {
      flexDirection: "column",
      gap: 5
   },
   bottomText: {
      textAlign: "center",
      fontSize: 16,
      fontWeight: "500"
   },
   bottomLink: {
      textAlign: "center",
      fontSize: 16,
      fontWeight: "500",
      color: "#2980b9"
   }
});