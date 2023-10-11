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
import Payment from "../../components/PaymentComponent";
import CartItem from "../../components/CartItem";
import { CartContext } from "../../context/CartContext";

export default function Checkout() {
  const router = useRouter();
  const { cart } = useContext(CartContext);
  const [showPayment, setShowPayment] = useState(false);

  console.log(cart);

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
          return <CartItem {...{ item }} />;
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
