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
import axios from "../../axios";
import { AuthContext } from "../../context/AuthContext";

export default function Scanner() {
  const { auth: user } = useContext(AuthContext);
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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            router.replace("/");
            setStopAnimation(true);
          }}
        >
          <Icon name="arrow-left" size={15} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Scan QR code</Text>
      </View>
      <View style={styles.scannerContainer}>
        <ScannerFrame {...stopAnimation} />
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[styles.barCodeScanner, { borderRadius: 20 }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
    display: "flex",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  backButton: {
    width: "20%",
  },
  headerText: {
    textAlign: "center",
    width: "60%",
    fontSize: 20,
    fontWeight: "600",
  },
  scannerContainer: {
    marginTop: 40,
    alignSelf: "center",
    position: "relative",
    width: Dimensions.get("screen").width - 40,
    height: 500,
  },
  barCodeScanner: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
  },
});
