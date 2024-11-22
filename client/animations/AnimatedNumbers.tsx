import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const DIGITS = Array.from({ length: 10 }, (_, index) => index);

function AnimatedDigit({ digit, digitHeight, digitStyle }) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(-Number(digit) * digitHeight, {
      duration: 400,
    });
  }, [digit, digitHeight, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={{ height: digitHeight, overflow: "hidden" }}>
      <Animated.View style={animatedStyle}>
        {DIGITS.map((number) => (
          <Text key={number} style={digitStyle}>
            {number}
          </Text>
        ))}
      </Animated.View>
    </View>
  );
}

export default function AnimatedNumberDisplay({ value, digitStyle, prefix }) {
  const digitRef = useRef(null);
  const valueString = value.toString();
  const [digitHeight, setDigitHeight] = useState(0);

  const onDigitLayout = useCallback((event) => {
    setDigitHeight(event.nativeEvent.layout.height);
  }, []);

  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {prefix && <Text style={digitStyle}>{prefix}</Text>}
        {valueString.split("").map((char, index) => (
          <AnimatedDigit
            key={index}
            digit={char}
            digitHeight={digitHeight}
            digitStyle={digitStyle}
          />
        ))}
      </View>
      <Text
        ref={digitRef}
        onLayout={onDigitLayout}
        style={[
          digitStyle,
          {
            position: "absolute",
            opacity: 0,
          },
        ]}
      >
        0
      </Text>
    </>
  );
}
