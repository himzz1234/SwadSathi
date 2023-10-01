import { Slot } from "expo-router";
import AuthProvider from "../context/AuthContext";
import { View, StyleSheet } from "react-native";
import CartProvider from "../context/CartContext";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function Root() {
  return (
    <AuthProvider>
      <CartProvider>
        <StripeProvider publishableKey="pk_test_51NtbHCSBOdrddaflpOZuSvJt0q5KZ77dKK4bMUwZfpXhGlzga4MBQUdrrCsJ59ozDAWVBUeT9APWsq9AK7EAMKXW00q6nGrm2M">
          <View style={styles.container}>
            <Slot />
          </View>
        </StripeProvider>
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
