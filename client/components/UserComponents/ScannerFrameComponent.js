import React, { useEffect, useRef } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

const AnimatedLinearGradient =
  Animatable.createAnimatableComponent(LinearGradient);

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
    <AnimatedLinearGradient
      ref={animationRef}
      animation={loopAnimation}
      iterationCount="infinite"
      direction="alternate"
      style={styles.scannerFrame}
      colors={["rgba(254,114,76, 0.8)", "transparent"]}
    ></AnimatedLinearGradient>
  );
}

const styles = StyleSheet.create({
  scannerFrame: {
    height: 100,
    zIndex: 1,
    borderTopWidth: 5,
    borderTopColor: "rgb(254,114,76)",
    width: Dimensions.get("screen").width - 40,
  },
});
