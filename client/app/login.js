import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../axios";
import { Link, useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(AuthContext);
  const router = useRouter();

  const login = async () => {
    const credentials = {
      email,
      password,
    };

    const res = await axios.post("/auth/user/login", credentials);

    if (res.status == 200) {
      await AsyncStorage.setItem("auth-token", res.data.token);

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
      router.replace("/profile/home");
    } else {
      console.log("Something went wrong!");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 600 }}>Login</Text>

      <View style={{ display: "flex", gap: 10, marginVertical: 32 }}>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email ID"
          style={styles.inputContainer}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          placeholder="Password"
          style={styles.inputContainer}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          Login
        </Text>
      </TouchableOpacity>

      <Text style={{ textAlign: "center", marginTop: 15, fontSize: 16 }}>
        Don't have an account?{" "}
        <Link href="/signup" style={{ color: "#FF4136" }}>
          Signup
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
