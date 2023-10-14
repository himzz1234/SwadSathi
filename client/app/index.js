import axios from "../axios";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "expo-router";
import AppLogo from "../components/AppLogo";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";

export default function Page() {
  const router = useRouter();
  const { dispatch } = useContext(AuthContext);

  let [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     dispatch({ type: "LOGIN_START" });
  //     const token = await AsyncStorage.getItem("auth-token");

  //     if (token) {
  //       try {
  //         const res = await axios.get("/auth/user/getdetails", {
  //           headers: {
  //             "auth-token": token,
  //           },
  //         });

  //         if (res.data) {
  //           dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  //           // router.replace("/canteens/main/home");

  //           return;
  //         } else {
  //           dispatch({ type: "LOGIN_FAILURE" });
  //         }
  //       } catch (error) {
  //         dispatch({ type: "LOGIN_FAILURE" });
  //       }
  //     } else {
  //       dispatch({ type: "LOGIN_FAILURE" });
  //     }

  //     // router.replace("/canteens/main/home");
  //   };

  //   fetchUser();
  // }, []);

  return (
    <View style={styles.container}>
      <AppLogo />

      <View style={{ flex: 1 }}></View>

      <View style={{ gap: 10 }}>
        <TouchableOpacity
          onPress={() => router.push("/users/auth/signup")}
          style={styles.buttonPrimary}
        >
          <Text style={[styles.buttonText, { color: "white" }]}>
            Register my Self
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/canteens/auth/signup")}
          style={styles.buttonSecondary}
        >
          <Text style={styles.buttonText}>Register my Canteen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    paddingVertical: 40,
    paddingHorizontal: 40,
  },
  buttonPrimary: {
    borderWidth: 2,
    borderColor: "transparent",
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonSecondary: {
    borderWidth: 2,
    borderColor: "#4CAF50",
    width: "100%",
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#4CAF50",
    fontSize: 17,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
  },
});
