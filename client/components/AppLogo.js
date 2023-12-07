import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
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
      <Text style={[styles.text, { fontFamily: "PlayfairDisplay_400Regular" }]}>
        Swad
      </Text>
      <Text
        style={[
          styles.text,
          { fontFamily: "PlayfairDisplay_600SemiBold", color: "#006442" },
        ]}
      >
        Sathi
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    fontWeight: "400",
  },
});
