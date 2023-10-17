import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../../axios";
import Ionicon from "react-native-vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const router = useRouter();

  const login = async () => {
    const credentials = {
      email,
      password,
    };

    const res = await axios.post("/auth/user/login", credentials);

    if (res.status == 200) {
      await AsyncStorage.setItem(
        "auth",
        JSON.stringify({
          token: res.data.token,
          role: "User",
        })
      );

      console.log(res.data.auth);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { auth: res.data.auth, role: "User" },
      });
      router.replace("/users/main/home");
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
            value={password}
            placeholder="Password"
            secureTextEntry={showPassword}
            style={[styles.inputContainer, { flex: 1 }]}
            onChangeText={(e) => setPassword(e)}
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

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          Login
        </Text>
      </TouchableOpacity>

      <Text style={{ textAlign: "center", marginTop: 15, fontSize: 16 }}>
        Don't have an account?{" "}
        <Link href="/users/auth/signup" style={{ color: "#006442" }}>
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
    backgroundColor: "#006442",
    borderRadius: 5,
    paddingVertical: 12.5,
    elevation: 3,
  },
});
