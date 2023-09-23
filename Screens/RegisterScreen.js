
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
import React from "react";
import { AntDesign, Ionicons, Feather, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Alert } from "react-native";

const RegisterScreen = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [image, setImage] = React.useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    };
    axios
      .post("http://192.168.178.20:8001/register", user)
      .then((response) => {
        console.log(response.data);
        Alert.alert(
          "Register successfully",
          "You have registered successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
        setImage("");
        if (register) {
          navigation.push("/login");
        }
      })
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("./../assets/amazon.png")}
        />
      </View>

      <KeyboardAvoidingView style={styles.formContainer}>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.title}>Create a new Account</Text>
        </View>
        <View style={styles.inputContainer}>
          <Feather
            name="user"
            size={30}
            color="gray"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your Full Name"
            placeholderTextColor="gray"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
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
        <View style={styles.inputContainer}>
          <Entypo
            name="image"
            size={30}
            color="gray"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Set your Profile image"
            placeholderTextColor="gray"
            value={image}
            onChangeText={(text) => setImage(text)}
          />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.keepMeLoggedIn}>Keep me logged in</Text>
          <Text
            style={styles.forgotPassword}
            onPress={() => {
              navigation.goBack();
            }}
          >
            Forgot Password
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
          <Pressable
            style={{
              textAlign: "center",
              marginTop: 7,
              fontSize: 16,
              fontFamil: "Normal",
              flexDirection: "row",
            }}
          >
            <Text>Alrady have an anaccount?</Text>
            <Text
              style={{ color: "blue" }}
              onPress={() => {
                navigation.goBack()
              }}
            >
              Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 50,
  },
  logo: {
    width: 150,
    height: 100,
  },
  formContainer: {
    marginTop: 20,
    marginBottom: 110,
    width: 310,
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
    marginTop: 30,
  },
  keepMeLoggedIn: {
    fontSize: 15,
    fontWeight: "500",
  },
  forgotPassword: {
    fontSize: 15,
    fontWeight: "bold",
    color: "blue",
  },
  buttonContainer: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
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
});

