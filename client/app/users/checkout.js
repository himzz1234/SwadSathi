import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import CartItem from "../../components/UserComponents/CartItemComponent";
import { CartContext } from "../../context/CartContext";
import CheckoutModal from "../../components/UserComponents/CheckoutModalComponent";
import axios from "../../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SocketContext } from "../../context/SocketContext";
import { LinearGradient } from "expo-linear-gradient";

export default function Checkout() {
  const router = useRouter();
  const { cart } = useContext(CartContext);
  const [openModal, setOpenModal] = useState(false);
  const { socket } = useContext(SocketContext);

  const onCheckout = async () => {
    const obj = await AsyncStorage.getItem("auth");
    const { token } = JSON.parse(obj);

    const res = await axios.post(
      "/orders/order",
      {
        canteen: cart[0].cId,
        orderItems: cart.map((cartItem) => ({
          qty: cartItem.qty,
          product: cartItem.id,
        })),
        totalPrice: cart.reduce(
          (total, cartItem) => total + cartItem.qty * cartItem.price,
          0
        ),
        isPaid: true,
      },
      { headers: { token } }
    );

    socket.emit("order-placed", {
      senderId: res.data.details.user._id,
      receiverId: res.data.details.canteen,
      order: res.data.details,
    });

    socket.emit("order-placed", res.data.details);
    setOpenModal(true);
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
          renderItem={({ item }) => <CartItem id={item.id} {...{ item }} />}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              ₹
              {cart.reduce(
                (total, cartItem) => total + cartItem.qty * cartItem.price,
                0
              )}
            </Text>
          </View>
          <LinearGradient
            colors={cart.length ? ["#2e7653", "#355e4c"] : ["gray", "gray"]}
            style={[styles.button, styles.checkoutButton]}
          >
            <Pressable disabled={!cart.length} onPress={onCheckout}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </Pressable>
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
