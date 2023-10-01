import axios from "../axios";
import { useContext, useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

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
        await AsyncStorage.setItem("auth-token", res.data.token);

        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
        router.push("/profile/home");
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
        <TextInput
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          style={styles.inputContainer}
          onChangeText={(e) => setPassword(e)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          Continue
        </Text>
      </TouchableOpacity>

      <Text style={{ textAlign: "center", marginTop: 15, fontSize: 16 }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "#FF4136" }}>
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
