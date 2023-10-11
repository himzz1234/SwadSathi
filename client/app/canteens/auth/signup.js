import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import axios from "../../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    emailId: "",
    password: "",
  });

  const register = async () => {
    try {
      const res = await axios.post("/auth/admin/register", {
        ...formData,
        phoneNumber: formData.phone,
        email: formData.emailId,
        description: "",
      });

      if (res.status == 200) {
        await AsyncStorage.setItem("auth-token", res.data.token);
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
        <TextInput
          value={formData.password}
          secureTextEntry={true}
          placeholder="Password"
          style={styles.inputContainer}
          onChangeText={(e) => setFormData({ ...formData, password: e })}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          Continue
        </Text>
      </TouchableOpacity>

      <Text style={{ textAlign: "center", marginTop: 15, fontSize: 16 }}>
        Already have an account?{" "}
        <Link href="/canteens/auth/login" style={{ color: "#FF4136" }}>
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
    backgroundColor: "#FF4136",
    paddingVertical: 10,
    borderRadius: 5,
  },
});
