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
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SwiperComponent from "../components/SwiperComponent";

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
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#2e7455" />
        </View>
      ) : (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SwiperComponent />
        </GestureHandlerRootView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
