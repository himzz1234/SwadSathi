import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function NavigationCanteen() {
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
            source={require("../../assets/images/canteen_illustration_1.png")}
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
              source={require("../../assets/images/canteen-1.jpg")}
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
              source={require("../../assets/images/canteen-2.jpg")}
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
              source={require("../../assets/images/canteen-3.jpg")}
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
            Register your canteen on the app and take it online.
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              lineHeight: 22,
              fontSize: 15,
            }}
          >
            Digitize your canteen with our app. Expand reach, streamline orders
            for the future of food service.
          </Text>
        </View>
      </View>

      <View style={{ gap: 12, marginTop: 40, width: "100%" }}>
        <TouchableOpacity
          onPress={() => router.push("/canteens/auth/signup")}
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
          onPress={() => router.push("/canteens/auth/login")}
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
