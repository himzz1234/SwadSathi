import React, { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import * as Animatable from "react-native-animatable";

// const AnimatedLinearGradient =
//   Animatable.createAnimatableComponent(LinearGradient);

const loopAnimation = {
  0: {
    translateY: 20,
  },
  1: {
    translateY: 350,
  },
};

export default function ScannerFrame() {
  const animationRef = useRef(null);

  useEffect(() => {
    return () => {
      animationRef.current?.stopAnimation();
    };
  }, []);

  return (
    <>
      <View
        style={{
          width: 20,
          height: 20,
          borderTopWidth: 5,
          borderLeftWidth: 5,
          position: "absolute",
          top: 20,
          left: 20,
          borderColor: "#355e4c",
        }}
      ></View>
      <View
        style={{
          width: 20,
          height: 20,
          borderTopWidth: 5,
          borderRightWidth: 5,
          position: "absolute",
          top: 20,
          right: 20,
          borderColor: "#355e4c",
        }}
      ></View>
      <View
        style={{
          width: 20,
          height: 20,
          borderBottomWidth: 5,
          borderRightWidth: 5,
          position: "absolute",
          bottom: 20,
          right: 20,
          borderColor: "#355e4c",
        }}
      ></View>
      <View
        style={{
          width: 20,
          height: 20,
          borderBottomWidth: 5,
          borderLeftWidth: 5,
          position: "absolute",
          bottom: 20,
          left: 20,
          borderColor: "#355e4c",
        }}
      ></View>
    </>
  );
}

const styles = StyleSheet.create({
  scannerFrame: {
    height: 100,
    zIndex: 1,
    borderTopWidth: 5,
    borderTopColor: "rgb(254,114,76)",
    width: Dimensions.get("screen").width,
  },
});
