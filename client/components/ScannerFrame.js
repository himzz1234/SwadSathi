import { Dimensions } from "react-native";
import { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

AnimatedLinearGradient = Animatable.createAnimatableComponent(LinearGradient);

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
      style={{
        height: 100,
        zIndex: 1,
        borderTopWidth: 5,
        borderTopColor: "rgb(128, 210, 247)",
        width: Dimensions.get("screen").width - 20,
      }}
      colors={["rgba(128, 210, 247, 0.8)", "transparent"]}
    ></AnimatedLinearGradient>
  );
}

const loopAnimation = {
  0: {
    translateY: 0,
  },

  1: {
    translateY: 400,
  },
};
