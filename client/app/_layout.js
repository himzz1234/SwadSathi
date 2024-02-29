import { Slot } from "expo-router";
import AuthProvider from "../context/AuthContext";
import { View, StyleSheet } from "react-native";
import CartProvider from "../context/CartContext";
import { StripeProvider } from "@stripe/stripe-react-native";
import SocketProvider from "../context/SocketContext";
import { StatusBar } from "expo-status-bar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function Root() {
  return (
    <AuthProvider>
      <CartProvider>
        <SocketProvider>
          <View style={styles.container}>
            <StripeProvider publishableKey="pk_test_51JbPb8SAyLsJj9bXrCy3HH8cN0qzzTn8hDDW8K6EsEGyCmtglDYWN1On9xzzTOuFycduXa94tqD04uUPSxMfBnKr00Y1ytrGuX">
              <StatusBar style="light" backgroundColor="#355e4c" />

              <BottomSheetModalProvider>
                <Slot />
              </BottomSheetModalProvider>
            </StripeProvider>
          </View>
        </SocketProvider>
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
