import { View, Text } from "react-native";
import React from "react";
import {
  useFonts,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_600SemiBold,
} from "@expo-google-fonts/playfair-display";

export default function AppLogo() {
  let [fontsLoaded, fontError] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        alignSelf: "center",
      }}
    >
      <Text
        style={{
          fontSize: 40,
          fontWeight: "400",
          fontFamily: "PlayfairDisplay_400Regular",
        }}
      >
        Swad
      </Text>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "400",
          fontFamily: "PlayfairDisplay_600SemiBold",
        }}
      >
        Sathi
      </Text>
    </View>
  );
}
