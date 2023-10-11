import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

export default function CartItem({ item }) {
  const { cart, dispatch } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const qty =
      cart.findIndex((citem) => citem.id == item._id) > -1
        ? cart.find((citem) => citem.id == item._id).qty
        : 1;

    setQuantity(qty);
  }, []);

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
    if (!quantity) return;

    setQuantity((prev) => prev - 1);
    dispatch({ type: "REMOVE_ITEM", payload: item._id });
  };

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
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.name}</Text>
        <Text style={{ fontWeight: "bold", fontSize: 14 }}>₹{item.price}</Text>
      </View>

      <View style={{ display: "flex" }}>
        <Text
          style={{
            fontWeight: "600",
            flex: 1,
            textAlign: "right",
            fontSize: 17,
          }}
        >
          ₹{item.qty * item.price}
        </Text>
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
            onPress={removeItem}
            style={{
              borderRightWidth: 1,
              paddingHorizontal: 10,
              borderRightColor: "#c1bfbf",
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
}
