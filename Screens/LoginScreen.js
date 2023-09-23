import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("auth");
        const userId = await AsyncStorage.getItem("userId");

        if (token && userId) {
          setUserId(userId);
          navigation.navigate("Home");
        } else {
          console.log("Token not found");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://192.168.178.20:8001/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        const userId = response.data.userId;
        AsyncStorage.setItem("auth", token);
        AsyncStorage.setItem("userId", userId);
        setUserId(userId);
        navigation.navigate("Home");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid email or password");
        if (error.response && error.response.status === 401) {
          console.log("Incorrect email or password");
        } else {
          console.log("Email and Password not defined", error);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("./../assets/amazon.png")}
        />
      </View>

      <KeyboardAvoidingView style={styles.formContainer}>
        <Text style={styles.title}>Login to your Account</Text>
        <View style={styles.inputContainer}>
          <AntDesign
            name="mail"
            size={30}
            color="gray"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor="gray"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons
            name="md-key-sharp"
            size={30}
            color="gray"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="gray"
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.keepMeLoggedIn}>Keep me logged in</Text>
          <Text
            style={styles.forgotPassword}
            onPress={() => {
              // Add your forgot password logic here
            }}
          >
            Forgot Password
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Text
            style={styles.signUpText}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            Don't have an account? Sign Up
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logoContainer: {
    marginTop: 30,
  },
  logo: {
    width: 150,
    height: 100,
  },
  formContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "lightgray",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderRadius: 5,
  },
  icon: {
    marginLeft: 7,
  },
  input: {
    flex: 1,
    height: "100%",
    marginLeft: 5,
    fontSize: 17,
    backgroundColor: "lightgray",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  keepMeLoggedIn: {
    fontSize: 16,
    fontWeight: "500",
  },
  forgotPassword: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
  buttonContainer: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
  },
  button: {
    height: 45,
    backgroundColor: "gold",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    width: 200,
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  signUpText: {
    fontSize: 16,
    color: "blue",
    marginTop: 20,
  },
});

export default LoginScreen;
