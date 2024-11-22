import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";
import ScannerFrame from "../../components/UserComponents/ScannerFrameComponent";
import axios from "@/axios";
import { AuthContext } from "@/context/auth/AuthContext";
import { Camera } from "expo-camera";

export default function Scanner() {
  const [stopAnimation, setStopAnimation] = useState();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    requestCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    try {
      const { canteenId, secret } = JSON.parse(data);
      await axios.post(`/auth/user/saveCanteenId/${canteenId}`, {
        userId: user._id,
      });

      console.log(canteenId, secret);

      if (secret == "my-canteen") {
        router.push({
          pathname: `/users/canteen/${canteenId}`,
          params: { canteenId },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButtonContainer}
        >
          <Icon name="angle-left" size={20} style={styles.backButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Scan QR Code</Text>
      </View>

      <View style={styles.scannerContainer}>
        <Text
          style={{
            textAlign: "center",
            paddingHorizontal: 25,
            paddingBottom: 20,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Unlock the menu instantly using the QR Code
        </Text>
        <View
          style={{
            backgroundColor: "white",
            height: 400,
            borderRadius: 7.5,
            width: Dimensions.get("screen").width - 60,
            position: "relative",
          }}
        >
          <ScannerFrame {...stopAnimation} />
          <Camera
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            ratio="4:3"
            style={[styles.barCodeScanner, { borderRadius: 20 }]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    paddingTop: 40,
    display: "flex",
    flexDirection: "column",
  },
  headerContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 40,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    gap: 15,
  },
  backButtonContainer: {
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderColor: "#e3e9e7",
    borderWidth: 2,
  },
  backButtonIcon: {
    color: "black",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
  scannerContainer: {
    flex: 1,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  barCodeScanner: {
    margin: 35,
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
