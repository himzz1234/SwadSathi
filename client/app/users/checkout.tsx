import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import CartItem from "../../components/UserComponents/CartItemComponent";
import { CartContext } from "@/context/cart/CartContext";
import CheckoutModal from "../../components/UserComponents/CheckoutModalComponent";
import axios from "../../axios";
import { SocketContext } from "@/context/socket/SocketContext";
import { useStripe } from "@stripe/stripe-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "@/context/auth/AuthContext";
import { getValueFor } from "@/utils/lib/secure-store";
import AnimatedNumberDisplay from "@/animations/AnimatedNumbers";

export default function Checkout() {
  const router = useRouter();
  const { cart } = useContext(CartContext);
  const [openModal, setOpenModal] = useState(false);
  const { socket } = useContext(SocketContext);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { auth: user } = useContext(AuthContext);

  const createPaymentIntent = async () => {
    const res = await axios.post(
      `/orders/payment-sheet`,
      {
        total: cart.reduce(
          (total, cartItem) => total + cartItem.qty * cartItem.price,
          0
        ),
        id: user._id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  };

  const onCheckout = async () => {
    const res = await createPaymentIntent();
    if (res.error) {
      return;
    }

    const { error: initError } = await initPaymentSheet({
      merchantDisplayName: "SwadSathi",
      paymentIntentClientSecret: res.data.paymentIntent,
      appearance: {
        colors: {
          primary: "#2e7653",
          background: "#FFFFFF",
          componentBackground: "#FFFFFF",
          componentBorder: "#E4E4E4",
          componentDivider: "#E4E4E4",
          primaryText: "#000000",
          secondaryText: "#000000",
          componentText: "#000000",
          placeholderText: "#C7C7C7",
          icon: "#73757b",
          error: "#FF0000",
        },
      },
      defaultBillingDetails: {
        name: "John Cena",
      },
      allowsDelayedPaymentMethods: true,
    });

    if (initError) {
      return;
    }

    const { error, paymentOption } = await presentPaymentSheet();
    if (error) {
      return;
    }

    createOrder();
  };

  const createOrder = async () => {
    console.log("hi");
    const obj = await getValueFor("auth");
    let { token } = obj ? JSON.parse(obj) : null;

    const res = await axios.post(
      "/orders/order",
      {
        canteen: cart[0].cId,
        orderItems: cart.map((cartItem) => ({
          qty: cartItem.qty,
          product: cartItem.id,
          orderType: cartItem.type,
        })),
        totalPrice: cart.reduce(
          (total, cartItem) => total + cartItem.qty * cartItem.price,
          0
        ),
        isPaid: true,
      },
      { headers: { token } }
    );

    if (socket) {
      socket.emit("order-placed", {
        senderId: res.data.details.user._id,
        receiverId: res.data.details.canteen,
        order: res.data.details,
      });

      socket.emit("order-placed", res.data.details);
      setOpenModal(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButtonContainer}
        >
          <Icon name="angle-left" size={20} style={styles.backButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cart</Text>
      </View>

      <View style={styles.contentContainer}>
        <FlatList
          data={cart}
          style={styles.flatList}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator}></View>
          )}
          renderItem={({ item }) => {
            return <CartItem id={`${item.id}_${item.type}`} {...{ item }} />;
          }}
          keyExtractor={(item) => `${item.id}_${item.type}`}
        />

        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <AnimatedNumberDisplay
              value={cart.reduce(
                (total, cartItem) => total + cartItem.qty * cartItem.price,
                0
              )}
              prefix="₹"
              digitStyle={styles.summaryValue}
            />
          </View>

          <LinearGradient
            colors={["#2e7653", "#355e4c"]}
            style={[styles.button, styles.checkoutButton]}
          >
            <TouchableOpacity onPress={onCheckout}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>

      <CheckoutModal {...{ openModal }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#f3f3f3",
  },
  headerContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 40,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    gap: 15,
  },
  backButtonContainer: {
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    borderColor: "#e3e9e7",
    borderWidth: 2,
  },
  backButtonIcon: {
    color: "black",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
    marginTop: 20,
  },
  flatList: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  itemSeparator: {
    height: 10,
    width: "100%",
  },
  summaryContainer: {
    backgroundColor: "white",
    paddingBottom: 10,
    paddingTop: 15,
    gap: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  summaryRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: "#e3e9e7",
    paddingBottom: 20,
  },
  summaryLabel: {
    fontWeight: "500",
    fontSize: 16,
    color: "#9e9ea0",
  },
  summaryValue: {
    fontWeight: "600",
    fontSize: 18,
  },
  button: {
    borderRadius: 7.5,
    paddingVertical: 15,
    elevation: 5,
  },
  checkoutButton: {
    marginTop: 10,
  },
  checkoutButtonText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
});
