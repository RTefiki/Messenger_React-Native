import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useContext,useEffect } from "react";
import { UserType } from "./UserContex";

const User = ({ item }) => {
  const { userId,setUserId } = useContext(UserType);
  console.log("userId from context:", userId);
  const [requestSend, setRequestSend] = useState(false);

  useEffect(() => {
    console.log(`userId from context: ${userId}`);
    setUserId(userId);
}, [userId]);
   
const sentFriendRequest = async (currentUserId, selectedUserId) => {
  console.log("currentUserId in sentFriendRequest:", currentUserId);
  try {
    const response = await fetch(
      "http://192.168.178.20:8001/friend-request",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentUserId, selectedUserId }),
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    setRequestSend(true);
  } catch (err) {
    console.log("Error", err.message);
  }

  if (requestSend) {
    console.log("Successfully");
  }
};

  return (
    <Pressable style={styles.user_container}>
      <View style={styles.image_container}>
        <Image
          source={require("./../assets/emptyImg.jpg")}
          style={{
            width: 60,
            height: 60,
            borderRadius: 100,
            resizeMode: "cover",
          }}
        />
      </View>
      <View style={styles.name_email}>
        <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
        <Text style={{ color: "gray" }}>{item?.email}</Text>
      </View>
      <Pressable
        onPress={() => sentFriendRequest(userId, item?._id)}
        style={({ pressed }) => [
          styles.add_buton,
          {
            backgroundColor: pressed ? "blue" : "skyblue",
          },
        ]}
      >
        <Text style={styles.add_text}>Add Friend</Text>
      </Pressable>
    </Pressable>
  );
};

export default User;

const styles = StyleSheet.create({
  user_container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  image_container: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  name_email: {
    flex: 1,
  },
  add_buton: {
    backgroundColor: "skyblue",
    padding: 10,
    width: 110,
    borderRadius: 5,
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "lightblue",
    },
    "&:active": {
      backgroundColor: "blue",
    },
  },
  add_text: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});
