import axios from "../axios";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "expo-router";

export default function Page() {
  const router = useRouter();
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch({ type: "LOGIN_START" });
      const token = await AsyncStorage.getItem("auth-token");

      if (token) {
        try {
          const res = await axios.get("/auth/user/getdetails", {
            headers: {
              "auth-token": token,
            },
          });

          if (res.data) {
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            router.replace("/profile/home");

            return;
          } else {
            dispatch({ type: "LOGIN_FAILURE" });
          }
        } catch (error) {
          dispatch({ type: "LOGIN_FAILURE" });
        }
      } else {
        dispatch({ type: "LOGIN_FAILURE" });
      }

      router.replace("/main");
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={80} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
