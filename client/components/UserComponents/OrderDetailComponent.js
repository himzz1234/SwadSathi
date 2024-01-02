import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CartContext } from "../../context/CartContext";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";

export default function OrderDetailComponent({ item }) {
  const { cart, dispatch } = useContext(CartContext);
  const [quantity, setQuantity] = useState(
    cart.find((cartItem) => cartItem.id === item._id)
      ? cart.find((cartItem) => cartItem.id === item._id).qty
      : 1
  );

  const { dismissAll } = useBottomSheetModal();

  const addItem = () => {
    const data = {
      id: item._id,
      cId: item.canteenId,
      name: item.name,
      price: item.price,
      image: item.image,
      qty: quantity,
    };

    dispatch({
      type: "ADD_ITEM",
      payload: data,
    });

    dismissAll();
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, gap: 10 }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.quantityContainer}>
            <View style={styles.quantityButtonContainer}>
              <TouchableOpacity
                onPress={() => setQuantity((prev) => prev - 1)}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => setQuantity((prev) => prev + 1)}
                style={[styles.quantityButton, { backgroundColor: "#355e4c" }]}
              >
                <Text style={[styles.quantityButtonText, { color: "white" }]}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.priceText}>₹{item.price}</Text>
          </View>
        </View>
      </View>

      <LinearGradient
        colors={["#2e7653", "#355e4c"]}
        style={[styles.button, styles.saveButton]}
      >
        <TouchableOpacity onPress={addItem}>
          <Text style={styles.saveButtonText}>
            Add To Cart (₹{item.price * quantity})
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  imageContainer: {
    width: "100%",
    height: 200,
  },
  image: {
    width: "100%",
    flex: 1,
    resizeMode: "contain",
    borderRadius: 5,
  },
  itemName: {
    fontWeight: "600",
    fontSize: 22,
  },
  quantityContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    marginTop: 20,
  },
  quantityButtonContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
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
    fontSize: 17,
    fontWeight: "600",
  },
  priceText: {
    color: "#355e4c",
    fontWeight: "600",
    fontSize: 17,
  },
  button: {
    borderWidth: 2,
    borderRadius: 7.5,
    paddingVertical: 15,
    elevation: 5,
  },
  saveButton: {
    borderColor: "transparent",
  },
  saveButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
