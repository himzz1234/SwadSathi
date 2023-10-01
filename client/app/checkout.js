import { useContext } from "react";
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

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const router = useRouter();

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
        onPress={() => router.push("/checkout")}
        style={{
          width: "100%",
          backgroundColor: "#FF4136",
          paddingVertical: 15,
          borderRadius: 5,
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>
          Checkout
        </Text>
      </Pressable>
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
