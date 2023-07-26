import { Slot } from "expo-router";
import AuthProvider from "../context/AuthContext";
import { View, StyleSheet } from "react-native";

export default function Root() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <Slot />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});
