import { useContext, useEffect, useState } from "react";
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
import ScannerFrame from "../components/ScannerFrame";
import axios from "../axios";
import { AuthContext } from "../context/AuthContext";

export default function Scanner() {
  const { user } = useContext(AuthContext);
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

    const { canteenId, secret } = JSON.parse(data);
    await axios.post(`/auth/user/saveCanteenId/${canteenId}`, {
      userId: user._id,
    });

    if (secret == "my-canteen") {
      router.push({
        pathname: `/canteen/${canteenId}`,
        params: { canteenId },
      });
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 10,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ width: "20%" }}
          onPress={() => {
            router.replace("/");
            setStopAnimation(true);
          }}
        >
          <Icon name="arrow-left" size={15} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            width: "60%",
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          Scan QR code
        </Text>
      </View>
      <View
        style={{
          marginTop: 40,
          alignSelf: "center",
          position: "relative",
          width: Dimensions.get("screen").width - 20,
        }}
      >
        <ScannerFrame {...stopAnimation} />
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[
            StyleSheet.absoluteFillObject,
            { height: 500, borderRadius: 20 },
          ]}
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
});
