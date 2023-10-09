import { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { CartContext } from "../context/CartContext";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import Payment from "../components/PaymentComponent";

export default function Checkout() {
  const { cart, dispatch } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  const addItem = (item) => {
    setQuantity((prev) => prev + 1);

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item._id,
        cId: item.canteenId,
        name: item.name,
        price: item.price,
        image: item.image,
        qty: 1,
      },
    });
  };

  const removeItem = (item) => {
    if (!quantity) return;

    setQuantity((prev) => prev - 1);
    dispatch({ type: "REMOVE_ITEM", payload: item._id });
  };

  const router = useRouter();
  const [showPayment, setShowPayment] = useState(false);

  const onCheckout = () => {
    setShowPayment(true);
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
          setQuantity(
            cart.findIndex((citem) => citem.id == item._id) > -1
              ? cart.find((citem) => citem.id == item._id).qty
              : 1
          );

          return (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                backgroundColor: "#F8F8F8",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 80, height: 80, borderRadius: 5 }}
              />
              <View style={{ flex: 1, rowGap: 5 }}>
                <Text style={{ fontSize: 16 }}>{item.name}</Text>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  ₹{item.price}
                </Text>
              </View>

              <View>
                <Text style={{ fontWeight: "bold" }}>x{item.qty}</Text>
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    backgroundColor: "#e9e9e9",
                    width: 100,
                    borderRadius: 5,
                    height: 36,
                    gap: 5,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => removeItem(item)}
                    style={{
                      borderRightWidth: 1,
                      paddingHorizontal: 10,
                      borderRightColor: "#c1bfbf",
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>-</Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 15, fontWeight: 600 }}>
                    {quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => addItem(item)}
                    style={{
                      borderLeftWidth: 1,
                      paddingHorizontal: 10,
                      borderLeftColor: "#c1bfbf",
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 17 }}>
          Total: ₹
          {cart.reduce(
            (total, cartItem) => total + cartItem.qty * cartItem.price,
            0
          )}
        </Text>
      </View>

      <Pressable
        onPress={onCheckout}
        style={{
          width: "100%",
          backgroundColor: "#FF6347",
          paddingVertical: 15,
          borderRadius: 5,
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>
          Checkout
        </Text>
      </Pressable>

      {showPayment ? <Payment {...{ showPayment }} /> : ""}
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
