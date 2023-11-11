import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
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
  const register = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 600 }}>Sign Up</Text>

      <View style={{ display: "flex", gap: 10, marginVertical: 32 }}>
        <TextInput
          value={formData.name}
          placeholder="Canteen Name"
          style={styles.inputContainer}
          onChangeText={(e) => setFormData({ ...formData, name: e })}
        />
        <TextInput
          value={formData.address}
          placeholder="Canteen Address"
          style={styles.inputContainer}
          onChangeText={(e) => setFormData({ ...formData, address: e })}
        />
        <TextInput
          value={formData.phone}
          placeholder="Phone Number"
          style={styles.inputContainer}
          onChangeText={(e) =>
            setFormData({ ...formData, phone: e.replace(/[^0-9]/g, "") })
          }
        />
        <TextInput
          value={formData.emailId}
          placeholder="Email ID"
          style={styles.inputContainer}
          onChangeText={(e) => setFormData({ ...formData, emailId: e })}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#efeeea",
            paddingRight: 10,
          }}
        >
          <TextInput
            value={formData.password}
            placeholder="Password"
            secureTextEntry={showPassword}
            style={[styles.inputContainer, { flex: 1 }]}
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

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          Continue
        </Text>
      </TouchableOpacity>

      <Text style={{ textAlign: "center", marginTop: 15, fontSize: 16 }}>
        Already have an account?{" "}
        <Link href="/canteens/auth/login" style={{ color: "#006442" }}>
          Login
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  inputContainer: {
    padding: 10,
    backgroundColor: "#efeeea",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#006442",
    borderRadius: 5,
    paddingVertical: 12.5,
    elevation: 3,
  },
});
