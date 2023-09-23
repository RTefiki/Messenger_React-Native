import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../Screens/RegisterScreen';
import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import FriendsScrenn from '../Screens/FriendsScrenn';



const StackNavigatior = () => {
     const Stack = createNativeStackNavigator();
  return (
     <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
       <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}} />
       <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
       <Stack.Screen name="Friends" component={FriendsScrenn} options={{headerShown:false}} />
     </Stack.Navigator>
   </NavigationContainer>
  )
}

export default StackNavigatior

const styles = StyleSheet.create({})