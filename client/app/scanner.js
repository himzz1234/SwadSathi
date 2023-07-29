import { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome5";
import ScannerFrame from "../components/ScannerFrame";

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

    const { canteenId, secret } = JSON.parse(data);
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
      <View style={{ position: "relative", marginTop: 40 }}>
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
