import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { router } from "expo-router";

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    requestCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data: canteenId }) => {
    setScanned(true);
    router.push({ pathname: `/canteen/${canteenId}` });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Text>fefe</Text>
      </TouchableOpacity>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, { height: 500, marginTop: 100 }]}
      />
      <View
        style={{
          backgroundColor: "black",
          paddingVertical: 20,
          alignSelf: "center",
          marginTop: 100,
          position: "relative",
        }}
      >
        {/* 
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 20,
            borderLeftColor: "black",
            borderLeftWidth: 5,
            borderTopColor: "black",
            borderTopWidth: 5,
            height: 30,
            width: 30,
          }}
        ></View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 20,
            borderRightColor: "black",
            borderRightWidth: 5,
            borderBottomColor: "black",
            borderBottomWidth: 5,
            height: 30,
            width: 30,
          }}
        ></View>
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 20,
            borderRightColor: "black",
            borderRightWidth: 5,
            borderTopColor: "black",
            borderTopWidth: 5,
            height: 30,
            width: 30,
          }}
        ></View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 20,
            borderLeftColor: "black",
            borderLeftWidth: 5,
            borderBottomColor: "black",
            borderBottomWidth: 5,
            height: 30,
            width: 30,
          }}
        ></View> */}
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
