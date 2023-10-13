import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";

export default function CartItem({ item }) {
  const { cart, dispatch } = useContext(CartContext);
  const [quantity, setQuantity] = useState(
    cart.findIndex((citem) => citem.id == item.id) > -1
      ? cart.find((citem) => citem.id == item.id).qty
      : 1
  );

  const addItem = () => {
    setQuantity((prev) => prev + 1);
    const data = {
      id: item.id,
      cId: item.cId,
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

  const removeItem = () => {
    setQuantity((prev) => prev - 1);
    dispatch({ type: "REMOVE_ITEM", payload: item.id });
  };

  return (
    <View
      style={{
        gap: 12.5,
        padding: 7.5,
        height: 100,
        display: "flex",
        borderRadius: 5,
        flexDirection: "row",
        backgroundColor: "#F8F8F8",
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: 80, height: "100%", borderRadius: 5 }}
      />
      <View style={{ flex: 1, rowGap: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.name}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
          ₹{item.price * item.qty}
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          backgroundColor: "#e9e9e9",
          height: "100%",
          borderRadius: 2,
        }}
      >
        <TouchableOpacity
          onPress={removeItem}
          style={{
            borderBottomWidth: 1,
            paddingHorizontal: 10,
            borderBottomColor: "#c1bfbf",
          }}
        >
          <Text style={{ fontSize: 18 }}>-</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          {quantity}
        </Text>
        <TouchableOpacity
          onPress={addItem}
          style={{
            borderTopWidth: 1,
            paddingHorizontal: 10,
            borderTopColor: "#c1bfbf",
          }}
        >
          <Text style={{ fontSize: 18 }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
