import { router } from "expo-router";
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";

export default function Settings() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=> router.push({pathname: '/profileUpdate/profileUpdate'})}>
        <Text style={styles.text}>
          Update Profile
        </Text>
        
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.push({pathname: '/profileUpdate/passwordUpdate'})}>
        <Text style={styles.text}>
          Update Password
        </Text>
      </TouchableOpacity>
    </View>
  )
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    backgroundColor: "#ffffff", 
    borderBottomColor: '#000000',
    //borderWidth: '0.5px',
    padding: '15px',  
    fontSize: 18,
    color: "#000000"
  }
});
