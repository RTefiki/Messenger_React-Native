import React, { useState, useContext, useEffect, } from "react";
import { SafeAreaView, StyleSheet, Text, View, Pressable} from "react-native";
import { Ionicons, FontAwesome5,MaterialCommunityIcons } from "@expo/vector-icons";
import { UserType } from "./../components/UserContex";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import jwt_decode from "jwt-decode";
import User from "../components/User";
import { useNavigation } from "@react-navigation/native";


const HomeScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("auth");
        const decodeToken = await jwt_decode(token);
        const userId = decodeToken.userId;
        
        const response = await axios.get(`http://192.168.178.20:8001/users/${userId}`);
        setUsers(response.data);
      } catch (err) {
        console.log("error retrieving users", err);
      }
    };
    fetchUser();
  }, []);
  console.log("user", users);
  return (
    <SafeAreaView>
      <View style={styles.chat_container}>
        <View style={styles.chat_name}>
          <Text style={styles.chat_text}>R-Native Chat</Text>
          <View style={styles.chat_users}>
            <Ionicons
              name="ios-chatbox-ellipses-outline"
              size={24}
              color="black"
            />
            <FontAwesome5 
            onPress={()=> navigation.navigate("Friends")}
            name="users" size={24} color="lightgreen" />
            <Pressable onPress={() => {
                navigation.navigate("Login");
              }}>
                <MaterialCommunityIcons name="logout" size={24} color="black" />
              </Pressable>
          </View>
        </View>
        <View style={{ width:"100%",height:"100%"}}>
          {users && users.map((item, index) => (
            <User key={index} item={item} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  chat_container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },

  chat_name: {
    display: " flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  chat_text: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 5,
  },
  chat_users: {
    flexDirection: "row",
    gap: 10,
  },
});
