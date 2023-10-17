import axios from "../axios";
import { useRouter } from "expo-router";
import AppLogo from "../components/AppLogo";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function Page() {
  const router = useRouter();
  const { dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch({ type: "LOGIN_START" });
      setLoading(true);

      const obj = await AsyncStorage.getItem("auth");
      const auth = JSON.parse(obj);

      if (auth && auth.token && auth.role) {
        const { token, role } = auth;
        try {
          if (role == "User") {
            var res = await axios.get("/auth/user/getDetails", {
              headers: {
                token,
              },
            });
          } else {
            var res = await axios.get("/auth/admin/getDetails", {
              headers: {
                token,
              },
            });
          }

          if (res.data) {
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: { auth: res.data.auth, role: res.data.role },
            });

            setLoading(false);
            if (role == "User") {
              router.replace("/users/main/home");
            } else router.replace("/canteens/main/home");

            return;
          } else {
            dispatch({ type: "LOGIN_FAILURE" });
            setLoading(false);
          }
        } catch (error) {
          dispatch({ type: "LOGIN_FAILURE" });
          setLoading(false);
        }
      } else {
        dispatch({ type: "LOGIN_FAILURE" });
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <AppLogo />

          <View style={{ flex: 1 }}></View>
          <View
            style={{
              gap: 10,
              marginTop: 40,
            }}
          >
            <TouchableOpacity
              onPress={() => router.push("/users/auth/signup")}
              style={[styles.button, styles.buttonPrimary]}
            >
              <Text style={[styles.buttonText, { color: "white" }]}>
                Sign up as a user
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/canteens/auth/signup")}
              style={[styles.button, styles.buttonSecondary]}
            >
              <Text style={styles.buttonText}>Sign up as a canteen</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  button: {
    borderWidth: 2,
    paddingVertical: 15,
    elevation: 3,
    borderRadius: 5,
  },
  buttonPrimary: {
    borderColor: "transparent",
    backgroundColor: "#006442",
  },
  buttonSecondary: {
    borderWidth: 2,
    borderColor: "#006442",
    backgroundColor: "white",
  },
  buttonText: {
    color: "#006442",
    fontSize: 18,
    textAlign: "center",
  },
});
