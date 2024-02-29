import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function NavigationUser() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 7.5,
        }}
      >
        <View
          style={{
            width: 250,
            height: 250,
            backgroundColor: "#e3e9e7",
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Image
            source={require("../../assets/images/user_illustration_1.png")}
            style={{ resizeMode: "contain", width: "80%", flex: 1 }}
          />

          <View
            style={{
              position: "absolute",
              bottom: 50,
              left: -25,
              width: 50,
              height: 50,
              borderWidth: 2,
              borderRadius: 999,
              borderColor: "white",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/images/food.jpg")}
              style={{
                resizeMode: "contain",
                width: "100%",
                flex: 1,
                borderRadius: 999,
              }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              top: -10,
              right: 40,
              width: 40,
              height: 40,
              borderWidth: 2,
              borderRadius: 999,
              borderColor: "white",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/images/food-1.jpg")}
              style={{
                resizeMode: "contain",
                width: "100%",
                flex: 1,
                borderRadius: 999,
              }}
            />
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 10,
              right: 30,
              width: 30,
              height: 30,
              borderWidth: 2,
              borderRadius: 999,
              borderColor: "white",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/images/food-2.jpg")}
              style={{
                resizeMode: "contain",
                width: "100%",
                flex: 1,
                borderRadius: 999,
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 24, gap: 10 }}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 22.5,
              lineHeight: 35,
              textAlign: "center",
            }}
          >
            Skip crowds, order easily from local canteens!
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              lineHeight: 22,
              fontSize: 15,
            }}
          >
            Order with ease from local canteens on our app. Skip crowds, enjoy
            convenience at your fingertips.
          </Text>
        </View>
      </View>
      <View style={{ gap: 12, marginTop: 40, width: "100%" }}>
        <TouchableOpacity
          onPress={() => router.push("/users/auth/signup")}
          style={{
            backgroundColor: "#2e7455",
            paddingVertical: 15,
            elevation: 3,
            borderRadius: 7.5,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/users/auth/login")}
          style={{
            backgroundColor: "#e3e9e7",
            paddingVertical: 15,
            borderRadius: 7.5,
          }}
        >
          <Text
            style={{
              color: "#2e7455",
              fontSize: 16,
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    backgroundColor: "#f3f3f3",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
