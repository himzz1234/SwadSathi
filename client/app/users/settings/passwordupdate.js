import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import axios from "../../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <FontAwesome5Icon name="arrow-left" size={15} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.formContainer}>
          <View style={styles.formItem}>
            <Text style={styles.label}>Current Password</Text>
            <TextInput
              value={password}
              style={styles.input}
              placeholder="Enter your current password"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              value={newPassword}
              style={styles.input}
              placeholder="Enter your new password"
              onChangeText={(text) => setNewPassword(text)}
            />
          </View>
          <TouchableOpacity onPress={changePassword} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
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
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  content: {
    marginTop: 40,
    gap: 20,
    alignItems: "center",
  },
  formContainer: {
    gap: 20,
  },
  formItem: {
    gap: 5,
  },
  label: {
    fontSize: 16,
  },
  input: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#f6f6f6",
    fontWeight: "600",
    width: Dimensions.get("screen").width - 40,
  },
  saveButton: {
    height: 45,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fe724c",
    width: Dimensions.get("screen").width - 40,
    elevation: 3,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
});
