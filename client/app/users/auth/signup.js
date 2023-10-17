import axios from "../../../axios";
import { useContext, useState } from "react";
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
  const [username, setUsername] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const router = useRouter();

  const register = async () => {
    const newData = {
      name: username,
      email: emailId,
      password: password,
    };

    try {
      const res = await axios.post("/auth/user/register", newData);

      if (res.status == 200) {
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
          value={username}
          placeholder="Username"
          style={styles.inputContainer}
          onChangeText={(e) => setUsername(e)}
        />
        <TextInput
          value={emailId}
          placeholder="Email ID"
          style={styles.inputContainer}
          onChangeText={(e) => setEmailId(e)}
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

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 17 }}>
          Continue
        </Text>
      </TouchableOpacity>

      <Text style={{ textAlign: "center", marginTop: 15, fontSize: 16 }}>
        Already have an account?{" "}
        <Link href="/users/auth/login" style={{ color: "#006442" }}>
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
