import React, { useContext, useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "@/context/auth/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "@/axios";
import { save } from "@/utils/lib/secure-store";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    emailId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState("");

  const validation = () => {
    const validEmail = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
    if (!formData.username) {
      setError("Name is required!");
    }

    if (!formData.emailId) {
      setError("Email is required!");
    } else if (!formData.emailId.match(validEmail)) {
      setError("Enter a valid email!");
    }

    if (!formData.password) {
      setError("Password is required!");
    }
  };

  const register = async () => {
    const newData = {
      name: formData.username,
      email: formData.emailId,
      password: formData.password,
    };

    validation();
    try {
      const res = await axios.post("/auth/user/register", newData);

      await save(
        "auth",
        JSON.stringify({
          token: res.data.token,
          role: "User",
        })
      );

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { auth: res.data.auth, role: "User" },
      });
      router.push("/users/main/home");
    } catch (error) {
      console.log(error);
    }
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

      <Text style={styles.title}>Create</Text>
      <Text style={styles.title}>Account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={formData.username}
          placeholder="Username"
          style={styles.input}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
        />
        <TextInput
          value={formData.emailId}
          placeholder="Email ID"
          style={styles.input}
          onChangeText={(text) => setFormData({ ...formData, emailId: text })}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            value={formData.password}
            placeholder="Password"
            secureTextEntry={showPassword}
            style={[styles.input, styles.passwordInput]}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
          />
          {!showPassword ? (
            <Pressable onPress={() => setShowPassword(true)}>
              <Ionicon name="eye" size={20} />
            </Pressable>
          ) : (
            <Pressable onPress={() => setShowPassword(false)}>
              <Ionicon name="eye-off" size={20} />
            </Pressable>
          )}
        </View>
      </View>

      <Text style={styles.errorText}>{error}</Text>

      <LinearGradient
        colors={["#2e7653", "#355e4c"]}
        style={[styles.button, styles.saveButton]}
      >
        <TouchableOpacity onPress={register}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </LinearGradient>

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Link href="/users/auth/login" style={styles.loginLink}>
          Login
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
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
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
  inputContainer: {
    marginTop: 32,
    gap: 10,
  },
  input: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingRight: 10,
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
  },
  errorText: {
    marginVertical: 10,
    color: "#e40613",
    fontWeight: "500",
  },
  button: {
    borderRadius: 7.5,
    paddingVertical: 15,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  loginText: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
  },
  loginLink: {
    color: "#355e4c",
    fontWeight: "500",
  },
});
