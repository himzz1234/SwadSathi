import axios from "../axios";
import { useRouter } from "expo-router";
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
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

export default function Page() {
  const router = useRouter();
  const { dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const btnanimation = {
    0: {
      opacity: 0,
      translateY: -20,
    },
    1: {
      opacity: 1,
      translateY: 0,
    },
  };

  const logoanimation = {
    0: {
      scale: 1.5,
      opacity: 1,
      translateY: 60,
    },
    0.8: {
      scale: 1,
      opacity: 1,
      translateY: 60,
    },

    1: {
      scale: 1,
      opacity: 1,
      translateY: 0,
    },
  };

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
        <View style={styles.containerContent}>
          <Animatable.Image
            duration={2000}
            source={require("../assets/images/logo2.png")}
            animation={logoanimation}
            style={{ alignSelf: "center", width: 240, height: 50 }}
          />
          <View style={{ flex: 1 }}></View>
          <Animatable.View
            delay={1000}
            animation={btnanimation}
            style={{
              gap: 10,
              marginTop: 40,
            }}
          >
            <LinearGradient
              colors={["#2e7653", "#355e4c"]}
              style={styles.buttonPrimary}
            >
              <TouchableOpacity
                onPress={() => router.push("/users/auth/signup")}
                style={[styles.button]}
              >
                <Text style={[styles.buttonText, { color: "white" }]}>
                  Sign up as a user
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity
              onPress={() => router.push("/canteens/auth/signup")}
              style={[styles.button, styles.buttonSecondary]}
            >
              <Text style={styles.buttonText}>Sign up as a canteen</Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
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
    justifyContent: "center",
    backgroundColor: "#f3f3f3",
  },
  containerContent: {
    display: "flex",
    gap: 10,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonPrimary: {
    borderRadius: 7.5,
    borderWidth: 0,
  },
  buttonSecondary: {
    backgroundColor: "#e3e9e7",
  },
  buttonText: {
    color: "#355e4c",
    fontSize: 18,
    textAlign: "center",
  },
});
