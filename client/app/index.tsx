import axios from "@/axios";
import SwiperComponent from "@/components/SwiperComponent";
import { AuthContext } from "@/context/auth/AuthContext";
import { getValueFor } from "@/utils/lib/secure-store";
import { useRouter } from "expo-router";
import { Dispatch, useContext, useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext<AuthContextType>(AuthContext);

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

      try {
        const obj = await getValueFor("auth");
        let auth = obj ? JSON.parse(obj) : null;

        if (auth && auth.token && auth.role) {
          const { token, role } = auth;
          let res;

          if (role === "User") {
            res = await axios.get("/auth/user/getDetails", {
              headers: { token },
            });
          } else {
            res = await axios.get("/auth/canteen/getDetails", {
              headers: { token },
            });
          }

          if (res.data) {
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: { auth: res.data.auth, role: res.data.role },
            });

            setLoading(false);

            if (role === "User") {
              router.replace("/users/home");
            } else {
              router.replace("/canteens/home");
            }
          } else {
            throw new Error("Not a valid request!");
          }
        } else {
          throw new Error("Invalid authentication details");
        }
      } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: { error: true } });
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
