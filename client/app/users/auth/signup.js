import axios from "../../../axios";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../../context/AuthContext";

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

      await AsyncStorage.setItem(
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
      <Text style={styles.title}>Sign Up</Text>

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

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

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
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
  inputContainer: {
    marginTop: 32,
    gap: 10,
  },
  input: {
    padding: 10,
    backgroundColor: "#efeeea",
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efeeea",
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
    backgroundColor: "#fe724c",
    borderRadius: 5,
    paddingVertical: 12.5,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
  },
  loginText: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
  },
  loginLink: {
    color: "#fe724c",
  },
});
