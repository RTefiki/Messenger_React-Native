import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserType } from "./../components/UserContex";
import axios from 'axios';

const FriendsScrenn = () => {
     const { userId, setUserId } = useContext(UserType);
     const [friendRequest, setFriendRequest] = useState([])
     useEffect(() => {
          fetchFriendRequests()
          setUserId()
     },[])
     
     const fetchFriendRequests =async() => {
          try {
               const response = await axios.get(`http://192.168.178.20:8001/friend-requests/${userId}`)
               if (response.status === 200) {
                    const friendRequests = response.deta.map((friendRequest) => ({
                         _id:friendRequest._id,
                         name:friendRequest.name,
                         email:friendRequest.email,
                         image:friendRequest.image
                    }))
                    setFriendRequest(friendRequests)
               }
          }
          catch (err) {
               console.log("Error fetchFriendRequests", err.message)
          }
     }
     console.log(friendRequest)
  return (
     <SafeAreaView>
    <View>
      {friendRequest.length < 0 && <Text>Friend Request</Text>}
    </View>
    </SafeAreaView>
  )
}

export default FriendsScrenn

const styles = StyleSheet.create({})