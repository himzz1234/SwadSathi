import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import axios from "../../../axios";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome5";
import { getValueFor } from "@/utils/lib/secure-store";

export default function PasswordUpdate() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = async () => {
    const obj = await getValueFor("auth");
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
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.replace("/")}
          style={styles.backButtonContainer}
        >
          <Icon name="angle-left" size={20} style={styles.backButtonIcon} />
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
            <Text style={styles.label}>New password</Text>
            <TextInput
              value={newPassword}
              style={styles.input}
              placeholder="Enter your new password"
              onChangeText={(text) => setNewPassword(text)}
            />
          </View>
          <LinearGradient
            colors={["#2e7653", "#355e4c"]}
            style={[styles.button]}
          >
            <TouchableOpacity
              onPress={changePassword}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#f3f3f3",
  },
  headerContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 40,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    gap: 15,
  },
  backButtonContainer: {
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderColor: "#e3e9e7",
    borderWidth: 2,
  },
  backButtonIcon: {
    color: "black",
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
    fontSize: 15,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "white",
    width: Dimensions.get("screen").width - 40,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    borderRadius: 7.5,
    paddingVertical: 15,
    elevation: 5,
  },
});
