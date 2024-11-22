import { Slot } from "expo-router";
import { StatusBar, View, Text, StyleSheet } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AuthProvider from "@/context/auth/AuthContext";
import CartProvider from "@/context/cart/CartContext";
import SocketProvider from "@/context/socket/SocketContext";
import { StripeProvider } from "@stripe/stripe-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NotificationProvider from "@/context/notification/NotificationContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <SocketProvider>
          <NotificationProvider>
            <View style={styles.container}>
              <StripeProvider publishableKey="pk_test_51JbPb8SAyLsJj9bXrCy3HH8cN0qzzTn8hDDW8K6EsEGyCmtglDYWN1On9xzzTOuFycduXa94tqD04uUPSxMfBnKr00Y1ytrGuX">
                <StatusBar backgroundColor="#355e4c" />
                <GestureHandlerRootView>
                  <BottomSheetModalProvider>
                    <Slot />
                  </BottomSheetModalProvider>
                </GestureHandlerRootView>
              </StripeProvider>
            </View>
          </NotificationProvider>
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
