import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { CartContext } from "@/context/cart/CartContext";
import AnimatedNumberDisplay from "@/animations/AnimatedNumbers";

export default function ToggleQuantity({
  item,
  quantity,
  setQuantity,
  shouldDispatch,
}) {
  const { dispatch } = useContext(CartContext);

  const addItem = () => {
    setQuantity((prev) => prev + 1);
    const data = {
      ...item,
      qty: 1,
    };

    if (shouldDispatch) {
      dispatch({
        type: "ADD_ITEM",
        payload: data,
      });
    }
  };

  const removeItem = () => {
    setQuantity((prev) => {
      if (prev == 0) return prev;
      else return prev - 1;
    });

    if (shouldDispatch)
      dispatch({
        type: "REMOVE_ITEM",
        payload: { id: item.id, type: item.type },
      });
  };

  return (
    <View style={styles.quantityButtonContainer}>
      <TouchableOpacity style={styles.quantityButton} onPress={removeItem}>
        <Text style={styles.quantityButtonText}>-</Text>
      </TouchableOpacity>
      <AnimatedNumberDisplay
        value={quantity}
        digitStyle={styles.quantityText}
        prefix=""
      />
      <TouchableOpacity
        onPress={addItem}
        style={[styles.quantityButton, { backgroundColor: "#355e4c" }]}
      >
        <Text style={[styles.quantityButtonText, { color: "white" }]}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  quantityContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    marginTop: 15,
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
    fontSize: 16,
    fontWeight: "600",
  },
});
