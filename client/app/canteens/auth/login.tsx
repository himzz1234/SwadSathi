import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { AuthContext } from "@/context/auth/AuthContext";
import Ionicon from "react-native-vector-icons/Ionicons";
import axios from "@/axios";
import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { save } from "@/utils/lib/secure-store";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { dispatch } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const login = async () => {
    try {
      const res = await axios.post("/auth/canteen/login", formData);
      await save(
        "auth",
        JSON.stringify({
          token: res.data.token,
          role: "Canteen",
        })
      );

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { auth: res.data.auth, role: "Canteen" },
      });

      router.replace("/canteens/home");
    } catch (error) {
      setError("Invalid username or password!");
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
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={formData.email}
          placeholder="Email ID"
          style={styles.input}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
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

      <LinearGradient colors={["#2e7653", "#355e4c"]} style={[styles.button]}>
        <TouchableOpacity onPress={login}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </LinearGradient>

      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Link href="/canteens/auth/signup" style={styles.signupLink}>
          Signup
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
    fontSize: 30,
    fontWeight: "600",
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
  signupText: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
  },
  signupLink: {
    color: "#355e4c",
    fontWeight: "500",
  },
});
