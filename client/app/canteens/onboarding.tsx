import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { AuthContext } from "@/context/auth/AuthContext";

const imageStyle = {
  resizeMode: "cover",
  width: "100%",
  flex: 1,
  borderRadius: 999,
};

const circleStyle = {
  borderWidth: 2,
  borderRadius: 999,
  borderColor: "white",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function OnboardingCanteen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.mainCircle}>
          <Image
            source={require("../../assets/images/canteen_illustration_1.png")}
            style={styles.mainImage}
          />
          <View style={[styles.circle, styles.bottomLeft]}>
            <Image
              source={require("../../assets/images/canteen-1.jpg")}
              style={imageStyle}
            />
          </View>
          <View style={[styles.circle, styles.topRight]}>
            <Image
              source={require("../../assets/images/canteen-2.jpg")}
              style={imageStyle}
            />
          </View>
          <View style={[styles.circle, styles.bottomRight]}>
            <Image
              source={require("../../assets/images/canteen-3.jpg")}
              style={imageStyle}
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>
            Register your canteen on the app and take it online.
          </Text>
          <Text style={styles.subheading}>
            Digitize your canteen with our app. Expand reach, streamline orders
            for the future of food service.
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.push("/canteens/auth/signup")}
          style={styles.getStartedButton}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/canteens/auth/login")}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Login</Text>
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
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 7.5,
  },
  mainCircle: {
    width: 250,
    height: 250,
    backgroundColor: "#e3e9e7",
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  mainImage: {
    resizeMode: "contain",
    width: "80%",
    flex: 1,
  },
  circle: {
    borderWidth: 2,
    borderRadius: 999,
    borderColor: "white",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
  bottomLeft: {
    bottom: 50,
    left: -25,
    width: 50,
    height: 50,
  },
  topRight: {
    top: -10,
    right: 40,
    width: 40,
    height: 40,
  },
  bottomRight: {
    bottom: 10,
    right: 30,
    width: 30,
    height: 30,
  },
  textContainer: {
    marginTop: 24,
    gap: 10,
  },
  heading: {
    fontWeight: "700",
    fontSize: 22.5,
    lineHeight: 35,
    textAlign: "center",
  },
  subheading: {
    textAlign: "center",
    color: "gray",
    lineHeight: 22,
    fontSize: 15,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 40,
    width: "100%",
  },
  getStartedButton: {
    backgroundColor: "#2e7455",
    paddingVertical: 15,
    elevation: 3,
    borderRadius: 7.5,
  },
  loginButton: {
    backgroundColor: "#e3e9e7",
    paddingVertical: 15,
    borderRadius: 7.5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  loginButtonText: {
    color: "#2e7455",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});
