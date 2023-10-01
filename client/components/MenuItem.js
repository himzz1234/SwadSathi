import { useContext, useState } from "react";
import { View, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CartContext } from "../context/CartContext";

export default function MenuItem({ item }) {
  const { cart, dispatch } = useContext(CartContext);
  const [quantity, setQuantity] = useState(
    cart.findIndex((citem) => citem.id == item._id) > -1
      ? cart.find((citem) => citem.id == item._id).qty
      : 0
  );

  const addItem = () => {
    setQuantity((prev) => prev + 1);

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item._id,
        cId: item.canteenId,
        name: item.itemName,
        price: item.itemPrice,
        image: item.itemImage,
        qty: 1,
      },
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
        gap: 10,
        display: "flex",
        padding: 10,
        borderRadius: 5,
        width: "47.5%",
        alignItems: "center",
        backgroundColor: "#F8F8F8",
      }}
    >
      <Image
        source={{ uri: item.itemImage }}
        style={{ width: "100%", height: 120, borderRadius: 5 }}
      />
      <View
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1, display: "flex", gap: 10 }}>
          <Text style={{ fontSize: 14.5, fontWeight: 600, flex: 1 }}>
            {item.itemName}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
            ₹{item.itemPrice}
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
            <Text style={{ fontSize: 15, fontWeight: 600 }}>{quantity}</Text>
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
    </View>
  );
}
