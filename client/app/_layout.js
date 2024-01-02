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
            <StripeProvider
              urlScheme="/checkout"
              publishableKey="pk_test_51NtbHCSBOdrddaflpOZuSvJt0q5KZ77dKK4bMUwZfpXhGlzga4MBQUdrrCsJ59ozDAWVBUeT9APWsq9AK7EAMKXW00q6nGrm2M"
            >
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
