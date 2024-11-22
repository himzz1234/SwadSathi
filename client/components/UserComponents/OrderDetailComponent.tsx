import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CartContext } from "@/context/cart/CartContext";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import ToggleQuantity from "../ToggleQuantity";

export default function OrderDetailComponent({ item }) {
  const { cart, dispatch } = useContext(CartContext);

  const [pquantity, setPQuantity] = useState(0);
  const [dquantity, setDQuantity] = useState(0);

  const { dismissAll } = useBottomSheetModal();

  const addToCart = () => {
    const items = [],
      data = {
        id: item._id,
        cId: item.canteenId,
        name: item.name,
        price: item.price,
        image: item.image,
      };

    if (pquantity) items.push({ ...data, qty: pquantity, type: "Parcel" });
    if (dquantity) items.push({ ...data, qty: dquantity, type: "Dine-In" });

    items.forEach((data) => {
      dispatch({
        type: "ADD_ITEM",
        payload: data,
      });
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.itemName}>{item.name}</Text>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
                borderWidth: 2,
                borderColor:
                  item.classification === "Veg" ? "#088409" : "#92282a",
                borderRadius: 2,
                zIndex: 10,
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  backgroundColor:
                    item.classification === "Veg" ? "#088409" : "#92282a",
                  borderRadius: 999,
                }}
              ></View>
            </View>
          </View>
          <Text style={styles.priceText}>₹{item.price}</Text>
          <View style={{ marginTop: 30, gap: 15 }}>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "500", flex: 1 }}>
                Parcel
              </Text>
              <ToggleQuantity
                {...item}
                quantity={pquantity}
                setQuantity={setPQuantity}
                shouldToggle={false}
              />
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "500", flex: 1 }}>
                Dine-In
              </Text>

              <ToggleQuantity
                {...item}
                quantity={dquantity}
                setQuantity={setDQuantity}
                shouldToggle={false}
              />
            </View>
          </View>
        </View>
      </View>

      <LinearGradient
        colors={
          dquantity || pquantity ? ["#2e7653", "#355e4c"] : ["gray", "gray"]
        }
        style={[styles.button, styles.saveButton]}
      >
        <TouchableOpacity
          onPress={addToCart}
          disabled={!pquantity && !dquantity}
        >
          <Text style={styles.saveButtonText}>
            Add To Cart (₹{item.price * pquantity + item.price * dquantity})
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
    height: 170,
  },
  image: {
    width: "100%",
    flex: 1,
    resizeMode: "contain",
    borderRadius: 5,
  },
  itemName: {
    fontWeight: "600",
    fontSize: 20,
    flex: 1,
  },
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
  priceText: {
    fontWeight: "600",
    fontSize: 17,
    marginTop: 10,
  },
  button: {
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
