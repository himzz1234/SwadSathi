import { Slot } from "expo-router";
import AuthProvider from "../context/AuthContext";
import { View, StyleSheet } from "react-native";
import CartProvider from "../context/CartContext";

export default function Root() {
  return (
    <AuthProvider>
      <CartProvider>
        <View style={styles.container}>
          <Slot />
        </View>
      </CartProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});
