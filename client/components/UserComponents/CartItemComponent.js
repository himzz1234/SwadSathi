import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { CartContext } from "../../context/CartContext";

export default function CartItem({ item }) {
  const { cart, dispatch } = useContext(CartContext);
  const [quantity, setQuantity] = useState(
    cart.findIndex((citem) => citem.id === item.id) > -1
      ? cart.find((citem) => citem.id === item.id).qty
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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.quantityContainer}>
          <View style={styles.quantityButtons}>
            <TouchableOpacity
              onPress={removeItem}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              onPress={addItem}
              style={[styles.quantityButton, { backgroundColor: "#355e4c" }]}
            >
              <Text style={[styles.quantityButtonText, { color: "white" }]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.itemPrice}>₹{item.price * quantity}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = {
  container: {
    gap: 12.5,
    padding: 7.5,
    height: 110,
    display: "flex",
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "white",
  },
  imageContainer: {
    width: 100,
    borderRadius: 5,
    backgroundColor: "white",
    height: "100%",
  },
  image: {
    width: "100%",
    resizeMode: "contain",
    flex: 1,
    borderRadius: 5,
  },
  detailsContainer: {
    flex: 1,
    rowGap: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  quantityContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    marginTop: 20,
  },
  quantityButtons: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  quantityButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: 22,
    height: 22,
    backgroundColor: "#e3e9e7",
    borderRadius: 999,
  },
  quantityButtonText: {
    fontSize: 13,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "600",
  },
  itemPrice: {
    color: "#355e4c",
    fontWeight: "600",
    fontSize: 16,
  },
};
