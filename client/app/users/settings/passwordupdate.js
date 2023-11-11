import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import axios from "../../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PasswordUpdate() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = async () => {
    const obj = await AsyncStorage.getItem("auth");
    const { token } = JSON.parse(obj);

    try {
      if (password && newPassword) {
        await axios.put(
          "/auth/user/updatepassword",
          {
            oldpassword: password,
            newpassword: newPassword,
          },
          { headers: { token } }
        );
      }
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 20,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <FontAwesome5Icon name="arrow-left" size={15} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 40,
          gap: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <View style={{ gap: 20 }}>
          <View style={{ gap: 5 }}>
            <Text>Current Password</Text>
            <TextInput
              value={password}
              style={styles.input}
              placeholder="Enter your current password"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={{ gap: 5 }}>
            <Text>New password</Text>
            <TextInput
              value={newPassword}
              style={styles.input}
              placeholder="Enter your new password"
              onChangeText={(text) => setNewPassword(text)}
            />
          </View>
          <TouchableOpacity
            onPress={changePassword}
            style={{
              height: 45,
              display: "flex",
              borderRadius: 5,
              backgroundColor: "#006442",
              width: Dimensions.get("screen").width - 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "white",
  },
  input: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#f6f6f6",
    fontWeight: "600",
    width: Dimensions.get("screen").width - 40,
  },
});
