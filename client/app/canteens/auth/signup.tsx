import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { Link, useRouter } from "expo-router";
import axios from "@/axios";
import Ionicon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome5";
import { save } from "@/utils/lib/secure-store";
import { AuthContext } from "@/context/auth/AuthContext";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    emailId: "",
    password: "",
  });

  const { dispatch } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

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
    }
  };

  const register = async () => {
    validation();

    try {
      if (!error) {
        const res = await axios.post("/auth/canteen/register", {
          ...formData,
          phoneNumber: formData.phone,
          email: formData.emailId,
          description: "",
        });

        if (res.status == 200) {
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
        }
      }
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

      <LinearGradient colors={["#2e7653", "#355e4c"]} style={[styles.button]}>
        <TouchableOpacity onPress={register}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </LinearGradient>

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
