import { useContext } from "react";
import { View, Image, Text, Pressable } from "react-native";
import { CartContext } from "../context/CartContext";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

export default function MenuItem({ item }) {
  const { cart, dispatch } = useContext(CartContext);

  const isAdded = cart.findIndex((cartItem) => cartItem.id === item._id) > -1;
  const addItem = () => {
    const data = {
      id: item._id,
      cId: item.canteenId,
      name: item.name,
      price: item.price,
      image: item.image,
      qty: 1,
    };

    dispatch({
      type: "ADD_ITEM",
      payload: data,
    });
  };

  return (
    <View
      style={{
        position: "relative",
        display: "flex",
        borderRadius: 5,
        width: "48.5%",
        alignItems: "center",
        backgroundColor: "#F8F8F8",
        height: 240,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: "100%",
          height: 120,
          borderRadius: 5,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      />
      <View
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1, display: "flex", gap: 10, padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>
            {item.name}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            ₹{item.price}
          </Text>
        </View>

        <Pressable
          disabled={isAdded}
          onPress={addItem}
          style={{
            backgroundColor: "#00CC66",
            position: "absolute",
            bottom: 0,
            right: 0,
            height: 24,
            width: 30,
            borderTopLeftRadius: 5,
            borderBottomRightRadius: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isAdded ? (
            <MaterialIcon name="done" size={20} color="white" />
          ) : (
            <MaterialCommunityIcon name="plus" size={20} color="white" />
          )}
        </Pressable>
      </View>
    </View>
  );
}
