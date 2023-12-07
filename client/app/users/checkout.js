import { useContext, useState } from "react";
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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{ width: "20%" }}
          onPress={() => {
            router.back();
          }}
        >
          <Icon name="arrow-left" size={15} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            width: "60%",
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          Cart
        </Text>
      </View>
      <FlatList
        data={cart}
        style={{ marginTop: 30 }}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 10, width: "100%" }}></View>;
        }}
        renderItem={({ item }) => {
          return <CartItem id={item.id} {...{ item }} />;
        }}
        keyExtractor={(item) => item.id}
      />

      <View
        style={{
          paddingTop: 10,
          marginBottom: 20,
          borderTopWidth: 1,
          borderTopColor: "#E5E4E2",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "500", fontSize: 16, color: "#9e9ea0" }}>
          Subtotal
        </Text>
        <Text style={{ fontWeight: "600", fontSize: 18 }}>
          ₹
          {cart.reduce(
            (total, cartItem) => total + cartItem.qty * cartItem.price,
            0
          )}
        </Text>
      </View>

      <Pressable
        disabled={!cart.length}
        onPress={onCheckout}
        style={[
          !cart.length
            ? { backgroundColor: "gray" }
            : { backgroundColor: "#fe724c" },
          {
            width: "100%",
            paddingVertical: 15,
            borderRadius: 5,
            elevation: 2,
          },
        ]}
      >
        <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>
          Checkout
        </Text>
      </Pressable>

      <CheckoutModal {...{ openModal }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});
