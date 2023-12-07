import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import axios from "../../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicon from "react-native-vector-icons/Ionicons";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    emailId: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const validation = () => {
    const validEmail = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
    const validPassword = " /^(?=.*[d])(?=.*[!@#$%^&*])[w!@#$%^&*]{6,16}$/";

    if (!formData.name) {
      setError("Name is required!");
    }
    if (!formData.address) {
      setError("Address is required!");
    }
    if (!formData.phone) {
      setError("Phone Number is required!");
    } else if (formData.phone.length != 10) {
      setError("Enter a valid phone number!");
    }
    if (!formData.emailId) {
      setError("Email is required!");
    } else if (!formData.emailId.match(validEmail)) {
      setError("Enter a valid email!");
    }
    if (!formData.password) {
      setError("Password is required!");
    } else if (!formData.password.match(validPassword)) {
      setError("Enter a valid password!");
    }
  };

  const register = async () => {
    validation();

    try {
      if (!error) {
        const res = await axios.post("/auth/admin/register", {
          ...formData,
          phoneNumber: formData.phone,
          email: formData.emailId,
          description: "",
        });

        if (res.status == 200) {
          await AsyncStorage.setItem(
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

          router.replace("/canteens/main/home");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={formData.name}
          placeholder="Canteen Name"
          style={styles.input}
          onChangeText={(e) => setFormData({ ...formData, name: e })}
        />
        <TextInput
          value={formData.address}
          placeholder="Canteen Address"
          style={styles.input}
          onChangeText={(e) => setFormData({ ...formData, address: e })}
        />
        <TextInput
          value={formData.phone}
          placeholder="Phone Number"
          style={styles.input}
          onChangeText={(e) =>
            setFormData({ ...formData, phone: e.replace(/[^0-9]/g, "") })
          }
        />
        <TextInput
          value={formData.emailId}
          placeholder="Email ID"
          style={styles.input}
          onChangeText={(e) => setFormData({ ...formData, emailId: e })}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            value={formData.password}
            placeholder="Password"
            secureTextEntry={showPassword}
            style={[styles.input, styles.passwordInput]}
            onChangeText={(e) => setFormData({ ...formData, password: e })}
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
        <Link href="/canteens/auth/login" style={styles.loginLink}>
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
    fontSize: 16,
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
