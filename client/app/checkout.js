import { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
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
        style={{ marginTop: 40 }}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 15, width: "100%" }}></View>;
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100, borderRadius: 5 }}
              />
              <Text style={{ flex: 1 }}>{item.name}</Text>

              <View>
                <Text>x{item.qty}</Text>
                <Text>₹{item.qty * item.price}</Text>
              </View>
            </View>
          );
        }}
      />

      <View>
        <Text>
          Total:{" "}
          {cart.reduce(
            (total, cartItem) => total + cartItem.qty * cartItem.price,
            0
          )}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
});
